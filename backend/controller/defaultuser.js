import { Users2 } from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const createDefaultUser = async () => {
  try {
    const existingUser = await Users2.findOne();
    if (existingUser) {
      console.log("Default user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Welcome123!", 10);

    await Users2.create({
      name: "First User",
      email: "admin123@gmail.com",
      altemail: "admin.alt@gmail.com",
      phone: "8994404888",
      altphone: "9994909494",
      address: "123 Admin Street",
      state: "Karnataka",
      city: "Bangalore",
      pincode: "560001",
      bankname: "HDFC Bank",
      accountHolder: "Default User",
      ifscCode: "HDFC0000123",
      bankAccountNumber: "123456789012",
      username: "8994404888", // username = phone
      password: hashedPassword
    });

    console.log("✅ Default user created successfully");

  } catch (err) {
    console.error("❌ Default user creation failed:", err.message);
  }
};
