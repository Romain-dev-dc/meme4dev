require('dotenv').config();

exports.authenticate = (req, res) => {
    const { password } = req.body;
    if (password === process.env.PASSWORD) {
        res.json(true);
    } else {
        res.status(401).json(false);
    }
};