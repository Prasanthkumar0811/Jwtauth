import bcrypt from "bcryptjs";
import { Users2 } from "../model/user.model.js";

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password required" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const user = await Users2.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
