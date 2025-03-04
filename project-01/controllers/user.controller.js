const User = require("../models/user")

async function handleGelAllUsers(req, res) {
    const allDbSUsers = await User.find({});
    return res.json(allDbSUsers)
    
}

async function handlegetUserById(req, res) {

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg : "user not found"})
    return res.json(user)
     
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
   
   return res.json({ status: "sucess"})
    
}


async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success"})
    
}


async function handleCreateUser(req,res){
    const body = req.body
   

    if(!body || !body.first_name|| !body.last_name || !body.email || !body.gender ||   !body.job_title){
        res.status(400).json({msg: "All fields  are req..."})
    }
    
   const result =  await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        emai:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    })
   
    
    return res.status(201).json({msg:"success", id:result._id});
}
    

module.exports ={
    handleGelAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}
