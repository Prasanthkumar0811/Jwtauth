import bcrypt from "bcryptjs";
import { Users2 } from "../model/user.model.js";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users2.find();
    res.status(200).json({
      message: "All users list",
      data: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================
   CREATE USER
========================= */
export const createUser = async (req, res) => {
  try {
    let {
      name,
      email,
      altemail,
      phone,
      altphone,
      address,
      state,
      city,
      pincode,
      bankname,
      accountHolder,
      ifscCode,
      bankAccountNumber,
      password
    } = req.body;

    /* ---- Required field checks ---- */
    if (!name || !email || !phone || !address || !state || !city ||
        !bankname || !accountHolder || !ifscCode || !bankAccountNumber || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    /* ---- Format validations ---- */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Phone must be 10 digits" });

    if (altphone && !phoneRegex.test(altphone))
      return res.status(400).json({ message: "Alt phone must be 10 digits" });

    if (pincode && !/^[0-9]{6}$/.test(pincode))
      return res.status(400).json({ message: "Pincode must be 6 digits" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    /* ---- Normalize optional fields ---- */
    altemail = altemail && altemail.trim() !== "" ? altemail : undefined;
    altphone = altphone && altphone.trim() !== "" ? altphone : undefined;
    pincode  = pincode && pincode.trim() !== "" ? pincode : undefined;

    /* ---- UNIQUE checks ---- */
    /* ---- UNIQUE checks ---- */
const emailExist = await Users2.findOne({ email });
if (emailExist) {
  return res.status(400).json({ message: "Email already exists" });
}

if (altemail) {
  const altEmailExist = await Users2.findOne({ altemail });
  if (altEmailExist) {
    return res.status(400).json({ message: "Alt email already exists" });
  }
}

const phoneExist = await Users2.findOne({ phone });
if (phoneExist) {
  return res.status(400).json({ message: "Phone already exists" });
}

if (altphone) {
  const altPhoneExist = await Users2.findOne({ altphone });
  if (altPhoneExist) {
    return res.status(400).json({ message: "Alt phone already exists" });
  }
}


    /* ---- Hash password ---- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---- CREATE ---- */
    const user = await Users2.create({
      name,
      email,
      altemail,
      phone,
      altphone,
      address,
      state,
      city,
      pincode,
      bankname,
      accountHolder,
      ifscCode,
      bankAccountNumber,
      username: phone,   // username = phone (as per your design)
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================
   UPDATE USER
========================= */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    let {
      name,
      email,
      altemail,
      phone,
      altphone,
      address,
      state,
      city,
      pincode,
      bankname,
      accountHolder,
      ifscCode,
      bankAccountNumber
    } = req.body;

    altemail = altemail && altemail.trim() !== "" ? altemail : undefined;
    altphone = altphone && altphone.trim() !== "" ? altphone : undefined;
    pincode  = pincode && pincode.trim() !== "" ? pincode : undefined;

    /* ---- UNIQUE checks (exclude same user) ---- */
    // Email
if (email) {
  const exists = await Users2.findOne({ email, _id: { $ne: id } });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }
}

// Alt Email
if (altemail) {
  const exists = await Users2.findOne({ altemail, _id: { $ne: id } });
  if (exists) {
    return res.status(400).json({ message: "Alt email already exists" });
  }
}

// Phone
if (phone) {
  const exists = await Users2.findOne({ phone, _id: { $ne: id } });
  if (exists) {
    return res.status(400).json({ message: "Phone already exists" });
  }
}

// Alt Phone
if (altphone) {
  const exists = await Users2.findOne({ altphone, _id: { $ne: id } });
  if (exists) {
    return res.status(400).json({ message: "Alt phone already exists" });
  }
}

    const updatedUser = await Users2.findByIdAndUpdate(
      id,
      {
        name,
        email,
        altemail,
        phone,
        altphone,
        address,
        state,
        city,
        pincode,
        bankname,
        accountHolder,
        ifscCode,
        bankAccountNumber
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users2.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details",
      data: user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users2.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
