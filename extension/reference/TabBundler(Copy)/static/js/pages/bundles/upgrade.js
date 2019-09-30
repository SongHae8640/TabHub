/**
* Copyright 2014 Dossier Technologies Inc.
**/

function UpgradePage(toggleClass, togglerEvent) {
    this._init('#upgrade-container', '.tb-page', '#tab-bundler-container', toggleClass, togglerEvent, true);
    this._paypalFormHtml = '<form class="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"> \
            <input type="hidden" name="cmd" value="_s-xclick"> \
            <input type="hidden" name="hosted_button_id" value="{0}"> \
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> \
            {1} \
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> \
        </form>';
    this._twitterHtml = '<iframe allowtransparency="true" frameborder="0" scrolling="no" \
                src="https://platform.twitter.com/widgets/follow_button.html?screen_name=tabbundler&show_screen_name=false&show_count=false" \
                style="height:20px; float: left; width: 57px; margin-right: 5px;"></iframe> \
        <iframe allowtransparency="true" frameborder="0" scrolling="no" \
              src="https://platform.twitter.com/widgets/tweet_button.html?url=http://www.tabbundler.com&show_count=false&text=@tabbundler organizes all your research simply, safely and collaboratively!" \
              style="width:85px; height:20px; float: left;"></iframe>';
    this._payTiers = {
    	"ten" : {
            "link" : "2Z28N35PUKQKJ",
            "price" : "11.99",
            "message" : "$1.20 ea",
            "description" : "Have the freedom to share more bundles for less than the price of a movie ticket."
        },
    	"unlimited" : {
            "link" : "PN63EZGBPANDE",
            "price" : "24.99",
            "message" : "BEST VALUE",
            "description" : "Get unlimited bundles for a <span class='highlight'>one-time</span> cost of a dinner out!"
        }
    }
    this.wheel = new Wheel("#upgrade-wheel");
}

UpgradePage.inherits(Page);

UpgradePage.method('toggle', function() {
	this.uber('_toggle', function() {
		if (!Account.loggedIn()) {
          Popup.show(Messages.AccountRequiredToUpgradeTitle, Messages.AccountRequiredToUpgrade, 15000);
		}
	}, function() {});	
});

UpgradePage.method('start', function() {
	var _this = this;

	$('#twitter-container').html(this._twitterHtml);
    this._userIdHtml = Account.loggedIn()? "<input type='hidden' name='custom' value='{0}'>".format(JSON.stringify([{"userId" : parseInt(Account.id())}])) : "";
    
    HttpUtils.Get("{0}/{1}/{2}".format(Server.getHost(), "pricing", "prices"), {}, function(data) {
        data = JSON.parse(data.data.prices);
        data.map(function(priceTier) {
           if (priceTier.bundleCount == "10") {
               _this._payTiers["ten"] = priceTier;
           } else if (priceTier.bundleCount == "10000") {
               _this._payTiers["unlimited"] = priceTier;
           }
        })
    }, function() {}, function() {
        Object.keys(_this._payTiers).map(function(key) {
            $('#pay-pitch-{0}'.format(key)).append(_this._paypalFormHtml.format(_this._payTiers[key]["link"], _this._userIdHtml));
            $('#{0}-price'.format(key)).html(_this._payTiers[key]["price"]);
            $('#{0}-description'.format(key)).append(_this._payTiers[key]["description"]);
            $('#{0}-message'.format(key)).append(_this._payTiers[key]["message"]);
        });
    });


    $('.paypal-form').click(function() {
        var n = $(document).height();
        $('html, body').animate({ "scrollTop": n }, 1000);
        _this.wheel.start();
    });
});

var upgradePage = new UpgradePage('.upgrade-page-toggler', 'upgraded');