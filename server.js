const express = require('express')
const nunjucks = require('nunjucks')
const bodyparser = require('body-parser')
const nodemailer = require( 'nodemailer')
const config = require('./config')
const menseger = require ('./menseger')

// config

const server = express()

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server
})



const transporter = nodemailer.createTransport(config);

server.use(bodyparser.urlencoded({extended:false}))
server.use(bodyparser.json())

// routers

server.get("/", function(req, res){
    return res.render('index')
})

server.get("/bio", function(req, res){
    return res.render('bio')
})

server.get("/ebook", function(req, res){
    res. render('ebook')
})

server.get("/asriquezasdosalmos", function(req, res){
    res.render('ebookfull')
})

//form
server.post('/form',(req,res)=>{
    
    
    const message = {
        from:config.auth.user,
        to:req.body.email,
        subject: menseger.title,
        replyTo: config.auth.user,
        html: menseger.mesenger
    }

    const message2 = {
        from:config.auth.user,
        to:config.auth.user,
        subject:menseger.title2,
        text: "nome: " + req.body.name + "email: " + req.body.email
    
    }

    transporter.sendMail(message,(error,infor) => {
        if (error){
            return res.status(400).send('Falhoou')
        }
    })

    transporter.sendMail(message2,(error,info) => {
        if(error){
            return res.status(400).send('falhoou')
        }else{
            return res.redirect("/asriquezasdosalmos")
            
        }
    })
})

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});