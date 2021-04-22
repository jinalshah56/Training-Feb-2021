const express = require("express");
const app = express();
const router = express.Router({mergeParams : true});
const authenticateToken = require("../../authentication/authentication")
const students = require("../../../models/students")

app.use(express.json());

class feess {
    
    static gets(req,res){
        async function getfees() {
            const student1 = await students.find({ ID : req.params.ID }).select({Fees : 1})
            if(!student1) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>')
            res.send(student1)
        }
        getfees()
    }
}

router.get("/", authenticateToken , feess.gets)

module.exports = router;
