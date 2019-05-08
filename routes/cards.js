const express = require('express')
const router = express.Router();
const readData = require('../data/readData.js')
//this apparently does json parse for you somehow...
const {data }= require('../data/flashcardData.json')
const cards = data.cards

let cards2 = readData.connectToClient()
//console.log(cards2)

router.get('/cards', (req, res) => {

	let id = Math.floor(Math.random()*cards.length);
	res.redirect(`/cards/${id}?side=question`)

})

router.get('/cards/:id', (req, res)=>{
	
	let {side} = req.query;
	let {id} = req.params;
	const username = req.cookies.username;
	const text = cards[id][side];

	//I could have also used side === undefined here.
	if(!side){
		res.redirect(`/cards/${id}?side=question`)
	}
	
	let hint;
	let nextSide = 'question'
	if(side == 'question'){
		hint = cards[id].hint
		nextSide = 'answer'
	}


	const templateData ={text, hint, nextSide, id, username}
	//console.log(templateData)

	res.render('cards', templateData)

})


module.exports = router;