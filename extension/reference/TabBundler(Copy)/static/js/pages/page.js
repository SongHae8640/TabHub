/**
* Copyright 2014 Dossier Technologies Inc.
**/

function Page(currentPage, pageClass, mainPage, togglerClass, togglerEvent) {
	this._init(currentPage, pageClass, mainPage)
}

Page.method('_init', function(currentPage, pageClass, mainPage, togglerClass, togglerEvent, startOnFirstToggle) {
	var _this = this;
	this.currentPage = currentPage;
	this.pageClass = pageClass;
	this.mainPage = mainPage;
	this.startOnFirstToggle = startOnFirstToggle || false;

	togglerEvent? $(document).bind(togglerEvent, function(event, data) {
		_this.toggle(event, data);
	}) : false;
	togglerClass? $(togglerClass).bind("click", function() {
		_this.toggle();
	}) : false;
});

Page.method('start', function(event, data) {
	throw "Page must implement abstract method start.";
});

Page.method('toggle', function(event, data) {
	throw "Page must implement abstract method toggle.";
});

Page.method('_toggle', function(toggleOnCb, toggleOffCb) {
	if ($(this.currentPage).is(':visible')) {
		$(this.pageClass).hide();
		$(this.mainPage).show();
		toggleOffCb? toggleOffCb() : false;
	} else {
		$(this.pageClass).hide();
		$(this.currentPage).show();

		if (this.startOnFirstToggle) {
			this.start();
			this.startOnFirstToggle = false;
		}

		toggleOnCb? toggleOnCb() : false;
	}
});

Page.method('bind', function(event, cb) {
	$(document).bind(event, cb);
});

Page.method('trigger', function(event) {
	$(document).trigger(event);
});