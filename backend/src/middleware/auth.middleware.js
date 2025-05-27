import User from "../models/user.model.js";

// Dummy middleware (authentication disabled)
export const protectRoute = async (req, res, next) => {
  try {
    // You can either skip this middleware or allow all users through for now
    // Example: Trust a userId passed from the frontend (not secure, just for dev/testing)

    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No User ID Provided" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
