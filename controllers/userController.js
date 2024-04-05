import { User } from "../models/userSchema.js";
import validator from "validator";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     return res.status(500).send({ message: 'Please fill full form!' })
    // }
    // const isEmail = await User.findOne({ email });
    // if (isEmail) {
    //     return res.status(500).send({ message: 'Email already registered!' })
    // }
    // const user = await User.create({
    //     name,
    //     email,
    //     password,
    // });
    // return res.status(200).send({ data: 'User Registered!' })


    // Detailed validation
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Please fill out the entire form!' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: 'Invalid email format.' });
    }
    if (password.length < 4 || password.length > 32) {
        return res.status(400).send({ message: 'Password must be between 4 and 32 characters.' });
    }
    if (name.length < 3 || name.length > 30) {
        return res.status(400).send({ message: 'Name must be between 3 and 30 characters.' });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return res.status(409).send({ message: 'Email already registered!' });
    }

    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        return res.status(201).send({ data: 'User Registered!' });
    } catch (error) {
        return res.status(500).send({ message: 'Error registering user.' });
    }
};


export const update = async (req, res) => {
    const { email, name, password } = req.body; // Assuming these are the fields you want to allow updating

    if (!email || !validator.isEmail(email)) {
        return res.status(400).send({ message: 'Valid email is required for update.' });
    }

    // Optional: Validate name and password if they are being updated
    if (name && (name.length < 3 || name.length > 30)) {
        return res.status(400).send({ message: 'Name must be between 3 and 30 characters if provided.' });
    }
    if (password && (password.length < 4 || password.length > 32)) {
        return res.status(400).send({ message: 'Password must be between 4 and 32 characters if provided.' });
    }

    try {
        const userToUpdate = await User.findOne({ email });
        if (!userToUpdate) {
            return res.status(404).send({ message: "Email not present!" });
        }

        // Manual password hashing may be needed here if password is updated

        const updatedUser = await User.updateOne({ email }, req.body);
        return res.status(200).send({ data: 'User Updated!' });
    } catch (error) {
        return res.status(500).send({ message: 'Error updating user.' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).send({ data: users });
    } catch (err) {
        res.status(500).send('Server error');
    }
}