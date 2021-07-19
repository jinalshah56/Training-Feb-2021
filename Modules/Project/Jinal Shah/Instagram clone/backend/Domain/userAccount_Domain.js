const user = require('../models/UserAccountModel');
const Post = require('../models/PostModel');
const encryption = require('../Encryption/encrypt')
const mail = require('../Email/Email_index')

var a
class accLogic {

    async getbyid(req, res) {

        user.find({ _id: req.params.id })
            .populate("following", "profilePic userID")
            .populate("followers", "profilePic userID")
            .select("-userPWD")
            .then((users) => {
                res.json({ users })
                return;
            })
    }

    async getDetails(req, res) {
        user.find({ _id: req.params.id })
            .select("followers following")
            .then((users) => {
                res.json({ users })
                return;
            })
    }

    async follow(req, res) {
        console.log(req.body.id)
        user.findByIdAndUpdate(req.body.id, {
            $push: { followers: req.body.user }
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            user.findByIdAndUpdate(req.body.user, {
                $push: { following: req.body.id }

            }, { new: true }).select("-userPWD").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })

        }
        )
    }

    async unfollow(req, res) {
        console.log(req.body.id)
        user.findByIdAndUpdate(req.body.id, {
            $pull: { followers: req.body.user }
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            user.findByIdAndUpdate(req.body.user, {
                $pull: { following: req.body.id }

            }, { new: true }).select("-userPWD").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })

        }
        )
    }

    async updateProfilePic(req, res) {
        console.log(req.body)
        console.log(req.file)
        user.findByIdAndUpdate(req.body.postedBy,
            {
                $set:
                    { profilePic: req.file.filename }
            },
            { new: true },
            (err, result) => {
                if (err) {
                    return res.status(422).json({ error: "pic canot post" })
                }
                res.json(result)
            })
    }

    async insert(req, res) {
        var newdata = req.body
        const pass = newdata.userPWD
        console.log(pass)

        a = newdata
        const e1 = newdata.email
        const sentOtp = mail.send(e1)

        const newpass = encryption.encryptPWD(pass)
        console.log(newpass)

        newdata.userPWD = newpass
        try {
            res.send('Check Your mail & verify OTP...')
        }
        catch (ex) {
            for (let field in ex.errors)
                console.log(ex.errors[field].message)
        }
    }

    async verify(req, res) {
        const otp = parseInt(req.params.id)
        //res.send(a)
        var verify = mail.verifyOTP(otp)
        if (verify == true) {
            const data1 = new user(a)
            try {
                const result = await data1.save();
                res.send(result)
            }
            catch (ex) {
                for (let field in ex.errors)
                    console.log(ex.errors[field].message)
            }
        }
        else {
            res.send("You have entered wrong OTP")
        }
    }

    async delete(req, res) {
        const ID1 = req.params.id
        const selData = await user.find({ userID: ID1 })
        if (selData.length == 0) res.status(404).send("user not found..")
        const remove = await user.remove({ userID: ID1 })
        res.send(selData)
    }

    async update(req, res) {
        const ID1 = req.params.id
        console.log(ID1)
        const selData = await user.find({ userID: ID1 })
        if (selData.length == 0) res.status(404).send("user not found..")
        const newdata = req.body
        for (let i in newdata) {
            selData[0][i] = newdata[i]
        }
        try {
            const result = await selData[0].save();
            res.send(result)
        }
        catch (ex) {
            for (let field in ex.errors)
                console.log(ex.errors[field].message)
        }
    }

    async search(req, res) {
        let userPattern = new RegExp("^" + req.body.c1)
        user.find({ userID: { $regex: userPattern } })
            //  .select("_id userID")
            .then(users => {
                res.json({ users })
            }).catch(err => {
                console.log(err)
            })
    }


}

module.exports = accLogic