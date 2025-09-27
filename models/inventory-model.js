const pool = require("../database/");

const invModel = {};

/* ************************
 * Add a new classification
 ************************** */
invModel.addClassification = async function (classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [classification_name]);

    // Return rowCount to indicate success, plus the inserted row
    return { rowCount: result.rowCount, row: result.rows[0] };
  } catch (error) {
    console.error("Add Classification Error:", error);
    return { rowCount: 0, row: null };
  }
};

/* ************************
 * Add a new inventory item
 ************************** */
invModel.addInventory = async function (inventoryData) {
  try {
    const sql = `INSERT INTO inventory
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;

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
    } = inventoryData;

    const data = [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id];

    const result = await pool.query(sql, data);

    return { rowCount: result.rowCount, row: result.rows[0] };
  } catch (error) {
    console.error("Add Inventory Error:", error);
    return { rowCount: 0, row: null };
  }
};

/* ************************
 * Get all classifications (for nav and select lists)
 ************************** */
invModel.getClassifications = async function () {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result;
  } catch (error) {
    console.error("Get Classifications Error:", error);
    return { rows: [] };
  }
};

module.exports = invModel;
