const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")

// Management view
router.get("/", invController.buildManagement)

// Add Classification
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
)

// Add Inventory
router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
)

// View by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

//View Inventory Detail
router.get("/detail/:invId", invController.buildInventoryDetail)

module.exports = router
