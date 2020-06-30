const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/signup", (request, response) => {
    response.json({ 
      message: "signup"
    } );
  });

  module.exports = router;
  