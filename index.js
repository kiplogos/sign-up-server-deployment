
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req, res){
    const input1 = req.body.emailAddress
    const input2 = req.body.firstName
    const input3 = req.body.lastName

    console.log(input1,input2,input3)

    const data = {
        members: [
            {
                email_address: input1,
                status: "subscribed",
                merge_fields: {
                    FNAME: input2,
                    LNAME: input3
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/e7b08dd1fb"
    const options = {
        method: "POST",
        auth: "kip:55c47d99d8d961f742630ef29ce8b678-us21"

    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            // console.log(JSON.parse(data))
            console.log(response.statusCode)
            if (response.statusCode==200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        })

    })
    request.write(jsonData)
    request.end()

})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running on port 3000")
})

// 55c47d99d8d961f742630ef29ce8b678-us21

// e7b08dd1fb