const Register = require('./Controllers/UserControllers/Register')
const Login  = require('./Controllers/UserControllers/Login')
const {uploadSingle} = require('./middlewares/multer')
const { CreateProduct, GetAllProducts ,GetOneProduct,DeleteOneProduct,UpdateOneProduct } = require('./Controllers/ProductControllers')
const { addCatagory, DeleteCatagory, ReadCatagory } = require('./Controllers/CatagoryControllers')
const { cartController } = require('./Controllers/CartController')
const { GetUser, PutUser, cngPass } = require('./Controllers/UserControllers/UserControllers')
const { isAdmin } = require('./middlewares/IsAdmin')


const router = require('express').Router()


// User System
router.post('/user/register',Register)
router.post('/user/login',Login)
router.get('/user',GetUser)
router.put('/user',PutUser)
router.put('/user/cngpass' , cngPass)


// Products Zone

router.post('/products/create',isAdmin, uploadSingle('productImg'),CreateProduct)
router.get('/products/all',GetAllProducts)
router.get('/product/:_id', GetOneProduct)
router.delete('/product/:_id',isAdmin, DeleteOneProduct)
router.put('/product/:_id',isAdmin, uploadSingle('productImg'),UpdateOneProduct)

// Catagory Handler
router.post('/catagory',isAdmin,addCatagory)
router.delete('/catagory/:_id',isAdmin,DeleteCatagory)
router.get('/catagory',ReadCatagory)
module.exports = router


// // Cart Handlers

// router.post('/cart',cartController)