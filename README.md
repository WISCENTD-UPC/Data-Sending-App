# Data Sending

## Summary

This app is used to send the new VALIDATED or PUBLISHED events to the inbox.

## Organization

- index.html:		    	Main html page
- manifest.webapp:	        Configuration file with the
- img:				        Folder with images
- scripts:			        Folder with scripts
    - DHIS.js:			    Common file with useful functions to work with dhis
	- functions.js:		    File with the functions defined for this app
	- ajaxMultiQueue.js:    Common file with ajax multi queue utility
- styles:				    Folder with stylesheets
	- styles.css:		    File with the styles defined for this app
	
## Setup

This setup needs to be done once if the instance of DHIS2 is being done from scratch.

This app makes the assumption a data elements exist previously, the "COMMON_STATUS" data element is used to store the VALIDATED and PUBLISHED status since DHIS only supports the COMPLETE and INCOMPLETE status. It is a data element of type text. (Should be hidden through program rules in all forms).

## Installation

This app is installed through the DHIS2 menu normally.