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
    const product = await Product.findById(req.params.id)
    console.log('findById: ' + product)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
