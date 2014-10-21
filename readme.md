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

Example:

http://archive.gopop.co/users/1-0.json

http://archive.gopop.co/users/1-1.json

with page number starting at 0.

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

Example:

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
GET 
```

Example:

http://

#### Response format

```
```
