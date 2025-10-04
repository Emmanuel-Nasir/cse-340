const express = require("express");
const router = express.Router();
const utilities = require("../utilities");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process login
router.post("/login", utilities.handleErrors(accountController.loginAccount));

// Build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
