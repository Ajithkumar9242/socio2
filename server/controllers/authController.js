import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"

export const registerUser = async( req, res) =>{
    const { username, password, firstname, lastname }= req.body

    const salt = await bcrypt.genSalt(10)
    const haashedPaass = await bcrypt.hash(password , salt )

    const newUser = new UserModel({
        username, 
        password: haashedPaass, 
        firstname, 
        lastname
    })

    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
}


export const loginUser = async( req, res) =>{
    const { username , password } = req.body

    try {
        const user = await UserModel.findOne({ username: username})

        if (user) {
            const valid = await bcrypt.compare(password, user.password)

            valid ? res.status(200).json(user) : res.status(500).json("Not Password")
        } else {
            res.status(404).json("Not found")
        }
    } catch (error) {
        console.log(error)
    }
}