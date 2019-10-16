/**
* Copyright 2014 Dossier Technologies Inc.
**/

function SharedContainer(bundle_container, divider, keyBinding) {
  this._init(bundle_container, divider, false, keyBinding);
}

SharedContainer.inherits(BundleContainer);

SharedContainer.method('_emptyHtml', function() {
  return " \
      <div class='empty-bundles-container left'> \
        No one has shared a bundle with you. \
        <br/> \
        To share a bundle with someone, they must hit the <div class='make-link icon image inline-block'> </div> icon of the bundle they wish to share. \
      </div> \
  ";
});