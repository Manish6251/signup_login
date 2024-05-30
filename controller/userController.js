const userModel = require('../model/userModel');
const { encrypt, decrypt } = require('../utils/cryptoUtils');

const signup = (req, res) => {
    const { username, email, password, contact_number } = req.body;
    
    if (!username || !email || !password || !contact_number) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Encrypt password
        const encryptedPassword = encrypt(password);

        userModel.createUser(username, email, JSON.stringify(encryptedPassword), contact_number, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('All fields are required');
    }

    userModel.findUserByUsername(username, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }

        const user = results[0];
        const decryptedPassword = decrypt(JSON.parse(user.password));

        if (password !== decryptedPassword) {
            return res.status(400).send('Invalid username or password');
        }

        res.status(200).send('Login successful');
    });
};

module.exports = {
    signup,
    login
};