/**
* Copyright 2014 Dossier Technologies Inc.
**/

var Popup = (function($parent, $close) {
  var LATEST_MESSAGE_COOKIE_NAME = 'latest-message';
  $parent.hide();

  return {
    firstMessage: function() {
      return DB.readLocalStorage(LATEST_MESSAGE_COOKIE_NAME) === "";
    },

    latestId: function(id) {
      return id !== undefined? DB.insertLocalStorage(LATEST_MESSAGE_COOKIE_NAME, id) : DB.readLocalStorage(LATEST_MESSAGE_COOKIE_NAME);
    },

    getInfo: function(successCB, errorCB) {
      var data = { "latestId" : DB.readLocalStorage(LATEST_MESSAGE_COOKIE_NAME) || 0 };

      HttpUtils.Post(Server.getPath('/popup'), data, function(response) {
        if (response.data.messages) {
          var message = JSON.parse(response.data.messages);
          successCB(message);
        } else {
          errorCB? errorCB(): false;
        }
      }, errorCB);
    },

    confirm: function(title, text, cb) {
      var _this = this;
      this.show(title,
        "{0} \
         -- -- \
        ".format(text));
      $('#message-container').append(" \
         <input class='popup-confirm' type='button' value='no'/> \
         <input class='popup-confirm' type='button' value='yes'/> \
        ");
      $('.popup-confirm').click(function(){
        _this.hide();
        cb($(this).val());
      });
    },

    show: function(title, text, timeout) {
      $('#title-container').text(title);
      var paragraphs = text.split("--");
      $('#message-container').html("");
      for (var index = 0; index < paragraphs.length; index++) {
        var messageHTML = "<div id='message-container-{0}'></div>";
        messageHTML = index !== 0 ? "<br/>{0}".format(messageHTML) : messageHTML;
        $('#message-container').append(messageHTML.format(index));
        $('#message-container-{0}'.format(index)).text(paragraphs[index].trim());
      }
      $parent.slideDown(500);
      timeout? setTimeout(this.hide, timeout) : false;
    },

    hide: function() {
      $parent.slideUp(500);
    },

    assignEvents: function() {
      var _this = this;

      $close.click(function() {
        _this.hide();
      });
    },

    start: function() {
      var _this = this;

      this.assignEvents();
      this.getInfo(function(data) {
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var legible = true;
            data[i].condition.trim() ? data[i].condition.split("|").map(function(condition) {
              legible = legible && !!Account[condition.trim()]();
            }) : false;
            if (Version.eval(data[i].operator, data[i].version) && legible) {
              _this.show(data[i].title, data[i].message, parseInt(data[i].duration));
              _this.latestId(data[i].id);
              return;
            }
          }
        }
      });
    }
  }
})($('#tb-popup'), $('#close-popup'))

Popup.assignEvents();