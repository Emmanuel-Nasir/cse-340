const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

/* ****************************************
*  Build Management View
* *************************************** */
invController.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Build Add Classification View
* *************************************** */
invController.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Add Classification
* *************************************** */
invController.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  try {
    const result = await invModel.addClassification(classification_name)
    if (result) {
      req.flash("notice", `Classification ${classification_name} added.`)
      res.redirect("/inv/")
    } else {
      req.flash("error", "Failed to add classification.")
      res.status(500).render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

/* ****************************************
*  Build Add Inventory View
* *************************************** */
invController.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classifications = await invModel.getClassifications()
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classifications,
    errors: null,
  })
}

/* ****************************************
*  Add Inventory
* *************************************** */
invController.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  try {
    const result = await invModel.addInventory(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )
    if (result) {
      req.flash("notice", `The ${inv_make} ${inv_model} was added.`)
      res.redirect("/inv/")
    } else {
      req.flash("error", "Failed to add vehicle.")
      const classifications = await invModel.getClassifications()
      res.status(500).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classifications,
        errors: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

/* ****************************************
*  Build By Classification
* *************************************** */
invController.buildByClassificationId = async function (req, res, next) {
  const classificationId = parseInt(req.params.classificationId, 10)
  if (isNaN(classificationId)) {
    req.flash("error", "Invalid classification ID.")
    return res.status(400).render("inventory/classification", {
      title: "Invalid Request",
      nav: await utilities.getNav(),
      vehicles: [],
    })
  }

  let nav = await utilities.getNav()
  try {
    const data = await invModel.getInventoryByClassificationId(classificationId)
    if (data && data.length > 0) {
      res.render("inventory/classification", {
        title: data[0].classification_name + " Vehicles",
        nav,
        vehicles: data,
      })
    } else {
      req.flash("notice", "No vehicles found for this classification.")
      res.status(404).render("inventory/classification", {
        title: "No Vehicles Found",
        nav,
        vehicles: [],
      })
    }
  } catch (error) {
    next(error)
  }
}

/* ****************************************
*  Build Vehicle Detail
* *************************************** */
invController.buildInventoryDetail = async function (req, res, next) {
  const invId = parseInt(req.params.invId, 10)
  if (isNaN(invId)) {
    req.flash("error", "Invalid vehicle ID.")
    return res.status(400).render("inventory/detail", {
      title: "Invalid Request",
      nav: await utilities.getNav(),
      vehicle: null,
    })
  }

  let nav = await utilities.getNav()
  try {
    const data = await invModel.getInventoryDetailById(invId)
    if (data) {
      res.render("inventory/detail", {
        title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
        nav,
        vehicle: data,
      })
    } else {
      req.flash("notice", "Vehicle not found.")
      res.status(404).render("inventory/detail", {
        title: "Vehicle Not Found",
        nav,
        vehicle: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = invController
