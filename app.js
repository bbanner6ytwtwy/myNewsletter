
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = process.env.Api_Key;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", (req, res) => {
    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const email = req.body.email;
    const password = req.body.password;
    const listId = 'da1f50fc17';
    const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`;
    const subscriber = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        }
    };
    async function addSubscriber() {
        try {
            const response = await axios.post(url, subscriber, {
                auth: {
                    username: 'apikey',
                    password: process.env.API_KEY
                }
            });
            if (response.status === 200) {
                res.sendFile(__dirname + "/success.html");
            } 
        } catch (err) {
            if(err) {
                console.log(err)
                res.sendFile(__dirname + "/failure.html");
            }
        }
    }
    addSubscriber();
});
app.listen(process.env.PORT || port, () => (console.log("cow.......")));
