const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()
  // You need to build the HTML for the vehicle details, or pass the data to the view
  res.render("inventory/detail", {
    title: data.inv_make + " " + data.inv_model,
    nav,
    vehicle: data,
  })
}

module.exports = invCont