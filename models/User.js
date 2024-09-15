const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, 'User name is required'],
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 letters. Please enter a longer username!'],
        maxlength: [24, 'Username must be less than 24 letters. Please enter a smaller username!']
    },

    email: {
        type: String,
        required : [true, 'Email is required'],
        unique : true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'You must enter a proper e-mail']
    },

    password: {
        type: String,
        required : [true, 'Password is required'],
        select: false
    },

    passwordConfirm: {
        type: String,
        required : [true, 'Password is required'],
        select: false,
        validate : {
            validator : function(el){
                return el === this.password;
            },
            message: 'Passwords are not same'
        }
    },

    roles : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    active: {
        type: Boolean,
        default: true
    },

},
{
    timestamps: true
}
);


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    return next();
});

userSchema.pre('findByIdAndUpdate',  function (next) {
    this.options.runValidators = true;
    next();
})

userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);