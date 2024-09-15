const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//@desc Get All Users
//@route GET /users
//@access Private

const getAllUsers = asyncHandler(async (req, res) =>{

    const users = await User.find().select('-password').lean();

    console.log(users);

    if (!users || users.length === 0){
        return res.status(400).json({message: 'There is no users in database'});
    }
    
    return res.status(200).send({data: users});
    
});


//@desc Get a Users
//@route GET /users/:id
//@access Private

const getUser = asyncHandler(async (req, res) =>{

    const result = await User.findById(req.params.id).select('-password').lean();

    console.log(result);

    if (!result || result.length === 0){
        return res.status(400).json({message: 'There is no users in database'});
    }
    
    return res.status(200).send({data: result});
    
});

//@desc Create New User
//@route POST /users
//@access Private

const createNewUser = asyncHandler(async (req, res) =>{

    const {username, email, password, passwordConfirm} = req.body;

    /* its useless we check it in model
    if (!username | !email | !password) {
        res.status(400).json({ message: 'All fields are required'});
    }
    */

    /* its useless we check it in model
    if (await User.findOne({username: username})){
        res.status(400).json({ message: 'User is already signed in'});
    }
    */

    const result = await User.create({
        username,
        email,
        password,
        passwordConfirm
    });
    
    if (!result){
        return res.status(400).json({message: 'user could not be created'});
    }
    
    return res.status(201).json({result});

});

//@desc Update a User
//@route PATCH /users/:id
//@access Private

const updateUser = asyncHandler(async (req, res) =>{

    const {username, email, password, passwordConfirm, roles} = req.body;

    const user = await User.findOneAndUpdate({_id: req.params.id}, 
        {
            username,
            email,
            password,
            passwordConfirm,
            roles
        },
        {
            upsert: true,
            runValidators: true
        })

    if (!user){
        return res.status(400).json({ message: 'No document is updated'});
    }

    return res.status(201).json({ data: user});
    
});

//@desc Delete a User
//@route DELETE /users/:id
//@access Private

const deleteUser = asyncHandler(async (req, res) =>{
    
});

module.exports = {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser
}