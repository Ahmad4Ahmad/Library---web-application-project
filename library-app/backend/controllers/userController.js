const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

const registerUser = asyncHandler (
    async (req, res) => 
    {
        const {name, email, password} = req.body;
        if (!name || !email || !password)
        {
            res.status(400);
            throw new Error("Please fill in all required fields");
        }

        if (password.length < 6)
        {
            res.status(400);
            throw new Error("Password must be at least 6 characters");
        }
        
        const userExists = await User.findOne({email});
        if (userExists)
        {
            res.status(400);
            throw new Error("This user already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        const token = generateToken(user.id);
        res.cookie("token", token, 
            {
                path: "/",
                httpOnle: true,
                expires: new Date(Date.now() + 1000 * 86400),
                sameSite: "none",
                secure: true
            }
        )

        if (user)
        {
            const {id, name, email, photo} = user;
            res.status(201).json(
                {
                    id,
                    name,
                    email,
                    photo,
                    token
                }
            );
        }
        else
        {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
);

const loginUser = asyncHandler(async (req, res) =>
{
    const {email, password} = req.body;
    if (!email || !password)
    {
        res.status(400);
        throw new Error("Please add email and password");
    }

    const user = await User.findOne({email});
    if (!user)
    {
        res.status(400);
        throw new Error("User not found, please signup");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    const token = generateToken(user.id);
    res.cookie("token", token, 
        {
            path: "/",
            httpOnle: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true
        }
    );
    if (user && passwordIsCorrect)
    {
        const {id, name, email, photo} = user;
            res.status(200).json(
                {
                    id,
                    name,
                    email,
                    photo,
                    token
                }
            );
    }
    else
    {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

const logout = asyncHandler(async (req, res) => 
{
    res.cookie("token", "", 
        {
            path: "/",
            httpOnle: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        }
    );
    return res.status(200).json({message: "Successfully signed out"});
});

const getUser = asyncHandler(async (req, res) =>
{
    const user = await User.findById(req.user.id);
    if (user)
    {
        const {id, name, email, photo} = user;
        res.status(200).json(
            {
                id,
                name,
                email,
                photo
            }
        );
    }
    else
    {
        res.status(400);
        throw new Error("User not found");
    }
});

const signinStatus = asyncHandler(async(req, res) => 
{
    const token = req.cookies.token;
    if(!token)
    {
        return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified)
    {
        return res.json(true);
    }
    return res.json(false);
});

const updateUser = asyncHandler(async(req, res) =>
{
    const user = await User.findById(req.user.id);
    if(user)
    {
        const {id, name, email, photo} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        const updatedUser = await user.save();
        res.status(200).json(
            {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                photo: updatedUser.photo
            }
        )
    }
    else
    {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = 
{
    registerUser,
    loginUser,
    logout,
    getUser,
    signinStatus,
    updateUser
}