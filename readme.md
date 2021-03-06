#GoPop Archive

Static repository for GoPop media.

## GoPop to S3 Archive scripts

https://github.com/Zeega/Pop-Scripts/tree/master/pop-to-s3

## API

### User feeds

#### API endpoint

```
GET http://archive.gopop.co/users/[id]-[page-number].json
```

with the page number starting on 0.

Example (user with id = 1):

http://archive.gopop.co/users/1-0.json

http://archive.gopop.co/users/1-1.json


#### Response format

The user feed is paginated. Each user has a set of files with the following format:

```
{
    "meta": {
        "next_page": "filename-if-exists",
        "previous_page": "filename-if-exists"
    },
    "posts": [        
      ...
    ],
    "user": {
      ...
    }
}
```

### Individual posts

#### API endpoint

```
GET http://archive.gopop.co/posts/[id].json
```

Example (post with id = 118680):

http://archive.gopop.co/posts/118680.json

#### Response format

```
{
   "id": ...
   ....
}
```

### Conversations and post replies

#### API endpoint

```
GET http://archive.gopop.co/conversations/[root-post-id].json
```

Example:

http://archive.gopop.co/conversations/11.json

#### Response format

```
{
   "post": {...},
   "replies": [...]
}
```
