# test-crypto-backend

## Configuration

1. Edit `.env` file by adding following
    - POSTGRES_HOST [ip address of your DB]
    - POSTGRES_PORT [port of your DB]
    - POSTGRES_DB_NAME [name of your DB]
    - POSTGRES_USERNAME [username of your DB]
    - POSTGRES_PASSWORD [passwrod of user of your DB]
    - APP_PORT [port of your application]

## Installation and running

Install dependencies

```sh
npm i
```

Build app

```sh
npm run build
```

Run app 

```sh
npm run start:dev # development mode
npm run start:prod # production mode
```

## Methods

#### Get addresses of transaction with a biggest value

##### Request

`GET /transactions/biggest-value/`

    curl --location 'localhost:3000/transactions/biggest-value'

##### Response
    200 OK

    {
        "to": "0xfd14567eaf9ba941cb8c8a94eec14831ca7fd1b4",
        "from": "0x16d5783a96ab20c9157d7933ac236646b29589a4"
    }

##### Error

    404 Not Found
    {
        "statusCode": 404,
        "message": "No such transcation"
    }

## Cron

`saveTranscations()` of `transactions.service.ts` will be triggered every minute when app is launched