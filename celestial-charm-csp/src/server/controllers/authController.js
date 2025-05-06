import User from "../models/User";

export const registerUser = async (req, res) => {
    const { name, username, phoneNumber, birthday, email, uid } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "This email already exists" });
    
    const newUser = new User({ name, username, phoneNumber, birthday, email, uid });
    await newUser.save();

    return res.status(201).json({ message: "User has been registered" });
};

export const getUser = async (req, res) => {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User does not exist." });
    res.json(user);
};