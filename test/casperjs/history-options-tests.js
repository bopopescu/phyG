// have to handle errors here - or phantom/casper won't bail but _HANG_
try {
    var utils = require( 'utils' ),
        xpath = require( 'casper' ).selectXPath,
        format = utils.format,

        //...if there's a better way - please let me know, universe
        scriptDir = require( 'system' ).args[3]
            // remove the script filename
            .replace( /[\w|\.|\-|_]*$/, '' )
            // if given rel. path, prepend the curr dir
            .replace( /^(?!\/)/, './' ),
        spaceghost = require( scriptDir + 'spaceghost' ).create({
            // script options here (can be overridden by CLI)
            //verbose: true,
            //logLevel: debug,
            scriptDir: scriptDir
        });

    spaceghost.start();

} catch( error ){
    console.debug( error );
    phantom.exit( 1 );
}

// ===================================================================
/* TODO:
    possibly break this file up
*/
// =================================================================== globals and helpers
var email = spaceghost.user.getRandomEmail(),
    password = '123456';
if( spaceghost.fixtureData.testUser ){
    email = spaceghost.fixtureData.testUser.email;
    password = spaceghost.fixtureData.testUser.password;
    spaceghost.info( 'Will use fixtureData.testUser: ' + email );
}

// selectors and labels
var includeDeletedOptionsLabel = spaceghost.historyoptions.data.labels.options.includeDeleted;

// local
var filepathToUpload = '../../test-data/1.txt',
    testUploadInfo = {};


// =================================================================== TESTS
// ------------------------------------------------------------------- set up
// start a new user
spaceghost.user.loginOrRegisterUser( email, password );

spaceghost.tools.uploadFile( filepathToUpload, function uploadCallback( _uploadInfo ){
    testUploadInfo = _uploadInfo;
});

// ------------------------------------------------------------------- history options menu structure
//NOTE: options menu should be functionally tested elsewhere
spaceghost.historypanel.waitForHdas().then( function checkHistoryOptions(){
    this.test.comment( 'History options icon should be in place and menu should have the proper structure' );

    // check the button and icon
    this.test.assertExists(  this.historyoptions.data.selectors.button, "Found history options button" );
    this.test.assertVisible( this.historyoptions.data.selectors.button, "History options button is visible" );
    this.test.assertVisible( this.historyoptions.data.selectors.buttonIcon, "History options icon is visible" );

    // open the menu
    this.click( this.historyoptions.data.selectors.button );
    this.test.assertVisible( this.historyoptions.data.selectors.menu,
        "Menu is visible when options button is clicked" );

    // check the options
    var historyOptions = this.historyoptions.data.labels.options;
    for( var optionKey in historyOptions ){
        if( historyOptions.hasOwnProperty( optionKey ) ){
            var optionLabel = historyOptions[ optionKey ];
            this.test.assertVisible( this.historyoptions.data.selectors.optionXpathByLabelFn( optionLabel ),
                'Option label is visible: ' + optionLabel );
        }
    }

    // clear the menu
    this.click( 'body' );
    this.test.assertNotVisible( this.historyoptions.data.selectors.menu,
        "Clicking away from the menu closes it" );
});

// ------------------------------------------------------------------- options allow showing/hiding deleted hdas
spaceghost.then( function(){
    this.test.comment( 'Deleting HDA' );
    var uploadSelector = '#' + testUploadInfo.hdaElement.attributes.id;

    this.historypanel.deleteHda( uploadSelector, function(){
        this.test.assertNotExists( uploadSelector, "Deleted HDA is NOT in the DOM" );
    });
});

spaceghost.then( function(){
    this.test.comment( 'History options->' + includeDeletedOptionsLabel + ' shows deleted datasets' );
    var uploadSelector = '#' + testUploadInfo.hdaElement.attributes.id;

    this.historyoptions.includeDeleted( function(){
        this.test.assertExists( uploadSelector,
            "Deleted HDA is in the DOM (using history options -> " + includeDeletedOptionsLabel + ")" );
        this.test.assertVisible( uploadSelector,
            "Deleted HDA is visible again (using history options -> " + includeDeletedOptionsLabel + ")" );
    });
});

spaceghost.then( function(){
    this.test.comment( 'History options->' + includeDeletedOptionsLabel + ' (again) re-hides deleted datasets' );

    this.historyoptions.excludeDeleted( function(){
        this.test.assertDoesntExist( '#' + testUploadInfo.hdaElement.attributes.id,
            "Deleted HDA is not in the DOM (using history options -> " + includeDeletedOptionsLabel + ")" );
    });
    // undelete the uploaded file
    this.historypanel.undeleteHda( '#' + testUploadInfo.hdaElement.attributes.id );
});

// ------------------------------------------------------------------- hidden hdas aren't shown
// ------------------------------------------------------------------- history options allows showing hidden hdas
// can't test this yet w/o a way to make hdas hidden thru the ui or api


// ------------------------------------------------------------------- history options collapses all expanded hdas
spaceghost.then( function(){
    this.historypanel.thenExpandHda( '#' + testUploadInfo.hdaElement.attributes.id );
});
spaceghost.then( function(){
    this.test.comment( 'History option collapses all expanded hdas' );

    this.historyoptions.collapseExpanded( function(){
        var uploadedSelector = '#' + testUploadInfo.hdaElement.attributes.id;
        this.withHistoryPanel( function(){
            this.test.assertNotVisible( uploadedSelector + ' ' + this.historypanel.data.selectors.hda.body,
                "Body for uploaded file is not visible" );
        });
    });
});

// ===================================================================
spaceghost.run( function(){
    this.test.done();
});
