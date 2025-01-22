import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'Lax'
  
};

export const signUp = async(req,res)=>{
    
    try{
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({ userName });
        
        if(isExist){
            res.status(400).json({ error: "Username Already Exist Please try with other username" });
        }else{
            let updatedPass = await bcrypt.hash(password, 10);
            const user = new User({ channelName, userName, about, profilePic, password: updatedPass });
            await user.save();
            res.status(201).json({message: "User registered successfully", success: "yes", data:user});
        }
        
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const signIn = async (req,res)=>{
    try{
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if(user && await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({userId: user._id}, "Its_My_Secret_Key");
            res.cookie('token', token, cookieOptions);

            res.json({message:"Logged in successfully", success:"true", token, user})
        }else{
            res.status(400).json({error:"Invalid credentials"});
        }
    } catch (errorMsg){
        res.status(500).json({ error: 'Server error' });
    }
}

export const logout = async(req,res)=>{
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}


export const updateUser = async (req, res) => {
    try {
      const { channelName, about, profilePic, userId } = req.body;
      let updateFields = {};
  
      if (channelName) updateFields.channelName = channelName;
      if (about) updateFields.about = about;
      if (profilePic) updateFields.profilePic = profilePic;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };


  export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: 'All users retrieved successfully', data: users });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};