/**
* Copyright 2014 Dossier Technologies Inc.
**/

function Header() {
}

Header.method('start', function() {
    $('#home').click(function() {
		Browser.open(Server.getPath('/'));
    });

    $('#upgrade').click(function() {
		Browser.open(Server.getPath('/upgrade'));
    });
});

new Header().start();
