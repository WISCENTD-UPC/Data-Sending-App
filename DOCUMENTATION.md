# WISCENTD Data-Sending's Extractor-RS and Inbox

## Components

- Data-Sending-ExtractorRS: Web application that provides several endpoints to query a data extraction and upload to an Inbox server.
- DHIS2-Connector: Java library that hosts all the software elements that process the data extraction from a DHIS2 instance.
- Data-Sending-Inbox: Web application that provides one endpoint to securely upload and store an extraction result.

## Data-Sending-Extractor-RS

The Data-Sending-Extractor-RS component is provided as an archived JavaEE executable (war file) and meant to be deployed with Tomcat. We only configuration files to adapt the software to the needs of each Data-Sending-Inbox instance. It uses a java library with all the required extra components to perform the extraction.

### Configuration files

inbox.properties:

```
# Inbox Connection Properties
url=http://localhost:8080/Data-Sending-Inbox/upload
creationModality=global
token=07b308b6-7b7d-43b9-94ae-7fbcaabaf59
```

dhisAPI.properties:

```
# DHIS API Connection Properties
# Connection to DHIS2
server=http://localhost:9999/dhis
secretClient=wiscc.dhis2connector:fb5c463ad-3aa4-b51f-923b-3fe3bfc7593
tokenUrlParams=grant_type=password&username=admin&password=district
user=admin:district
# URL Params
tokenQuery=/uaa/oauth/token
urlParamsExtraction=/api/dataValueSets
urlDataValueSetsFields=fields=:all
startDateParam=startDate=
endDateParam=endDate=
date.pattern=yyyy-MM-dd
params=skipPaging=true
queryDataSet=/api/dataSets?fields=id,displayName&paging=false
queryElement=/api/dataElements?fields=id,name&paging=false
queryOrg=/api/me?fields=organisationUnits[id,name,code]&paging=false
```

### Technical explanation

### Defined endpoints

- "PROTOCOL://HOSTNAME:PORT/Data-Sending-ExtractorRS/extraction": Extraction endpoint that queries the results and sends them back to the Inbox server.

## Data-Sending-Inbox

The Data-Sending-Inbox component is provided as an archived JavaEE executable (war file) and meant to be deployed with Tomcat. We use one environment variable and a configuration file to adapt the software to the needs of each Data-Sending-Inbox instance.

### Environment variables

$WISCENTD_HOME: provides a host path to store the received files.

### Configuration files

inbox.properties:

```
# Storage configuration
# Base Path allows two configurations:
# 1) Relative: Routes to $WISCENTD_HOME + base_path (If WISCENTD_HOME is undeclared defaults to CATALINA_BASE)
# 2) Absolute: Routes to the absolute path provided
base_path=data-inbox
# Login token that Inbox Servlet validates before accepting an upload request
auth_token=a0b1c2d3-0p9o-45m6-22tr-65hgjjf38hr
```

base_path: String that defines the route to store the received files.
auth_token: Token that server will check before accepting a request.

### Technical explanation

Storage path: The Data-Sending-Inbox allows to define two kind of storage methods, the first one is relative to the union of the host path $WISCENTD_HOME environment variable with the subfolder(s) from base_path on the configuration file. The second is with an absolute path stored directly in the base_path property of the configuration file.

Authentication token: The Data-Sending-Inbox before accepting a request checks for a valid token. The token is compared with a hardcoded value (hardcoded meaning not generated on the instance). The token is set through the configuration file.

Inbox upload request: An HTTP POST request with two values in the header and a binary body named "file" containing the bytes of the extraction result. The two header properties are token (the authentication token) and creationModality (the modality in which the extraction results was generated).

Inbox upload result: If the request is fulfilled status code 200 is returned.

### Defined endpoints

- "PROTOCOL://HOSTNAME:PORT/Data-Sending-Inbox/upload": Upload endpoint that accepts the POST request.