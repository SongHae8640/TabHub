/**
* Copyright 2014 Dossier Technologies Inc.
**/

function PinnedTabs() {
    this.PINNED_TABS_COOKIE = "pinned-tabs"
    this.lookup = {}
}

PinnedTabs.method('get', function(tabList) {
    var urls = [];
    this.lookup = {};
    for (var i = 0; i < tabList.length; i++) {
        if (tabList[i].pinned) {
            this.lookup[tabList[i].url.removeQuery()] = true
            urls.push(tabList[i].url)
        }
    }
    return urls;
});

PinnedTabs.method('exists', function(url) {
    return !!this.lookup[url.removeQuery()];
});

var PinnedTabsHandler = new PinnedTabs();