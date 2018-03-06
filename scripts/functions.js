/**
 * Variable Definitions
 */
var extractionUrl, summaryUrl, attachmentsUrl, csvUrl;
var helpText = "Click on the <b>'Download preview'</b> button to download a .csv file containing all the events that are going to be sent.<br>" +
    "Once ready click on the <b>'Send data'</b> button and wait until the events are uploaded to the server.<br><br>" +
    "When the event uploading finishes the message <i>'Events sent successfully'</i> will be shown in this box.<br><br>" +
    "Then the two buttons above will become available and you will be able to download the following files:<br>" +
    "<ul>" + "<li>data-summary.json: The json file with all the data value sets sent.</li>" +
    "<li>data-attachments.tar.gz: A compressed folder with all the files related to those events.</li></ul>";

/**
 * Main start point, loads when page is ready
 */
$(document).ready(function() {
    //	Function called from the DHISBaseUrl file
    //	Initializes the baseUrl variable, then calls the
    //	function passed as parameter
    declareBaseUrl(defineLinks);
});

//Initializes the links to call to download the files
function defineLinks() {
    extractionUrl = baseUrl + '/dhis2-extractor-RS/extraction';
    summaryUrl = baseUrl + "/dhis2-extractor-RS/events/summary";
    attachmentsUrl = baseUrl + "/dhis2-extractor-RS/events/attachments";
    csvUrl = baseUrl + "/dhis2-extractor-RS/events/summaryCSV";
}

/**
 * Makes a call to the server to download the file
 * Server return messages:
 * 0 Extraction error
 * 1 No new events to download
 * 2 Extraction successfully finalized
 * If there is no error code the server is down probably
 */
function tryDownload() {
    var downloadButton = $("#downloadButton");
    downloadButton.prop("disabled", true);
    downloadButton.text("Sending...");
    $.get(extractionUrl, function (responseText) {
        switch (responseText) {
            case '2':
                showNotification("Events sent successfully, you can now download the files using the buttons below.", "success");
                $("#downloadSummaryButton").removeClass("disabled");
                $("#downloadAttachmentsButton").removeClass("disabled");
                downloadButton.text("Sent!");
                break;
            case '0':
                downloadButton.prop("disabled", false);
                downloadButton.text("Send data");
                showNotification("Server error (0): Extraction could not be performed, try again later or contact the system administrator.", "danger");
                break;
            case '1':
                downloadButton.prop("disabled", false);
                downloadButton.text("Send data");
                showNotification("No new events to download.", "info");
                break;
            default:
                downloadButton.prop("disabled", false);
                downloadButton.text("Send data");
                showNotification("Server error (Unknown error code): Extraction could not be performed, try again later or contact the system administrator.", "danger");
                break;
        }
    }).fail(function () {
        showNotification("Error while connecting to the server.", "danger");
        downloadButton.prop("disabled", false);
        downloadButton.text("Send data");
    });
}

//Downloads the summary of events extracted(json file)
function downloadSummary() {
    window.location = summaryUrl;
}

//Downloads the attachments (zip file with attached documents)
function downloadAttachments() {
    window.location = attachmentsUrl;
}

//Downloads the CSV file version of the events extracted (same as summary but in csv)
function downloadCSV() {
    window.location = csvUrl;
}

/**
 *    Hides the message area below
 *    Sets the new message while hidden (inside the hide function)
 *    If necessary shows again the help, if not it remains hidden
 */
function showHelp() {
    showNotification(helpText, 'info');
}

/**
 *    Shows an error on the leftbar element
 */
function showNotification(message, type) {
    $.notify({
        // options
        message: message
    },{
        // settings
        type: type,
        placement: {
            from: "bottom",
            align: "left"
        }
    });
}