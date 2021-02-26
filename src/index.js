const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const emailTo = "limamdamaso@gmail.com";

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    return res.render("index");
});

app.post("/feedback",(req,res)=>{
    const { nome,email, comentario } = req.body;

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: "jonatanfrederico6@gmail.com",
                pass: "iQ&Qr*JeLPPG"
            }
        });

        message = {
            from: `${email}`,
            to: emailTo,
            subject: `Duvida por ${nome}`,
            text: `${comentario}`,
        }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return res.redirect("/")
    });
});

app.listen(15000,()=>{
    console.log("Server is running");
})