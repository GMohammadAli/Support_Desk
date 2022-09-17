const ayncHandler = require('express-async-handler')
// @desc Register a user
// @route  /api/users
// @access Public
module.exports.registerUser =asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    //Validation
    if(!name || !email || !password) {
        req.status(400)
        throw new Error('Please Include all feilds')
    }

    res.send("Register Route")
})

// @desc Login a user
// @route  /api/users/login
// @access Public
module.exports.loginUser = asyncHAadler(async (req, res) => {
  res.send("Login Route");
})