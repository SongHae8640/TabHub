/**
* Copyright 2014 Dossier Technologies Inc.
**/

function OwnContainer(bundle_container, divider, keyBinding) {
	this._init(bundle_container, divider, true, keyBinding);
}

OwnContainer.inherits(BundleContainer);

OwnContainer.method('_emptyHtml', function() {
	return " \
      <div id='empty-own-bundles' class='empty-bundles-container left'> \
        You do not have any bundles. \
        <br/> \
        To create a bundle, enter your bundle name, and hit the <div class='image add_bundle inline-block'> </div> icon below. \
      </div> \
	";
});