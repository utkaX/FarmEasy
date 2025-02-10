const express=require('express')

const router=express.Router()

const {
   createFarmer,
   getAllFarmers,
   getFarmerById,
   updateFarmerById,
   deleteFarmerById,
   profileCheck,
   getFarmerByUserId
}=require('../controller/farmer_controller')

router.post('/',createFarmer)
router.get('/all',getAllFarmers)
router.get('/get/:id',getFarmerById)
router.put('/update/:id',updateFarmerById)
router.delete('/delete/:id',deleteFarmerById)
router.get('/check/:id',profileCheck)
router.get('/getByUser/:id',getFarmerByUserId)

module.exports = router;
