/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SearchPage(toggleClass, togglerEvent) {
	this._init('#search-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);
    Mousetrap.bindGlobal('shift+f', function() { $('#search').click(); }, 'keyup');
}

SearchPage.inherits(Page);

SearchPage.method('toggle', function(event, data) {
	this.uber('_toggle', function() {
        $('#search-box').focus();
		Mousetrap.pause();
	}, function() {
		Mousetrap.unpause();
	});	
});

SearchPage.method('start', function() {
	this.setupTypeahead();

	$('#search-box').onEnter(function() {
		if ($('#empty-search-result').is(':visible')) {
			Browser.open('http://www.bing.com/search?q={0}'.format(encodeURIComponent($('#search-box').val())));
		}
	});
});

SearchPage.method('setupTypeahead', function() {
	var substringMatcher = function(tabs) {
	    return function findMatches(q, cb) {
		    var matches, substrRegex;
		 
		    matches = [];
		    substrRegex = new RegExp(q, 'i');
		 
		    $.each(tabs, function(i, tab) {
		        if (substrRegex.test(tab['t']) || substrRegex.test(tab['l'])) {
		     	    matches.push(tab);
		            return;
		        }
		        if (Options.isset(Options.UseBundleNameInSearch) && substrRegex.test(tab['b'])) {
					matches.push(tab);
		        }
		    });
		 
		    cb(matches);
	    };
	};

	var bundleJSON = Accessor.getBundleJSON();
	var tabs = [];
	tabs = tabs.concat.apply(tabs, Object.keys(bundleJSON).map(function(bundleName) {
		return bundleJSON[bundleName].map(function(tab) {
			tab['b'] = bundleName;
			return tab;
		});
	}));

	$('#search-box.typeahead').typeahead({
	    hint: true,
	    highlight: true,
	    minLength: 1,
	},
	{
	    displayKey: 't',
	    templates: {
	    	suggestion: function(tab) {
	    		return [
	    			'<div class="search-result pointer">',
						'<div class="tb-text">[{2}] {0}</div>',
						'<div class="mini_text">{1}</div>',
		    		'</div>'
				].join('\n').format(tab['t'], tab['l'], tab['b'])
	    	},
	    	empty: [
		        '<div id="empty-search-result" class="search-result">',
			        'Unable to find any results within your bundles. If no tabs are selected, hitting [Enter] searches online.',
		        '</div>'
		    ].join('\n')
	    },
	    source: substringMatcher(tabs)
	});

	$('#search-box.typeahead').bind("typeahead:selected", function(event, tab) {
		Browser.open(tab['l']);
	});
});

var searchPage = new SearchPage(".search-page-toggler", "search-page-event");