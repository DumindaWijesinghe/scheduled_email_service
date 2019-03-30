# Scheduled Email Service
Minimal API for sending scheduled emails

The service will expose an endpoint for sending emails.
Emails are delivered only during the sheduled working hours.
Default hours are from 8:00 AM to 5:00 PM.

## Setup
```
git clone https://github.com/DumindaWijesinghe/scheduled_email_service.git
cd scheduled_email_service
npm install
npm start
```
This will start a Nodejs application on port `2010`

## Config

`.env` file at the application root contains the configuration for scheduler, database and email service provider.

```
TZ=Australia/Sydney
DB_HOST=**123456.mlab.com:12345/email_service**
DB_USER=**user**
DB_PASS=**pass**
SENDGRID_API_KEY=****************************************
WORKING_HOURS_START=8
WORKING_HOURS_END=17
RETRY_INTERVAL=2
```

## Endpoints


### Send an email
#### `Request`
```
POST /v1/emails HTTP/1.1
Host: localhost:2010
Content-Type: application/json
Cache-Control: no-cache

{
	"to": "test@test.com",
	"subject": "Subject",
	"content": "content"
}
```
#### `Response`
Status can be one of `SENT`, `FAILED` or `QUEUED`
```
{
    "id": "5c9fdd5d1c08e0736466c054",
    "status": "SENT"
}
```


### Get status for an email
#### `Request`
```
GET /v1/emails/5c9fdb2be1f8b358a9ec8f61 HTTP/1.1
Host: localhost:2010
Cache-Control: no-cache
```
#### `Response`
```
{
    "id": "5c9fdb2be1f8b358a9ec8f61",
    "status": "SENT"
}
```


### Delete a `QUEUED` email
#### `Request`
```
DELETE /v1/emails/5c9fdc1507cc3a6cb7f7522f HTTP/1.1
Host: localhost:2010
Cache-Control: no-cache
```
#### `Response`
```
{
    "id": "5c9fdc1507cc3a6cb7f7522f",
    "deleted": false
}
```







