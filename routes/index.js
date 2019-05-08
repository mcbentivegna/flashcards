//when requiring a rile in node js, you can just refer to the folder name and index.js will be loaded by default.

const express = require('express')
const router = express.Router();

router.get('/' , (req, res) => {
	const username = req.cookies.username
	const email = req.cookies.email
	//I forgot there is an ES6 shorthand where if the key and value are the same word, you can just include it once.
	//so {username} instead of {username: username}

	if(username){
		res.render('index', {username, email})
	}
	else{
		res.redirect('/hello')
	}
})

router.get('/hello', function(req,res){
	const username = req.cookies.username
	const email = req.cookies.email

	if(username){
		res.redirect('/')
	}
	else{
		res.render('hello',
		{ 
			username: req.cookies.username,
			email: req.cookies.email
		})
	}
})

router.post('/hello', function(req, res){
	res.cookie('username', req.body.username)
	res.cookie('email', req.body.email)
	res.redirect('/')

})

router.post('/goodbye', function(req, res){
	res.clearCookie('username')
	res.clearCookie('email')
	res.redirect('/hello')

})

//if you look at all the routes and don't find anything, you get to the last route which is for throwing 404s.
router.use((req,res,next) => {
	const err = new Error ('Not Found');
	err.status = 404;
	next(err)
})

router.use((err, req, res, next) =>{
	//another way to pass important info
	//res.local.error = err;
	//make sure the routerropriate status code is passed along to the client. Now you can see this in dev tools.
	res.status(err.status)

	res.render('error', {error: err})
})

module.exports = router;