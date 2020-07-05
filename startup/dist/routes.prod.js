"use strict";var sms=require("../routes/sms"),auth=require("../routes/auth"),orders=require("../routes/orders"),products=require("../routes/products"),genres=require("../routes/genres"),index=require("../routes/index"),users=require("../routes/users"),search=require("../routes/search"),morgan=require("morgan"),express=require("express"),bodyParser=require("body-parser"),session=require("express-session"),mongoose=require("mongoose"),MongoStore=require("connect-mongo")(session);module.exports=function(e){e.use(morgan("dev")),e.use(bodyParser.json()),e.use(function(e,s,r){return s.header("Access-Control-Allow-Origin","*"),s.header("Access-Control-Allow-Headers","Orign, X-Reguested-With, Content-Type, Accept, Authorization"),"OPTIONS"===e.method?(s.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET"),s.status(200).json({})):void r()}),e.use("/api/orders",orders),e.use("/api/products",products),e.use("/api/genres",genres),e.use("/api/index",index),e.use("/api/users",users),e.use("/api/sms",sms),e.use("/api/auth",auth),e.use("/api/search",search),e.use(function(e,s,r){var o=new Error("Not found");o.status(404),r(o)}),e.use(function(e,s,r,o){r.status(e.status||500),r.json({error:{message:e.message}})})};