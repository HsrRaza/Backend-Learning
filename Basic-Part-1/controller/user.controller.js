import User from "../model/user.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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

        //    send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports 
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            }
        })

        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email ✔", // Subject line
            text: `please Click on the following link
            ${process.env.BASE_URL}/api/v1/users/verfiy${token}
            `,
        };


        await transporter.sendMail(mailOption);

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

    const user = await User.findOne({ verificationToken: token })

    if (!user) {
        return res.status(400).json({
            msg: "Invalid token"
        });
    };

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();



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

       const isMatch = await bcrypt.compare(password,user.password)

       console.log(isMatch);
       
  
       if (!isMatch) {
        return res.status(400).json({
            msg: " Inavlid email or password ",
        })
    }




    } catch (error) {
        return res.status(404).json({
            msg: "Unable lo login",
        })

    }

}



export { registerUser, verifyUser }