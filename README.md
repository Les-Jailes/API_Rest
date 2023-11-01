# API-REST con Node.js, Express.js y MongoDB | LES JAILES

This project is a REST API built with Node.js, Express.js, and MongoDB. The API has been configured to listen on port 5000 and a connection to a MongoDB database has been established.

## How it was made

The project started with the setup of a Node.js project with Express. A connection to the MongoDB database was established using Mongoose. The Express server was configured to listen on a specific port (5000). 

## Installation

To get the API working on your local machine, follow these steps:

1. Clone the repository on your local machine using `git clone`.

2. Navigate to the project directory.

3. Run `npm install` to install all the necessary dependencies for the project.

4. Start the server using `npm run dev`.
Certainly, here's a README for your user story detailing the API-REST-CRUD operations for the User and Product collections in MongoDB using Express.js:


## Endpoints

### GET: Read Data

For reading the products database:
- URL: `http://localhost:PORT/Product/`
- Retrieve a list of all products in the database.

For reading the users database:
- URL: `http://localhost:PORT/User/`
- Retrieve a list of all users in the database.

To read information about a specific user or product, append its unique ID after the database name in the URL:
- Example: `http://localhost:PORT/User/43102313111`

### POST: Create Data

For creating products in the database:
- URL: `http://localhost:PORT/Product/`
- Create a new product by sending a JSON object as a POST request. An example request body is provided below.

Example Request Body:
```json
{
    "code": "testing post",
    "name": "TESTING NAME",
    "price": "10.80",
    "category": "TESTING CATEGORY",
    "type": "Pants",
    "color": ["BLACK", "RED", "BLUE"],
    "size": ["XS", "S", "M", "L", "XL", "XXL"],
    "path": [
        "https://i.postimg.cc/TEST",
        "https://i.postimg.cc/TEST"
    ]
}
```

For creating users in the database:
- URL: `http://localhost:PORT/User/`
- Create a new user by sending a JSON object as a POST request. An example request body is provided below.

Example Request Body:
```json
{
    "ci": "23456",
    "name": "test",
    "lastName": "test",
    "password": "test",
    "gender": "Male"
}
```

### UPDATE: Update Data

For updating products in the database:
- URL: `http://localhost:PORT/Product/:ID`
- Update a product by sending a JSON object with the values you want to change. The `:ID` parameter in the URL specifies the product's unique ID.

For updating users in the database:
- URL: `http://localhost:PORT/User/:ID`
- Update a user by sending a JSON object with the values you want to change. The `:ID` parameter in the URL specifies the user's unique ID.

### DELETE: Delete Data

For deleting products from the database:
- URL: `http://localhost:PORT/Product/:ID`
- Delete a product by specifying its unique ID in the URL.

For deleting users from the database:
- URL: `http://localhost:PORT/User/:ID`
- Delete a user by specifying their unique ID in the URL.

If any request is incorrect or encounters an issue, an error message will be displayed.
