import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Task from "../models/Task.js";
import Expense from "../models/Expense.js";

export const register = async (req, res) => {
    try {
        const { firstname, middlename, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res
                .status(400)
                .json({ message: "Fill out the required fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (hashedPassword) {
            const createdUser = await User.create({
                firstname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
            });

            if (createdUser) {
                const token = jwt.sign(
                    { id: createdUser._id },
                    process.env.JWT_SECRET,
                );

                res.cookie("token", token, {
                    httpOnly: true,
                });

                return res
                    .status(201)
                    .json({ message: "User created", createdUser });
            }
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.log("error in register controller" + error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(`error in login controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
};

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const deletedTasks = await Task.deleteMany({ user: userId });
        const deletedExpenses = await Expense.deleteMany({ user: userId });

        if (deletedExpenses && deletedTasks) {
            const deletedUser = await User.findByIdAndDelete(userId);

            if (deletedUser) {
                res.clearCookie("token");
                return res.status(200).json({ message: "User deleted" });
            }
        }
    } catch (error) {
        console.log(`error in deleteProfile controller ${error.message}`);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(`error in checkAuth controller ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
