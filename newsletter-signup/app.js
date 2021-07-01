
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");

const app = express();

app.use(express.urlencoded());

app.use(express.static("public"));

app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signin.html");
});

mailchimp.setConfig({

 apiKey: "28bde0d80d8fa82fa4b81ea2a62fe57b-us6",

 server: "us6"
});

app.post("/", function (req,res) {

const firstName = req.body.firstName;
const secondName = req.body.lastName;
const emaila = req.body.emailID;

const listId = "17a9253ffb";

const subscribingUser = {
 first: firstName,
 last: secondName,
 email: emaila
};

 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.first,
 LNAME: subscribingUser.last
}
});

 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}

 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure",function(req,res){
    res.redirect("/");
})
//apikey
//28bde0d80d8fa82fa4b81ea2a62fe57b-us6
//listid
//17a9253ffb