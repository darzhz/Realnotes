# RealNotes
#### A realtime notes sharing app with persistent storage for up to 120 minutes and custom urls
---
## Technologies
- Nodejs
- Express
- Websockets
- Mongo db
- svelte 

## Run
##### To start sever and listen on to localhost:8080<br>
`npm install`<br>
`npm start`<br>
##### To build client<br>
`cd svelte`<br>
`npm install`<br>
`npm run build`<br>

###### *note : if running in local environment either an SSL certificate must be signed on local host or the redirect to https must be disabled in App.svelte*

## How it works

###### *The client is pre-compiled using svelte,as I am inexperienced in svelte or any other frontend framework (or compiler in the case of svelte) the code may or may not follow best practices.i formally apologize for any mistakes that I may have made(◍•ᴗ•◍)*

 The express sever listens for a request to any `/:id` endpoint where `id>=4&<=12` this entry is added to the mongodb server where it is indexed as TTL index with ExpireAfter set to `7200` seconds.This lookup is only done if the number of connected clients > 1

whenever a client is connect the client sends an empty string to the server to be emitted to the rest of the clients in which one of the clients sends the content of it's note this is done to maintain consistency among peers.each client is identified by a unique UUID and is assigned with the url that it is connected to.

the content of the database is only updated if there are only one client left.

the mongodb database schema is as follows:<br>

```
{
        "_id":ObjectId(....),
        "time":ISO_STRING_TIME,     
        "data":{
              "url":"URL_OF_NOTE",
              "text":"CONTENT"
          }
}
```

###### __this implementation is really simple and might not perform well with larger number of client connections.However feel free to improve upon my work__
---
## live demo
#### A live app has been published on glitch and is updated whenever a significant update is made [Realnotes.glitch.me](https://realnotes.glitch.me)
## Screenshots

![screenhot 1](https://raw.githubusercontent.com/darzhz/Realnotes/main/assets/0.png)
![screenhot 2](https://raw.githubusercontent.com/darzhz/Realnotes/main/assets/1.png)
![screenhot 3](https://raw.githubusercontent.com/darzhz/Realnotes/main/assets/2.png)
![screenhot 4](https://raw.githubusercontent.com/darzhz/Realnotes/main/assets/3.png)

