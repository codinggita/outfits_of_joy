const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { MongoClient } = require('mongodb');
var cors = require('cors')
const { ObjectId } = require('mongodb');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const port = 3000;
app.use(
    cors({
        origin: ["http://localhost:5173", "https://outfits-of-joy.vercel.app"],
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        credentials: true,
    })
);

const url = process.env.MONGODB_URI;
const dbName = "cloth_collections";

// Multer Configuration for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Middleware
app.use(express.json());

let db, users, carts, favourites, orders;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
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
//POST:add outfits of specific category
app.post("/outfits-of-joy/collection/:category", upload.array("images", 4), async (req, res) => {
    try {
        const { category } = req.params;
        const { _id, title, gender, description, sizes, stock, rent, mrp, deposit } = req.body;

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

        // Prepare the new item object
        const newItem = {
            _id,
            title,
            category,
            gender,
            description,
            images: uploadedImages, // Save Cloudinary URLs
            sizes: sizes.split(","), // Convert sizes to an array if sent as a comma-separated string
            stock: parseInt(stock),
            rent: parseFloat(rent),
            mrp: parseFloat(mrp),
            deposit: parseFloat(deposit),
        };

        // Dynamically insert into the corresponding MongoDB collection
        const collection = db.collection(category.toLowerCase());
        const result = await collection.insertOne(newItem);

        res.status(201).send(`${category} added with ID: ${result.insertedId}`);
    } catch (err) {
        console.error(`Error adding ${req.params.category}:`, err);
        res.status(500).send(`Error adding ${req.params.category}: ` + err.message);
    }
});


//PUT:modifiy any data
app.put("/outfits-of-joy/collection/:category/:id", upload.array("images", 4), async (req, res) => {
    try {
        const { category, id } = req.params;
        const updates = req.body; // Contains only the fields to be updated
        const files = req.files; // New images uploaded (if any)

        const collection = db.collection(category.toLowerCase());

        if (!collection) {
            return res.status(400).send("Invalid category specified");
        }

        const existingItem = await collection.findOne({ _id: id });
        if (!existingItem) {
            return res.status(404).send(`${category} item not found`);
        }

        let updatedItem = {};

        // Parse numeric fields
        const numericFields = ["stock", "rent", "mrp", "deposit"];
        for (const key in updates) {
            if (updates[key] !== undefined) {
                if (numericFields.includes(key)) {
                    updatedItem[key] = parseFloat(updates[key]); // Convert to number
                } else if (key === "sizes") {
                    updatedItem[key] = updates[key].split(","); // Convert sizes to array
                } else {
                    updatedItem[key] = updates[key]; // Keep other fields as-is
                }
            }
        }

        // Handle image updates (if new images are uploaded)
        if (files && files.length > 0) {
            const folderName = category.toLowerCase();
            const uploadedImages = [];

            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: folderName,
                });
                uploadedImages.push(result.secure_url);
            }

            // Delete old images from Cloudinary (optional)
            for (const oldImageUrl of existingItem.images) {
                const publicId = oldImageUrl.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`${folderName}/${publicId}`);
            }

            updatedItem.images = uploadedImages;
        }

        // Update the item in the database
        const result = await collection.updateOne(
            { _id: id },
            { $set: updatedItem }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send(`${category} item not found`);
        }

        res.status(200).send(`${category} item updated successfully`);
    } catch (err) {
        console.error(`Error updating ${req.params.category}:`, err);
        res.status(500).send(`Error updating ${req.params.category}: ` + err.message);
    }
});


//PATCH:modifiy stock (for out of stock)
app.patch("/outfits-of-joy/collection/:category/:id", async (req, res) => {
    console.log("PATCH request received"); // Add this log
    try {
      const { category, id } = req.params;
      const { stock } = req.body;
  
      const collection = db.collection(category.toLowerCase());
  
      if (!collection) {
        return res.status(400).send("Invalid category specified");
      }
  
      const existingItem = await collection.findOne({ _id: id });
      if (!existingItem) {
        return res.status(404).send(`${category} item not found`);
      }
  
      // Update only the stock field
      const result = await collection.updateOne(
        { _id: id },
        { $set: { stock: 0 } }
      );
  
      console.log("Update Result:", result);
  
      if (result.matchedCount === 0) {
        return res.status(404).send(`${category} item not found`);
      }
  
      res.status(200).send(`${category} item stock updated to 0`);
    } catch (err) {
      console.error(`Error updating stock for ${req.params.category}:`, err);
      res.status(500).send(`Error updating stock for ${req.params.category}: ` + err.message);
    }
  });

//DELETE: delete outfits of sepecific category
app.delete("/outfits-of-joy/collection/:category/:id", async (req, res) => {
    try {
        const { category, id } = req.params; // Extract category and ID from the URL

        // Dynamically get the correct MongoDB collection
        const collection = db.collection(category.toLowerCase());

        if (!collection) {
            return res.status(400).send("Invalid category specified");
        }

        // Delete the document from the collection
        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send(`${category} item not found`);
        }

        res.status(200).send(`${category} item deleted successfully`);
    } catch (err) {
        console.error(`Error deleting ${req.params.category}:`, err);
        res.status(500).send(`Error deleting ${req.params.category}: ` + err.message);
    }
});



//ROUTES
//user side
// GET: List items from any category
app.get('/outfits-of-joy/collection/:category', async (req, res) => {
    try {
        const { category } = req.params; // Extract the category from the URL
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        // Dynamically access the collection
        const collection = db.collection(category.toLowerCase());

        // Fetch paginated items
        const items = await collection.find().skip((page - 1) * limit).limit(limit).toArray();
        res.status(200).json(items);
    } catch (err) {
        console.error(`Error fetching ${req.params.category}:`, err);
        res.status(500).send(`Error fetching ${req.params.category}: ` + err.message);
    }
});


// GET: fetch specific outfits
// Dynamic GET: fetch specific outfit based on collection and product ID
app.get('/outfits-of-joy/collection/:type/:productId', async (req, res) => {
    try {
        const { type, productId } = req.params;
        const collection = db.collection(type.toLowerCase());
        const product = await collection.findOne({ _id: productId });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).send("Error fetching product: " + err.message);
    }
});



//USERS
// POST: Add a new user
app.post('/outfits-of-joy/users', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', user: existingUser });
        }

        // Insert the new user into the users collection
        const result = await users.insertOne({
            _id: new ObjectId().toString(),
            firstName,
            lastName,
            email,
            phone: phone || '',
            address: address || '',
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully!', user: result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



//Get: fetch user by userid
app.get('/outfits-of-joy/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await users.findOne({ email });
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
        const { firstName, lastName, email, phone, address } = req.body;

        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (address) updates.address = address;

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
//POST: add items to favourites
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
        const userId = req.params.userid;
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
        const userId = req.params.userid;
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
        const { userId, orderId, productId, quantity, size, category, status, orderDate, fromDate, toDate } = req.body;

        // Validate required fields
        if (!userId || !productId || !quantity || !size || !category || !orderDate || !fromDate || !toDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newOrder = {
            orderId,
            productId,
            category,
            status,
            quantity,
            size,
            orderDate: new Date(orderDate),
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
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


//PATCH: update orders status
app.patch("/outfits-of-joy/orders/:productId/:status", async (req, res) => {
    try {
        const { productId, status } = req.params;
        const { userId } = req.body;

        if (!userId || !productId || !status) {
            return res.status(400).json({ error: "User ID, Product ID, and Status are required" });
        }

        const validStatuses = ["cancelled", "rejected", "confirmed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status. Allowed values are 'cancelled', 'rejected', 'confirmed'" });
        }

        const result = await orders.updateOne(
            { _id: userId, "orders.productId": productId },
            { $set: { "orders.$.status": status } } 
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Order not found or status already set" });
        }

        res.json({ message: `Order status updated to '${status}' successfully`, result });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
});

//GET: fetch all orders
app.get("/outfits-of-joy/orders", async (req, res) => {
    try {
        const Orders = await orders.find().toArray();

        res.status(200).json(Orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
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
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const sherwani = db.collection("sherwani");
        const tuxedo = db.collection("tuxedo");
        const indo_western = db.collection("indo-western");

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
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const lehenga = db.collection("lehenga");
        const anarkali = db.collection("anarkali");
        const gown = db.collection("gown");

        const lehengaItems = await lehenga.find().skip((page - 1) * limit).limit(limit).toArray();
        const anarkaliItems = await anarkali.find().skip((page - 1) * limit).limit(limit).toArray();
        const gownItems = await gown.find().skip((page - 1) * limit).limit(limit).toArray();

        const allItems = [...lehengaItems, ...anarkaliItems, ...gownItems];

        res.status(200).json(allItems);
    } catch (error) {
        console.error("Error fetching collections:", error);
        res.status(500).json({ error: "Failed to fetch collections" });
    }
});


// ✅ Create Order (POST)
app.post("/create-order", async (req, res) => {
    const { amount, email } = req.body;
    const options = {
        amount: amount * 100, // Convert to paise (INR)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating order", error });
    }
});

// ✅ Verify Payment and Store in MongoDB (POST)
app.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    try {
        const razorpayResponse = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`,
            },
        });

        if (!razorpayResponse.ok) {
            throw new Error(`Razorpay API error: ${razorpayResponse.statusText}`);
        }

        const paymentDetails = await razorpayResponse.json();

        // Store payment data in MongoDB
        await db.collection("payments").insertOne({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            status: paymentDetails.status,
            amount: Number(paymentDetails.amount) / 100,
            email: paymentDetails.email,
            phone: paymentDetails.contact,
            createdAt: new Date(),
        });

        res.json({ success: true, message: "Payment verified & stored" });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Fetch User Payments (GET)
app.get("/user-payments/:email", async (req, res) => {
    const email = req.params.email;
    const payments = await db.collection("payments").find({ email }).toArray();
    res.json({ success: true, payments });
});




// Login Route
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    // Check if email and password match the admin credentials
    if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD)) {
        // Generate JWT token with email and name
        const token = jwt.sign({ email, name: ADMIN_NAME }, JWT_SECRET, { expiresIn: "12h" });
        res.json({ success: true, token, user: { email, name: ADMIN_NAME } });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

app.get("/admin/dashboard", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // If token is valid, allow access to the protected route
        res.json({ success: true, user: decoded });
    });
});
