"use strict";var config=require("config"),jwt=require("jsonwebtoken"),Joi=require("@hapi/joi");Joi.objectId=require("joi-objectid")(Joi);var mongoose=require("mongoose"),userSchema=new mongoose.Schema({name:{type:String,require:!0,maxlength:50},phone:{type:String,required:!0,unique:!0},email:{type:String},password:{type:String,required:!0,minlength:8,maxlength:1024},registerDate:{type:Date,default:Date.now},birth:{type:String,default:""},sex:{type:String,default:""},isAdmin:{type:Boolean,default:!1}});userSchema.methods.generateAuthToken=function(){return jwt.sign({phone:this.phone,isAdmin:this.isAdmin},config.get("jwtPrivateKey"))};var User=mongoose.model("User",userSchema);function validateUser(e){return Joi.object({name:Joi.string().max(50).required(),phone:Joi.string().required(),email:Joi.string().email(),password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/)}).validate(e)}exports.User=User,exports.userSchema=userSchema,exports.validateUser=validateUser;