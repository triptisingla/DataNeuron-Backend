import { User } from "../models/userSchema.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(500).send({ message: 'Please fill full form!' })
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return res.status(500).send({ message: 'Email already registered!' })
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    return res.status(200).send({ data: 'User Registered!' })
};


export const update = async (req, res) => {

    const newUser = req.body;
    const email = newUser.email;
    if (!newUser.email)
        return res.status(500).send({ message: 'Please enter Email!' })

    const isEmail = await User.findOne({ email });
    if (!isEmail) {
        return res.status(500).send({ message: "Email not present!" });
    }
    const updatedUser = await User.updateOne({ email }, newUser);
    return res.status(200).send({ data: 'User Updated!' })

};
