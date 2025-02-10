const express=require('express')
const router=express.Router()

const {
   createUser,
   getAllUsers,
   getUserById,
   updateUserById,
   deleteUserById,
   updatePasswordById,
   loginUser
}=require('../controller/user_controller')

router.post('/',createUser)
router.get('/all',getAllUsers)
router.get('/get/:id',getUserById)
router.put('/update/:id',updateUserById)
router.delete('/delete/:id',deleteUserById)
router.put('/password/:id',updatePasswordById)

router.post('/login',loginUser)


module.exports = router;
