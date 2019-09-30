/**
* Copyright 2014 Dossier Technologies Inc.
* This file produces all the bundle 
**/

var ContextMenu = (function() {
  var menu = [
    { 
      "title": "Add Tab",
      "id": "tb-1"
    },
    {
      "title": "Make Empty Bundle",
      "id": "tb-2"
    },
    {
      "title": "Open in Incognito",
      "id": "tb-3"
    },
    {
      "title": "Set As Editing Tab",
      "id": "tb-4"
    },
    {
      "title": "Close Tabs From Bundle",
      "id": "tb-5"
    }, 
    {
      "title": "Open Bundle in Same Window",
      "id": "tb-6"
    },
    {
      "title": "Open Bundle in New Window",
      "id": "tb-7"
    }, 
    {
      "title": "Stop Syncing",
      "id": "tb-8"
    },
    { 
      "title": "Delete But Keep Syncing",
      "id": "tb-9"
    },
    { 
      "title": "Hide Bundle",
      "id": "tb-10"
    },
    { 
      "title": "Un-hide Bundle",
      "id": "tb-11"
    },
    {
      "title": "Autosync Bundle",
      "id": "tb-12"
    },
    {
      "title": "Un-Autosync Bundle",
      "id": "tb-13"
    }
  ]

  function createContextMenuItem(title, id, cb) {
    var options = {
      type: "normal",
      title: title,
      id: id,
      enabled: true
    }

    if (cb) {
      options["onclick"] = cb;
    }

    return chrome.contextMenus.create(options);
  }

  return {
    AddTab: 0,
    MakeEmptyBundle: 1,
    OpenInIncognito: 2,
    SetEditingTab: 3,
    CloseTabsFromBundle: 4,
    OpenInSameWindow: 5,
    OpenInNewWindow: 6,
    StopSyncing: 7,
    DeleteButKeepSyncing: 8,
    HideBundle: 9,
    UnHideBundle: 10,
    AutosyncBundle: 11,
    UnAutosyncBundle: 12,

    enableMenuItem: function(itemKey) {
      this.updateMenuItem(itemKey, {"enabled": true});
    },

    disableMenuItem: function(itemKey) {
      this.updateMenuItem(itemKey, {"enabled": false});
    },

    updateMenuItem: function(itemKey, options) {
      var id = menu[itemKey]["id"];
      chrome.contextMenus.update(id, options);
    },

    removeMenuItem: function(itemKey) {
      var id = menu[itemKey]["id"];
      chrome.contextMenus.remove(id);
    },    

    addMenuItems: function(itemMethodMap) {
      var keys = Object.keys(itemMethodMap);

      chrome.contextMenus.removeAll();
      for (var i = 0; i < menu.length; i++) {
        var item = menu[i];
        if (keys.indexOf(i.toString()) !== -1) {
          createContextMenuItem(item.title, item.id, itemMethodMap[i]);
        }
      }
    }
  }
})();

