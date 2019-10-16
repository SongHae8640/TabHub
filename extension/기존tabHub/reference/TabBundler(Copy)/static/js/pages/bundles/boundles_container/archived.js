/**
* Copyright 2014 Dossier Technologies Inc.
**/

function ArchivedContainer(bundle_container, divider, keyBinding) {
	this._init(bundle_container, divider, false, keyBinding);
}

ArchivedContainer.inherits(BundleContainer);

ArchivedContainer.method('_emptyHtml', function() {
	return " \
      <div id='empty-archived-bundles' class='empty-bundles-container left'> \
        You do not have any archived bundles. \
        <br/> \
        To archive a bundle, hit the <div class='hide-bundle icon image inline-block'> </div> icon of the bundle you wish to archive. \
      </div> \
	";
});