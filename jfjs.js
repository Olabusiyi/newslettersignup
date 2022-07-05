const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();

// Quick start from documenttion.  Making first API Call
mailchimp.setConfig({
  apiKey: "3847132487864cf35596f719c15b6f4a-us14",
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

  // const subscribingUser = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   email: email
  // };

  async function run() {
    const response = await mailchimp.lists.batchListMembers("3f57dd7ba8", {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }],
    });



    console.log(response);


    }

    // res.sendFile(__dirname + "/signup.html")
    // console.log("Successfully added contact as an audience member. The contact's id is" + members);

    run();

    // const data = {
    //   members: [{
    //     email_address: email,
    //     status: "subscribed",
    //     merge_fields: {
    //       FNAME: firstName,
    //       LNAME: lastName,
    //     }
    //
    //   }]
    // };

    // const jsonData = JSON.stringify(response1);

    // const url = "https://us14.admin.mailchimp.com/lists/3f57dd7ba8"
    //
    // const options = {
    //   method: "POST",
    //   auth: "ola1:3847132487864cf35596f719c15b6f4a-us14"
    // }
    //
    // const request = https.request(url, options, function(response) {
    //   response.on("data", function(data) {
    //     console.log(JSON.parse(data));
    //   })
    // })
    //
    // request.write(jsonData);
    // request.end();




})






app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
// API apiKey
//3847132487864cf35596f719c15b6f4a-us14

//list ID
// 3f57dd7ba8
