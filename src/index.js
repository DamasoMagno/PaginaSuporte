const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    return res.render("index");
});

app.post("/feedback",(req,res)=>{
    const { name, email, comment } = req.body;

    const transporter = nodemailer.createTransport({
        host:process.env.NODEMAILER_HOST,
        port:process.env.NODEMAILER_PORT,
        secure:process.env.NODEMAILER_SECURE === "true",
        auth: {
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASS
        }
    });

    message = {
        from:process.env.NODEMAILER_HOST,
        to: process.env.NODEMAILER_PATH,
        subject: `Duvida por ${name}`,
        html: `<h3>${comment }</h3> <br>
        Email de contato: ${email}`,
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return res.redirect("/");
    });
});

app.listen(process.env.PORT || 15000,()=>{
    console.log("Server is running");
})