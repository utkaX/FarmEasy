const express=require('express')
const router=express.Router()

const {
   createUser,
   getAllUsers,
   getUserById,
   updateUserById,
   deleteUserById,
   updatePasswordById
}=require('../Controller/user_controller')

router.post('/',createUser)
router.get('/all',getAllUsers)
router.get('/get/:id',getUserById)
router.put('/update/:id',updateUserById)
router.delete('/delete/:id',deleteUserById)
router.put('/password/:id',updatePasswordById)


module.exports = router;
