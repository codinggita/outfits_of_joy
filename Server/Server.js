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

let db, sherwani, indo_western, tuxedo, lehenga, anarkali, gown, users, carts, favourites, orders;

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
        carts = db.collection("carts");
        favourites = db.collection("favourites");
        orders = db.collection("orders");

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
            _id: new ObjectId().toString(),
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully!', user: result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



//Get: fetch user by userid
app.get('/outfits-of-joy/users/:userid', async (req, res) => {
    try {
        const _id = req.params.userid;
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
        const _id = req.params.userid;
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

        const result = await users.updateOne({ _id }, { $set: updates });
        console.log(updates)
        res.status(200).json({ message: "User updated successfully", result });
    }
    catch (error) {
        res.status(500).send("Error updating user: " + error.message);
    }
})


//CART
//POST: add items to cart
app.post('/outfits-of-joy/carts', async (req, res) => {
    try {
        const { userId, productId, size, quantity, fromDate, toDate } = req.body;

        // Find the user's cart
        let cart = await carts.findOne({ userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = {
                userId,
                items: [
                    {
                        productId,
                        size,
                        quantity,
                        fromDate,
                        toDate,
                    },
                ],
                createdAt: new Date(),
            };

            // Insert the new cart into the database
            await carts.insertOne(cart);
            return res.status(201).json(cart);
        } else {
            // If the cart exists, update it with the new item
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());

            if (itemIndex === -1) {
                // If the item does not exist in the cart, push a new item
                cart.items.push({
                    productId,
                    size,
                    quantity,
                    fromDate,
                    toDate,
                });
            } else {
                // If the item exists, update its details
                const item = cart.items[itemIndex];
                item.quantity = quantity;
                item.size = size;
                item.fromDate = fromDate;
                item.toDate = toDate;
            }

            // Update the cart in the database
            await carts.updateOne({ userId }, { $set: { items: cart.items } });

            return res.status(200).json(cart);
        }
    } catch (error) {
        console.error('Error creating or updating cart:', error);
        res.status(500).send('Server error');
    }
});


//GET: Fetch cart for particular user
app.get('/outfits-of-joy/carts/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        const cart_item = await carts.findOne({ userId });
        if (cart_item) {
            res.status(200).json(cart_item);
        } else {
            res.status(404).send("cart_item not found");
        }
    }
    catch (error) {
        res.status(500).send("Error fetching cart_item: " + error.message);
    }
})


//DELETE: Remove a cart item for  user
app.delete('/outfits-of-joy/carts/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Find the user's cart
        const cart = await carts.findOne({ userId });

        // Filter out the item to delete
        const updatedItems = cart.items.filter(
            (item) => item.productId.toString() !== productId.toString()
        );

        // Update the cart in the database
        await carts.updateOne(
            { userId },
            { $set: { items: updatedItems } }
        );

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).send('Server error');
    }
});



//FAVOURITES
//POST: add items to cart
app.post('/outfits-of-joy/favourites', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user's favourites
        let favourite = await favourites.findOne({ userId });

        if (!favourite) {
            // If the favourites list doesn't exist, create a new one
            favourite = {
                userId,
                items: [productId],
                createdAt: new Date(),
            };

            // Insert the new favourites list into the database
            await favourites.insertOne(favourite);
            return res.status(201).json(favourite);
        } else {
            // If the favourites list exists, update it with the new item
            if (!favourite.items.includes(productId)) {
                // If the item does not exist in the favourites list, use $push
                await favourites.updateOne(
                    { userId },
                    { $push: { items: productId } }
                );
                favourite = await favourites.findOne({ userId });
            }

            return res.status(200).json(favourite);
        }
    } catch (error) {
        console.error('Error creating or updating favourites:', error);
        res.status(500).send('Server error');
    }
});




//GET: Fetch favourites for particular user
app.get('/outfits-of-joy/favourites/:userid', async (req, res) => {
    try {
        const userId = parseInt(req.params.userid);
        console.log({ userId })
        const favourite_item = await favourites.findOne({ userId });
        if (favourite_item) {
            res.status(200).json(favourite_item);
        } else {
            res.status(404).send("favourite_item not found");
        }
    }
    catch (error) {
        res.status(500).send("Error fetching favourite_item: " + error.message);
    }
})


// DELETE: Remove a favourite item for  user
app.delete('/outfits-of-joy/favourites/:userid/:productid', async (req, res) => {
    try {
        const userId = parseInt(req.params.userid);
        const productId = req.params.productid;

        // Find the user's favourites
        let favourite = await favourites.findOne({ userId });

        if (!favourite) {
            return res.status(404).send("Favourites list not found");
        }

        // Check if the product exists in the favourites list
        const itemIndex = favourite.items.indexOf(productId);

        if (itemIndex === -1) {
            return res.status(404).send("Product not found in favourites");
        }

        // Remove the product from the favourites list
        favourite.items.splice(itemIndex, 1);

        // Update the favourites list in the database
        await favourites.updateOne(
            { userId },
            { $set: { items: favourite.items } }
        );

        return res.status(200).json(favourite);
    } catch (error) {
        console.error('Error removing favourite item:', error);
        res.status(500).send("Error removing favourite item: " + error.message);
    }
});



//ORDERS
//POST: add orders
app.post("/outfits-of-joy/orders", async (req, res) => {
    try {
        const { userId, productId, quantity, size, status, orderDate, fromDate, toDate } = req.body;

        // Validate required fields
        if (!userId || !productId || !quantity || !size || !status || !orderDate || !fromDate || !toDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newOrder = {
            orderId: new ObjectId().toString(),
            productId,
            quantity,
            size,
            status,
            orderDate: new Date(orderDate),
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
            createdAt: new Date(),
        };

        const result = await orders.updateOne(
            { _id: userId },
            { $push: { orders: newOrder } },
            { upsert: true } // Create a new document if it doesn't exist
        );

        res.status(201).json({ message: "Order added successfully", result });
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ error: "Failed to add order" });
    }
});



//GET: fetch user orders
app.get("/outfits-of-joy/orders/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const userOrders = await orders.findOne({ _id: userId });

        res.status(200).json(userOrders.orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});



//GET: fetch mens-collections
app.get("/outfits-of-joy/mens-collections", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 20 items per page

        const sherwaniItems = await sherwani.find().skip((page - 1) * limit).limit(limit).toArray();
        const tuxedoItems = await tuxedo.find().skip((page - 1) * limit).limit(limit).toArray();
        const indoWesternItems = await indo_western.find().skip((page - 1) * limit).limit(limit).toArray();

        const allItems = [...sherwaniItems, ...tuxedoItems, ...indoWesternItems];

        const shuffledItems = allItems.sort(() => Math.random() - 0.5);

        res.status(200).json(shuffledItems);
    } catch (error) {
        console.error("Error fetching collections:", error);
        res.status(500).json({ error: "Failed to fetch collections" });
    }
});



//GET: fetch womens-collections
app.get("/outfits-of-joy/womens-collections", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 20 items per page

        const lehengaItems = await lehenga.find().skip((page - 1) * limit).limit(limit).toArray();
        const anarkaliItems = await anarkali.find().skip((page - 1) * limit).limit(limit).toArray();
        const gownItems = await gown.find().skip((page - 1) * limit).limit(limit).toArray();

        const allItems = [...lehengaItems, ...anarkaliItems, ...gownItems];

        const shuffledItems = allItems.sort(() => Math.random() - 0.5);

        res.status(200).json(shuffledItems);
    } catch (error) {
        console.error("Error fetching collections:", error);
        res.status(500).json({ error: "Failed to fetch collections" });
    }
});