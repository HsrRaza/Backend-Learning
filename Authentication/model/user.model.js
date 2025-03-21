import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // required: unique
  },
  password: {
    type: String,

  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date,
  }
}, { timestamps: true });

// pre -hook 
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password =  bcrypt.hash(this.password, 10)
  }
  next();
})

const User = mongoose.model("User", userSchema)

export default User

