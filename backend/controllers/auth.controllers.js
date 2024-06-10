import User from '../models/user.model.js'
import bcyript from 'bcrypt'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookies.js'


export const signup = async (request,response)=>{
    try {
        const {email,password} = request.body
        if (!email || !password) {
          return  response.status(404).send({error:"please filled all fields"})
        }

        const user = await User.findOne({email})

        if (user) {
           return response.status(404).send({error:"You already have an account"}) 
        }

        const salt = await bcyript.genSalt(10)
        const hashedPassword = await bcyript.hash(password,salt)

        const newUser = await User.create({email,password:hashedPassword})
        generateTokenAndSetCookie(newUser._id,response)
        response.status(201).send(newUser)

  
    } catch (error) {
        console.log(`Error in signup controller:${error.message}`);
        response.status(404).send({error:"internal server error"})
    }
}
export const login = async (request,response)=>{    
    try {
        const {email,password} =request.body
        if (!email || !password) {
            return response.status(404).send({error:"please fill all fields"})
        }
        const user = await User.findOne({email})
        if (!user) {
            return response.status(404).send({error:"you dont have an account"})
        }

        const isPasswordCorrect= await bcyript.compare(password,user.password);
        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return response.status(404).send({error:"wrong password"})
        }
        generateTokenAndSetCookie(user._id,response)
        response.status(201).send(user)
    } catch (error) {
        console.log(`Error in signup controller:${error.message}`);
        response.status(404).send({error:"internal server error"})
    }
}
export const logout = async (request,response)=>{
    try {
        response.cookie("jwt","");
        response.status(200).send({message:"Logged out sucsesfully "})
        
    } catch (error) {
        console.log(`Error in signup controller:${error.message}`);
        response.status(404).send({error:"internal server error"})
    }
}