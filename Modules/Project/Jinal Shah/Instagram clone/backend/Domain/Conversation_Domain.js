const Conversation = require('../models/ConversationModel');
const Message = require('../models/MessageModel');

class conveLogic {

   async insert(req, res) {

      const conversation1 = await Conversation.find({
         $and: [{ members: { $in: [req.body.senderId] } }, { members: { $in: [req.body.receiverId] } }]
      })

      if (conversation1.length == 0) {
         //res.send('insert ')
         const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
         });
         try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
         }
         catch (err) {
            res.status(500).json(err);
         }
      }
      else res.send('already exist')

      /*  const newConversation = new Conversation({
          members: [req.body.senderId, req.body.receiverId]
       });
       try {
          const savedConversation = await newConversation.save();
          res.status(200).json(savedConversation);
       }
       catch (err) {
          res.status(500).json(err);
       } */

   }

   async getById(req, res) {
      try {
         const conversation = await Conversation.find({
            members: { $in: [req.params.id] },
         })
            .populate("members", "profilePic userID _id")
         res.status(200).json(conversation);
      } catch (err) {
         res.status(500).json(err);
      }
   }

   async group(req, res) {
      //console.log(req.body);
      const newConversation = new Conversation({
         members: req.body
      });
      try {
         const savedConversation = await newConversation.save();
         res.status(200).json(savedConversation);
      }
      catch (err) {
         res.status(500).json(err);
      }
   }

   async delete(req, res) {

      const ID1 = req.params.id
      const selData = await Conversation.find({ _id: ID1 })
      if (selData.length == 0) res.status(404).send("user not found..")

      //const messages = await Message.find({ conversationId: ID1 })
      const remove = await Conversation.remove({ _id: ID1 })
      const remove1 = await Message.remove({ conversationId: ID1 })
      res.send(selData)

   }

   async getAll(req, res) {
      Conversation.find()
         .populate("members")
         .then(data => {
            res.json({ data })
         })
         .catch(err => {
            console.log(err)
         })
   }

}

module.exports = conveLogic