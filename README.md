# Specification

- Tools
    - Node: 18
    - MongoDB: 7.0
    - Docker: 24.0.6

- Port
    - Application port: 3000
    - Docker port: 8080
    - MongoDB port: 27017

# How to run this application
You can use this command to run service and database using Docker Compose:
```
docker compose -f docker-compose.yml up
```


# List all APIs in this service

## List all cards

![card list](https://github.com/tavis161/Candidate/assets/49919136/4748e53e-70f2-4bc1-926d-96dcadc83516)

API:
```
GET /card/list?limit=2&page=1
```

- Using "limit" parameter to adjust the number of cards to show in the list
- Add "page" parameter for breaking up large datasets into smaller, more manageable chunks instead of returning the entire dataset in one response.
- Sort by created date in descending order

## View card detail

![image](https://github.com/tavis161/Candidate/assets/49919136/3b64d10a-d2b6-4800-ab35-7a8b8b8c7ba9)

API:
```
GET /card/{Card ID}
```
- When calling an invalid ID will respond to HTTP error status 500 and get error message "message: ID: {Card ID} not found."

## Add comment in card

![image](https://github.com/tavis161/Candidate/assets/49919136/e3e7f153-c11c-4a5e-a1c4-b9beea784f12)


API:
```
PUT /card/update/comment/{Card ID}
```
Body:
```
{
    "name": Test name",
    "context": "Test Comment 5"
}
```

- Always generate a timestamp for every new comment and set the newest comment on the top
- Require field name and context in the body of request
- When calling an invalid ID will respond to HTTP error status 500 and get error message "message: ID: {Card ID} not found."

## Update status of card

![image](https://github.com/tavis161/Candidate/assets/49919136/27681fc3-fe4c-4b66-84f0-92ee7b977f7b)

API:
```
PUT /update/status/{Card ID}
```
Body:
```
{
    "status": "Done"
}
```
- Require field status in the body of request
- When calling an invalid ID will respond to HTTP error status 500 and get error message "message: ID: {Card ID} not found."


## Save card

![image](https://github.com/tavis161/Candidate/assets/49919136/154958b4-583d-43ba-9e9c-df0b89e1fa94)

API:
```
DELETE /card/delete/{Card ID}
```

- When calling an invalid ID will respond to HTTP error status 500 and get error message "message: ID: {Card ID} not found."


## Insert data (For test)

API:
```
POST /card/insert
```
Body:
```
{
    "cardNo": "CN-0001",
    "title": "นัดสัมภาษณ์งาน",
    "context": "Test context",
    "status": "TO_DO",
    "email": "Test@email.com"
    "createdBy": "โรบินฮู้ด"
}
```


