/**
* Copyright 2014 Dossier Technologies Inc.
**/

function ChromeBrowser() {}

ChromeBrowser.method("closeWindow", function(id) {
	chrome.windows.remove(id, function() {});	
});

ChromeBrowser.method("closeCurrentWindow", function() {
	var _this = this;
	this.getCurrentWindow(function(window) {
		_this.closeWindow(window.id);
	});
});

ChromeBrowser.method("createInCurrentWindow", function(urls, pinned, cb) {
	for (var i = 0; i < urls.length; i++) {
		chrome.tabs.create({"url": urls[i], "pinned": pinned[i]})
	}
	cb? cb() : false;
});

ChromeBrowser.method("create", function(urls, incognito, pinnedUrls, cb, extraOptions) {
	createOptions = extraOptions || {};
	createOptions['incognito'] = incognito;
    createOptions["url"] = urls.clean();
	pinnedUrls = pinnedUrls.clean();
	chrome.windows.create(createOptions, 
	function (newWindow) {
        var id = newWindow.id;
        for (var i = 0; i < pinnedUrls.length; i++) {
            chrome.tabs.create({"windowId": id, "url": pinnedUrls[i], "pinned": true});
        }
		cb? cb(newWindow) : false;
	});
});

ChromeBrowser.method("createInWindow", function(windowId, url, pinned) {
    chrome.tabs.create({"windowId": windowId, "url": url, "pinned": pinned});
});

ChromeBrowser.method("open", function(url) {
	chrome.tabs.create({
		'url' : url
	});
});

ChromeBrowser.method("getFocusedWindow", function(cb) {
    this.getWindows(false, function(windows) {
    	for (index in windows) {
    		var window = windows[index];
    		if (window && window.focused) {
    			cb(window);
    		}
    	}
    });
});

ChromeBrowser.method("getWindows", function(populate, cb) {
    chrome.windows.getAll({ populate : populate }, function(windows) {
    	cb(windows);
    });
});

ChromeBrowser.method("getCurrentWindow", function(cb) {
	chrome.windows.getCurrent(function(window) {
		cb? cb(window) : false;
	});
});

ChromeBrowser.method("getCurrentTabList", function(cb, options) {
	var _this = this;
	this.getCurrentWindow(function(window) {
		_this.getTabList(window.id, options, cb);
	});
});

ChromeBrowser.method("getTabList", function(windowId, options, cb) {
	options = options? options : {};
	options["windowId"] = windowId;
	chrome.tabs.query(options, function(tabList) {
		cb? cb(tabList, windowId) : false;
	});
});

ChromeBrowser.method("removeTabs", function(tabIds, cb) {
	tabIds = tabIds.length === 1? [tabIds]: tabIds;
	chrome.tabs.remove(tabIds, function() {
		cb? cb(): false;
	});
});

ChromeBrowser.method("onRemoved", function(cb) {
	chrome.windows.onRemoved.addListener(cb);
});

ChromeBrowser.method("onFocusChanged", function(cb) {
	chrome.windows.onFocusChanged.addListener(function (windowId) {
		cb(windowId);
	});
})

ChromeBrowser.method("onCreated", function(cb) {
	chrome.windows.onCreated.addListener(function(window) {
		cb(window);
	});
});

ChromeBrowser.method("onTabActivated", function(cb) {
	chrome.tabs.onActivated.addListener(function(activeInfo) {
		cb(activeInfo.tabId, activeInfo.windowId);
	});
});

ChromeBrowser.method("onTabCreated", function(cb) {
    chrome.tabs.onCreated.addListener(function(tab) {
		cb(tab);
	});
});

ChromeBrowser.method("onTabUpdated", function(cb) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		cb(tab, changeInfo);
	});
});

ChromeBrowser.method("onTabDetached", function(cb) {
    chrome.tabs.onDetached.addListener(function(tabId, detachInfo) {
		cb(tabId, detachInfo);
	});
});

ChromeBrowser.method("onTabAttached", function(cb) {
    chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {
		cb(tabId, attachInfo);
	});
});

ChromeBrowser.method("onTabRemoved", function(cb) {
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
		cb(tabId, removeInfo);
	});
});

var Browser = new ChromeBrowser();