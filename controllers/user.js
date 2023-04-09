import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!User) {
          res.status(400).json({
            success: false,
            message: "Wrong Creditential",
          });
        } else {
          const comparedPass = await bcrypt.compare(password, user.password);

          if (comparedPass) {
            const jwtToken = jwt.sign({ _id: user._id }, "prakhar2009");

            res.status(201).cookie("token", jwtToken,{
              httponly:true,
              sameSite:"none",
              secure:true,
            }).json({
              success: true,
              message: "User is logged in",
              userdata: user,
            });
          } else {
            res.status(400).json({
              success: false,
              message: "EWrong Creditential",
            });
          }
        }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Wrong Creditentials"
      })
      console.log(error.message)
    }
};

const Createuser = async (req, res) => {
  try {
    const { email, name, password } = req.body; 
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        success:false,
        message: "User already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, name, password: hashedPassword });
      const createdUser = await newUser.save();
      const jwtToken = jwt.sign({ _id: newUser._id }, "prakhar2009");

      res.status(201).cookie("token", jwtToken,{
        httponly:true,
        sameSite:"none",
        secure:true,
      }).json({
        success: true,
        message: "User created successfully",
        userdata: createdUser,
      });
    }
  } catch (error) { 
    res.status(400).json({
      success: false,
      message: "Email ,Name or password is not provided",
    });
  }
};

const Logout=(req ,res) => {
  try {

          res.status(200).cookie("token", "").json({
          success: true,
          message: "Loged out successfully"

          })
  } catch (error) {
    console.log(error.message)
  }
}

export { Login, Createuser,Logout };
