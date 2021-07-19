const Story = require('../models/StoryModel');

class storyLogic {

   async all(req, res) {

      Story.find({ "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
         .populate('postedBy', 'userID profilePic')
         .sort('-createdAt')
         .then((stories) => {
            res.json({ stories })
         }).catch(err => {
            console.log(err)
         })

   }

   async insert(req, res) {

      const { postedBy } = req.body

      const story = new Story({
         photo: req.file.filename,
         postedBy
      })
      story.save()
         .then(result => {
            res.json({ post: result })
         })
         .catch(err => {
            console.log(err)
         })
   }

   async delete(req, res) {
      const ID1 = req.params.id
      const selData = await Story.find({ _id: ID1 })
      console.log(selData)
      if (selData.length == 0) res.status(404).send("user not found..")
      const remove = await Story.remove({ _id: ID1 })
   }

}

module.exports = storyLogic

