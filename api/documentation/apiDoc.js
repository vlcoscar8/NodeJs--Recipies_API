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
 *          RecipeCategory:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The category's name
 *                      required: true
 *                  recipes:
 *                      type: array
 *                      description: The list of recipes inside the category
 *                      required: true
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
 *
 */

/**
 * @swagger
 *  tags:
 *    - name: Food
 *      description: The Food routes
 *    - name: RecipeCategory
 *      description: The RecipeCategory routes
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
 *              maximum: 9
 *              default: 0
 *        - in: query
 *          name: limit
 *          description: The last index where finish the list of foods
 *          required: false
 *          schema:
 *              type: integer
 *              minimum: 1
 *              maximum: 10
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
 *                  foodName:
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
 * /food:
 *    patch:
 *      summary: Uploads an image of the Food family
 *      operationId: UploadFile
 *      tags: [ Food ]
 *      consumes:
 *        - multipart/form-data
 *      produces:
 *        - application/json
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    required: true
 *                    description: The food family id to be patched
 *                  img:
 *                    type: file
 *                    required: true
 *                    description: The new food family image to be uploaded
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
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    $ref: #/components/schema/Food
 *          400:
 *              description: Food not found
 */

/**
 * @swagger
 * /categories:
 *    get:
 *      summary: Returns the category food list
 *      tags: [ RecipeCategory ]
 *      responses:
 *          200:
 *              description: The category food llist
 *          400:
 *              description: Category food not found
 */

/**
 * @swagger
 * /categories/{id}:
 *    get:
 *      summary: Return the recipe category by id
 *      tags: [ RecipeCategory ]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Return the recipe category by id
 *          required: true
 *          schema:
 *              type: string
 *          example: 62644478921d05d8775a4672
 *      responses:
 *          200:
 *              description: The recipe category by id
 *          400:
 *              description: Recipe category not found
 */

/**
 * @swagger
 * /categories:
 *    post:
 *      summary: Create new Recipe category
 *      tags: [ RecipeCategory ]
 *      requestBody:
 *        description: Insert the body of the new category
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/RecipeCategory'
 *      responses:
 *          200:
 *              description: The RecipeCategory has been posted
 *          400:
 *              description: RecipeCategory not found
 */

/**
 * @swagger
 * /categories:
 *    patch:
 *      summary: Push a Recipe into a Category
 *      tags: [ RecipeCategory ]
 *      requestBody:
 *        description: The request body needs the recipe id and the category id where the recipe is pushed
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
 *                  categoryId:
 *                      type: string
 *                      description: The category's id where the recipe is pushed
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully pushed
 *          400:
 *              description: The recipe or the category is not found
 */

/**
 * @swagger
 * /categories/food:
 *    patch:
 *      summary: Push a Category into a Food family
 *      tags: [ RecipeCategory ]
 *      requestBody:
 *        description: The request body needs the category id and the food family id where the category is pushed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  categoryId:
 *                      type: string
 *                      description: The category's id to be pushed
 *                      required: true
 *                  foodId:
 *                      type: string
 *                      description: The food family's id where the category is pushed
 *                      required: true
 *      responses:
 *          200:
 *              description: The category is successfully pushed
 *          400:
 *              description: The category or the food family is not found
 */

/**
 * @swagger
 * /categories/{id}:
 *    delete:
 *      summary: Delete a Recipe Category
 *      tags: [ RecipeCategory ]
 *      operationId: deleteCategory
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The category's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The category has been deleted
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    $ref: #/components/schema/RecipeCategory
 *          400:
 *              description: RecipeCategory not found
 */

/**
 * @swagger
 * /categories:
 *    delete:
 *      summary: Remove a Recipe from a Category
 *      tags: [ RecipeCategory ]
 *      requestBody:
 *        description: The request body needs the recipe id and the category id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  recipeId:
 *                      type: string
 *                      description: The recipe's id to be removed
 *                      required: true
 *                  categoryId:
 *                      type: string
 *                      description: The category's id where the recipe is removed
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully removed from the category
 *          400:
 *              description: The recipe is not removed from the category
 */

/**
 * @swagger
 * /categories/food:
 *    delete:
 *      summary: Remove a Category from a Food family
 *      tags: [ RecipeCategory ]
 *      requestBody:
 *        description: The request body needs the category id and the food family id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  categoryId:
 *                      type: string
 *                      description: The category's id to be removes
 *                      required: true
 *                  foodId:
 *                      type: string
 *                      description: The food's id where the category is removed
 *                      required: true
 *      responses:
 *          200:
 *              description: The recipe is successfully removed from the category
 *          400:
 *              description: The recipe is not removed from the category
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
 *          example: pasta
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
 *          example: 20
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
 *      produces:
 *        - application/json
 *      parameters:
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
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    $ref: #/components/schema/Recipe
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
 * /recipes/{id}:
 *    delete:
 *      summary: Delete a Recipe
 *      tags: [ Recipe ]
 *      operationId: deleteRecipe
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The recipe's id that needs to be deleted
 *          required: true
 *          schema:
 *              type: string
 *          example: 626444af22513f8bc78f0b16
 *      responses:
 *          200:
 *              description: The recipe has been deleted
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    $ref: #/components/schema/Recipe
 *          400:
 *              description: Recipe not found
 */

/**
 * @swagger
 * /ingredient/:id:
 *    patch:
 *      summary: Create an Ingredient and push into a recipe by Id
 *      tags: [ Ingredient ]
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
