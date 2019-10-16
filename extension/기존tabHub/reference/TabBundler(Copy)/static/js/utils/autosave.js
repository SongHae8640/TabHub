/**
* Copyright 2014 Dossier Technologies Inc.
**/

function AutosaveHandler() {
    this.AutosaveKey = "tb-autosave";
    this.TargetKey = "tb-target";
}

AutosaveHandler.method("addTarget", function(bundleName) {
    var targets = JSON.parse(DB.readLocalStorage(this.TargetKey) || "{}");
    targets[bundleName] = true;
    DB.insertLocalStorage(this.TargetKey, JSON.stringify(targets));
});

AutosaveHandler.method("removeTarget", function(bundleName) {
    var targets = JSON.parse(DB.readLocalStorage(this.TargetKey) || "{}");
    delete(targets[bundleName]);
    DB.insertLocalStorage(this.TargetKey, JSON.stringify(targets));
});

AutosaveHandler.method("isTarget", function(bundleName) {
    var targets = JSON.parse(DB.readLocalStorage(this.TargetKey) || "{}");
    return !!targets[bundleName];
});

AutosaveHandler.method("clearBundles", function() {
    DB.createCookie(this.AutosaveKey, "{}", 365);
});

AutosaveHandler.method("getWindowId", function(bundleName) {
    var bundleNameLookup = this.getBundleNameLookup();
    var windowIds = Object.keys(bundleNameLookup);
    for (var i = 0; i < windowIds.length; i++) {
        if (bundleNameLookup[windowIds[i]] == bundleName) {
            return parseInt(windowIds[i]);
        }
    }
    return -1;
});

AutosaveHandler.method("addBundle", function(windowId, bundleName) {
    var bundleNameLookup = this.getBundleNameLookup();
    bundleNameLookup[windowId] = bundleName;
    this.updateBundleNameLookup(bundleNameLookup);
});

AutosaveHandler.method("removeBundle", function(bundleName) {
    var bundleNameLookup = this.getBundleNameLookup();
    var windowIds = Object.keys(bundleNameLookup);
    windowIds.map(function(windowId) {
        if (bundleName == bundleNameLookup[parseInt(windowId)]) {
            delete(bundleNameLookup[parseInt(windowId)]);
        }
    });
    this.updateBundleNameLookup(bundleNameLookup);
});

AutosaveHandler.method("removeWindow", function(windowId) {
    var bundleNameLookup = this.getBundleNameLookup();
    delete(bundleNameLookup[parseInt(windowId)]);
    this.updateBundleNameLookup(bundleNameLookup);
});

AutosaveHandler.method("getBundleName", function(windowId) {
    var bundleNameLookup = this.getBundleNameLookup();
    return bundleNameLookup[parseInt(windowId)];
});

AutosaveHandler.method("getBundleNames", function() {
    var bundleNameLookup = this.getBundleNameLookup();
    return Object.keys(bundleNameLookup).map(function(key) {
        return bundleNameLookup[key];
    });
});

AutosaveHandler.method("getBundleNameLookup", function() {
    try {
        var cookie = DB.readCookie(this.AutosaveKey) || "{}";
        try {
            cookie = atob(cookie);
        } catch (error) {
            if (error.message == "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.") {
            }
        }

        return JSON.parse(cookie);
    } catch(error) {
        if (error.message == "Unexpected end of JSON input") {
            this.updateBundleNameLookup({});
            return {};
        }
        throw error;
    }
});

AutosaveHandler.method("updateBundleNameLookup", function(bundleNameLookup) {
    DB.createCookie(this.AutosaveKey, btoa(JSON.stringify(bundleNameLookup)), 365);
});

AutosaveHandler.method("assignEvents", function() {
    var _this = this;
    chrome.windows.onRemoved.addListener(function(windowId) {
        var bundleNameLookup = _this.getBundleNameLookup();
        if (bundleNameLookup[parseInt(windowId)]) {
            delete(bundleNameLookup[parseInt(windowId)]);
            _this.updateBundleNameLookup(bundleNameLookup);
        }
    });
});

var Autosave = new AutosaveHandler();