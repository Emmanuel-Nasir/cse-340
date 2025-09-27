const invModel = require("../models/inventory-model");

const Util = {};

/* ************************
 * Wraps async route handlers to catch errors
 ************************ */
Util.handleErrors = function (fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/* ************************
 * Builds the navigation bar HTML
 ************************ */
Util.getNav = async function () {
  try {
    const data = await invModel.getClassifications();
    let nav = "<ul>";
    nav += '<li><a href="/" title="Home page">Home</a></li>';

    data.rows.forEach((row) => {
      nav += `<li>
        <a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`;
    });


    nav += "</ul>";
    return nav;
  } catch (error) {
    console.error("Error building navigation:", error);
    return "<ul><li><a href='/'>Home</a></li></ul>";
  }
};

/* ************************
 * Builds the classification <select> dropdown for forms
 ************************ */
Util.buildClassificationList = async function (selectedId = null) {
  try {
    const data = await invModel.getClassifications();
    let list = '<select name="classification_id" id="classificationList" required>';
    list += "<option value=''>Choose a Classification</option>";

    data.rows.forEach((row) => {
      list += `<option value="${row.classification_id}"`;
      if (selectedId != null && row.classification_id == selectedId) {
        list += " selected";
      }
      list += `>${row.classification_name}</option>`;
    });

    list += "</select>";
    return list;
  } catch (error) {
    console.error("Error building classification list:", error);
    return '<select name="classification_id" id="classificationList"><option value="">No classifications available</option></select>';
  }
};

/* ************************
 * Builds the inventory grid for classification views
 ************************ */
Util.buildClassificationGrid = async function (vehicles) {
  let grid = "";

  if (vehicles && vehicles.length > 0) {
    grid += '<ul id="inv-display">';
    vehicles.forEach((vehicle) => {
      grid += `<li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`;
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }

  return grid;
};

module.exports = Util;
