const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")

// Task 1: Management view
router.get("/", invController.buildManagement)

// Task 2: Add Classification
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
)

// Task 3: Add Inventory
router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
)

module.exports = router
