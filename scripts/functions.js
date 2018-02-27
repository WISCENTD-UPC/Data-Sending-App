//////////////////////////////////////////////
////////////VARIABLE DEFINITIONS
//////////////////////////////////////////////
			var links;			
			var help = 
			"Click on the <b>'Download preview'</b> button to download a .csv file containing all the events that are going to be sent."+
			"Once ready click on the <b>'Send data'</b> button and wait until the events are uploaded to the server. <br><br>" +
			"When the event uploading finishes the message <i>'Events sent successfully'</i> will be shown in this box. <br><br>" +
			"Then the two buttons above will become available and you will be able to download the following files: <br>" +
			"<ul>" + 
			"<li>data-summary.json: The json file with all the data value sets sent.</li>" +
			"<li>data-attachments.tar.gz: A compressed folder with all the files related to those events.</li></ul>";
			var helpShown = false;

////////////////////////////////////////////////			
/////////////VARIABLE INITIALIZATIONS
///////////////////////////////////////////////

			//Initializes the links to call to download the files
			function defineLinks () {
				links = [
					baseUrl+"/dhis2-extractor-RS/events/summary",
					baseUrl+"/dhis2-extractor-RS/events/attachments",
					baseUrl+"/dhis2-extractor-RS/events/summaryCSV"
				];
			}
			
			//Initializes the baseUrl variable, look at DHISbaseUrl.js file
			declareBaseUrl(defineLinks);

////////////////////////////////////////////////
/////////////FUNCTIONS			
////////////////////////////////////////////////

			/**
			* Makes a call to the server to download the file 
			* Server return messages:
			* 0 Extraction error
			* 1 No new events to download
			* 2 Extraction successfully finalized
			* If there is no error code the server is down probably
			*/
			function tryDownload() {
				$("#button").prop("disabled",true);
				$("#button").text("Sending...");
				$.get(baseUrl+'/dhis2-extractor-RS/extraction', function(responseText) {
					if (responseText == '2') {
						hide("Events sent successfully, you can now download the files using the buttons below.");
						$("#summary").removeClass("disabled");
						$("#attachments").removeClass("disabled");
						$("#button").text("Sent!");
					} else if (responseText == '0') {
						$("#button").prop("disabled",false);
						$("#button").text("Send data");
						hide("Server error (0): Extraction could not be performed, try again later or contact the system administrator.");
					} else if (responseText == '1') {
						$("#button").prop("disabled",false);
						$("#button").text("Send data");
						hide("No new events to download.");
					} else {
						$("#button").prop("disabled",false);
						$("#button").text("Send data");
						hide("Server error (Unknown error code): Extraction could not be performed, try again later or contact the system administrator.");
					}
					show();
					}).fail(function() {
						hide("Error while connecting to the server.");
						$("#button").prop("disabled",false);
						$("#button").text("Send data");
						show();
				});
					
			}
			
			//Downloads the summary of events extracted(json file)
			function downloadSummary() {
				window.location = links[0];
			}
			
			//Downloads the attachments (zip file with attached documents)
			function downloadAttachments() {
				window.location = links[1];
			}
			
			//Downloads the CSV file version of the events extracted (same as summary but in csv)
			function downloadCSV() {
				window.location = links[2];
			}

///////////////////////////////////////////////
////////////HELP MESSAGE FUNCTIONS
///////////////////////////////////////////////
			
			/**
			*	Hides the message area below
			*	Sets the new message while hidden (inside the hide function)
			*	If necessary shows again the help, if not it remains hidden
			*/
			function showHelp() {		
				hide(help);
				if (!helpShown) show();
				helpShown = !helpShown;				
			}
			
			//Shows the help area		
			function show() {
				$('#Messages').slideDown('slow');
			}
			
			//Hides the help area and then changes the message
			function hide(msg) {
				$('#Messages').slideUp('slow', function() { 
					$('#Messages').hide(); 
					document.getElementById("Messages").innerHTML = msg;
				});					
			}

///////////////////////////////////////////////////			
////////////UNUSED FUCNTIONS
///////////////////////////////////////////////////

			/**
			*	Function not currently in use
			*	Used to download all the files at once 
			*	Might show problems depending on the navigator used
			*/
			function downloadAll() {
				urls = links;
				var link = document.createElement('a');

				link.setAttribute('download', null);
				link.style.display = 'none';

				document.body.appendChild(link);

				for (var i = 0; i < urls.length; i++) {
					link.setAttribute('href', urls[i]);
					link.click();
				}
				document.body.removeChild(link);
			}