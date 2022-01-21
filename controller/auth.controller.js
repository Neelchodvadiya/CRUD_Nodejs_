const jwt = require("jsonwebtoken");
const chapter = require("../models/auth.models");

exports.userlogin = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        // console.log(email);
        // console.log(password);

        const dataemail = await chapter.findOne({ email: email });
        // console.log(dataemail.name);
        if (dataemail.password === password && dataemail.email === email) {
            if (!dataemail.tokens[0]) {
                const token = await dataemail.generateauthToken();
                // console.log(token);
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 100000)
                })

                res.status(201).json({
                    message: "Login Succesfull",
                    status: 201,

                })
            } else {
                res.status(400).json({
                    message: "already token",
                    status: 400,
                })
            }
        }
        else {
            res.status(400).json({
                message: "page not found 001",
                status: 400,
            })
        }
        //  console.log(dataemail);


    } catch (error) {
        res.status(400).json({
            message: "page not found 002",
            status: 400,
        })

    }

}

exports.userReg = async (req, res) => {
    try {
        const userdata = await chapter(req.body);
        // const token = await userdata.generateauthToken();
        const registerd = await userdata.save();
        res.status(200).json({
            message: "save data to datbase"
        })
    } catch (error) {
        res.status(200).json({
            message: "not successful"
        })
    }

}

exports.userLogout = async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token

        })
        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({
            message: "logout successfully"
        })

    } catch (error) {
        res.status(200).json({
            message: "something went wrong try again latter"
        })

    }
}