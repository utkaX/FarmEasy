const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
require('dotenv').config();

// Create a new user
exports.createUser = async (req, res) => {
    const users = req.body; // Assuming an array of users is sent in the request body

    try {
        const createdUsers = [];

        for (const userData of users) {
            const { username, email, password, role } = userData;

            // Create and save the user
            const user = new User({ username, email, password, role });
            await user.save();

            // Add the user to the response
            createdUsers.push({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            });
        }

        // Send response with all created users
        res.status(201).json({ users: createdUsers });
    } catch (error) {
        console.error('Error creating users: ', error);
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user: ", error);
        res.status(500).json({ error: "An error occurred while fetching user." });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({ error: "An error occurred while deleting user." });
    }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { email, password, role, profilePicture } = req.body;

        // Find user by ID
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update fields if they are provided in the request body
        if (email) user.email = email;
        if (password) user.password = password; // Password will be hashed by the pre-save hook
        if (role) user.role = role;
        if (profilePicture) user.profilePicture = profilePicture;

        // Save the updated user
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update password by ID
exports.updatePasswordById = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" } // Token is valid for 1 hour
        );

        // Respond with user details and token
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token, // JWT token is included in the response
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "please fill all the details carefully",
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered",
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
  
      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });
  
        user.token = token;
        user.password = undefined;
  
        // const options = {
        //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //   httpOnly: true,
        // };
  
        // res.cookie("jobcookie", token, options).status(200).json({
        //   success: true,
        //   token,
        //   user,
        //   message: "User login successfully",
        // });

        res.status(200).json({
            success: true,
            token,
            user,
            message: "User login successfully",
          });
      } else {
        return res.status(403).json({
          success: false,
          message: "Password incorrect",
        });
      }
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Error in login",
      });
    }
  };