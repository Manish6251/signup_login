const db = require('../config/db');

const createUser = (username, email, encryptedPassword, contact_number, callback) => {
    const query =`call auth_db.USER_INSERT(?, ?, ?, ?)`;
    db.execute(query, [username, email, encryptedPassword, contact_number], callback);
};

const findUserByUsername = (username, callback) => {
    const query = "SELECT * FROM user WHERE username = ?";
    db.execute(query, [username], callback);
};

module.exports = {
    createUser,
    findUserByUsername
};