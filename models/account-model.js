const pool = require("../database/")

async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = `
      INSERT INTO account (
        account_firstname, account_lastname, account_email, account_password, account_type
      ) VALUES ($1, $2, $3, $4, 'Client')
      RETURNING *
    `
    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password
    ])
    return result.rows[0] // Return just the inserted row
  } catch (error) {
    console.error("Database error in registerAccount:", error)
    throw error // Let the controller handle it
  }
}

module.exports = { registerAccount }
