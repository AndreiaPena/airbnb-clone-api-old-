const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require('./signup');

// const promosRoutes = require("./promos.routes");
const router = express.Router();

router.use(bodyParser.json());


// router.use("/api/promos", promosRoutes);
router.get("/", (request, response) => {
    response.json({ message: "Hello, World :) !" });
  });
  
router.use("/api", apiRouter);

router.use("*", (request, response) => {
  response.status(404).json({
    error: "Oups, error !"
  });
});


// ERROR HANDLER
router.use((error, request, response, next) => {
  console.error(error);
  response.status(400).json({
    error: error.message
  });
})

module.exports = router;