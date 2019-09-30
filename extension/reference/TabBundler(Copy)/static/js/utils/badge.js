/**
* Copyright 2014 Dossier Technologies Inc.
**/

function BadgeHandler() {
}

BadgeHandler.method("setWindowBadge", function(windowId) {
    var _this = this;
    var bundleName = Autosave.getBundleName(windowId);
    if (bundleName && Options.isset(Options.ShowCurrentBundleName)) {
        Browser.getTabList(windowId, {}, function(tabList) {
            tabList.map(function(tab) {
                _this.setBadge(windowId, tab.id);
            });
        });
    }
});

BadgeHandler.method("setBadge", function(windowId, tabId) {
    var bundleName = Autosave.getBundleName(windowId) || "";
    if (bundleName && Options.isset(Options.ShowCurrentBundleName)) {
        var options = tabId? {"tabId" : tabId} : {};
        chrome.browserAction.setBadgeBackgroundColor(collect(options, {"color": "#EEBC81"}));
        chrome.browserAction.setBadgeText(collect(options, {"text": bundleName}));
    }
});


BadgeHandler.method("removeBadge", function(tabId) {
    var options = tabId? {"tabId" : tabId} : {};
    chrome.browserAction.setBadgeBackgroundColor(collect(options, {"color": "#EEBC81"}));
    chrome.browserAction.setBadgeText(collect(options, {"text": ""}));
});


var Badge = new BadgeHandler();