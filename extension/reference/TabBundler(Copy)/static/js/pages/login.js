/**
* Copyright 2014 Dossier Technologies Inc.
**/

function LoginPage(toggleClass, togglerEvent) {
	this._init('#sign-in-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, false);
	this.$email = $('#email');
	this.$password = $('#password');
	this.$login = $('#login');
	this.$signOut = $('#sign-out');
}

LoginPage.inherits(Page);

LoginPage.method('toggle', function(event, data) {
	this.uber('_toggle', function() {
		Mousetrap.pause();
	}, function() {
		Mousetrap.unpause();
	});	
});

LoginPage.method('toggleButton', function() {
	$(".sign-in-button").toggle();
});

LoginPage.method('showSignIn', function() {
    !$("#sign-in").is(':visible')? this.toggleButton() : false;
});

LoginPage.method('signOut', function() {
    Account.logout();
    this.showSignIn();
    this.trigger('logout');
});

LoginPage.method('start', function() {
  	var _this = this;

    if(Account.loggedIn()) {
        _this.toggleButton();
    } else {
        Account.logout();
    }

    this.bind("startLogout", function() {
        _this.signOut();
    });

    [_this.$email, _this.$password].map(function($element) {
      	$element.setDefault();
      	$element.onEnter(function() {
        	_this.$login.click();
      	});
    });
  
    _this.$login.click(function() {
        var email = _this.$email.val();
        var password = _this.$password.val();
        Account.login(email, password, function() {
            _this.toggleButton();
            _this.trigger("login");
            _this.trigger("login-page-event");
        }, function(data) {
            $('#tb-sign-in-error').text(data.message);
        });
    });
  
    _this.$signOut.click(function() {
        _this.signOut();
    });

    $('#tb-forgot-password').click(function() {
        chrome.windows.create({url : $('#tb-forgot-password a').attr("href")}, function () {});
    });
});

var loginPage = new LoginPage('.login-page-toggler', 'login-page-event');
loginPage.start();