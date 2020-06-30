const express = require("express");
const apiRouter = express.Router();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");

apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());

apiRouter.get("/signup", (request, response) => {
    response.json({ 
      message: "signup"
    } );
  });

  apiRouter.post("/signup", userController.signup );
  
  module.exports = apiRouter;