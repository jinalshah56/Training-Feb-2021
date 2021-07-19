const Post = require('../models/PostModel');

class postLogic {

    async all(req, res) {
        Post.find()
            .populate("postedBy", "userID _id profilePic")
            .populate("comments.postedBy", "_id userID")
            .sort('-createdAt')
            .then((posts) => {
                res.json({ posts })
            }).catch(err => {
                console.log(err)
            })
        // Post.find({ "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
    }

    async mypost(req, res) {
        Post.find({ postedBy: req.params.id })
            .populate("comments.postedBy", "_id userID")
            .populate("postedBy")
            .then(mypost => {
                res.json({ mypost })
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getbyid(req, res) {
        const ID1 = req.params.id
        const sdata = await Post.find({ _id: ID1 })
            .populate("postedBy", "userID _id")
            .populate("comments.postedBy", "_id userID")
            .sort('-createdAt')
        if (sdata.length == 0) res.status(404).send("user not found..")
        res.send(sdata)
    }

    async insert(req, res) {

        console.log(req.body)
        console.log(req.file)
        console.log(req.file.path)

        const { title, body, postedBy } = req.body

        const post = new Post({
            title,
            body,
            photo: req.file.filename,
            postedBy
        })
        console.log('post = ' + post)
        post.save()
            .then(result => {
                res.json({ post: result })
            })
            .catch(err => {
                console.log(err)
            })
    }

    async update(req, res) {
        const ID1 = req.params.id
        console.log(ID1)
        const selData = await Post.find({ _id: ID1 })
        if (selData.length == 0) res.status(404).send("user not found..")
        const newdata = req.body
        for (let i in newdata) {
            selData[0][i] = newdata[i]
        }
        const result = await selData[0].save();
        res.send(result)
    }

    async postdelete(req, res) {

        const ID1 = req.params.id
        const selData = await Post.find({ _id: ID1 })
        console.log(selData)
        if (selData.length == 0) res.status(404).send("user not found..")
        const remove = await Post.remove({ _id: ID1 })
        //res.send(selData)
        Post.find()
            .populate("postedBy", "userID _id")
            .populate("comments.postedBy", "_id userID")
            .sort('-createdAt')
            .then((posts) => {
                res.json({ posts })
            }).catch(err => {
                console.log(err)
            })
    }

    async comment(req, res) {
        const { text, postId, postedBy } = req.body
        const comment = {
            text,
            postId,
            postedBy
        }
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id userID")
            .populate("postedBy")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            })
    }

    async like(req, res) {

        const { userId, postId } = req.body
        Post.findByIdAndUpdate(postId, {
            $push: { likes: userId }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    }

    async unlike(req, res) {

        const { userId, postId } = req.body
        Post.findByIdAndUpdate(postId, {
            $pull: { likes: userId }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    }


    async cmntdelete(req, res) {

        const ID1 = req.params.id
        Post.findByIdAndUpdate(req.body.postedBy, {
            $pull: { comments: { _id: ID1 } }
        }, { new: true }).then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })

    }

}

module.exports = postLogic

// https://stackoverflow.com/questions/43314086/retrieving-images-stored-in-mongodb