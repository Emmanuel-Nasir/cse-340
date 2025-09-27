// const invModel = require("../models/inventory-model");
// const utilities = require("../utilities/");

// const invController = {};

// // Task 2: Add Classification
// invController.buildAddClassification = async function (req, res) {
//   let nav = await utilities.getNav();
//   res.render("inventory/add-classification", {
//     title: "Add New Classification",
//     nav,
//     classification_name: "", // initial value for sticky input
//   });
// };

// invController.addClassification = async function (req, res) {
//   const { classification_name } = req.body;
//   const addResult = await invModel.addClassification(classification_name);

//   let nav = await utilities.getNav();

//   if (addResult) {
//     req.flash("notice", "Classification added successfully.");
//     res.redirect("/inv/"); // redirect to management view
//   } else {
//     req.flash("error", "Sorry, adding classification failed.");
//     res.status(501).render("inventory/add-classification", {
//       title: "Add New Classification",
//       nav,
//       classification_name, // sticky input
//     });
//   }
// };

// // Task 3: Add Inventory
// invController.buildAddInventory = async function (req, res) {
//   let nav = await utilities.getNav();
//   const classificationSelect = await utilities.buildClassificationList();
//   res.render("inventory/add-inventory", {
//     title: "Add New Inventory Item",
//     nav,
//     classificationSelect,
//     inv_make: "",
//     inv_model: "",
//     inv_year: "",
//     inv_description: "",
//     inv_image: "/images/no-image.png",
//     inv_thumbnail: "/images/no-image.png",
//     inv_price: "",
//     inv_miles: "",
//     inv_color: "",
//   });
// };

// invController.addInventory = async function (req, res) {
//   const {
//     inv_make, inv_model, inv_year, inv_description, inv_image,
//     inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
//   } = req.body;

//   const addResult = await invModel.addInventory(
//     inv_make, inv_model, inv_year, inv_description,
//     inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
//   );

//   let nav = await utilities.getNav();
//   const classificationSelect = await utilities.buildClassificationList(classification_id);

//   if (addResult) {
//     req.flash("notice", "Inventory item added successfully.");
//     res.redirect("/inv/"); // redirect to management view
//   } else {
//     req.flash("error", "Sorry, adding inventory failed.");
//     res.status(501).render("inventory/add-inventory", {
//       title: "Add New Inventory Item",
//       nav,
//       classificationSelect,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color,
//     });
//   }
// };

// module.exports = invController;
