// models/account-model.js
const pool = require("../database/")

/* ========== REGISTER ACCOUNT ========== */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = `
      INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING account_id, account_firstname, account_lastname, account_email
    `
    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password
    ])
    return result.rows[0]
  } catch (error) {
    console.error("Error inserting account:", error)
    throw error
  }
}

/* ========== GET ACCOUNT BY EMAIL ========== */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      "SELECT * FROM account WHERE account_email = $1",
      [account_email]
    )
    return result.rows[0]
  } catch (error) {
    console.error("Error getting account by email:", error)
    throw error
  }
}

module.exports = { registerAccount, getAccountByEmail }
