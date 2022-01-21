const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
        
    },
    password: {
        type: String,
        required: true
    },
    confpassword: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                required: true,
                type: String
            }
        }

    ]
});

authSchema.methods.generateauthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id:this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}


module.exports = mongoose.model("chapter", authSchema);