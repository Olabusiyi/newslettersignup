const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();

// Quick start from documenttion.  Making first API Call
mailchimp.setConfig({
  apiKey: //Hidden,
  server: "us14",
});


app.use(express.static("public")); // to allow access of local files such as css and images
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const listId = "3f57dd7ba8";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };


  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {

      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }

    });

    res.sendFile(__dirname + "/success.html")
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }
  //Running the function and catching the errors (if any)
  // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
  // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
  run().catch(e => res.sendFile(__dirname + "/failure.html"));

})


app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

