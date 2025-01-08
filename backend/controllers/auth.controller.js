import { User } from "../modules/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export async function signup(req, res) {
  try {
   const { username, email, password } = req.body;
   
   if (!email || !password || !username) {
    return res.status(400).json({
        success:false,
        message:"All field are required!"
      })
   }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success:false,
        message:"Not a email structure!"
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success:false,
        message:"Password Must be 6 characters!"
      })
    }

    const existingUserByEmail = await User.findOne({
      email:email
    })

    if (existingUserByEmail) {
      return res.status(400).json({
        success:false,
        message:"Email has been alredy exists"
      });
     }


    const existingUserByUsername = await User.findOne({
        username:username
    })

    if (existingUserByUsername) {
      return res.status(400).json({
        success:false,
        message:"Username has been alredy exists"
      });     
    }

    const salt = await bcryptjs.genSalt(10);
    const securePass = await bcryptjs.hash(password, salt)
    
    const DEFAULT_PRFILE = ["/avatar1.png", "avatar2.png", "avatar3.png"];

    const image = DEFAULT_PRFILE[Math.floor(Math.random() * DEFAULT_PRFILE.length)]

    const newUser = new User({
      email: email,
      password:securePass,
      username:username,
      image:image
    })


    generateTokenAndSetCookie(newUser._id, res)
    await newUser.save();
    return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
    ...newUser._doc,
    password:""
     }
    });
 


  } catch (error) {
    console.log("Error in sigup controller", error.message)
    res.status(500).json({
        success:false,
        message:"Internal Server Error!"
      })
   }
}

export async function login(req, res) {
  try {
   const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message:"All field are required"
      })
    }

    const user = await User.findOne({
      email:email
    });

    if (!user) {
      return res.status(400).json({
        success:false,
        message:"Invalid credentials"
      })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success:false,
        message:"Invalid credentials"
      })
    }
    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({
      success:true,
      message:"Loggin successfully",
      user: {
        ...user._doc,
        password:" "
      }
    })
  } catch (error) {
   console.log("Error in login ", error.message)
    res.status(500).json({
      success:false,
      message:"Login not success"
    })
  }
}

export async function logout(req, res) {
  try {
   res.clearCookie("jwt-netflix");
   res.status(200).json({
      success:true,
      message:"Logged out successfully"
    })
  } catch (error) {
    console.log("Error in Logged out ", error.message)
    res.status(500).json({
      success:false,
      message:"Logged out not success!"
    })
  }
}
export async function authCheck(req, res) {
  try {
    res.status(200).json({
      success:true,
      user:req.user
    })
  } catch (error) {
    console.log("error in authcheck", error.message)
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}


//eFJ8JQEd39LHJTWy
