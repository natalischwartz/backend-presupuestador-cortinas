import { Router } from 'express'
const router = Router()
import * as authCtrl from '../controllers/authControllers.js'

// import {checkDuplicateUsernameOrEmail} from '../middlewares/verifySignup.js'




router.post('/login',authCtrl.logIn)

router.get('/logout', authCtrl.logOut  )


export default router