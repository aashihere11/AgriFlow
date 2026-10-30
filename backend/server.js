const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require("./Models/User.js");
const jwt = require('jsonwebtoken');
const dns = require("dns");
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate.js");
const ImageKit = require('@imagekit/nodejs');
const multer = require("multer");
const { toFile } = require("@imagekit/nodejs");
const Product = require("./Models/Product.js");
const mongoose = require("mongoose");
const Cart = require("./Models/Cart.js");


dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

dotenv.config();
connectDB();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


// DELETE API: Cart se specific item hatane ke liye
app.delete('/cart/remove', authenticate, async (req, res) => {
  try {
    const { userId, productId } = req.body; 

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();

    // Updated cart items wapas bhej do
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartItems: cart.items
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

app.put('/cart/update-quantity', authenticate, async (req, res) => {
  
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return res.status(200).json({ success: true, message: "Quantity updated", cartItems: cart.items });


  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});



app.get('/cart/:userId', authenticate, async (req, res) => {

  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.product', 'image , name , unit');

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({
      success: true,
      cartItems: cart.items
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post('/cart/add', authenticate, async (req, res) => {
  
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;


    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const qty = quantity || 1;
    const price = product.price;
    const farmerId = product.farmer

  let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({
          product:productId,
          quantity: qty,
          price,
          farmerId
        });
      }

      await cart.save();
    } else {

      cart = await Cart.create({
        userId,
        items: [
          {
            product,
            quantity: qty,
            price,
            farmerId
          }
        ]
      });
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully!",
      cart
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.patch("/update/personal-info", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email: req.body.email, _id: { $ne: userId } }),
      User.findOne({ username: req.body.username, _id: { $ne: userId } })
    ]);


    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered by another user!"
      });
    }

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "This username is already taken!"
      });
    }

    const { bankName, accountNumber, ifscCode, upiId, accountHolderName } = req.body;

    const isComplete = Boolean(bankName && accountNumber && ifscCode && upiId && accountHolderName);

    const updatedData = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...req.body,
          isProfileComplete: isComplete
        }
      },
      { returnDocument: 'after', runValidators: true }
    ).select("-password");

    if (!updatedData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedData
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/me", authenticate, async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

});


app.patch("/users/update-welcome-status", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { hasSeenWelcomeModal: true },
      { returnDocument: 'after' }
    ).select("-password");


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Welcome status updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})



app.patch('/product/edit/:id', authenticate, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      unit: req.body.unit,
      price: req.body.price,
      category: req.body.category,
    };

    if (req.file) {

      const uploadResponse = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: "/products",
        useUniqueFileName: true,
      });

      updateData.image = {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId
      }

      if (existingProduct.image.url && existingProduct.image.fileId) {
        await imagekit.files.delete(existingProduct.image.fileId);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after' }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product nahi mila!" });
    }

    res.status(200).json({
      success: true,
      message: "Product successfully updated ✨",
      updatedProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.delete('/product/delete/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    if (deletedProduct.image && deletedProduct.image.fileId) {
      await imagekit.files.delete(deletedProduct.image.fileId);
    }

    res.status(200).json({ success: true, message: "Product successfully deleted  🗑️" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/farmer/:farmerId', authenticate, async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Database se us farmer ke saare products dhoondo
    const products = await Product.find({ farmer: farmerId });

    if (!products || products.length === 0) {
      Ima
      return res.status(404).json({ message: "No products found for this farmer." });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post(
  "/products/createproduct", authenticate, upload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        stock,
        unit,
      } = req.body;


      // Upload image to ImageKit
      const imageResult = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: "/products",
        useUniqueFileName: true,
      });

      // Save product and ImageKit URL in MongoDB
      const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        unit,
        image: {
          url: imageResult.url,
          fileId: imageResult.fileId
        },
        farmer: req.user._id,
      });

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// GET similar products from the same category. This route must be before /products/:id.
app.get('/products/:id/similar', authenticate, async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(productId).select('category');

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const products = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .populate('farmer', 'username location')
      .limit(4);

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch similar products" });
  }
});

// GET one product by id
app.get('/products/:id', async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id"
      });
    }

    const product = await Product.findById(productId)
      .populate('farmer', 'username location');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product nahi mila!"
      });
    }
    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Fetch all products from database
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).populate('farmer', 'username location');
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/create-user", async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const phone = String(req.body.phone ?? "").trim();
    const password = req.body.password;
    const role = req.body.role;
    const location = req.body.location?.trim() || "";

    if (!email || !username || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits"
      });
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      location
    });

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully"
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create account"
    });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  });

  res.json({
    success: true,
    message: "Login successful"
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

