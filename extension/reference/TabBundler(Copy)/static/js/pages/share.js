/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SharePage(toggleClass, togglerEvent) {
    var _this = this;
    this._init('#share-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);

    var emails = EmailListHandler.getAll();

    this.collaborateEmailList = ListJS($('#collaborate-email'), $('#add-collaborate-email'), $('#collaborate-email-container'), { 
        maximum: 10,
        typeahead: {
            suggestions: emails,
            suggestion: function(email) {
                if (email.name) {
                    return [
                        '<div class="search-result pointer">',
                            '<div class="tb-text">{0}</div>',
                            '<div class="mini-text">{1}</div>',
                        '</div>'
                    ].join('\n').format(email['name'], email['email']);
                } else {
                    return [
                        '<div class="search-result pointer">',
                            '<div class="tb-text">{0}</div>',
                        '</div>'
                    ].join('\n').format(email['email']);
                }
            },
            keys: ['email', 'name'],
            displayKey: 'email',
            name: 'email'
        }
    }); 
    this.collaborateEmailList.start();
    this.link = "";
    this.description = "";
    this.bundle = "";
    this.wheel = new Wheel("#share-wheel");
    this.shareFunctions = {
        "view-only": function(id, key, link, emails, success, failure) {
            Share.shareLink(id, key, link, emails, success, failure);
        },
        "edit": function(id, key, link, emails, success, failure) {
            SubscriptionHandler.collaborate(id, key, link, emails, success, failure);
        }
    }
    this.shareMessages = {
        "view-only": {
            "error": Messages.ShareError,
            "success": Messages.ShareSuccess
        },
        "edit": {
            "error": Messages.CollaborationError,
            "success": Messages.CollaborationSuccess
        },
    }
    this.mode = "view-only";
}

SharePage.inherits(Page);

SharePage.method('addEmails', function() {
    var _this = this;
    var emails = this.collaborateEmailList.getResults();
    EmailListHandler.addEmails(emails);
    emails.map(function(index, email) {
        _this.addToAutocomplete(email);
    });
});

SharePage.method('toggle', function(event, data) {
    var _this = this;

    this.uber('_toggle', function() {
        _this.share(data);
        Mousetrap.pause();
    }, function() {
        Mousetrap.unpause();
    });
});

SharePage.method('fillData', function(data) {
    var link = data.link;
    if (link !== undefined) {
        this.link = link;
        var fullLink = this._makeFullLink(link);
        $('#full-link').attr('href', fullLink).text(fullLink);
        $('#path-container').val(link);
        $('#username-container').text(Account.username());
    }

    var description = data.description;
    if (description !== undefined) {
        if (description) {
            $('#description').text(description)
            $('#description-input').val(description)
        } else {
            $('.description-container').toggle();
            $('#description-input').val("")
        }
    }
});

SharePage.method('updateLink', function(newLink) {
    var _this = this;
    
    if (newLink !== _this.link) {
        Share.editLink(Account.id(), Account.key(), _this.bundle, newLink, function(data) {
            _this.fillData(data);
        }, function(errorMessage) {
            Popup.show(Messages.GeneralErrorTitle, Messages.CouldNotUpdateLink)
        });
    }
});

SharePage.method('addToAutocomplete', function(addition) {
    this.collaborateEmailList.addSuggestions(addition);
});

SharePage.method('updateDescription', function(newDescription) {
    var _this = this;
    if (newDescription !== _this.description) {
        Share.editDescription(Account.id(), Account.key(), _this.bundle, newDescription, function(data) {
            _this.fillData(data);
        }, function(errorMessage) {
            Popup.show(Messages.GeneralErrorTitle, Messages.CouldNotUpdateLink)
        });
    }
});

SharePage.method('share', function(bundle) {
    var _this = this;
    this.bundle = bundle;

    Share.getBundleData(Account.id(), Account.key(), bundle, function(data) {
        _this.fillData(data);
    }, function(errorMessage) {
        Popup.show(Messages.GeneralErrorTitle, Messages.CouldNotGetBundleData)
    });
});

SharePage.method('start', function() {
    var _this = this;

    $('.data-toggler').click(function() {
        $(".{0}".format($(this).attr('toggle'))).toggle();
        $("#{0}".format($(this).attr('focus'))).focus();
    });

    $('#path-container').onEnter(function() {
        $('#path-container').trigger("blur");
    });

    $('#path-container').blur(function(event, param) {
        _this.updateLink($(this).val());
        $('#path-container:visible').length? $('.link-container').toggle() : false;
    });

    $('#description-input').blur(function(event, param) {
        _this.updateDescription($(this).val());
        $('#description-input:visible').length? $('.description-container').toggle() : false;
    });

    $('#full-link').click(function() {
        Browser.open($(this).attr('href'));
    });

    $('#submit-share').click(function() {
        _this.wheel.start();
        _this.addEmails();
        var messages = _this.shareMessages[_this.mode];
        _this.shareFunctions[_this.mode](Account.id(), Account.key(), _this.link, _this.collaborateEmailList.getResults(), function() {
            _this.wheel.stop();
            Popup.show("Success", messages.success, 6000);
            _this.toggle();
        }, function(message) {
            _this.wheel.stop();
            Popup.show("Error", messages.error, 6000);
            _this.toggle();
        });
    });

    $('#collaborate-type').change(function() {
        _this.mode = $(this).val()
        $('.collaborate-type-text').hide(); 
        $('.{0}-text'.format(_this.mode)).show(); 
    });

    $('#description-input').setDefault();

    $('#cancel-share').click(function() {
        _this.collaborateEmailList.reset();
    });
});

SharePage.method('_makeFullLink', function(link) {
    return Server.getPath('/{0}/{1}'.format(Account.username(), link));
});

var sharePage = new SharePage('.share-page-toggler', 'share-bundle');