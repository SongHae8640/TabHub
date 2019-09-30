/**
* Copyright 2014 Dossier Technologies Inc.
**/

function Tab(title, url, bundle, isPinned) {
  this._init(title, url, bundle, isPinned);
}

Tab.inherits(TabBase);

Tab.apply = function(tab, bundle) {
    return isObject(tab)? new Tab(tab['t'], tab['l'], bundle, tab['p']) : new Tab(getHostname(tab), tab, bundle);
};

Tab.method("_init", function(title, url, bundle, isPinned) {
  this.uber("_init", title, url, isPinned, "tb-{0}".format(guid()));
  this.linkHtml = "<div class='link' id='{2}' link='{1}' title='{0}' bundleName='{3}', pinned='{4}'> \
                    <i class='drag-icon pointer fa fa-arrows left fa-1x'> </i> \
                    <input class='tb-text link_title' value='{0}' readonly/> \
                    <div class='remove_link image' link='{1}' title='{0}'> </div> \
                  </div>";
  this.bundle = bundle;
});

Tab.method("makeTabHTML", function() {
  return this.linkHtml.format(this.title, this.url, this.id, this.bundle.bundleName, this.isPinned);
});

Tab.method("makeDraggable", function() {
  var _this = this;
  var $link = $('#{0}'.format(this.id));
  $link.draggable({
    revertDuration: 200,
    revert: "invalid",
    scope: "bundle",
    snap: true,
    stop: function() {
      var $parent = _this.bundle.dom().find('.bundle');
      if ($parent.attr('dropped') == 'true') {
        _this.bundle.removeTab(_this.id);
        $parent.removeAttr('dropped');
      }
    }
  });
});

Tab.method("assignEvents", function() {
  var $link = $('#{0}'.format(this.id));
  var _this = this;

  this.makeDraggable();

  $link.dblclick(function() {
    chrome.tabs.create({'url': _this.url}, function() {});
  });

  $link.children('.remove_link').click(function() {
    $link.remove();

    _this.bundle.removeTab(_this.id);
    if (_this.bundle.length() === 0) {
      _this.bundle.remove();
    }
  });

  $link.find('.image').changeClassOnHover("image", "image_on_hover");

  $link.children('.link_title').click(function() {
    var $title = $(this);
    $title.attr('editing', 'true');
    $title.removeAttr('readonly');
    Mousetrap.pause();

    $title.blur(function() {
      $title.attr('editing', 'false');
      $title.prop('readonly');
      var newTitle = $title.val();
      Accessor.replaceLinkTitleInBundle(_this.bundle.bundleName, _this.url, _this.title, newTitle);
      _this.update(newTitle, _this.url);
      _this.bundle.updateLinks();
      Mousetrap.unpause();
    });

    $title.onEnter(function(e) {
      $title.blur();
    });
  });
});