/**
* Copyright 2014 Dossier Technologies Inc.
**/

var TBPopup = (function() {
  var _this = this;
  this.errorPromptCookie = "errorprompt";

  $('input').focus(function() {
    Mousetrap.pause();
  });

  $('input').blur(function() {
    Mousetrap.unpause();
  });

  Version.onNewInstall(function(current_version) {
    Popup.latestId(-1);
    Version.update();
    var browser = isOpera()? "Opera" : "Chrome";
    Analytics.send(Analytics.Install, "Tab Bundler Installed - {0}".format(browser), current_version);
    $('.new-install-only').toggle();
    $(document).trigger('sign-up-page-event');
  }, function() {
    if (!Options.isset(Options.HideMessages)) {
      if (Popup.latestId() == -1) {
        Popup.latestId(0);
      } else {
        Popup.start();
      }
    }
  });

  Autosave.assignEvents();

  if (Account.loggedIn()) {
    Account.info(Account.id(), Account.key(), function(response) {
      Account.bundleLimit(response.syncedLimit);
      var bundleLimit = Account.bundleLimit();
      if (bundleLimit > 10000) {
        $('#upgrade').hide();
      }
    });
  }

  window.onerror = function(message, filename, linenumber) {
    if (!DB.readCookie(_this.errorPromptCookie)) {
      Popup.confirm(Messages.ErrorDetectedTitle, Messages.ErrorDetected, function(decision) {
        var meta = decision  === "yes"? Accessor.getBundleJSONString() : "null";
        Analytics.send(Analytics.JavascriptError, "{0} - {1} - {2}".format(message, filename, linenumber), meta);
      });
      DB.createCookie(_this.errorPromptCookie, "1", 5);
    }
  };

  Mousetrap.bindGlobal(["! a e"], function() {
    DB.eraseCookie(_this.errorPromptCookie);
  });

  Mousetrap.bindGlobal(["! u"], function() {
    Browser.getCurrentWindow(function(window) {
      var bundleName = Autosave.getBundleName(window.id);
      if (bundleName) {
        var URLList = Accessor.getLinkList(bundleName).map(function(tab) {
          return tab.l;
        });

        Browser.create(URLList, false, [], function(newWindow) {
          Autosave.addBundle(newWindow.id, bundleName);
          Browser.closeWindow(window.id);
          Badge.setWindowBadge(newWindow.id);
        }, {});
      }
    });
  });

  setTimeout(function() {
    Options.attachCallback(Options.HideTooltips, function() {
      if (Tooltip.running) {
        Tooltip.toggle();
      } else {
        Tooltip.start();
      }
    });

    if (!Options.isset(Options.HideTooltips) && Popup.latestId() !== "") {
      Tooltip.start();
    }
  }, 500);
  var $body = $("body");
  $body.find('.image').changeClassOnHover("image", "image_on_hover", "prevent_change");
})();

Bundles.fillBundles();
Bundles.pull();