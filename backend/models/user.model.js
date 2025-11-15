import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        fullname: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

        // Followers → users who follow me
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        // Following → users I follow
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        profileImg: {
            type: String,
            default: ""
        },

        coverImg: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        link: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);
