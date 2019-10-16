/**
* Copyright 2014 Dossier Technologies Inc.
**/

function TooltipHandler(path) {
    this.tooltipContainerHTML = '<div id="tooltips" class="tb-text left"> \
                                    <b>DID YOU KNOW?</b> \
                                    <br/> \
                                    <br/> \
                                    <span id="tooltip-container"> </span>  \
                                    <br/> \
                                    <br/> \
                                    <span id="tooltip-next" class="left pointer">next</span> \
                                    <span id="tooltip-hide" class="right pointer">hide</span> \
                                    <br/> \
                                </div>';
    this.tooltipHTML = '{0}';
    this.tooltips = [
        "You can select bundles to automatically save. Simply click on the edit button of the bundle, and click on the icon that looks like an 'A'. The bundle will begin to autosave when it is opened or if it has just been opened.",
        "You can rename links that you share in your account page so people can easily remember what you share!",
        "Bundles with shared links can be updated - the shared link will also be updated.",
        "You can right click on the folder icon to open the bundle in the same window.",
        "You can drag and drop bundles to alter their orders. You can also drag and drop tabs to move them from one bundle to another!",
        "There is an option to close your window when a new bundle is opened.",
        "We're on Twitter and Facebook. Like us and Tweet to us at <a class=tooltip-link href=http://www.tabbundler.com/#contact>http://www.tabbundler.com/#contact</a>!",
        "You can sync your bundles across multiple machines. Sign up at <a class=tooltip-link href=http://www.tabbundler.com/#contact>http://www.tabbundler.com/#contact</a>!",
        "We want to know how you think of Tab Bundler! Give us a review at the Chrome webstore or email us at project.go@outlook.com!",
        "We use hotkeys! To search your bundles, hit SHIFT+F. You can also move between your archived bundles, and your regular bundles with SHIFT+A and SHIFT+B respectively. Hit ALT and the letter corresponding to a bundle to open it!",
        "We have a website where you can access your bundles. Go to: <a class=tooltip-link href=http://www.tabbundler.com/bundles>http://www.tabbundler.com/bundles</a>!",
        "Refer us to your friends at and get FREE SYNCED BUNDLES! Find out more by clicking on the gear icon at the top right corner of Tab Bundler.",
    ];

    this.seenTooltips = [];
    this.interval = undefined;
    this.running = false;
}

TooltipHandler.method("toggle", function() {
    $('#tooltups').toggle();
});

TooltipHandler.method("start", function() {
    this.running = true;
    this.show();
    this._setInterval();
});

TooltipHandler.method("show", function() { 
    var _this = this;
    var $tooltips = $('#tooltips');
    if ($tooltips.length) {
        $tooltips.show(); 
    } else {
        $('#tab-bundler-container').append(this.tooltipContainerHTML);
        $('#tooltip-hide').click(function() {
            Options.toggleOption(Options.HideTooltips);
            _this.hide();
        });

        $('#tooltip-next').click(function() {
            clearInterval(_this.interval);
            _this.next();
            _this._setInterval();
        });
        this.next();
    }
});

TooltipHandler.method("next", function() {
    if (this.tooltips.length === 0) {
       this.tooltips = this.seenTooltips;
       this.seenTooltips = [];
    }
    var tooltip = this.tooltips.splice(Math.floor(Math.random() * this.tooltips.length), 1);
    this.seenTooltips.push(tooltip)
    $('#tooltip-container').html(this.tooltipHTML.format(tooltip));
    $('.tooltip-link').click(function() {
        Browser.open($(this).attr('href'));
    });
});

TooltipHandler.method("hide", function() {
    $('#tooltips').hide();
});

TooltipHandler.method("_setInterval", function() {
    var _this = this;
    this.interval = setInterval(function() {
      _this.next();
    }, 6000);
});

var Tooltip = new TooltipHandler("admin");