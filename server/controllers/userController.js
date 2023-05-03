import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"

export const getUser = async (req , res) =>{
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)

        const { password , ...other} = user._doc

        if(user){
            res.status(200).json(other)
        }else{
            res.status(404).json("not found")
        }
    } catch (error) {
        console.log(error)
    }
}

//update

export const updateUser = async (req , res) =>{
    const id = req.params.id
    const { currentUserId, currentuserAdminStatus, password } = req.body

    if (id === currentUserId || currentuserAdminStatus) {
        try {


            if( password ){
               const salt = await bcrypt.genSalt(10)
               req.body.password = await bcrypt.hash(password, salt)
            }
            else{
                res.status(500).json("not authenticated")
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true})
            res.status(200).json(user)
            
        } catch (error) {
            console.log(error)
        }
    } else {
        
    }

}

//delete

export const deleteUser = async (req , res) =>{
    const id = req.params.id
    const { currentUserId, currentuserAdminStatus } = req.body

    if (currentUserId === id || currentuserAdminStatus) {
        try {
           await UserModel.findByIdAndDelete(id)
            res.status(200).json("Deleted")

        }catch{
            res.status(500).json("not authenticated")

        }
    }
    else{
                res.status(500).json("not authenticated")

        }
}


//follow
export const followUser = async (req , res) =>{
    const id = req.params.id
    const { currentUserId } = req.body
    if (currentUserId === id) {
       res.status(403).json("Forbidden")
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $push: { followers: currentUserId}
                })

                await followingUser.updateOne({
                    $push: { following: id}
                })
                res.status(200).json("User followed")
            }else{
       res.status(403).json("Already following")

            }
        } catch (error) {
            console.log(error)
        }
    }
}


//unfollow
export const unFollowUser = async (req , res) =>{
    const id = req.params.id
    const { currentUserId } = req.body
    if (currentUserId === id) {
       res.status(403).json("Forbidden")
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $pull: { followers: currentUserId}
                })

                await followingUser.updateOne({
                    $pull: { following: id}
                })
                res.status(200).json("User Not followed")
            }else{
       res.status(403).json("Already following")

            }
        } catch (error) {
            console.log(error)
        }
    }
}
