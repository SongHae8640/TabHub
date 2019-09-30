/**
* Copyright 2014 Dossier Technologies Inc.
**/

function Bundle(bundleName, hotkeyId) {
    this._init(bundleName, hotkeyId);
}

Bundle.inherits(BundleBase);

Bundle.method("_init", function(bundleName, hotkeyId) {
  this.bundleHtml = "<li id='{2}' class='single-bundle-container' bundleName='{0}'> \
                      <div class='row bundle tb-text image' editing='false' name='{0}'> \
                        <div class='bundle_icon {5} image' editing='false' title='Open bundle!'> </div> \
                        <div class='bundle_name'> \
                          <span class='bundle_name_html'> \
                            <span class='bundle_name_display bundle_name_edit'>{1}</span> \
                            <input class='bundle_name_input bundle_name_edit' hidden/> \
                            <span class='mini-text bundle_name_edit'> (<span class='bundle_length'><span {10}>NEW: </span>{4}</span> tabs) </span> \
                          </span> \
                          <span class='hotkey_id' hidden> {7} </span> \
                        </div> \
                        <div class='show edit_highlight image hidden' editing='false'> </div> \
                        <div class='icons hidden'> \
                          <div class='add_page icon image right' title='Add Tab'> </div> \
                          {9} \
                          {8} \
                          {6} \
                        </div> \
                      </div> \
                      <div class='link_container hidden' name='{0}'> \
                        <div class='hidden-icon-container center'> \
                          <i class='pointer refresh fa fa-refresh hidden-icon' title='Refresh Bundle'/>  \
                          {11} \
                          {12} \
                          <i class='pointer remove hidden-icon fa fa-trash' title='Delete'> </i>  \
                        </div> \
                        {3} \
                        <div class='add_link_container image'> \
                          <input class='input_link' default=\"URL or 1,1-4,7 or ALL or empty to upload.\" type='text'/> \
                          <div class='manual_add_page image right'> </div> \
                        </div> \
                      </div> \
                    </li>";
  this.makeLinkHtml = "<div class='make-link icon image right' title='Share' {0}> </div>";
  this.pushBundleButtonHtml = "<div class='push icon image right' title='Sync'> </div>";
  this.showBundleButtonHtml = "<div class='show-bundle toggle-hide icon image right' title='Un-Archive'> </div>";
  this.hideBundleButtonHtml = "<div class='hide-bundle toggle-hide icon image right' title='Archive'> </div>";
  this.toggleAutosaveHtml = "<i class='pointer selected autosave fa fa-buysellads hidden-icon {0}' title='Turn Off Autosave'/> <i class='pointer autosave fa fa-buysellads hidden-icon {1}' title='Turn On Autosave'/>";
  this.downloadBundleCsvHtml = Options.isset(Options.AllowExportToCsv)? "<i class='pointer export-csv fa fa-file-excel-o hidden-icon' title='Export to Csv'/>" : "";

  if (Autosave.isTarget(bundleName)) {
    this.toggleAutosaveHtml = this.toggleAutosaveHtml.format("", "hidden");
  } else {
    this.toggleAutosaveHtml = this.toggleAutosaveHtml.format("hidden", "");
  }

  this.id = "tb-{0}".format(base64Encode(bundleName).replace(/[=+/]/g, ''));
  this.hotkeyId = hotkeyId;
  this.$bundle;
  this.$add_link_container;

  this.uber('_init', bundleName);
});

Bundle.method("stopSyncing", function() {
  var _this = this;
  this.uber("stopSyncing", function() {
     _this.$bundle.find(".bundle_icon").removeClass("is-synced");
     _this.$bundle.find(".make-link").hide();
  }, function(data) {
    Popup.show(Messages.GeneralErrorTitle, data.message);
  });
});

Bundle.method("highlightHotkey", function() {
  var $bundleName = this.$bundle.find(".bundle_name_html");
  var $hotkey = this.$bundle.find(".hotkey_id");
  $bundleName.hide();
  $hotkey.show();
  setTimeout(function() {
    $bundleName.show();
    $hotkey.hide();
  }, 2000);
});

Bundle.method("removeTab", function(id) {
  var tab = this.uber("removeTab", id, true);
  this.updateBundleLengthDisplayed();
  if (this.isSynced() || this.isShared()) {
    this.updateLinks({
      "links" : tab.url,
      "action" : 2
    });
  }
});

Bundle.method("makeHtml", function() {
  var linkHtmls = this.tabs.map(function(tab) {
    return tab.makeTabHTML();
  });
  var linkHtml = linkHtmls.join("");
  var isSynced = this.isSynced() || this.isShared()? "is-synced" : "";
  var toggleHideButton = this.isShared()? "" : this.isHidden()? this.showBundleButtonHtml : this.hideBundleButtonHtml;
  return this.bundleHtml.format(
    this.bundleName,
    this.bundleName.escapeHTML(),
    this.id,
    linkHtml,
    this.length(),
    isSynced,
    this.makeLinkHtml.format((this.isShared())? "hidden" : ""),
    this.hotkeyId,
    this.isSynced() || this.isShared()? "" : this.pushBundleButtonHtml,
    toggleHideButton,
    this.isNewlyUpdated? "" : "hidden",
    this.toggleAutosaveHtml,
    this.downloadBundleCsvHtml
  );
});

Bundle.method("rename", function(newName) {
  var _this = this;
  var updateStatus = this.uber("updateName", newName, undefined, function(errorMessage) {
    Popup.show(Messages.GeneralErrorTitle, Messages.SynchronizationError.format(_this.bundleName));
  }, function(status) {
    status.equals(Failure.DuplicateName)? Popup.show(status.title, status.message.format(newName)) : false;

    _this.$bundle.html(
      $($.parseHTML(_this.makeHtml())).html()
    );
    
    _this.$bundle.attr('chosen', 'false');
    _this.assignEvents();
  });
});

Bundle.method("toggleHide", function() {
  var _this = this;

  var hidden = this.uber('hide', function() {
    _this.removeFromDom();
    _this.$bundle.find(".toggle-hide").changeClass("hide-bundle", "show-bundle");
    $(document).trigger("tb-hide", _this.bundleName);
  }, function() {}, function() {
    Popup.show(Messages.GeneralErrorTitle, Messages.HideFailure.format(_this.bundleName));
  });

  if (!hidden) 
    this.uber('unhide', function() {
      _this.removeFromDom();
      _this.$bundle.find(".toggle-hide").changeClass("show-bundle", "hide-bundle");
      $(document).trigger("tb-unhide", _this.bundleName);
    }, function() {}, function() {
      Popup.show(Messages.GeneralErrorTitle, Messages.UnhideFailure.format(_this.bundleName));
    });
});

Bundle.method("removeFromDom", function() {
  $('#{0}'.format(this.id)).remove();
});

Bundle.method("remove", function(remainSyncing, keepAutosave) {
  this.removeFromDom();

  if (!keepAutosave) {
    Autosave.removeBundle(this.bundleName);
    Autosave.removeTarget(this.bundleName);
  }

  this.uber("remove", remainSyncing);
});

Bundle.method("loadBundle", function(incognito, sameWindow) {
  var _this = this;
  incognito = incognito || false;
  // Opens up a window with all the URLs associated with 'name'
  Browser.getCurrentTabList(function(tabs, windowId) {
    var isEmpty = true;

    // If none of the tabs are chrome://newtab/ then the window
    // is not empty
    for (var i =0; i < tabs.length && isEmpty; i++) {
      isEmpty = tabs[i].url === "chrome://newtab/"
    }

    var closeCurrent = isEmpty || Options.isset(Options.CloseCurrentOnOpen);
    var extraOptions = {};

    extraOptions["top"] = 0;
    extraOptions["left"] = 0;
    if (!Options.isset(Options.OpenMinimized)) {
      extraOptions["height"] = screen.height;
      extraOptions["width"] = screen.width;
    } else {
      extraOptions["height"] = screen.height / 2;
      extraOptions["width"] = screen.width / 2;
    }

    var URLList = _this.tabs.map(function(tab) {
      return tab.isPinned == 1? undefined : tab.url;
    });

    var pinnedTabs = PinnedTabsHandler.get(tabs);
    var pinnedList = _this.tabs.map(function(tab) {
      return tab.isPinned == 1 && (!PinnedTabsHandler.exists(tab.url) || !Options.isset(Options.KeepPinnedTabs))? tab.url : undefined;
    });

    if (Options.isset(Options.KeepPinnedTabs)) {
      pinnedList = pinnedList.concat(pinnedTabs);
    }

    Accessor.updateLastOpen(_this.bundleName);

    if (Options.isset(Options.OpeningABundlePushesToTop)) {
      Accessor.moveBundle(_this.bundleName, -1);
    }

    if (sameWindow) {
      Browser.createInCurrentWindow(URLList, pinnedList);
    } else {
      var bundleWindowId = Autosave.getWindowId(_this.bundleName);
      if (bundleWindowId > -1 && Options.isset(Options.FocusOnWindowIfOpened)) {
        chrome.windows.update(bundleWindowId, {focused: true});
      } else {
        Browser.create(URLList, incognito, pinnedList, function(newWindow) {
          Autosave.addBundle(newWindow.id, _this.bundleName);
          closeCurrent? Browser.closeWindow(windowId) : false;
          Badge.setWindowBadge(newWindow.id);
        }, extraOptions)
      }
    }
  });
});

Bundle.method('updateLinks', function(successCB, options) {
  if (!this._isNewBundle()) {
    var _this = this;
    this.uber('updateLinks', collect(
      {
        "bundleLimitReachedCB" : function() {
          $('#upgrade').click();
          Popup.show(Messages.BundleLimitExceededTitle, Messages.BundleLimitExceeded, 10000);
        }, 
        "syncSuccessCB" : function() {
          if (_this.$bundle) {
            _this.$bundle.find(".bundle_icon").addClass("is-synced");
            _this.$bundle.find(".make-link").show();
          }
          successCB? successCB() : false;
        },
        "syncErrorCB" : function(response) {
          Popup.show(Messages.GeneralErrorTitle, response.message);
        }, 
        "shareErrorCB" : function(response) {
          Popup.show(Messages.GeneralErrorTitle, response.message);
        }
      }, options)
    );
  }
});

Bundle.method('updateBundleLengthDisplayed', function() {
  this.$bundle.find('.bundle_length').html(this.length());
});

Bundle.method('addTabNumbersFromCurrentWindow', function(commaDelimitedTabNumbers) {
  var _this = this;
  var tabNumbers = commaDelimitedTabNumbers.split(",");
  var tabs = [];
  Browser.getCurrentTabList(function(tabList) {
    var confirmationString = "Are the following tabs what you wanted to add to {0}?\n\n".format(_this.bundleName)
    for (var i = 0, tab = tabList[tabNumbers[i] - 1]; i < tabNumbers.length; tab = tabList[tabNumbers[++i] - 1]) {
      if (tab) {
        var url = tab.url;
        tab = new Tab(tab.title? tab.title : getHostname(url), url, _this, tab.pinned)
        confirmationString += "{0}. {1}\n".format(tabNumbers[i], tab.title)
        tabs.push(tab)
      }
    }
    if (!Options.isset(Options.AskForConfirmation) || checkMac() || confirm(confirmationString)) {
      _this.addTabToBundleSetup(tabs, true);
    }
  })
});

Bundle.method('addTabToBundleSetup', function(tabs, save) {
  var _this = this;
  this.addTabs(tabs, save);
  this.updateBundleLengthDisplayed();

  tabs = isArray(tabs)? tabs : [tabs];
  tabs.map(function(tab) {
    _this.$add_link_container.before(tab.makeTabHTML());
    tab.assignEvents();
  });

  if (this.isSynced() || this.isShared()) {
    this.updateLinks({
      "links" : tabs.map(function(tab) { return tab.url; }).join(","),
      "action" : 2
    });
  }
});

Bundle.method('makeDroppable', function() {
  var _this = this;
  this.$bundle.find('.bundle').droppable({
    scope: "bundle",
    hoverClass: "droppable-hover",
    drop: function(event, ui) {
      var bundleName = $(ui.draggable).attr('bundleName');
      $('.bundle[name="{0}"]'.format(bundleName)).attr('dropped', "true");
      var url = $(ui.draggable).attr('link');
      var title = $(ui.draggable).attr('title');
      var pinned = $(ui.draggable).attr('pinned') == '1';
      _this.addTabToBundleSetup(new Tab(title, url, _this, pinned), true);
      ui.draggable.remove();
    }
  });
});

Bundle.method('createFillCB', function() {
  var _this = this;
  return function(tab) {
    return Tab.apply(tab, _this);
  }
});

Bundle.method('dom', function() {
  return this.$bundle;
});

Bundle.method('assignEvents', function() {
  var _this = this;
  this.$bundle = $('#{0}'.format(this.id));
  this.$add_link_container = this.$bundle.find('.add_link_container');

  this.makeDroppable();

  this.$bundle.rightClick(function() {
    var options = {};
    if (_this.isSynced()) {
      options[ContextMenu.StopSyncing] = function() {
        _this.stopSyncing();
      }
    }
    var hiddenOption = _this.isHidden()? ContextMenu.UnHideBundle : ContextMenu.HideBundle;
    options[hiddenOption] = function() {
      _this.toggleHide();
    }
    if (Autosave.isTarget(_this.bundleName)) {
      options[ContextMenu.UnAutosyncBundle] = function() {
        Autosave.removeTarget(_this.bundleName);
      }
    } else {
      options[ContextMenu.AutosyncBundle] = function() {
        Autosave.addTarget(_this.bundleName);
      }
    }
    options[ContextMenu.OpenInIncognito] = function() {
      _this.loadBundle(true);
    }
    options[ContextMenu.OpenInSameWindow] = function() {
      _this.loadBundle(true, true);
    }
    options[ContextMenu.OpenInNewWindow] = function() {
      _this.loadBundle();
    }
    options[ContextMenu.CloseTabsFromBundle] = function() {
      var URLList = _this.tabs.map(function(tab) {
        return tab.url;
      });
      var toRemove = [];
      Browser.getCurrentTabList(function(tabList) {
        tabList.map(function(tab) {
          if (URLList.indexOf(tab.url) !== -1 && toRemove.indexOf(tab.id) === -1) {
            toRemove.push(tab.id)
          }
        });
        Browser.removeTabs(toRemove);
      });
    }
    ContextMenu.addMenuItems(options);
  });

  if (this.hotkeyId) {
    var hotkeys = this.hotkeyId.split('').map(function(hotkey) {
      return "alt+{0}".format(hotkey);
    }).join(" ");
    Mousetrap.bindGlobal([hotkeys], function() { _this.loadBundle() });
  }

  this.$bundle.find('.autosave').click(function() {
    if ($(this).hasClass('selected')) {
      Autosave.removeTarget(_this.bundleName);
    } else {
      Autosave.addTarget(_this.bundleName);
    }
    $(_this.$bundle.find('.autosave')).toggleClass("hidden");
  });

  this.$bundle.find('.remove').click(function() {
    if (!Options.isset(Options.AskForConfirmation) || checkMac()) {
      _this.remove();
    } else {
      if (_this.isSynced()) {
        confirm(Messages.DeleteConfirmationSynced)? _this.remove(): false;
      } else {
        confirm(Messages.DeleteConfirmation)? _this.remove(): false;
      }
    }
  });

  this.$bundle.children('.link_title').click(function() {
    var $title = $(this);
    $title.attr('editing', 'true');
    $title.removeAttr('readonly');

    $title.blur(function() {
      $title.attr('editing', 'false');
      $title.prop('readonly');
      var newTitle = $title.val();
      Accessor.replaceLinkTitleInBundle(bundleName, _this.url, _this.title, newTitle);
      bundle.updateLinks();
      _this.update(newTitle, _this.url);
    });

    onEnter($title, function(e) {
      $title.blur();
    });
  });

  this.$bundle.find('.bundle').hover(function() {
    if (_this.$bundle.attr('chosen') !== 'true') {
      $(this).addClass('highlighted');
      $(this).children('.show, .icons').removeClass('hidden');
    }
  }, function() {
    if(_this.$bundle.attr('chosen') !== 'true') {
      $(this).removeClass('highlighted');
      $(this).children('.show, .icons').addClass('hidden');
    }
  });

  this.$bundle.find('.hidden-icon-container div').hover(function() {
    $(this).find(".hidden-icon-label").show(500);
  }, function() {
    $(this).find(".hidden-icon-label").hide(500);
  });

  this.$bundle.find('.bundle').mousedown(function() {
    _this.$bundle.children('.link_container').removeClass('hidden');
    var $edit_highlight = _this.$bundle.find('.edit_highlight');
   
    if ($edit_highlight.attr('editing') == 'false') {
      _this.isShared()? false : _this.$bundle.find('.bundle_name_edit').toggle();
      var $show = _this.$bundle.find(".show");
      $show.removeClass("show");
      $show.addClass("is-shown");

      _this.$bundle.attr('chosen', 'true');
      $edit_highlight.attr('editing', 'true');
      $edit_highlight.removeClass('image');
      $edit_highlight.addClass('image_on_hover');
    } else {
      _this.isShared()? false : _this.$bundle.find('.bundle_name_edit').toggle();
      var $shown = _this.$bundle.find(".is-shown");
      $shown.removeClass("is-shown");
      $shown.addClass("show");

      _this.$bundle.attr('chosen', 'false');
      $edit_highlight.attr('editing', 'false');
      $edit_highlight.removeClass('image_on_hover');
      $edit_highlight.addClass('image');
      _this.$bundle.children('.link_container').addClass('hidden');
    }
  });  

  this.$bundle.find('.image').not('.link').hover(function() {
    if(!($(this).hasClass('edit_highlight') && $(this).attr('editing') == 'true')) {
      $(this).removeClass('image');
      $(this).addClass('image_on_hover');
    }
  }, function() {
    if(!($(this).hasClass('edit_highlight') && $(this).attr('editing') == 'true')) {
      $(this).removeClass('image_on_hover');
      $(this).addClass('image');
    }
  });

  this.$bundle.find('.bundle_icon').mousedown(function(event) {
    switch (event.which) {
      case 1:
        _this.loadBundle();
        break;
      case 2:
        _this.loadBundle(true);
        break;
      case 3:
        _this.loadBundle(false, true);
        break;
      default:
        Popup.show(Messages.GeneralErrorTitle, 'User action not supported.');
      }
  });

  this.$bundle.find('.bundle_icon').dblclick(function(event) {
    return false;
  });

  this.$bundle.find('.bundle').dblclick(function() {
    var $edit_highlight = _this.$bundle.find('.edit_highlight');

    if ($edit_highlight.attr('editing') == 'false') {
      _this.loadBundle();
    }
  });

  this.$bundle.find('.refresh').click(function() {
    (!Options.isset(Options.AskForConfirmation) || checkMac() || confirm(Messages.RefreshConfirmation))? $(document).trigger("tb-refresh", _this.bundleName) : false;
  });

  var clickCallbacks = {
    ".add_page" : function(e) {
      Browser.getCurrentTabList(function(tabs) {
        var url = tabs[0].url;
        var tab = new Tab(tabs[0].title? tabs[0].title : getHostname(url), url, _this, tabs[0].pinned);
        _this.addTabToBundleSetup(tab, true);
      }, {"active": true});
    },
    ".make-link" : function() {
      if (Account.loggedIn()) {
        if (_this.isSynced()) {
          $(document).trigger('share-bundle', _this.bundleName);
        } else {
          _this.updateLinks(function() {
              $(document).trigger('share-bundle', _this.bundleName);
          });
        }
      } else {
        $(document).trigger('sign-up-page-event');
        Popup.show(Messages.MustBeLoggedInInLoginPageTitle, Messages.MustBeLoggedInInLoginPage, 10000);
      }
    },
    ".export-csv" : function(e, $this) {
      downloadDataURI($, {filename: "{0}.csv".format(_this.bundleName), data:"data:application/csv;charset=utf-8,{0}".format(
                        encodeURIComponent(_this.tabs.map(function(tab) {
                          return "{0},{1}".format(tab.title, tab.url);
                        }).join("\n"))
      )});
    },
    ".bundle_name_input" : function(e, $this) {
      var $name = $this;
      $name.removeAttr('readonly');
      Mousetrap.pause();

      $name.blur(function() {
        $name.prop('readonly');
        _this.rename($name.val());
        Mousetrap.unpause();
      });

      $name.onEnter(function(e) {
        $name.blur();
      });
    },
    ".push" : function() {
      if (Account.loggedIn()) {
        _this.updateLinks();
      } else {
        $(document).trigger("sign-up-page-event");
        Popup.show(Messages.MustBeLoggedInInLoginPageTitle, Messages.MustBeLoggedInInLoginPage, 10000);
      }
    },
    ".toggle-hide" : function() {
      _this.toggleHide();
    },
    ".bundle_icon" : function() {}
  }

  Object.keys(clickCallbacks).map(function (cl) {
    _this.$bundle.find(cl).mousedown(function(e) {
      clickCallbacks[cl](e, $(this));
      return false;
    });
  });

  this.$bundle.find('.bundle_name_input').val(_this.bundleName);

  var $inputLink = this.$bundle.find('.input_link');
  $inputLink.setDefault();
  $inputLink.focus(function() {
    Mousetrap.pause();
  });
  $inputLink.blur(function() {
    Mousetrap.unpause();
  });
  $inputLink.onEnter(function(e) {
    _this.$add_link_container.find('.manual_add_page').trigger('click');
  });

  this.$add_link_container.find('.manual_add_page').click(function(event) {
    var $link_input = _this.$add_link_container.children('input');
    var url = $link_input.val();
    if (url.trim() == "" || url == $link_input.attr("default")) {
      $('#file-asset').change(function() {
        var file = $(this).val().split("\\");
        tab = new Tab(file, url, _this, false);
        _this.addTabToBundleSetup(tab, true);
      });

      $('#file-asset').trigger('click');
    } else if (url.toLowerCase().trim() == "all") {
      Browser.getCurrentTabList(function(tabs, windowId) {
        tabs.map(function(tab) {
          tab = new Tab(tab.title, url, _this, false);
          _this.addTabToBundleSetup(tab, true);
        });
      });
    } else {
      var commaDelimitedTabNumbers = url.replace(/,+/g, ",")
                                        .replace(/^,|,$| /g, "")
                                        .match(/^[0-9]+(,[0-9]+(-[0-9]+)?)*$/);

      if (url !== $link_input.attr("default")) {
        if(commaDelimitedTabNumbers) {
          _this.addTabNumbersFromCurrentWindow(commaDelimitedTabNumbers[0]);
        } else {
          url = /http/.test(url) === false? 'http://{0}'.format(url) : url;

          var tab = new Tab(getHostname(url), url, _this, false);
          _this.addTabToBundleSetup(tab, true);
        }
      }
    }
  });
 
  // assignEvents for all tabs in bundle.
  for (var i = 0; i < this.tabs.length; i++) {
    this.tabs[i].assignEvents()
  }
});
