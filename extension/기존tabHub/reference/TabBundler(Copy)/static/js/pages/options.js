/**
* Copyright 2014 Dossier Technologies Inc.
**/

function OptionsPage(toggleClass, togglerEvent) {
	this._init('#options-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);

	this._hiddenOptions = [
		Options.PasswordProtectHidden, 
		Options.HideMessages,
		Options.AutomaticallySaveBundle,
	]; 
	this._labelHtml = '<input type="checkbox" id="tb-{1}" class="tb-option" option-id="{1}" name="tb-{1}" {0} {3}/><label for="tb-{1}" {3}> {2} </label>';
	this._groupHtml = '<div class="full-width left pointer options-group" groupId="{0}">{0}. <span class="group-title">{1}</span></div> <div id="group-{0}" class="full-width left pointer options-container" hidden>{2}</div>'
	this._optionGroups = {
		"Appearance" : [3, 6, 12, 14],
		"Autosave" : [10, 11],
		"Opening Bundles" : [1, 2, 5, 9, 13],
		"Search" : [8],
		"Synchronization" : [15]
	}
	this._optionLabels = [
	    'Password Protect Your Hidden Bundles',
	    'Close Window When Bundle Is Opened',
	    'Open With Smaller Screen Size',
	    'Confirm Bundle Deletion or Refresh',
	    'Automatically Save Bundle <span class="mini_text">(Activated when bundle is opened or saved) </span>',
	    'Push Bundles To The Top When Opened',
	    'Hide Tab Bundler Tips',
	    'Hide Messages From Tab Bundler',
	    'Use Bundle Name In Search',
	    'Keep Pinned Tabs Open From Previous Session',
	    'Ask to Set New Window As Autosave Target for Last Closed Bundle',
	    'Automatically Autosave New Bundles',
	    'Show Current Bundle Name On Tab Bundler Icon',
	    'Focus On Window If Already Opened',
	    'Show Icon For Export of Bundle to Csv',
	    'Auto-Sync New Bundles if Account is Upgraded.'
	];
}

OptionsPage.inherits(Page);

OptionsPage.method('toggle', function(event, data) {
	this._toggle();	
});

OptionsPage.method('fill', function() {
	var _this = this;
	var groups = Object.keys(this._optionGroups);
	var html = groups.map(function(group, index) {
		return _this._groupHtml.format(index + 1, group,
			_this._optionGroups[group].map(function(option) {
				var label = _this._optionLabels[option];
				if (_this._hiddenOptions.indexOf(option) === -1) {
					var optionSet = Options.isset(option);
					var callback = Options.getCallback(option);
					callback && optionSet? callback() : false;
					return _this._labelHtml.format(optionSet? 'checked' : '', option, label);
				} else {
					return _this._labelHtml.format(optionSet? 'checked' : '', option, label, "hidden");
				}
			}).join("<br/><br/>")
		);
	});
	$('#options').html(html.join('<br/>'));
});

OptionsPage.method('start', function() {
	var _this = this;
	this.fill();

    $('.tb-option').click(function() {
        var option = parseInt($(this).attr('option-id'));
        var newValue = $(this).attr('checked')? true: false;
        var callback = Options.getCallback(option);
        Options.toggleOption(option);
        callback? callback(newValue) : false;
    });

    $('.options-group').click(function() {
    	$(this).toggleClass('group-title-selected');
    	$('#group-{0}'.format($(this).attr('groupId'))).toggle();
    });
  
    $("#export").click(function() {
        downloadDataURI($, {filename: "tbexport.tb", data:"data:application/txt;charset=utf-8,{0}".format(btoa(escape(Accessor.getBundleJSONString())))});
    });

    $('#import_input').change(function(e) {
    	var input = document.getElementById("import_input");
    	if (!(!input || !input.files || !input.files[0])) {
	    	var input = document.getElementById("import_input");
			var reader = new FileReader();
		    reader.onload = function() {
			    var importedJSON = collect(Accessor.getBundleJSON(), JSON.parse(unescape(atob(reader.result))));
			    if (importedJSON) {
			        Accessor.setBundleJSON(JSON.stringify(importedJSON));
			        Bundles.fillBundles()
			    }
		    }
		    reader.readAsText(input.files[0]);
		    _this.trigger("tb-page-event")
    	}
    });
});

var optionsPage = new OptionsPage('.options-page-toggler', 'options-page-event');
optionsPage.start();