## Quick Start

1. Clone the repository
2. Run database migrations and tests with `npm run test`
3. Run the application  with `npm run start`
4. Access `http://localhost:8080/` and you're ready to go!

### Database Setup (Development)

1. Install and run the MongoDb server on local (or remotely and change the credentials in config file)

## Overview

- A Sample MEAN stack service, that gives lexical density of any text
- written using ES6

Example request and response: 

Req : 
```
curl --location --request GET 'localhost:8080/complexity' \
--header 'Content-Type: text/plain' \
--data-raw 'Kim loves going ​To the ​cInema. 
hello world'
```

Res: 
```$xslt
{
    "data": {
        "overall_ld": 0.75
    }
}
```

Req : 
```
curl --location --request GET 'localhost:8080/complexity?mode=verbose' \
--header 'Content-Type: text/plain' \
--data-raw 'Kim loves going ​To the ​cInema. 
hello world'
```

Res: 
```$xslt
{
    "data": {
        "overall_ld": 0.75,
        "sentence_ld": [
            0.67,
            1
        ]
    }
}
```

As I don't have any prior experience of MongoDb, i have not used it efficiently and have just used it as external storage only.
