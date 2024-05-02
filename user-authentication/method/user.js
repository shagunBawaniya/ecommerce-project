const User = require('../models/userModel');

const  isUserExist = async(email) => {    
    const userCount = await User.find({
        email: email
    }).countDocuments(); 
    return (userCount > 0)? true : false;
};

module.exports = { isUserExist };