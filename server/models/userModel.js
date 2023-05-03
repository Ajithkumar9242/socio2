import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
    profilepic: { type: String},
    coverpic: { type: String},
    about: { type: String},
    livesIn: { type: String},
    worksAt: { type: String},
    relationship: { type: String},
    followers: [],
    following: []
}, {timestamps: true })

const UserModel = mongoose.model("Users", userSchema)
export default UserModel