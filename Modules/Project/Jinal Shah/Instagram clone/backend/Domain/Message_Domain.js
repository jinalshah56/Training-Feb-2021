const Message = require('../models/MessageModel');

class messageLogic {

   async insert(req, res) {

      const newMessage = new Message(req.body);
      try {
         const savedMessage = await newMessage.save();
         res.status(200).json(savedMessage);
      } catch (err) {
         res.status(500).json(err);
      }

   }

   async getById(req, res) {

      try {
         const messages = await Message.find({
            conversationId: req.params.id,
         })
            .populate("sender", "userID profilePic")
         res.status(200).json(messages);
      } catch (err) {
         res.status(500).json(err);
      }

   }

   async getAll(req, res) {
      Message.find()
         .populate("sender", "userID")
         .then(result =>
            res.send(result))
   }

}

module.exports = messageLogic