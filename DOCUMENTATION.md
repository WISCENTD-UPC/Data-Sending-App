# WISCENTD Data-Sending's Extractor-RS and Inbox

## Components

- Data-Sending-ExtractorRS: Web application that provides several endpoints to query a data extraction and upload to an Inbox server.
- DHIS2-Connector: Java library that hosts all the software elements that process the data extraction from a DHIS2 instance.
- Data-Sending-Inbox: Web application that provides one endpoint to securely upload and store an extraction result.

## Data-Sending-Extractor-RS

The Data-Sending-Extractor-RS component is provided as an archived JavaEE executable (war file) and meant to be deployed with Tomcat. We only configuration files to adapt the software to the needs of each Data-Sending-Inbox instance. It uses a java library with all the required extra components to perform the extraction.

### Configuration files

connector.properties:

```
# DHIS API Connection Properties
server=http://localhost:8080/dhis
user=admin:district

# Inbox Connection Properties
inbox_url=http://localhost:8080/Data-Sending-Inbox/upload
auth_token=07b308b6-7b7d-43b9-94ae-7fbcaabaf59
creationModality=global

# Advanced parameters
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

control.properties:

```
lastExtractionDate=2000-01-01
```

postgresql.properties:

```
driverName=org.postgresql.Driver
wisccControlDB=wisccControl
postgresUrl=jdbc:postgresql://
postgresHost=who-dev.essi.upc.edu
postgresPort=5432
username=user
password=pass
```

### Technical explanation

### Defined endpoints

- "PROTOCOL://HOSTNAME:PORT/Data-Sending-ExtractorRS/extraction": Extraction endpoint that queries the results and sends them back to the Inbox server.

## Data-Sending-Inbox

The Data-Sending-Inbox component is provided as an archived JavaEE executable (war file) and meant to be deployed with Tomcat. We use one environment variable and a configuration file to adapt the software to the needs of each Data-Sending-Inbox instance.

### Configuration files

inbox.properties:

```
# Storage configuration
# Login token that Inbox Servlet validates before accepting an upload request
auth_token=07b308b6-7b7d-43b9-94ae-7fbcaabaf59
```

auth_token: Token that server will check before accepting a request.

### Technical explanation

Authentication token: The Data-Sending-Inbox before accepting a request checks for a valid token. The token is compared with a hardcoded value (hardcoded meaning not generated on the instance). The token is set through the configuration file.

Inbox upload request: An HTTP POST request with two values in the header and a binary body named "file" containing the bytes of the extraction result. The two header properties are token (the authentication token) and creationModality (the modality in which the extraction results was generated).

Inbox upload result: If the request is fulfilled status code 200 is returned.

### Defined endpoints

- "PROTOCOL://HOSTNAME:PORT/Data-Sending-Inbox/upload": Upload endpoint that accepts the POST request.
