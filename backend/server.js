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


dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

dotenv.config();
connectDB();

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

app.post("/create-user", async (req, res) => {
  const {username, email, phone, password, role, location} = req.body; 
  const user = await User.findOne({username});
    const existingemail = await User.findOne({email});
  if (!email || !username || !phone || !password ) {
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
  if(user){
     return res.status(409).json({
    success: false,
    message: "Username already exists"
  });
  }

  if(existingemail){
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
        userId: user._id,
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
      userId: user._id,
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

