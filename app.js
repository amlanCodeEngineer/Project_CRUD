const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home page (Create User)
app.get('/', (req, res) => {
    res.render('index');
});

// Read Users
app.get('/read', async (req, res) => {
    try {
        const users = await userModel.find();
        res.render("read", { users });
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

// Create User
app.post('/create', async (req, res) => {
    try {
        const { name, email, imageURL } = req.body;

        // Validation
        if (!name || !email) {
            return res.render('index', { error: "Name and Email are mandatory!", name, email, imageURL });
        }

        await userModel.create({ name, email, imageURL });
        res.redirect('/read');
    } catch (err) {
        if (err.code === 11000) { // duplicate email
            return res.render('index', { error: "Email already exists!", ...req.body });
        }
        res.status(500).send("Something went wrong!");
    }
});

// Edit User
app.get('/edit/:userid', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userid);
        res.render("edit", { user });
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

// Update User
app.post('/update/:userid', async (req, res) => {
    try {
        const { name, email, imageURL } = req.body;

        // Validation
        if (!name || !email) {
            const user = await userModel.findById(req.params.userid);
            return res.render('edit', { error: "Name and Email are mandatory!", user });
        }

        await userModel.findByIdAndUpdate(req.params.userid, { name, email, imageURL });
        res.redirect('/read');
    } catch (err) {
        if (err.code === 11000) { // duplicate email
            const user = await userModel.findById(req.params.userid);
            return res.render('edit', { error: "Email already exists!", user });
        }
        res.status(500).send("Something went wrong!");
    }
});

// Delete User
app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/read');
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
