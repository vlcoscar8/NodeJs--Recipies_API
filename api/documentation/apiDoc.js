/**
 * @swagger
 *  components:
 *      schemas:
 *          Food:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: The food's name
 *                      required: true
 *                  img:
 *                      type: file
 *                      description: The image's food
 *                      required: true
 *                  categories:
 *                      type: array
 *                      description: The list of categories inside of the food type
 *                      required: false
 *          Recipe:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of the recipe
 *                      required: true
 *                  food:
 *                      type: string
 *                      description: The food's name
 *                      required: true
 *                  category:
 *                      type: string
 *                      description: The category's name
 *                      required: true
 *                  img:
 *                      type: string
 *                      description: The recipe's image
 *                      required: true
 *                  description:
 *                      type: string
 *                      description: The recipe's description
 *                      required: true
 *                  difficulty:
 *                      type: string
 *                      description: The recipe's difficulty
 *                      required: true
 *                  time:
 *                      type: integer
 *                      description: The time needed to finish the recipe in minutes
 *                      required: true
 *                  people:
 *                      type: integer
 *                      description: The number of people the recipe is intended for
 *                      required: true
 *                  ingredients:
 *                      type: array
 *                      description: The recipe's ingredients
 *                      required: true
 *                  steps:
 *                      type: array
 *                      description: The recipe's steps needed to follow the recipe
 *                      required: true
 *                  owner:
 *                      type: array
 *                      description: The recipe's owner
 *                      required: true
 *                  comments:
 *                      type: array
 *                      description: The recipe's commentaries by the users
 *                      required: true
 *          User:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: The user's email
 *                      required: true
 *                  password:
 *                      type: string
 *                      description: The user's password
 *                      required: true
 *                  username:
 *                      type: string
 *                      description: The user's username
 *                      required: true
 *                  img:
 *                      type: string
 *                      description: The user profile's image
 *                      required: false
 *                  name:
 *                      type: string
 *                      description: The user's name
 *                      required: false
 *                  surname:
 *                      type: string
 *                      description: The user's surname
 *                      required: false
 *                  age:
 *                      type: string
 *                      description: The user's age
 *                      required: false
 *          Ingredient:
 *              type: object
 *              properties:
 *                  number:
 *                      type: integer
 *                      description: The number of units of the ingredient
 *                      required: true
 *                  unit:
 *                      type: string
 *                      description: The measure unit of the ingredient
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name os the ingredient
 *                      required: true
 *          Step:
 *              type: object
 *              properties:
 *                  order:
 *                      type: integer
 *                      description: The number order of the step
 *                      required: true
 *                  description:
 *                      type: string
 *                      description: The description of the step
 *                      required: true
 *          Comment:
 *              type: object
 *              properties:
 *                  content:
 *                      type: string
 *                      description: The content of the commentary
 *                      required: true
 *                  time:
 *                      type: string
 *                      description: The time when the commentary was created
 *                      required: true
 *                  owner:
 *                      type: array
 *                      description: The owner who post the commentary
 *                      required: true
 *
 */

/**
 * @swagger
 *    servers:
 *    - url: https://apirecetasoscar.herokuapp.com/
 *
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    security:
 *       -JWT: []
 *    securityDefinitions:
 *        JWT:
 *          type: apiKey
 *          in: header
 *          name: access_token
 *
 */

/**
 * @swagger
 *  tags:
 *    - name: Food
 *      description: The Food routes
 *    - name: Recipe
 *      description: The Recipe routes
 *    - name: User
 *      description: The User routes
 *    - name: Ingredient
 *      description: The Ingredient routes
 *    - name: Step
 *      description: The Step routes
 *    - name: Comment
 *      description: The Comment routes
 *
 */

/**
 * @swagger
 * /food:
 *    get:
 *      summary: Returns the list of all the food family
 *      tags: [ Food ]
 *      parameters:
 *        - in: query
 *          name: start
 *          description: The first index where start the list of foods
 *          required: false
 *          schema:
 *              type: integer
 *              minimum: 0
 *              maximum: 20
 *              default: 0
 *        - in: query
 *          name: limit
 *          description: The last index where finish the list of foods
 *          required: false
 *          schema:
 *              type: integer
 *              minimum: 1
 *              maximum: 20
 *              default: 10
 *      responses:
 *          200:
 *              description: The list of the food
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /food/{id}:
 *    get:
 *      summary: Return the food by id
 *      tags: [ Food ]
 *      parameters:
 *        - in: query
 *          name: value
 *          description: The name value to filter the food
 *          required: false
 *          schema:
 *              type: string
 *              enum: [recipes]
 *        - in: path
 *          name: id
 *          description: Return the food by id
 *          required: true
 *          schema:
 *              type: string
 *          example: 62644478921d05d8775a4672
 *      responses:
 *          200:
 *              description: The Food by id
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /food:
 *    post:
 *      summary: Create new food family
 *      tags: [ Food ]
 *      consumes:
 *        - multipart/form-data
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  foodName:
 *                    type: string
 *                    required: true
 *                    description: The new food family name
 *                  img:
 *                    type: file
 *                    required: true
 *                    description: The new food family image file
 *      responses:
 *          200:
 *              description: The food has been created
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /food/{id}:
 *    put:
 *      summary: Update a food family
 *      operationId: updateFood
 *      tags: [ Food ]
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The food id that needs to be updated
 *          required: true
 *          schema:
 *              type: string
 *          example: 62662bf9c4e9463db1eaaabf
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: The new food family name to be updated
 *                  img:
 *                    type: file
 *                    description: The new food family image to be updated
 *      responses:
 *          200:
 *              description: The food has been created
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /food/{id}:
 *    delete:
 *      summary: Delete a food family
 *      tags: [ Food ]
 *      operationId: deleteFood
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The food's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The food has been deleted
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /recipes:
 *    get:
 *      summary: Returns the list of all the recipes and can be filtered
 *      tags: [ Recipe ]
 *      parameters:
 *        - in: query
 *          name: food
 *          description: The food family filter of the recipe
 *          required: false
 *          schema:
 *              type: string
 *              enum: [ italian, japanese, mexican, spanish, indian, chinese, french, american, vegan, nordic ]
 *        - in: query
 *          name: category
 *          description: The category filter of the recipe
 *          required: false
 *          schema:
 *              type: string
 *        - in: query
 *          name: difficulty
 *          description: The difficulty filter of the recipe
 *          required: false
 *          schema:
 *              type: string
 *              enum: [ easy, medium, hard ]
 *        - in: query
 *          name: timeLimit
 *          description: The time limit filter of the recipe
 *          required: false
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The list of the recipes
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /recipes/{id}:
 *    get:
 *      summary: Find the recipe by id
 *      tags: [ Recipe ]
 *      operationId: findRecipe
 *      parameters:
 *        - in: query
 *          name: value
 *          description: The value to filter the recipe
 *          required: false
 *          schema:
 *              type: string
 *              enum: [ingredients, steps, comments]
 *        - in: path
 *          name: id
 *          description: The recipe's id
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The recipe is successfully finded
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /recipes:
 *    post:
 *      summary: Create new recipe
 *      tags: [ Recipe ]
 *      consumes:
 *        - multipart/form-data
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    required: true
 *                    description: The new recipe title
 *                  food:
 *                    type: string
 *                    required: true
 *                    description: The food family where the recipe is related
 *                    enum: [ italian, japanese, mexican, spanish, indian, chinese, french, american, vegan, nordic ]
 *                  category:
 *                    type: string
 *                    required: true
 *                    description: The category where the recipe is related
 *                    example: Pasta
 *                  img:
 *                    type: file
 *                    required: true
 *                    description: The new recipe image file
 *                  description:
 *                    type: string
 *                    required: true
 *                    description: The recipe description
 *                  difficulty:
 *                    type: string
 *                    required: true
 *                    description: The recipe difficulty
 *                    enum: [ easy, medium, hard ]
 *                  time:
 *                    type: integer
 *                    required: true
 *                    description: The time required to finish the recipe
 *                  people:
 *                    type: integer
 *                    required: true
 *                    description: The number of people the recipe is intended
 *      responses:
 *          200:
 *              description: The recipe has been created
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /recipes/{id}:
 *    put:
 *      summary: Update a recipe
 *      operationId: updateRecipe
 *      tags: [ Recipe ]
 *      security:
 *        - bearerAuth: []
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe id that needs to be updated
 *          required: true
 *          schema:
 *              type: string
 *          example: 62662bf9c4e9463db1eaaabf
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    required: true
 *                    description: The new recipe title
 *                  food:
 *                    type: string
 *                    required: true
 *                    description: The food family where the recipe is related
 *                    enum: [ italian, japanese, mexican, spanish, indian, chinese, french, american, vegan, nordic ]
 *                  category:
 *                    type: string
 *                    required: true
 *                    description: The category where the recipe is related
 *                    example: Pasta
 *                  img:
 *                    type: file
 *                    required: true
 *                    description: The new recipe image file
 *                  description:
 *                    type: string
 *                    required: true
 *                    description: The recipe description
 *                  difficulty:
 *                    type: string
 *                    required: true
 *                    description: The recipe difficulty
 *                    enum: [ easy, medium, hard ]
 *                  time:
 *                    type: integer
 *                    required: true
 *                    description: The time required to finish the recipe
 *                  people:
 *                    type: integer
 *                    required: true
 *                    description: The number of people the recipe is intended
 *      responses:
 *          200:
 *              description: The recipe has been updated
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /recipes/food:
 *    post:
 *      summary: Push a Recipe into a Food family
 *      tags: [ Recipe ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the recipe id and the food family id where the recipe is pushed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  recipeId:
 *                      type: string
 *                      description: The recipe's id to be pushed
 *                      required: true
 *                  foodId:
 *                      type: string
 *                      description: The food family's id where the recipe is pushed
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully pushed
 *          400:
 *              description: The recipe or the food family is not found
 */

/**
 * @swagger
 * /recipes/{id}:
 *    delete:
 *      summary: Delete a Recipe and remove from Food family and User
 *      tags: [ Recipe ]
 *      operationId: deleteRecipe
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 62663b435cd516f42bc22de8
 *      responses:
 *          200:
 *              description: The recipe has been deleted
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /ingredient/{id}:
 *    get:
 *      summary: Get ingredient detail
 *      tags: [ Ingredient ]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The igredient's id
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The ingredient is successfully edited
 *          400:
 *              description: The ingredient is not edited
 */

/**
 * @swagger
 * /ingredient/{id}:
 *    post:
 *      summary: Create an Ingredient and push into a recipe by Id
 *      tags: [ Ingredient ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe's id that include the ingredient created
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      requestBody:
 *        description: The request body needs the number of units, the name of the unit and the name of the ingredient
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  number:
 *                      type: integer
 *                      description: The number of units
 *                      example: 200
 *                      required: true
 *                  unit:
 *                      type: string
 *                      description: The name of the unit
 *                      example: grams
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the ingredient
 *                      example: spaghetti
 *                      required: true
 *      responses:
 *          200:
 *              description: The ingredient is successfully created and pushed into the recipe
 *          400:
 *              description: The ingredient is not created
 */

/**
 * @swagger
 * /ingredient/{id}:
 *    put:
 *      summary: Edit an Ingredient by Id
 *      tags: [ Ingredient ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The igredient's id edited
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      requestBody:
 *        description: The request body needs the number of units, the name of the unit and the name of the ingredient
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  number:
 *                      type: integer
 *                      description: The number of units
 *                      example: 200
 *                      required: true
 *                  unit:
 *                      type: string
 *                      description: The name of the unit
 *                      example: grams
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the ingredient
 *                      example: spaghetti
 *                      required: true
 *      responses:
 *          200:
 *              description: The ingredient is successfully edited
 *          400:
 *              description: The ingredient is not edited
 */

/**
 * @swagger
 * /ingredient/{id}:
 *    delete:
 *      summary: Delete an ingredient and remove from the recipe
 *      tags: [ Ingredient ]
 *      operationId: deleteIngredient
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ingredient's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The ingredient has been deleted
 *          400:
 *              description: Ingredient not found
 */

/**
 * @swagger
 * /step/{id}:
 *    post:
 *      summary: Create an Step and push into a recipe by Id
 *      tags: [ Step ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe's id that include the step created
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      requestBody:
 *        description: The request body needs the number of the step order and a description
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  order:
 *                      type: integer
 *                      description: The number order of the step
 *                      example: 1
 *                      required: true
 *                  description:
 *                      type: string
 *                      description: The description of the step
 *                      example: Boil watter and cut the vegetables
 *                      required: true
 *      responses:
 *          200:
 *              description: The step is successfully created and pushed into the recipe
 *          400:
 *              description: The step is not created
 */

/**
 * @swagger
 * /step/{id}:
 *    put:
 *      summary: Edit an Step
 *      tags: [ Step ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The step's id
 *          required: true
 *          schema:
 *              type: string
 *          example: 626678ef19a451e1bea3b19d
 *      requestBody:
 *        description: The request body needs the number of the step order and a description
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  order:
 *                      type: integer
 *                      description: The number order of the step
 *                      example: 1
 *                      required: true
 *                  description:
 *                      type: string
 *                      description: The description of the step
 *                      example: Boil watter and cut the vegetables
 *                      required: true
 *      responses:
 *          200:
 *              description: The step is successfully created and pushed into the recipe
 *          400:
 *              description: The step is not created
 */

/**
 * @swagger
 * /step/{id}:
 *    delete:
 *      summary: Delete an step and remove from recipe
 *      tags: [ Step ]
 *      operationId: deleteStep
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The step's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 626678ef19a451e1bea3b19d
 *      responses:
 *          200:
 *              description: The step has been deleted
 *          400:
 *              description: Step not found
 */

/**
 * @swagger
 * /user:
 *    get:
 *      summary: Returns the list of all the users
 *      tags: [ User ]
 *      responses:
 *          200:
 *              description: The list of users
 *          400:
 *              description: Users not found
 */

/**
 * @swagger
 * /user/{id}:
 *    get:
 *      summary: Get user by id and show the user detail
 *      tags: [ User ]
 *      operationId: detailUser
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: value
 *          description: The name value to filter the user
 *          required: false
 *          schema:
 *              type: string
 *              enum: [recipes]
 *        - in: path
 *          name: id
 *          description: The user's id that needs to be showed
 *          required: true
 *          schema:
 *              type: string
 *          example: 626678ef19a451e1bea3b19d
 *      responses:
 *          200:
 *              description: The User finded
 *          400:
 *              description: User not found
 */

/**
 * @swagger
 * /user/register:
 *    post:
 *      summary: Register an User
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the email, the password and the username
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: emailExample@email.com
 *                      required: true
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                      example: 1234
 *                      required: true
 *                  username:
 *                      type: string
 *                      description: The username or nickname of the user
 *                      example: username69
 *                      required: true
 *      responses:
 *          200:
 *              description: The User is successfully registered
 *          400:
 *              description: The User is not registered
 */

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login an User
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the email, the password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: emailExample@email.com
 *                      required: true
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                      example: 1234
 *                      required: true
 *      responses:
 *          200:
 *              description: The User is successfully logged
 *          400:
 *              description: The User is not registered
 */

/**
 * @swagger
 * /user/logout:
 *    post:
 *      summary: Logout an User
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          200:
 *              description: The User is successfully logged out
 *          400:
 *              description: The User is not registered
 */

/**
 * @swagger
 * /user/recipe:
 *    post:
 *      summary: Push an User into a recipe
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the user's id and the the recipe's id where the user is pushed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The user Id
 *                      example: 6266804d903cb3fc821c64bc
 *                      required: true
 *                  recipeId:
 *                      type: string
 *                      description: The recipe Id
 *                      example: 62663b435cd516f42bc22de8
 *                      required: true
 *      responses:
 *          200:
 *              description: The user is successfully pushed into a recipe
 *          400:
 *              description: The User is not pushed
 */

/**
 * @swagger
 * /user/recipe/owner:
 *    post:
 *      summary: Push a Recipe into an User
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the user's id and the the recipe's id where the recipe is pushed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The user Id
 *                      example: 6266804d903cb3fc821c64bc
 *                      required: true
 *                  recipeId:
 *                      type: string
 *                      description: The recipe Id
 *                      example: 62663b435cd516f42bc22de8
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully pushed into a user
 *          400:
 *              description: The Recipe is not pushed
 */

/**
 * @swagger
 * /user/{id}:
 *    post:
 *      summary: Edit the User profile information
 *      tags: [ User ]
 *      consumes:
 *        - multipart/form-data
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The user's id to be edited
 *          required: true
 *          schema:
 *              type: string
 *          example: 6266804d903cb3fc821c64bc
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                    required: true
 *                    description: The username
 *                  img:
 *                    type: file
 *                    required: false
 *                    description: The image profile
 *                  name:
 *                    type: string
 *                    required: false
 *                    description: The name of the user
 *                  surname:
 *                    type: string
 *                    required: false
 *                    description: The surname of the user
 *                  age:
 *                    type: integer
 *                    required: false
 *                    description: The age of the user
 *      responses:
 *          200:
 *              description: The user is successfully edited
 *          400:
 *              description: The user is not edited
 */

/**
 * @swagger
 * /user/admin/{id}:
 *    patch:
 *      summary: Edit the User profile information
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The user's id to be edited
 *          required: true
 *          schema:
 *              type: string
 *          example: 6266804d903cb3fc821c64bc
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  admin:
 *                    type: string
 *                    required: true
 *                    description: If the user has admin rights then the value is true
 *                    enum: [true, false]
 *      responses:
 *          200:
 *              description: The user is successfully edited
 *          400:
 *              description: The user is not edited
 */

/**
 * @swagger
 * /user/recipe:
 *    delete:
 *      summary: Remove a user from a Recipe
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the user id and the recipe id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The user's id to be removed
 *                      example: 6266804d903cb3fc821c64bc
 *                      required: true
 *                  recipeId:
 *                      type: string
 *                      description: The recipe's id where the step is removed
 *                      example: 62663b435cd516f42bc22de8
 *                      required: true
 *      responses:
 *          200:
 *              description: The user is successfully removed from the recipe
 *          400:
 *              description: The user is not removed from the recipe
 */

/**
 * @swagger
 * /user/recipe/owner:
 *    delete:
 *      summary: Remove a Recipe from an User
 *      tags: [ User ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the user id and the recipe id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The user's id where the recipe is removed
 *                      example: 6266804d903cb3fc821c64bc
 *                      required: true
 *                  recipeId:
 *                      type: string
 *                      description: The recipe's id removed
 *                      example: 62663b435cd516f42bc22de8
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully removed from the user
 *          400:
 *              description: The recipe is not removed from the user
 */

/**
 * @swagger
 * /comments/{id}:
 *    post:
 *      summary: Create a Comment and put into a Recipe
 *      tags: [ Comment ]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe's id where the comment will be pushed
 *          required: true
 *          schema:
 *              type: string
 *          example: 62663b435cd516f42bc22de8
 *      requestBody:
 *        description: The request body needs the content of the commentary
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  content:
 *                      type: string
 *                      description: The content of the commentary
 *                      example: This recipe is so nice!
 *                      required: true
 *      responses:
 *          200:
 *              description: The commentary is created and succsessfully pushed on a recipe
 *          400:
 *              description: The comentary is not created
 */

/**
 * @swagger
 * /comments:
 *    patch:
 *      summary: Push an user into a comment
 *      tags: [ Comment ]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The request body needs the user's id and the the comment's id where the user is pushed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The user Id
 *                      example: 6266804d903cb3fc821c64bc
 *                      required: true
 *                  commentId:
 *                      type: string
 *                      description: The comment Id
 *                      example: 6266892118ca9852956a14ef
 *                      required: true
 *      responses:
 *          200:
 *              description: The user is successfully pushed into a comment
 *          400:
 *              description: The User is not pushed
 */

/**
 * @swagger
 * /comments/{id}:
 *    delete:
 *      summary: Delete a commentary
 *      tags: [ Comment ]
 *      operationId: deleteComment
 *      produces:
 *        - application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The commentary's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 6266892118ca9852956a14ef
 *      responses:
 *          200:
 *              description: The commentary has been deleted
 *          400:
 *              description: Commentary not found
 */
