import jwt from "jsonwebtoken"


export const isLoggedIn = async (req, res, next) => {

    // get token from cookie
    // check token 
    // take data from token

    try {
        console.log(req.cookies);

        let token = req.cookies?.token  // ?optinal chaining
        console.log("tojken found :" , token ? "YES" : "No" );


        if(!token){
            console.log("NO TOken");
            return res.status(401).json({
                success: false,
                msg: "Authentication failed",
            })
            
        }

      const decoded =   jwt.verify(token , process.env.JWT_SECRET)
      console.log("decoded data ", decoded);
      
      req.user = decoded

      next()
    
    } catch (error) {
        console.log("auth middleware failed");
        
        return res.status(400).json({
            msg:"auth failed",
            success: false,
        })
        
    }
    

    next();
    
}