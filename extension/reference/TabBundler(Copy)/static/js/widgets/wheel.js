/**
* Copyright 2014 Dossier Technologies Inc.
**/

function Wheel(identification) {
    this.$element = $(identification);
    this.$element.addClass('fa-spinner').addClass('fa-spin').addClass('fa').addClass('fa-2x').hide();
    this.showing = false;
}

Wheel.method('start', function() {
    this.$element.fadeIn(600);
    this.showing = true;
});

Wheel.method('stop', function() {
    this.$element.fadeOut(600);
    this.showing = false;
});