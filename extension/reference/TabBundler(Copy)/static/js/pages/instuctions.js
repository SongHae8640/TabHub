/**
* Copyright 2014 Dossier Technologies Inc.
**/

function InstructionsPage(toggleClass, togglerEvent) {
	this._init('#instructions-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);
	this._latestRequestKey = "tb-latest-request";
	this._instructions = {
		"Use Hotkeys" : [
			"The following are the list of hotkeys available:",
			"<ul>",
			    "<li>See Archived Bundles (SHIFT+A)</li>",
			    "<li>See Main Bundles (SHIFT+B)</li>",
			    "<li>Search Your Bundles (SHIFT+F)</li>",
			    "<li>Show Last Opened Bundle (SHIFT+L)</li>",
			    "<li>Open Bundle (ALT+[BUNDLE KEY])*</li>",
			"</ul>",
			"* To <span class='highlight'>open bundles using hotkeys</span>, press <span class='highlight'>ctrl+shift+a</span> to open the Tab Bundler popup.",
			"When in the popup, holding <span class='highlight'>alt</span> brings up a hotkey associated with each bundle.",
			"Pressing the hotkey associated with the bundle while holding alt, will open the specified bundle."
		].join("<br/>"),
		"Back Up Tab Bundler" : " \
			There are three ways to <span class='highlight'>Back Up Tab Bundler</span>. The first, and simplest way is to sync all your bundles. When you do \
			this, you do not need to worry about ever losing your data because they are tied to your account. Simply log on, and they'll reliably be there.\
			<br/> <br/> \
			The second way is to go to settings, and click on export. Your backup will be downloaded as a file called 'tbexport.tb'. In order to restore your data, click on import \
			and upload the exported file. \
			<br/> <br/> \
			Lastly, you can copy two files: \
			<br/> <br/> \
			<ol> \
			<li>'C:\\Users\\[User Name]\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\chrome-extension_ooajenhhhbdbcolenhmmkgmkcocfdahd_0.localstorage' </li> \
			<li>'C:\\Users\\[User Name]\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\chrome-extension_ooajenhhhbdbcolenhmmkgmkcocfdahd_0.localstorage-journal' </li> \
			</ol> \
			<br/> \
			To restore the data, simply install Tab Bundler, and paste these files in the same location that you copied them. \
		",
		"Autosave Bundles" : " \
			To <span class='highlight'>autosave bundles</span>, simply click on the edit icon on the bundle you want to autosave. Next, hit the autosave icon ({0}) that will appear below the \
			name of the bundle. \
			<br/><br/> \
			In order to stop autosaving, simply click on this same icon again. \
			<br/><br/> \
			When a bundle is set to autosave, it will automatically update if the window that a bundle is saved from is changed. It will also automatically save if \
			the window that is created by opening the bundle is changed. \
			".format("<i class='pointer unselected autosave fa fa-buysellads' title='Turn on Autosave'/>"),
		"Order Bundles" : " \
			To <span class='highlight'>order bundles</span>, simply drag and drop your bundles until you achieve the order that you wish to keep. \
			You can also <span class='highlight'>move tabs from one bundle to another</span> by clicking on the edit icon, and dragging a tab to the bundle you wish to \
			move it to. Bundles will be greyed out when you hover over them to indicate that they are the target of the new tab when you stop dragging. \
		",
		"Search For Tabs" : " \
			To <span class='highlight'>search for tabs</span>, hit the magnifying glass icon at the top right corner of Tab Bundler. You will see a search box. When you type into it, relevant \
			tabs will appear below the search box based on the the url, and the title of the tab. By default, the search box also searches based on the bundle \
			name that the tab belongs to. You can turn this off in the settings page. When you click on a result, the tab is opened in the same window. If you hit enter in the search area when no \
			search results are present, Tab Bundler will open up a new page with a Bing search of what was specified in the text area. \
		",
		"Share Bundles" : " \
			To <span class='highlight'> Share Bundles </span>, you must first have a synced bundle. Click <a href='#sync'>here</a> to learn how to sync bundles. \
			When a bundle is synced, the Tab Bundler icon to the left of the bundle name will turn orange. When this happens, hover over the 'share' icon to the left of the arrow pointing upwards. \
			<br/><br/> \
			You will be brought to a page that contains the link you need to share. \
			<br/><br/> \
			The person visiting this page <span class='highlight'>will see all the links within the bundle</span> you shared. They can then open the links of the bundle one at a time or they can click the 'Open All' button to create a window with all the shared tabs. \
		",
		"Syncing Tab Bundler" : " \
			To <span class='highlight'> sync bundles in Tab Bundler </span>, you must first create an account. Visit <a href='http://www.tabbundler.com#contact'>here</a>, to do so. \
			After creating an account and authenticating your email, the sync function will be available for use. Using sync is very simple. Bundles just need to be 'pushed' and saved on the server, \
			and you will have access to your bundles everywhere you log in. Note that there is a limit of 1 synced bundle unless you wish to make a purchase <a href='http://www.tabbundler.com/upgrade'>here</a> \
			<br/><br/> \
			Bundles that are synced are coloured orange, compared to bundles which are not synced and coloured blue. <span class='highlight'> Bundles are also automatically synced</span> \
			every time you start Tab Bundler. \
		",
		"Stop Syncing a Bundle But Keep It In The Current Computer" : " \
			To <span class='highlight'> stop syncing a bundle, but keep the bundle locally </span>, right click on the synced bundle, click on 'Tab Bundler', and click on 'Stop Syncing'. \
			This will prevent this bundle from updating on other computers, while keeping the bundle on the current computer. \
		",
		"Export Bundle" : " \
			To <span class='highlight'> export bundles </span>, open up the settings page by clicking on the gear at the top right corner, click on the 'export' button that will be available to you on the popup. Follow the steps on the page that will appear. \
		",
		"Import Bundle" : " \
			To <span class='highlight'> import bundles </span>, open up the settings page by clicking on the gear at the top right corner, paste exported data onto the text area beside the 'import' button, and click on the 'import' button. \
		",
		"Opening Bundle In Same Window" : " \
			To <span class='highlight'> open bundles in the same window </span>, right click on your selected bundle, click on 'Tab Bundler', and click on 'Open Bundle in Same Window'. \
			This will open all the tabs in the bundle you selected without opening another window. \
		",
		"Adding Specific Tabs in Bulk From Current Window" : " \
			To <span class='highlight'> add specific tabs in bulk to a bundle </span>, click on the pencil icon beside the bundle name, and enter comma separated numbers corresponding to the \
			tab number from your current window. The numbering starts from one, which is the leftmost tab in your current window. \
			Click on the '+' icon to the right of the text area to finalize your decision. \
			<br/><br/> \
			Below is an example of a user who wants to add 'Microsoft', 'Facebook', and 'Twitter' to the bundle called 'Tech Companies': \
			<br/><br/> \
			<img class='instruction-img' width=381px src='http://www.tabbundler.com/assets/images/tb-add-bulk-specific.png'/> \
		",
		"Open Bundle in Incognito" : " \
			To <span class='highlight'> open a bundle in incognito mode </span>, right click on the bundle that you want to open, click on 'Tab Bundler', and click on 'Open In Incognito'. \
			If this is successful, a new incognito window will be created with all the tabs in the bundle. \
		",
		"Remove Open Tabs From Bundle" : " \
			To <span class='highlight'> close all currently open tabs from a bundle </span>, right click on your selected bundle, click on 'Tab Bundler', and click on 'Close Tabs From Bundle'. \
			What this will do is match the URLs from a bundle with the open tabs in the window. If there is a match, the tab will be closed. \
		",
		"Create Empty Bundle" : " \
			To <span class='highlight'> create an empty bundle </span>, right click on the 'Add Bundle' icon, and click on 'Make Empty Bundle'. \
			A bundle with no tabs will be created. You can then populate this bundle by clicking on the 'Plus' icon, the 'Refresh' icon, or you can manually add URLs. \
		",
		"Edit Link Name" : " \
			To <span class='highlight'> edit a link name </span>, open up the link list for the bundle, click on the name of the link, and replace the name with \
			a different name of your choice. Hit 'Enter' or click away from the input area to save your changes. \
		",
		"Create New Bundle" : " \
			To <span class='highlight'> create a bundle </span>, enter a name into the text input area and click on the 'Add Bundle' icon or hit 'Enter'. \
			The tabs saved in your bundle will be the ones that are open in the active window. \
			In order to add a single tab to a bundle, click on the '+' icon, or click on the pencil icon beside the bundle name, and enter the url into the second text area. \
			Click on the '+' icon to the right of the textarea. \
		",
		"Edit a Bundle" : " \
			To <span class='highlight'> edit a bundle </span> click on the pencil icon beside the bundle. \
			If you want to remove certain URLs in the bundle, simply click on the,'x' icon beside it's title. \
			It is also possible to manually enter URLs into the bundle by typing the URL into the second text area. \
			Click on the '+' icon to the right of the text area. \
			Please note that if you wish to enter a URL this way, the URL will show up as the domain name, as opposed to the title of the tab. \
		",
		"Load Bundle" : " \
			If you want to <span class='highlight'> load a bundle </span> you created, double-click on the bundle name in the Tab Bundler popup. \
		"
	}
	this._titleHtml = '<span instruction="#tb-instruction-{1}" class="pointer instruction-title full-width left"> \
						  <span class="instruction-number">{1}.</span> \
						  <span class="instruction-number instruction-back" hidden>&lt;&lt;</span> \
						  {0} \
					   </span>';
	this._instructionHtml = '<p id="tb-instruction-{0}" class="instruction left" hidden></p>';
    this._wheel = new Wheel("#instructions-wheel");
}

InstructionsPage.inherits(Page);

InstructionsPage.method('toggle', function(event, data) {
	var _this = this;
	this.uber('_toggle', function() {
		_this.resetPage();
	});
});

InstructionsPage.method('resetPage', function() {
	$('.instruction-number').show();
	$('.instruction-back').hide();
	$('.instruction-title').removeClass('selected');
	this.hideInstruction();
});

InstructionsPage.method('hideInstruction', function() {
	$('.instruction-title').fadeIn(300);
	$('.instruction').hide();
});

InstructionsPage.method('start', function() {
	var _this = this;
	var titles = Object.keys(this._instructions);
	var oldRequest = DB.readLocalStorage(_this._latestRequestKey);

	if (oldRequest) {
		$('#feature-request').text(oldRequest);
	}

	for (var i = 1; i < titles.length + 1; i++) {
		var title = titles[i - 1];
		var instruction = this._instructions[title];
		$('#instruction-container').append(this._titleHtml.format(title, i)).append(this._instructionHtml.format(i));
		$('#tb-instruction-{0}'.format(i)).html(instruction);
	}

	$('.instruction-title').click(function() {
		var $instructionTitle = $(this);
		if ($instructionTitle.hasClass('selected')) {
			_this.resetPage();
		} else {
			$('.instruction, .instruction-title').hide();
			$instructionTitle.find('.instruction-number').toggle();
			$instructionTitle.fadeIn(300).addClass('selected');
			$($instructionTitle.attr('instruction')).fadeIn(300).addClass('selected');
		}
	});

	$('#send-email').click(function() {
		var request = $('#feature-request').val();
	    DB.insertLocalStorage(_this._latestRequestKey, request);

        if (_this._wheel.showing) {
			return;
        }
		_this._wheel.start();

		if (!Account.loggedIn()) {
			$('#sign-in').click();
	        Popup.show(Messages.MustBeSignedInForInstructionsTitle, Messages.MustBeSignedInForInstructions, 9000);
		} else {
			EmailSender.send(Account.id(), Account.key(), request, function() {
				DB.eraseLocalStorage(_this._latestRequestKey);
		        Popup.show(Messages.FeatureRequestSentTitle, Messages.FeatureRequestSent, 5000);
		        $(document).trigger('instructions-page-event');
			}, function() {
		        Popup.show(Messages.FeatureRequestCouldNotBeSentTitle, Messages.FeatureRequestCouldNotBeSent, 5000);
		    }, function() {
				_this._wheel.stop();
		    });
		}
	});
});

var instructionsPage = new InstructionsPage('.instructions-page-toggler', 'instructions-page-event');