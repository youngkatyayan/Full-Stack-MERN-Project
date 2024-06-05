import express from 'express'
import { authToken } from '../middlewares/authMiddlewares.js'
import { authController } from '../controller/authController.js'

const router=express.Router()


router.get('/get-details',authToken,authController)




export default router