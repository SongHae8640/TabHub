var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30165654-1']);
_gaq.push(['_trackPageview']);

function trackButton(button_id) {
_gaq.push(['_trackEvent', 'button' + button_id, 'clicked']);
};