/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SharedBundleDivider(path) {
    this.dom = $('.shared-bundles-divider');
    this.start();
}

SharedBundleDivider.method("hide", function() {
    this.dom.changeClass('shared-bundles-divider-notification', 'shared-bundles-divider');
    $('#collaboration-notifications').hide();
});

SharedBundleDivider.method("start", function() {
    var _this = this;
    if (Account.loggedIn()) {
        SubscriptionHandler.pull(Account.id(), Account.key(), function() {
            var length = SubscriptionHandler.getInvites().length + Object.keys(SubscriptionHandler.updatedBundles).length;

            if (length > 0) {
                _this.dom.changeClass('shared-bundles-divider', 'shared-bundles-divider-notification');
                $('#collaboration-notifications').addClass('notification-{0}'.format(length > 5? '5p' : length));
            }
        });
    }

    this.dom.click(function() {
        _this.hide();
    });
});

var sharedBundleDivider = new SharedBundleDivider();