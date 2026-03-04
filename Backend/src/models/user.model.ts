import mongoose  from "mongoose";


const userSchema = new mongoose.Schema(
    {
        
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        avt: {
            default: "avatar.png",
            type: String
        },
        friends: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        friendRequests: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
    },
    { timestamps: true }
    );

const Users = mongoose.model("User", userSchema);
export default Users;