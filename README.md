# Shopping Cart App

## Quick Start
1. `git clone git@github.com:yunhsuanchin/Shopping_cart.git`
2. `cd Shopping_cart`
3. `docker compose build`
4. `docker compose up`
5. `docker exec -it myapp bash`
6. `npm run seed`
7. Start testing with postman

## ERD
https://dbdiagram.io/d/62a5f1949921fe2a96e9d8b0

## API documentation
- create / update shopping cart
    - method: POST
    - url: http://localhost:3000/cart
    - body: 
    ```
    {
        "memberId": 2, // can use 1 - 20
        "products": [
            {
                "id": 68, // can use 1 - 200
                "quantity": 1
            },
            {
                "id": 71,
                "quantity": 2
            },
            {
                "id": 70,
                "quantity": 2
            }
        ]
   }
   ```

- get shopping cart data
    - method: GET
    - url: http://localhost:3000/cart/:memberId


- checkout
    - method: POST
    - url: http://localhost:3000/cart/checkout
    - body: 
    ```
    {
        "memberId": 2,
        "cardNo": "4111111111111111"
    }
    ```

## Directory
```
shopline
├─ .dockerignore
├─ .gitignore
├─ .sequelizerc
├─ Dockerfile
├─ README.md
├─ app.js                                                  project entry point
├─ config                                  store env variables & db connection
│  ├─ config.js
│  └─ env
├─ controllers                                          api service controller
│  └─ cartController.js
├─ docker-compose.yml
├─ init
│  └─ init.sql
├─ middleware
│  └─ errorHandler.js
├─ migrations
├─ models                                                   mysql table schema
│  ├─ cart_item.js
│  ├─ index.js
│  ├─ member.js
│  ├─ modelTransformer
│  │  └─ order.js
│  ├─ order.js
│  ├─ order_item.js
│  ├─ product.js
│  ├─ product_snapshot.js
│  ├─ shopping_cart.js
│  └─ transaction.js
├─ package.json
├─ repositories                                                  database CRUD
│  ├─ cartItemRepository.js
│  ├─ orderItemRepository.js
│  ├─ orderRepository.js
│  ├─ productRepository.js
│  ├─ productSnapshotRepository.js
│  ├─ shoppingCartRepository.js
│  └─ transactionRepository.js
├─ responseModels                                   generate api response data
│  ├─ cart.js
│  └─ order.js
├─ routes                                                              routers
│  ├─ index.js
│  └─ modules
│     └─ cart.js
├─ seeders                                                  database init data
│  ├─ index.js
│  ├─ memberSeeder.js
│  └─ productSeeder.js
├─ services                                              handle business logic
│  ├─ cartService.js
│  └─ productService.js
├─ tests                                                                 tests
│  ├─ cart.spec.js
│  ├─ order.spec.js
│  └─ testData
│     ├─ cartTestData.json
│     └─ orderTestData.json
├─ utils
│  ├─ errors.js
│  └─ helper.js
└─ validators 

```
