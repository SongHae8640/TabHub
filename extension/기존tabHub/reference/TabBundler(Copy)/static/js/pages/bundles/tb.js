/**
* Copyright 2014 Dossier Technologies Inc.
**/

function TB() {
    this._init('#tab-bundler-container', '.tb-page', '#tab-bundler-container', 'tb-page-toggler', 'tb-page-event');
    this.possibleKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "q", "w", "r", "m", "c", "x"];
    this.archivedBundles = new ArchivedContainer('#archived-bundles', '#archived-bundles-divider', 'shift+a').start();
    this.sharedBundles = new SharedContainer('#shared-bundles', '#shared-bundles-divider', 'shift+s').start();
    this.ownBundles = new OwnContainer('#own-bundles', '#bundles-divider', 'shift+b').start();
    this.responseRequired = [];
    this.synced = false;
    this.wheel = new Wheel("#pull-wheel");
}

TB.inherits(Page);

TB.method('toggle', function() {
    this._toggle();
});

TB.method('insert', function(container, bundle) {
    if (bundle.isSynced()) {
        if (Account.loggedIn()) {
            container.prepend(bundle);
        }
    } else {
        container.append(bundle);
    }
});

TB.method('getContainer', function(bundle) {
    switch (true) {
        case bundle.isHidden():
            return this.archivedBundles;
        case bundle.isShared():
            return this.sharedBundles;
        default:
            return this.ownBundles;
    }
});

TB.method('addBundle', function(name, hotkey) {
    var bundle = new Bundle(name, hotkey);
    this.insert(this.getContainer(bundle), bundle);
    return bundle;
});

TB.method('fillBundles', function() {
    var _this = this;
    var names = Object.keys(Accessor.getBundleJSON());

    var localHotkeys = this._getHotkeys(names.length, this.possibleKeys.slice()).reverse();
    [_this.archivedBundles, _this.sharedBundles, _this.ownBundles].map(function(container) {
        container.clear();
    });
    names.map(function(name) {
        _this.addBundle(name, localHotkeys.pop());
    });

    for (var i = 0; i < _this.responseRequired.length; i++) {
        _this.sharedBundles.prepend(_this.responseRequired[i]);
    }
});

TB.method('saveBundle', function(name, empty, cb) {
    var _this = this;
    this._makeBundle(name, empty, function(bundle, windowId) {
        if (Accessor.bundleExists(name)) {
            if (bundle.hasChanged()) {
                if (bundle.isSynced() || bundle.isShared()) {
                    bundle.updateLinks();
                }
                (new Bundle(name)).remove(true, true);
                bundle.update();
                _this.addBundle(bundle.bundleName);
            }
        } else {
            bundle.save();

            // TODO: Get rid of this hack. We add a return statement to
            // addBundle because a new object is created. Due to this, when
            // assignEvents is called, it is being called on an object different
            // to bundle. When updateLinks is called, assignEvents is never
            // called on that bundle, so bundle.$bundle is undefined, and
            // the icon is never updated properly.
            bundle = _this.addBundle(bundle.bundleName);

            if (Options.isset(Options.AutomaticallyAutosaveNewBundles)) {
                Autosave.addTarget(bundle.bundleName);
            }
            if (Account.upgraded() && Options.isset(Options.AutomaticallySyncNewBundles)) {
                bundle.updateLinks();
            }
        }
        Autosave.addBundle(windowId, bundle.bundleName);
        cb? cb(bundle, windowId) : false;
    });
});

TB.method('updateBundleFromWindow', function(name, windowId, cb) {
    Browser.getTabList(windowId, {}, function(tabList) {
        var bundle = new Bundle(name);
        bundle.addTabs(tabList.map(function(tab) {
            var title = tab.title? tab.title : getHostname(tab.url);
            return new Tab(title, tab.url, bundle, tab.pinned);
        }));
        bundle.update();
        if (bundle.isSynced() || bundle.isShared()) {
            bundle.updateLinks();
        }
        cb? cb(bundle) : false;
    });
});

TB.method('pull', function() {
    if (Account.loggedIn()) {
        this.wheel.start();
        this._pullOwn(this);
        this._pullShared(this);
    }
});

TB.method('start', function() {
    var _this = this;

    Mousetrap.bindGlobal(["* m u s i c"], function() {
        Browser.getCurrentTabList(function(tabs, windowId) {
            var data = [];
            tabs.map(function(tab) {
                if (tab.url.toLowerCase().indexOf("youtube.com") !== -1) {
                    data.push("{0},{1}".format(tab.title, tab.url));
                }
            });
            downloadDataURI($, {filename: "music.tbm", data:"data:application/csv;charset=utf-8,{0}".format(encodeURIComponent(data.join("\n")))});
        });
    });

    $(document).on("tb-refresh", function(event, name) {
        _this.saveBundle(name, false, function(bundle) {});
    });

    $(document).on("tb-unhide", function(event, bundleName) {
        _this.ownBundles.append(new Bundle(bundleName));
    });

    $(document).on("tb-hide", function(event, bundleName) {
        _this.archivedBundles.append(new Bundle(bundleName));
    });

    Mousetrap.bindGlobal('alt', function() {
        _this.archivedBundles.highlightHotkeys();
        _this.ownBundles.highlightHotkeys();
        _this.archivedBundles.highlightHotkeys();
    });
    Mousetrap.bindGlobal('shift+l', function() { Popup.show(Messages.LatestOpenedBundleTitle, Messages.LatestOpenedBundle.format(Accessor.getLastOpen())); });

    this.bind('login', function() {
        _this.pull();
    });

    this.bind('logout', function() {
        var subscriptions = SubscriptionHandler.getBundleList();
        for (subscription in subscriptions) {
          new Bundle(subscription).remove(true);
        }
        SubscriptionHandler.resetBundleList();

        var syncedBundleList = TBSynchronizer.getBundleList();
        for (syncedBundle in syncedBundleList) {
          new Bundle(syncedBundle).remove(true);
        }
        TBSynchronizer.resetBundleList();
        _this.fillBundles();
        [_this.archivedBundles, _this.ownBundles].map(function(container) {
            container._hideSpacer();
        });
    });

    $('#add_bundle_input').setDefault();

    $('#add_bundle_input').onEnter(function(event) {
        $('#add_bundle').trigger('click') ;
    });

    $('#add_bundle').click(function() {
        var name = $('#add_bundle_input').val();
        if (_this._validName(name)) {
            _this.saveBundle(name, false, function(bundle, windowId) {
                Badge.setWindowBadge(windowId);
            });
        }
    });

    $('#add_bundle').rightClick(function() {
        var name = $('#add_bundle_input').val();
        var options = {}
        options[ContextMenu.MakeEmptyBundle] = function() {
            if (_this._validName(name)) {
                _this.saveBundle(name, true);
            }
        }
        ContextMenu.addMenuItems(options);
    });
});

TB.method('_getHotkeys', function(length, possibilities) {
    var startingLetter = "";
    if (possibilities.length >= length) {
        return possibilities;
    } else {
        startingLetter = possibilities.slice(possibilities.length - 1);
    }

    possibilities = possibilities.map(function(possibility) {
        return startingLetter + possibility;
    }).concat(possibilities);
    possibilities.pop();

    return this._getHotkeys(length, possibilities);
});

TB.method('_makeBundle', function(name, empty, cb) {
    Browser.getCurrentTabList(function(tabList, windowId) {
        var bundle = new Bundle(name);
        if (!empty) {
            for (var i = 0; i < tabList.length; i++) {
                var title = tabList[i].title? tabList[i].title : getHostname(tabList[i].url);
                bundle.addTabs(new Tab(title, tabList[i].url, bundle, tabList[i].pinned));
            }
        }
        cb(bundle, windowId);
    });
});

TB.method('_validName', function(name) {
    var errorMessage = 0;
    if (!name || name == $('#bundle_name').attr('default')) {
        errorMessage = Messages.InvalidBundleName;
    } else if (Accessor.bundleExists(name)) {
        errorMessage = Messages.BundleNameExists;
    }
    errorMessage? Popup.show(Messages.GeneralErrorTitle, errorMessage): false;
    return errorMessage? false : true;
});

TB.method('_handlePull', function() {
    if (this.synced) {
        this.synced = false;
        !this.changed || this.fillBundles();
        this.wheel.stop();
    }
    this.synced = true;
});

TB.method('_pullOwn', function(_this) {
    TBSynchronizer.pull(Account.id(), Account.key(), function (response) {
        Accessor.unhideSynced();
        Accessor.hide(JSON.parse(response.data['hidden-bundles']), true);
    }, function(error) {
        _this._errorCB(error, Messages.ErrorRetrievingBundles);
    }, function(synchronizer, response, changed) {
        _this.changed = _this.changed || changed;
        _this._handlePull();
    });
});

TB.method('_pullShared', function(_this) {
    SubscriptionHandler.pull(Account.id(), Account.key(), function (response) {
      var responseRequired = response["response-required"];
      for (var index = 0; index < responseRequired.length; index++) {
        var invite = new SubscriptionInvite(responseRequired[index]);
        _this.responseRequired.push(invite);
      }
    }, function(error) {
        _this._errorCB(error, Messages.ErrorRetrievingSharedBundles);
    }, function(synchronizer, response, changed) {
        _this.changed = _this.changed || changed;
        _this._handlePull(changed);
    });
});

TB.method('_errorCB', function(error, message) {
    var _this = this;
    if (Failure.UnmatchingIdAndKey.equals(error) || Failure.NotLoggedIn.equals(error)) {
        _this.trigger("startLogout");
    } else {
        Popup.show(Messages.GeneralErrorTitle, message);
    }
});
var Bundles = new TB();
Bundles.start();