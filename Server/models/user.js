const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt');

const userSchema = new schema(
    {
        username:{
            type:String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Farmer", "Seller", "Admin"],
            required: true,
        },
        resetPasswordToken: {
            type: String,
            default: null,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
        }
    },
);


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });


  // userSchema.methods.generateToken=async function () {
    
  //   try {
  //     return jwt.sign(
  //       {
  //         userId:this._id.toString(),
  //         email:this.email,
  //         role:this.role
  //       },
  //       process.env.JWT_SECRET_KEY
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

module.exports = mongoose.model("user", userSchema)