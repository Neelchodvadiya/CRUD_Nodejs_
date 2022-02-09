
const chapter = require("../models/auth.models");

exports.userlogin = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const data = await chapter.findOne({ email: email });

        if (data.password === password && data.email === email) {
            if (!data.tokens[0]) {
                const token = await data.generateauthToken();
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
                message: "page not found",
                status: 400,
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "page not found",
            status: 400,
        })

    }
}

exports.userReg = async (req, res) => {
    try {
        const userdata = await chapter(req.body);
        
        const data = await userdata.save();
        res.status(200).json({
            message: "save data to datbase",
            data:data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
    
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
        res.status(400).json({
            message: "something went wrong try again latter"
        })

    }
}


exports.updatedata = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await chapter.findByIdAndUpdate(_id, req.body, {
            new: true
        });
       
        res.status(200).json({
            message: "record updated successfully",
            data:data
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "did not update"
        })
    }
}

exports.getalldata = async (req, res) => {
    try {
        const showdata = await chapter.find({});
        res.status(200).json({
            msg:"displayed record",
            data:showdata
        });
    } catch (error) {
        res.status(400).json({
            message: "can not display"
        })
    }
}

exports.deleteuser = async (req, res) => {
    try {
        const _id = req.params.id;

        const data = await chapter.findByIdAndDelete(_id, {
            new: true
        });
        res.status(200).json({
            message: "user deleted"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "did not deleted"
        })
    }
}  