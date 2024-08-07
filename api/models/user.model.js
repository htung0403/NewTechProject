import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    role:{
        type: String,
        enum: ['khach', 'giaovien', 'hieutruong', 'hieupho', 'admin'],
        default: 'khach',
        required: true,
    },
    }, {timestamps: true}    
)

const User = mongoose.model('User', userSchema);

export default User;