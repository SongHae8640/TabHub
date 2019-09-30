/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SubscriptionInvite(subscription) {
    this.subscriptionHtml = "<div id={3} class='subscription-invite'> \
                      <div class='row bundle tb-text image' name='{0}'> \
                        <div class='bundle_icon is-synced image'> </div> \
                        <div class='bundle_name' value='{1}'> \
                          <span class='bundle_name_html'> \
                            <span class='bundle_name_display'>{1}</span> \
                            <span class='mini-text author'> (from {2}) </span> \
                          </span> \
                        </div> \
                      </div> \
                      <div class='response-container' hidden> \
                          <div class='decline tb-button left image icons' title='Decline invitiation to collaborate'> </div> \
                          <div class='accept tb-button right image icons' title='Accept invitation to collaborate'> </div> \
                      </div> \
                    </div>";
    this.subscription = subscription;
    this._init();
    this.$dom = undefined;
}

SubscriptionInvite.method('_init', function() {
    this.id = "subscription-{0}".format(this.subscription.id);
});

SubscriptionInvite.method('hasTabs', function() {
    return true;
});

SubscriptionInvite.method('getDom', function() {
    this.$dom = this.$dom || $('#{0}'.format(this.id));
    return this.$dom;
});

SubscriptionInvite.method('makeHtml', function(userId, key, bundleId, successCB, errorCB) {
    return this.subscriptionHtml.format(this.subscription.name, this.subscription.name.escapeHTML(), this.subscription.author, this.id);
});

SubscriptionInvite.method('assignEvents', function() {
    var $subscription = this.getDom();
    var _this = this;

    $subscription.find('.accept').click(function() {
        _this._accept();
    });  

    $subscription.find('.decline').click(function() {
        _this._decline();
    });

    $subscription.hover(function() {
        $subscription.find('.response-container').show();
    }, function() {
        $subscription.find('.response-container').hide();
    });
});

SubscriptionInvite.method('_accept', function() {
    var _this = this;
    SubscriptionHandler.accept(Account.id(), Account.key(), this.subscription, function(response, subscription) {
        var bundle = new Bundle(subscription.name);
        bundle.fill();

        _this.getDom().parent().append(bundle.makeHtml());
        _this.getDom().remove();
        
        bundle.assignEvents();
    }, function(message) {
        Popup.show(Messages.GeneralErrorTitle, message);
    });
});

SubscriptionInvite.method('_decline', function() {
    var _this = this;
    SubscriptionHandler.remove(Account.id(), Account.key(), this.subscription.id, function() {
        _this.getDom().remove();
    }, function(message) {
        Popup.show(Messages.GeneralErrorTitle, message);
    });
});
