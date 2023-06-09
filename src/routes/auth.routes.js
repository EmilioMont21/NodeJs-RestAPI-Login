import { Router } from "express";
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import { verifySingup } from "../middlewares";

router.post('/signup', [verifySingup.checkDuplicateUsername, verifySingup.checkRolesExisted],authCtrl.signUp)
router.post('/signin', authCtrl.signin)

export default router;