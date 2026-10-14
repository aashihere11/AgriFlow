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


app.get("/me", authenticate, (req, res) => {
  res.json({
    user: req.user
  });
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
        image: imageResult.url,
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

app.post("/create-user", async (req, res) => {
  const { username, email, phone, password, role, location } = req.body;
  const user = await User.findOne({ username });
  const existingemail = await User.findOne({ email });
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

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits"
      });
    }
  }
  if (user) {
    return res.status(409).json({
      success: false,
      message: "Username already exists"
    });
  }

  if (existingemail) {
    return res.status(409).json({
      success: false,
      message: "email already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
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
      { expiresIn: "1h" }
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
    res.status(500).json({
      message: error.message
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

