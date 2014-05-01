// GUI setup
var gui = require('nw.gui');

// open devtools
gui.Window.get().showDevTools();

/**
 * Expose Soundcloud API
 */
var exposeSoundCloudAPI = (function () {
    var elIframe = document.getElementById('elIframe');

    var verification = function () {
        var iframeDocument = elIframe.contentDocument
            , elIframeBody = iframeDocument.body
            , isOAuthDone = elIframeBody.getAttribute('data-isOAuth-done');

        console.log('verification called')

        if ( isOAuthDone === 'true' ) {
            // Expose Soundcloud API to node-webkit object window
            window.scAPI = elIframe.contentWindow.SC;
            window.scAccessToken = elIframe.contentWindow.SC.accessToken();
            // stop verification
            window.clearInterval(OAuthVerification)

            // Start the App
            document.body.setAttribute('data-isVisible', 'true');
            angular.bootstrap(document, ['App']);

            console.log('verification done')
        }
    }

    return {
        verification: verification
    }
})();

var OAuthVerification = window.setInterval( exposeSoundCloudAPI.verification, 1500);

/**
 * API SOUNDCLOUD ENDPOINTS
 * https://developers.soundcloud.com/docs/api/reference#me
 */

// GET /users/{id} a user
// GET /users/{id}/tracks  list of tracks of the user
// GET /users/{id}/playlists   list of playlists (sets) of the user
// GET /users/{id}/followings  list of users who are followed by the user
// GET, PUT, DELETE    /users/{id}/followings/{id} a user who is followed by the user
// GET /users/{id}/followers   list of users who are following the user
// GET /users/{id}/followers/{id}  user who is following the user
// GET /users/{id}/comments    list of comments from this user
// GET /users/{id}/favorites   list of tracks favorited by the user
// GET, PUT, DELETE    /users/{id}/favorites/{id}  track favorited by the user
// GET /users/{id}/groups  list of joined groups
// GET, PUT, DELETE    /users/{id}/web-profiles    list of web profiles
// GET /me/{id}/activities list dashboard activities
// GET, POST   /me/{id}/connections    list of connected external profiles