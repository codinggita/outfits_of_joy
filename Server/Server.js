const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { MongoClient } = require('mongodb');
var cors = require('cors')
const { ObjectId } = require('mongodb');


cloudinary.config({
    cloud_name: "dqkexqgnj",
    api_key: 455756836716941,
    api_secret: "cnNq2xwwFrqpR4DjnMQ8DpiPwQo",
});

const app = express();
const port = 3000;
app.use(cors())

const url = "mongodb+srv://parth_jadav:parthjadav363310@outfitsofjoy.begzp.mongodb.net/";
const dbName = "cloth_collections";

// Multer Configuration for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Middleware
app.use(express.json());

let db, sherwani, indo_western, tuxedo, lehenga, anarkali, gown, users;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        sherwani = db.collection("sherwani");
        indo_western = db.collection("indo_western");
        tuxedo = db.collection("tuxedo");
        lehenga = db.collection("lehenga");
        anarkali = db.collection("anarkali");
        gown = db.collection("gown");
        users = db.collection("users");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();




// Routes
//admin side

// POST: Add a new sherwani
app.post("/outfits-of-joy/collection/sherwani", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const newSherwani = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await sherwani.insertOne(newSherwani);
        res.status(201).send(`Sherwani added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding sherwani:", err);
        res.status(500).send("Error adding sherwani: " + err.message);
    }
}
);


// POST: Add a new indo_western
app.post("/outfits-of-joy/collection/indo_western", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const new_indo_western = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await indo_western.insertOne(new_indo_western);
        res.status(201).send(`indo_western added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding indo_western:", err);
        res.status(500).send("Error adding indo_western: " + err.message);
    }
}
);

// POST: Add a new tuxedo
app.post("/outfits-of-joy/collection/tuxedo", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const new_tuxedo = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await tuxedo.insertOne(new_tuxedo);
        res.status(201).send(`tuxedo added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding tuxedo:", err);
        res.status(500).send("Error adding tuxedo: " + err.message);
    }
}
);


// POST: Add a new lehenga
app.post("/outfits-of-joy/collection/lehenga", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const new_lehenga = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await lehenga.insertOne(new_lehenga);
        res.status(201).send(`lehenga added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding lehenga:", err);
        res.status(500).send("Error adding lehenga: " + err.message);
    }
}
);


// POST: Add a new anarkali
app.post("/outfits-of-joy/collection/anarkali", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const new_anarkali = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await anarkali.insertOne(new_anarkali);
        res.status(201).send(`anarkali added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding anarkali:", err);
        res.status(500).send("Error adding anarkali: " + err.message);
    }
}
);


// POST: Add a new gown
app.post("/outfits-of-joy/collection/gown", upload.array("images", 4), async (req, res) => {
    try {
        const { _id, title, category, description, sizes, stock, rent, mrp, deposit } =
            req.body;

        const folderName = category.toLowerCase();

        const uploadedImages = [];
        const files = req.files;

        // Upload images to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName, // Optional: store in a specific folder
            });
            uploadedImages.push(result.secure_url); // Store the Cloudinary URL
        }

        // Insert data into MongoDB
        const new_gown = {
            _id,
            title,
            category,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        const result = await gown.insertOne(new_gown);
        res.status(201).send(`gown added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding gown:", err);
        res.status(500).send("Error adding gown: " + err.message);
    }
}
);



//ROUTES
//user side

// GET: List all sherwani
app.get('/outfits-of-joy/collection/sherwani', async (req, res) => {
    try {
        const allsherwani = await sherwani.find().toArray();
        res.status(200).json(allsherwani);
    } catch (err) {
        res.status(500).send("Error fetching sherwani: " + err.message);
    }
});


// GET: List all indo_western
app.get('/outfits-of-joy/collection/indo_western', async (req, res) => {
    try {
        const allindo_western = await indo_western.find().toArray();
        res.status(200).json(allindo_western);
    } catch (err) {
        res.status(500).send("Error fetching indo_western: " + err.message);
    }
});


// GET: List all tuxedo
app.get('/outfits-of-joy/collection/tuxedo', async (req, res) => {
    try {
        const alltuxedo = await tuxedo.find().toArray();
        res.status(200).json(alltuxedo);
    } catch (err) {
        res.status(500).send("Error fetching tuxedo: " + err.message);
    }
});


// GET: List all lehenga
app.get('/outfits-of-joy/collection/lehenga', async (req, res) => {
    try {
        const alllehenga = await lehenga.find().toArray();
        res.status(200).json(alllehenga);
    } catch (err) {
        res.status(500).send("Error fetching lehenga: " + err.message);
    }
});


// GET: List all anarkali
app.get('/outfits-of-joy/collection/anarkali', async (req, res) => {
    try {
        const allanarkali = await anarkali.find().toArray();
        res.status(200).json(allanarkali);
    } catch (err) {
        res.status(500).send("Error fetching anarkali: " + err.message);
    }
});


// GET: List all gown
app.get('/outfits-of-joy/collection/gown', async (req, res) => {
    try {
        const allgown = await gown.find().toArray();
        res.status(200).json(allgown);
    } catch (err) {
        res.status(500).send("Error fetching gown: " + err.message);
    }
});



//USERS
// POST: Add a new user
app.post('/outfits-of-joy/users', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, address } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Insert the new user into the users collection
        const result = await users.insertOne({
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully!', user: result.ops[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



//Get: fetch user by userid
app.get('/outfits-of-joy/users/:userid', async (req, res) => {
    try {
        const _id = new ObjectId(req.params.userid)
        const user = await users.findOne({ _id });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        res.status(500).send("Error fetching user: " + error.message);
    }
})


//PATCH: edit user details
app.patch('/outfits-of-joy/users/:userid', upload.none(), async (req, res) => {
    try {
        const _id = new ObjectId(req.params.userid)
        const { firstName, lastName, email, password, phone, address } = req.body;

        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (address) updates.address = address;
        if (password) updates.password = password;

        const existingUser = await users.findOne({ _id });
        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        const result = await users.updateOne({_id}, {$set: updates});
        console.log(updates)
        res.status(200).json({message: "User updated successfully",result});
    }
    catch (error) {
        res.status(500).send("Error updating user: " + error.message);
    }
})
