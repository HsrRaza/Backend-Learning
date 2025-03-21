import dotenv from "dotenv"
import User from "../model/user.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();


const registerUser = async (req, res) => {
    // get data
    // validate


    // check if user already exits

    // create a user in database

    // create a verification token

    // save token in database

    // send token as email to user

    // send success status to user

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            messages: "All fields are required "
        })
    };
    console.log(email);



    try {

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                messages: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user);


        if (!user) {
            return res.status(400).json({
                messages: "User  not registered"
            });
        };

        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);

        user.verificationToken = token

        await user.save()

        // console.log("MAILTRAP_HOST:", process.env.MAILTRAP_HOST);
        // console.log("MAILTRAP_USERNAME:", process.env.MAILTRAP_USERNAME);
        // console.log("MAILTRAP_PASSWORD:", process.env.MAILTRAP_PASSWORD ? "Loaded" : "Not Loaded");


        //    sendemail
        //     const transporter = nodemailer.createTransport({
        //         host: sandbox.smtp.mailtrap.io ,
        //         port: 587,
        //         secure: false, // true for port 465, false for other ports 
        //         auth: {
        //             user: "d94b9ee7102268",
        //             pass:  "********4006"
        //         }
        //     })

        // const mailOption = {
        //     from: process.env.MAILTRAP_SENDEREMAIL, // sender address
        //     to: user.email, // list of receivers
        //     subject: "Verify your email ✔", // Subject line
        //     text: `please Click on the following link
        //     ${process.env.BASE_URL}${process.env.PORT}/api/v1/users/verify/${token}
        //     `,
        // };


        //   transporter.sendMail(mailOption)
        //   .then(info => console.log("Email sent success", info.response))
        //   .catch(error => console.error("Error sending email", error))




        res.status(201).json({
            msg: "User registered successfully",
            sucess: true,
        })





    } catch (error) {
        res.status(400).json({
            msg: "User not registered",
            error,
            success: false,
        });
    }

};

const verifyUser = async (req, res) => {
    // get token from url
    //validate
    // find user based on token
    // if not 
    // set isVerified field to true
    // remove verification token 
    // save
    // return res

    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            msg: "Invalid token"
        });
    };

    try {
        console.log("Verification started ");


        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        };

        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({
            msg: "User verified successfully",
            success: true,
        })

    } catch (error) {
        res.status(400).json({
            error,
            msg: "unable to verify token",
            success: false,
        })
    }




}


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "All fields are required "
        })
    }

    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: " Inavlid email or password ",
            })
        }

        const isMatch = bcrypt.compare(password, user.password)

        // console.log(isMatch);


        if (!isMatch) {
            return res.status(400).json({
                msg: " unable to match",
            })

        }
        if (!user.isVerified) {
            return res.status(400).json({
                msg: "Please Verify your email"
            })
        }



        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 50 * 1000
        }

        res.cookie("token", token, cookieOptions)

        res.status(200).json({
            success: true,
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });




    } catch (error) {
        return res.status(404).json({
            msg: "Unable lo login",
        })

    }

}


const getMe = async (req, res) => {
    try {

        console.log("reached at get me");

        const user = await User.findById(req.user.id).select('-password');
        console.log(user);


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }


        res.status(200).json({
            success: true,
            user,
        });
        console.log("got User");

    } catch (error) {
        console.log("Error in Get me");
         res.status(400).json({
            msg: "Unable to Getme",
            success: false,
        });
    }

}
const logoutUser = async (req, res) => {
    try {

        res.cookie('token', '', {});

        res.status(200).json({
            success: true,
            msg: "logged Out Successfully"

        })


    } catch (error) {
        res.status(400).json({
            msg: "Unable to GetME",
            success: false,
        })

    }
}
const forgetPassword = async (req, res) => {
    try {
    //get email
   //find user based on email
  // reset token + reset expiry =>  Date.now() *10 *60* 100 => user.save()
  //send mail => design url

    
    
    } catch (error) {
        res.status(400).json({
            msg: "Unable to  forgetPassword",
            success: false,
        })

    }
}
const resetPassword = async (req, res) => {
    try {
        // collect token from params
        // password from req.body
        //

        const {token}= req.params
        const {password}= req.body
        try {
         const user =  await  User.findOne({
                resetPassword: token,
                resetPasswordExpires:{$gt: Date.now()}
            })

            // set Password in user
            //resetToken , resetExpiry  => reset
            // save
            
        } catch (error) {
            
        }

    } catch (error) {
        res.status(400).json({
            msg: "Unable to resetPassword",
            success: false,
        })

    }
}



export { registerUser, verifyUser, login, getMe, logoutUser, forgetPassword, resetPassword }