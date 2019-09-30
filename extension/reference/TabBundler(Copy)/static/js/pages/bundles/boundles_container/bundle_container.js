/**
* Copyright 2014 Dossier Technologies Inc.
**/

function BundleContainer(bundle_container, divider, defaultOn, keyBinding) {
  this._init(bundle_container, divider, defaultOn, keyBinding)
}

BundleContainer.method('_init', function(bundle_container, divider, defaultOn, keyBinding) {
  var containers = '.bundle-container';
  var dividers = '.page-divider'

  this.id = bundle_container;

  this.$bundle_container = $(bundle_container);
  this.$containers = $(containers);
  this.$divider = $(divider);
  this.$dividers = $(dividers);
  this.localEmpty = true;
  this.syncedEmpty = true;

  this.keyBinding = keyBinding;

  this.sectionHtml = "<ul class='synced-bundle-container sortable-bundle-container'></ul> \
                      <div class='spacer' hidden></div> \
                      <ul class='local-bundle-container sortable-bundle-container'></ul>";

  defaultOn? this.$divider.changeClass("image", "image_on_hover").addClass("prevent_change") : false;

  this.bundles = [];
});

BundleContainer.method('highlightHotkeys', function() {
  this.bundles.map(function(bundle) {
    bundle.highlightHotkey();
  });
});

BundleContainer.method('show', function() {
  this.$dividers.changeClass("image_on_hover", "image").removeClass("prevent_change");
  this.$divider.changeClass("image", "image_on_hover").addClass("prevent_change");

  this.$containers.hide();
  this.$bundle_container.show(); 
});

BundleContainer.method('clear', function(bundles) {
  this.bundles = [];
  this.$bundle_container.html(this._emptyHtml());
});

BundleContainer.method('replace', function(bundles) {
  this.clear();
  this.append(bundles);
  bundles.length == 0? this._emptyHtml() : false;
});

BundleContainer.method('_addBundles', function(bundles, cb) {
  bundles = isArray(bundles)? bundles : [bundles];
  if (!this.bundles.length && bundles.length) {
    this.$bundle_container.html(this.sectionHtml);
    this._setupDraggable();
  }
  bundles.map(function(bundle) {
    !bundle.hasTabs()? bundle.fill(): false;
    cb? cb(bundle): false;
    bundle.assignEvents();
  });
});

BundleContainer.method('_handleSpacer', function(syncedEmpty, localEmpty) {
  this.syncedEmpty = !(!this.syncedEmpty || syncedEmpty);
  this.localEmpty = !(!this.localEmpty || localEmpty);
  if (!this.syncedEmpty && !this.localEmpty) {
    this.$bundle_container.find('.spacer').show();
  }
});

BundleContainer.method('_hideSpacer', function() {
  this.$bundle_container.find('.spacer').hide();
});

BundleContainer.method('prepend', function(bundles) {
  var _this = this;
  this._addBundles(bundles, function(bundle) {
    _this._handleSpacer(true);
    _this.bundles = _this._join(bundle, _this.bundles); 
    _this.$bundle_container.find('.synced-bundle-container').prepend(bundle.makeHtml());
  });
});

BundleContainer.method('append', function(bundles) {
  var _this = this;
  this._addBundles(bundles, function(bundle) {
    _this._handleSpacer(false, true);
    _this.bundles = _this._join(_this.bundles, bundle); 
    _this.$bundle_container.find('.local-bundle-container').prepend(bundle.makeHtml());
  });
});

BundleContainer.method('start', function() {
  var _this = this;

  this.$bundle_container.prepend(this._emptyHtml());

  this.$divider.click(function() {
    _this.show();
  }); 

  Mousetrap.bindGlobal(this.keyBinding, function() { _this.$divider.click(); });

  return this;
});

BundleContainer.method('_join', function(bundles1, bundles2) {
  bundles1 = !isArray(bundles1)? [bundles1] : bundles1;
  bundles2 = !isArray(bundles2)? [bundles2] : bundles2;
  return bundles1.concat(bundles2);
});

BundleContainer.method('_setupDraggable', function() {
  var _this = this;
  var sortables = this.$bundle_container.find('.sortable-bundle-container');
  for (var i = 0; i < sortables.length; i++) {
    var sortable = $(sortables[i]);
    sortable.sortable({
      axis: 'y',
      snap: true,
      update: function(event, ui) {
        var names = $(this).sortable('toArray', {attribute: 'bundleName'});
        OrderHandler.update(_this.id, names);
        for (var i = 0; i < names.length; i++) {
          Accessor.moveBundle(names[i], names.length - 1 - i);
        }
      }
    });
  }
});

BundleContainer.method('_emptyHtml', function() {
  throw "BundleContainer must implement abstract method _emptyHtml.";
});