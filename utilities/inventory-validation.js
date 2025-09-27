const { body, validationResult } = require("express-validator");

const invValidate = {};

/* ✅ Classification validation */
invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty().withMessage("Classification name is required.")
      .isAlphanumeric().withMessage("No spaces or special characters allowed.")
  ];
};

invValidate.checkClassificationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = res.locals.nav;
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
      classification_name: req.body.classification_name
    });
  }
  next();
};

/* ✅ Inventory validation */
invValidate.inventoryRules = () => {
  return [
    body("classification_id")
      .notEmpty().withMessage("Please select a classification"),
    body("inv_make")
      .trim()
      .notEmpty().withMessage("Vehicle make is required"),
    body("inv_model")
      .trim()
      .notEmpty().withMessage("Vehicle model is required"),
    body("inv_year")
      .trim()
      .notEmpty().withMessage("Vehicle year is required")
      .isInt({ min: 1900, max: 2099 }).withMessage("Year must be a valid number"),
    body("inv_description")
      .trim()
      .notEmpty().withMessage("Description is required"),
    body("inv_image")
      .trim()
      .notEmpty().withMessage("Image path is required"),
    body("inv_thumbnail")
      .trim()
      .notEmpty().withMessage("Thumbnail path is required"),
    body("inv_price")
      .trim()
      .notEmpty().withMessage("Price is required")
      .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("inv_miles")
      .trim()
      .notEmpty().withMessage("Mileage is required")
      .isFloat({ min: 0 }).withMessage("Mileage must be a positive number"),
    body("inv_color")
      .trim()
      .notEmpty().withMessage("Color is required"),
  ];
};

invValidate.checkInventoryData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = res.locals.nav;
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: errors.array(),
      // Sticky values for all fields
      classification_id: req.body.classification_id,
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_description: req.body.inv_description,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color
    });
  }
  next();
};

module.exports = invValidate;
