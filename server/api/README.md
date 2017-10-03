# API Server

## Usage
This API can be used with `fetch` and should be provided an Authorization header:

    fetch(url, {headers: {'Authorization': 'token'}})
      .then(response => response.json())
      .then(
        data => console.log(data),
        error => console.error(error)
      )

## Endpoints


### `GET /categories`
Get all of the categories available for the app.


### `GET /:category/posts`
Get all of the posts for a particular category   


### `GET /posts`
Get all of the posts. Useful for the main page when no category is selected.  


### `POST /posts`
Add a new post  

Params:

    id: UUID
    timestamp: Timestamp
    title: String  
    body: String  
    author: String  
    category: String (Should match a category in the database)


### `GET /posts/:id`
Get the details of a single post  


### `POST /posts/:id`
Used for voting on a post  

Params:

    option: String: (Either `upVote` or `downVote`)


### `PUT /posts/:id`
Edit the details of an existing post  

Params:

    title: String  
    body: String  


### `DELETE /posts/:id`
Sets the deleted flag for a post to 'true'.   
    Sets the parentDeleted flag for all child comments to 'true'.  


### `GET /posts/:id/comments`
Get all the comments for a single post  


### `POST /comments`
Add a comment to a post  

Params:

    id: UUID
    timestamp: Timestamp
    body: String
    author: String
    parentId: UUID (Should match a post id in the database)


### `GET /comments/:id`
Get the details for a single comment  


### `POST /comments/:id`
Used for voting on a comment.  

Params:

    option: String: (Either `upVote` or `downVote`)


### `PUT /comments/:id`
Edit the details of an existing comment  

Params:

    timestamp: Timestamp
    body: String


### `DELETE /comments/:id`
Sets a comment's deleted flag to 'true'  
