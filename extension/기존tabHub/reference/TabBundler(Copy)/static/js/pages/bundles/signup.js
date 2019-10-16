/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SignUpPage(toggleClass, togglerEvent) {
	this._init('#sign-up-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);
	this.$name = $('#sign-up-name');
	this.$email = $('#sign-up-email');
	this.$password = $('#sign-up-password');
	this.$referralCode = $('#referral-code');
	this.$canContact = $('#can-contact');
	this.$signUp = $('#sign-up');
    this.wheel = new Wheel("#sign-up-wheel");
}

SignUpPage.inherits(Page);

SignUpPage.method('toggle', function(event, data) {
	this.uber('_toggle', function() {
		Mousetrap.pause();
	}, function() {
		Mousetrap.unpause();
	});	
});

SignUpPage.method('start', function() {
  	var _this = this;
    var inputList = [_this.$name, _this.$email, _this.$password, _this.$referralCode];

    for (var i = 0; i < inputList.length; i++) {
    	var $element = inputList[i];
    	if (!i == inputList.length - 1) {
	      	$element.onEnter(function() {
	      		inputList[i + 1].focus();
	      	});
	    } else {
	      	$element.onEnter(function() {
	        	_this.$signUp.click();
	      	});
	    }
    }
  
    _this.$signUp.click(function() {
        var name = _this.$name.val();
        var email = _this.$email.val();
        var password = _this.$password.val();
        var referralCode = _this.$referralCode.val();
        var canContact = _this.$canContact.prop('checked')? 1 : 0;

        if (_this.wheel.showing) {
        	return;
        }
    	_this.wheel.start();

        Account.signUp(name, email, password, canContact, referralCode, Version.isNewInstall, function() {
	    	_this.wheel.stop();
            Popup.show(Messages.SignUpSuccessTitle.format(name[0].toUpperCase() + name.slice(1)), Messages.SignUpSuccess, 5000);
            $(document).trigger("login-page-event");
        }, function(data) {
	    	_this.wheel.stop();
            $('#tb-sign-up-error').text(data.message);
        });
    });
});

var signUpPage = new SignUpPage('.sign-up-page-toggler', 'sign-up-page-event');