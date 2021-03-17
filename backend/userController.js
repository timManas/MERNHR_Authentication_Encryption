import asyncHandler from 'express-async-handler'
import User from './UserModel.js'
import generateToken from './generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    res.json({ error: 'Invalid email or password' })
  }
})

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    res.json({ error: 'User does not exists' })
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201)
    res.json({
      name,
      email,
      password,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User')
  }
})
