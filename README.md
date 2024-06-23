# code-in-gql

Will code a simple graphql server. Then will add a database connection. All you need to download the source code, and call these `npm run i && npm run dev` OK. then go to http://localhost:4000 and you are ok to test something  ✳️

A simple query:
```graphql
query ReviewQuery($reviewId: ID!) {
  review(id: $reviewId) {
    id
    content
    game {
      title
      platform
      reviews {
        content
      }
    }
  }
}
```

Variable for the above query:
```graphql
{ 
  "reviewId": "101"
}
```

Output from the above query:
```json
{
  "data": {
    "review": {
      "id": "101",
      "content": "An absolute masterpiece with stunning visuals and gameplay.",
      "game": {
        "title": "The Legend of Zelda: Breath of the Wild",
        "platform": [
          "Nintendo Switch",
          "Wii U"
        ],
        "reviews": [
          {
            "content": "An absolute masterpiece with stunning visuals and gameplay."
          }
        ]
      }
    }
  }
}
```