var baseUrl;

/**
 *    Function used to declare the baseUrl.
 *    @param callback        Function called once the baseUrl is defined
 */
function declareBaseUrl(callback) {
    $.getJSON("manifest.webapp", function (json) {
        // Declare the baseUrl
        baseUrl = json.activities.dhis.href;

        // Load DHIS2 Header bar
        Dhis2HeaderBar.initHeaderBar(document.querySelector('#header'), baseUrl + "/api/", { noLoadingIndicator: true });

        // Return callback
        if (callback != null) callback();
    });
}