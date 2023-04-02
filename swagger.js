const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
  "definitions": {
    User: m2s(User),
    Product: m2s(Product)
  },
  "swagger":"2.0",
  "info":{
    "version":"1.0.0",
    "description":"Products Project Application API",
    "title":"Products CRUD API"
  },
  "host":"localhost:3000",
  "basePath":"/",
  "tags":[
    { "name":"Users", "description":"API for users" },
    { "name": "Products", "description": "API for Products" },
    { "name":"Users and Products", "description":"API for users and their products" }
  ],
  "schemes":["http"],
  "consumes":["application/json"],
  "produces":["application/json"],
  "paths":{

    // User
    "/api/user/findAll":{
      "get":{
        "tags":[
          "Users"
        ],
        "summary":"Gets all users",
        "responses":{
          "200":{
            "description":"OK",
            "schema":{
              "$ref":"#/definitions/User"
            }
          }
        }
      }
    },

    "/api/user/findOne/{username}":{
      "get":{
        "tags":[
          "Users"
        ],
        "parameters":[
          {
            "name":"username",
            "in":"path",
            "required":true,
            "description":"Username of user",
            "type":"string"
          }
        ],
        "summary":"Gets a user",
        "responses":{
          "200":{
            "description":"User find",
            "schema":{
              "$ref":"#/definitions/User"
            }
          }
        }
      }
    },

    "/api/user/create":{
      "post":{
        "tags":["Users"],
        "description":"Creates a new user",
        "parameters":[{
          "name":"Parameters for user",
          "in":"body",
          "description":"Users parametres that we will create",
          "schema":{
            // "$ref":"#/definitions/User" 
            "type":"object",
            "properties":{
              "name":{"type":"string"},
              "surname":{"type":"string"},
              "username":{"type":"string"},
              "password":{"type":"string"},
              "email":{"type":"string"},
              "address":{
                "type":"object",
                "properties":{
                  "area":{"type":"string"},
                  "road":{"type":"string"}
                },
              },
              "phone":{
                "type":"array",
                "items":{
                  "type":"object",
                  "properties":{
                    "type":{"type":"string"},
                    "number":{"type":"string"},
                  },
                },
              },
            },
            "required":["username","email"]
          }
        }],
        "summary":"Creates a new user",
        "produces":["application/json"],
        "responses":{
          "200":{
            "description":"New user is created",
            // "schema":{
            //   "$ref":"#/definitions/User"
            // }
          }
        }
      }
    },

    "/api/user/update":{
      "patch":{
        "tags":[
          "Users"
        ],
        "description":"Update user in system",
        "parameters":[{
          "name":"update user",
          "in":"body",
          "description":"User that we will update",
          "schema":{
            "type":"object",
            "properties":{
              "username": {"type":"string"},
              "name":{"type":"string"},
              "surname":{"type":"string"},
              "email":{"type":"string"},
              "address":{
                "type":"object",
                "properties":{
                  "area":{"type":"string"},
                  "road":{"type":"string"},
                },
              },
              "phone":{
                "type":"array",
                "items":{
                  "type":"object",
                  "properties":{
                    "type":{"type":"string"},
                    "number":{"type":"string"},
                  },
                },
              },
            },
            "required":["email"]
          }
        }],
        "summary":"Updates an existing user",
        "produces":["application/json"],
        "responses":{
          "200":{
            "description":"User updated"
          }
        }
      }
    },

    "/api/user/delete/{username}":{
      "delete":{
        "tags":[
          "Users"
        ],
        "description":"Deletes user",
        "parameters":[{
          "name":"username",
          "in":"path",
          "description":"Username of user to be deleted"
        }],
        "summary":"Deletes a user",
        "responses":{
          "200":{
            "description":"User deleted"
          }
        }
      }
    },

    // Product
    "/api/product/findAll":{
      "get":{
        "tags":["Products"],
        "summary":"Returns all products",
        "responses":{
          "200":{
            "description":"OK",
            "schema":{
              "type":"object",
              "properties":{
                "product":{"type":"string"},
                "description":{"type":"string"},
                "cost":{"type":"number"},
                "quantity":{"type":"number"}
              }
            }
          }
        }
      }
    },

    "/api/product/findOne/{productName}":{
      "get":{
        "tags":["Products"],
        "parameters":[
          {
            "name":"productName",
            "in":"path",
            "required":true,
            "description":"The product's name",
            "type":"string"
          }
        ],
        "summary":"Returns the product having productName",
        "responses":{
          "200":{
            "description":"OK",
            "schema":{
              "$ref":"#/definitions/Product"
            }
          }
        }
      }
    },

    "/api/product/create":{
      "post":{
        "tags":["Products"],
        "description":"Creates a new product and inserts it into the datasource",
        "parameters":[{
          "name":"Product Parameters",
          "in":"body",
          "description":"Properties of product to be created",
          "schema":{
            "type":"object",
              "properties":{
                "product":{"type":"string"},
                "description":{"type":"string"},
                "cost":{"type":"number"},
                "quantity":{"type":"number"}
              } 
            },
            "required":["product"]
        }],
        "summary":"Creates a new product",
        "produces":["application/json"],
        "responses":{
          "200":{
            "description":"New product created",
          }
        }
      }
    },

    "/api/product/update":{
      "patch":{
        "tags":[
          "Products"
        ],
        "description":"Updates a product",
        "parameters":[{
          "name":"Product to be updated",
          "in":"body",
          "description":"Product properties to be updated",
          "schema":{
            "type":"object",
              "properties":{
                "product":{"type":"string"},
                "description":{"type":"string"},
                "cost":{"type":"number"},
                "quantity":{"type":"number"}
              }},
            "required":["product"]
        }],
        "summary":"Updates a product",
        "produces":["application/json"],
        "responses":{
          "200":{
            "description":"Product updated"
          }
        }
      }
    },

    "/api/product/delete/{productName}":{
      "delete":{
        "tags":[
          "Products"
        ],
        "description":"Deletes product with productName",
        "parameters":[{
          "name":"productName",
          "in":"path",
          "description":"Product to be deleted"
        }],
        "summary":"Deletes a product",
        "responses":{
          "200":{
            "description":"Product deleted"
          }
        }
      }
    },

    // UserProducts
    "/api/userproducts/findOne/{username}":{
      "get":{
        "tags":[
          "Users and Products"
        ],
        "parameters":[{
          "name":"username",
          "in":"path",
          "description":"Find user's products",
          "type":"string"
        }],
        "responses":{
          "200":{
            "description":"User and Products"
          }
        }
      }
    },

    "/api/userproduct/create": {
      "post": {
        "tags": [
          "Users and Products"
        ],
        "description": "Add new product for user in system",
        "parameters": [
          {
            "name": "Add new product for user",
            "in": "body",
            "description": "Product that we want to add to user",
            "schema": {
              "type": "object",
              "properties": {
                "username": { "type": "string" },
                "product": { "type": "string" },
                "cost": { "type": "number" },
                "quantity": { "type": "number" }
              },
              "required": ["quantity"]
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New product is added",
          }
        }
      } 
    },

    "/api/userproduct/update": {
      "patch": {
        "tags": [
          "Users and Products"
        ],
        "description": "Update product from user system",
        "parameters": [{
          "name": "update product from user in system",
          "in": "body",
          "description": "Product of user that we will update",
          "schema":{
            "type":"object",
            "properties": {
              "username": { "type": "string" },
              "product": { "type": "string" },
              "cost": { "type": "number" },
              "quantity": { "type": "number" }
            },
            "required": ["quantity"]
          }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a product of user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      } 
    },

    "/api/userproduct/delete/{username}/{product}": {
      "delete": {
        "tags": [
          "Users and Products"
        ],
        "description": "Delete product from user in system",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "Username that we want to find",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        },{
          "name": "product",
          "in": "path",
          "description": "Product to be deleted",
          "schema": {
            "$ref": "#/components/schemas/User"
          }
      }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a product from user",
          }
        }
      } 
    }
    
  }
}