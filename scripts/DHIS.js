			var baseUrl;
			
			/**
			*	Function used to declare the baseUrl.
			*	@param callback		Function called once the baseUrl is defined
			*/
			function declareBaseUrl(callback) {
				//$.getJSON( "manifest.webapp", function( json ) {
					baseUrl = "http://localhost:9999"; //json.activities.dhis.href;
					if (!(callback==null)) callback();
				//});
			}
			
			/**	Function used to make a PUT json request (not supported in Jquery)
			*	@param		url			request URL
			*	@param		json		JSON data to make the putJSON
			*	@param		callback	Function to call in case of success
			*/
			function putJSON(url, json, callback) {
				$.ajax({
					url: url,
					headers: { 
						'Accept': 'application/json',
						'Content-Type': 'application/json' 
					},
					type: 'PUT',
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(json),
					success: callback
				});
			}