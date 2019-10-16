/**
* Copyright 2014 Dossier Technologies Inc.
**/

function EmailPage(toggleClass, togglerEvent) {
	this._init('#email-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent);

	this.$emailContainer = $('#email-list-container');
	this.sortingHtmlTemplate = "<span class='left pointer sorting-letter' letter='{0}'>{0}</span>";

	this.renderEmailWithName = "{0} &lt{1}&gt";
	this.emailHtml = [
		"<div class='contacts-email left' email='{2}' letter='{1}'>",
			"<div class='left identity' title='{2}'>{0}</div>",
			"<div class='left action-container' hidden>",
				"<div class='pointer remove_link right image' title='{0}' email='{2}'> </div>",
			"</div>",
		"</div>"
	].join("\n");

    this.addEmailList = ListJS($('#add-email'), $('#add-email-button'), $('#add-email-container'), {
        maximum: 10,
        starting_count: 1,
        prevent_auto_add: ['confirm-email', 'cancel-email', 'add-email-button']
    });

    this.started = false;
}

EmailPage.inherits(Page);

EmailPage.method('toggle', function(event, data) {
	var _this = this;
	this.uber('_toggle', function() {
		Mousetrap.pause();
		if (!_this.started) {
			EmailListHandler.pull(function() {}, function(error) {
				if (Failure.ContactsNotFound.equals(error)) {
					EmailListHandler.push();
				}
			}, function() {
				_this.start();
				_this.started = true;
			});
		}
		_this.highlightEven();
	}, function() {
		Mousetrap.unpause();
	});
});

EmailPage.method('addEmail', function(email, name) {
	EmailListHandler.addEmail(email, name);
	sharePage.addToAutocomplete(new Email(email, name));
	this.displayEmail(email, name);
});

EmailPage.method('displayEmail', function(email, name) {
	var displayName = name? this.renderEmailWithName.format(name, email) : email;
	this.$emailContainer.append(this.emailHtml.format(displayName, displayName[0].toLowerCase(), email));
});

EmailPage.method('deleteEmail', function($email) {
	$email.remove();
	EmailListHandler.removeEmail($email.attr('email'));
});

EmailPage.method('highlightEven', function() {
	$('.contacts-email').removeClass('even-contacts-email');
	$('.contacts-email:visible:even').addClass('even-contacts-email');
});

EmailPage.method('setup', function() {
	if (!Account.loggedIn()) {
		$('.email-page-toggler').hide();
	}

	this.bind("logout", function() {
		EmailListHandler.deleteAll();
		$('.email-page-toggler').hide();
	});

	this.bind("login", function() {
		$('.email-page-toggler').show();
	});
});

EmailPage.method('start', function() {
	var _this = this;
    this.addEmailList.start();
    this.emailList = EmailListHandler.getAll();
    this.sortingHtml = [];

	for (var i = 97; i <= 122; i++) {
		this.sortingHtml.push(this.sortingHtmlTemplate.format(String.fromCharCode(i)));
	}

	$('#sorting-container').append(this.sortingHtml.join("<span class='middot left'>&middot</span>"));

	$('.sorting-letter').click(function() {
		$('.contacts-email').hide();
		$('.contacts-email[letter="{0}"]'.format($(this).attr('letter'))).fadeIn(300, function() {
			_this.highlightEven();
		});
	});

	$('.sorting-letter').click(function() {
		$('.contacts-email').hide();
		$('.contacts-email[letter="{0}"]'.format($(this).attr('letter'))).fadeIn(300, function() {
			_this.highlightEven();
		});
	});

	$('#add-contact').click(function() {
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});

	$('#show-all-contacts').click(function() {
		$('.contacts-email').show();
		_this.highlightEven();
	});

	$('.sorting-letter,#show-all-contacts,#add-contact').hover(function() {
		$(this).addClass('highlight');
	}, function() {
		$(this).removeClass('highlight');
	});

	for (var i = 0; i < this.emailList.length; i++) {
		var email = this.emailList[i];
		this.displayEmail(email.email, email.name);
	}
	_this.highlightEven();
	$('.email').find('.remove_link').click(function() {
		_this.deleteEmail($(".contacts-email[email='{0}']".format($(this).attr('email'))));
	});

	$('#confirm-email').click(function() {
		var name = $('#email-list-name').val();
		var emailList = _this.addEmailList.getResults().join();
		_this.addEmailList.reset();
		_this.addEmail(emailList, name);
		$('#email-list-name').val("");
		_this.highlightEven();
	});

	$('#cancel-email').click(function() {
		var name = $('#email-list-name').val("");
		_this.addEmailList.reset();
	});

	$('.contacts-email').find('.remove_link').click(function() {
		_this.deleteEmail($(this).parents(".contacts-email"));
		_this.highlightEven();
	});

	$('.contacts-email').hover(function() {
		$(this).find('.action-container').show();
	}, function() {
		$(this).find('.action-container').hide();
	});
});

var emailPage = new EmailPage('.email-page-toggler', 'email-page-event');
emailPage.setup();