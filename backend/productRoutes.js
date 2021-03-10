import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from './productModel.js'

const router = express.Router()

router.route('/').get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)
router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const product = await Product.find({ _id: req.params.id })
    res.json(product)
  })
)

export default router
