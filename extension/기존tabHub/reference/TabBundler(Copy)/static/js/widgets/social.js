/**
* Copyright 2014 Dossier Technologies Inc.
* This file produces all the tabs
**/

var Social = function(url, $container, id) {
    id = id || "social-buttons"
    var socialHTML = ' \
    <div id="{0}"> \
      <iframe allowtransparency="true" frameborder="0" scrolling="no" \
            src="https://platform.twitter.com/widgets/tweet_button.html?url={1}" \
            style="width:100px; height:20px; float: left;"></iframe> \
      <iframe src="https://www.facebook.com/plugins/like.php?href={1}&amp;width=256px&amp;float=left&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=35&amp;appId=223975174437995" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:25px; width:265px;" allowTransparency="true"></iframe> \
    </div>'.format(id, encodeURIComponent(url));

    return {
        show: function() { 
            var $social_buttons = $('#{0}'.format(id));
            if ($social_buttons.length) {
                $social_buttons.show(); 
            } else {
                $container.append(socialHTML);
            }
        },

        hide: function() {
            $('#{0}'.format(id)).hide();
        }
    }
}
