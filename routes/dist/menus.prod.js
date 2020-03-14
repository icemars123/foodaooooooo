"use strict";var _require=require("../models/Genre"),Genre=_require.Genre,_require2=require("../models/Menu"),Menu=_require2.Menu,validateMenu=_require2.validateMenu,bodyParer=require("body-parser"),mongoose=require("mongoose"),express=require("express"),router=express.Router();router.get("/",function(e,r,t){var n,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Menu.find());case 3:n=e.sent,a={count:n.length,menus:n.map(function(e){return{_id:e._id,category:e.category,price:e.price,main_materials:e.main_materials,taste:e.taste,features:e.features,isPublished:e.isPublished,genre:e.genreId,request:{type:"GET",url:"http://localhost:3000/api/menus/"+e._id}}})},r.status(200).json(a),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),r.status(500).json({error:e.t0}),t();case 13:case"end":return e.stop()}},null,null,[[0,8]])}),router.get("/:id",function(r,t,n){var a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Menu.findById(r.params.id));case 3:if((a=e.sent).length<=0)return e.abrupt("return",t.status(404).json({message:"The menu with the given ID was not found."}));e.next=6;break;case 6:t.status(200).json({menu:a,request:{type:"GET",description:"GET ALL MMENUS",url:"http://localhost:3000/api/menus"}}),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),t.status(500).json({error:e.t0}),n();case 14:case"end":return e.stop()}},null,null,[[0,9]])}),router.post("/",function(r,t,n){var a,s,u;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=validateMenu(r.body),s=a.error)return e.abrupt("return",t.status(400).send(s.details[0].message));e.next=3;break;case 3:return u=new Menu({category:r.body.category,price:r.body.price,main_materials:r.body.main_materials,taste:r.body.taste,features:r.body.features,isPublished:r.body.isPublished,genre:{_id:genre._id,name:genre.name}}),e.prev=4,e.next=7,regeneratorRuntime.awrap(Genre.findById(r.body.genreId));case 7:if(e.sent){e.next=10;break}return e.abrupt("return",t.status(400).send("Invalid genre"));case 10:return e.next=12,regeneratorRuntime.awrap(Menu.find({category:r.body.category}));case 12:if(0<e.sent.length)return e.abrupt("return",t.status(409).send("The category already exist"));e.next=15;break;case 15:return e.next=17,regeneratorRuntime.awrap(u.save());case 17:u=e.sent,t.status(201).json({message:"Created menu successfully",createdMenu:{category:u.category,price:u.price,main_materials:u.main_materials,taste:u.taste,features:u.features,isPublished:u.isPublished,genre:{_id:u.genre._id,name:u.genre.name},request:{type:"GET",url:"http://localhost:3000/api/menus/"+u._id}}}),e.next=26;break;case 21:e.prev=21,e.t0=e.catch(4),console.log(e.t0),t.status(500).json({error:e.t0}),n();case 26:case"end":return e.stop()}},null,null,[[4,21]])}),router.put("/:id",function(r,t,n){var a,s,u,i;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=validateMenu(r.body),s=a.error)return e.abrupt("return",t.status(400).send(s.details[0].message));e.next=3;break;case 3:return e.prev=3,e.next=6,regeneratorRuntime.awrap(Genre.findById(r.body.genreId));case 6:if(u=e.sent){e.next=9;break}return e.abrupt("return",t.status(400).send("Invalid genre"));case 9:return e.next=11,regeneratorRuntime.awrap(Menu.find({category:r.body.category}));case 11:if(0<e.sent.length)return e.abrupt("return",t.status(409).send("The category already exist"));e.next=14;break;case 14:return e.next=16,regeneratorRuntime.awrap(Menu.findByIdAndUpdate(r.params.id,{category:r.body.category,price:r.body.price,main_materials:r.body.main_materials,taste:r.body.taste,features:r.body.features,isPublished:r.body.isPublished,genre:{_id:u._id,name:u.name}},{new:!0}));case 16:if((i=e.sent).length<=0)return e.abrupt("return",t.status(404).json({message:"The menu with the given ID was not found."}));e.next=19;break;case 19:t.status(200).json({message:"Menu updated successfully",createdMenu:{category:i.category,price:i.price,main_materials:i.main_materials,taste:i.taste,features:i.features,isPublished:i.isPublished,genre:{_id:i.genre._id,name:i.genre.name},request:{type:"GET",url:"http://localhost:3000/api/menus/"+i._id}}}),e.next=27;break;case 22:e.prev=22,e.t0=e.catch(3),console.log(e.t0),t.status(500).json({error:e.t0}),n();case 27:case"end":return e.stop()}},null,null,[[3,22]])}),router.patch("/:id",function(r,t){var n,a,s,u,i,o,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:for(n={},s=!(a=!0),u=void 0,e.prev=4,i=r.body[Symbol.iterator]();!(a=(o=i.next()).done);a=!0)c=o.value,n[c.propName]=c.value;e.next=12;break;case 8:e.prev=8,e.t0=e.catch(4),s=!0,u=e.t0;case 12:e.prev=12,e.prev=13,a||null==i.return||i.return();case 15:if(e.prev=15,s)throw u;e.next=18;break;case 18:return e.finish(15);case 19:return e.finish(12);case 20:return e.next=22,regeneratorRuntime.awrap(Menu.findByIdAndUpdate(r.params.id,{$set:n},{new:!0}));case 22:if((d=e.sent).length<=0)return e.abrupt("return",t.status(404).json({message:"The menu with the given ID was not found."}));e.next=25;break;case 25:t.status(200).json({message:"Menu updated successfully",request:{type:"GET",url:"http://localhost:3000/api/menus/"+d._id}});case 26:case"end":return e.stop()}},null,null,[[4,8,12,20],[13,,15,19]])}),router.delete("/:id",function(r,t,n){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Menu.findByIdAndDelete(r.params.id));case 3:if(e.sent){e.next=6;break}return e.abrupt("return",t.status(404).send("The menu with the given ID was not found."));case 6:t.status(200).json({message:"Menu deleted successfully",request:{type:"POST",url:"http://localhost:3000/api/menus"}}),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),t.status(500).json({error:e.t0}),n();case 14:case"end":return e.stop()}},null,null,[[0,9]])}),module.exports=router;