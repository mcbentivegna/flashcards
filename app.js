//my libraries
	const express = require('express');
	//require body parser middleware.
	const bodyParser = require('body-parser');
	//require cookie parser middleware.
	const cookieParser = require('cookie-parser');
	//require pug
	const pug = require('pug')


//this builds an express application, which we name app. It will be extended with routes, etc
	const app = express()
	//express defaults to look in the view folder (you can change this with app.set('views', folder name))
	//this tells express which template engine to use.

//hosting info
	const port = 3000
	const hostname = '127.0.0.1'

//templates
	//This is how express website tells you to import from pug and fill in the template
	// https://expressjs.com/en/guide/using-template-engines.html
	//setting the view engine, then just rendering.
	//idk why they use = and #{} for variables, these seem basically the same.
	app.set('view engine','pug')

//middleware!

	//read variables (i.e. username) from form in the request object.
	app.use(bodyParser.urlencoded({extended: false}))
	//add cookies to response
	app.use(cookieParser());

	//I guess you load style sheets with the rest of the middleware. Might be why I had trouble with this in the blue-bikes project...
	app.use('/static',express.static('public'));

	//we're importing our routes with the other middleware
	const mainRoutes = require('./routes/index')
	const cardRoutes = require('./routes/cards')
	app.use(cardRoutes);
	app.use(mainRoutes);

	


	//////////////////////////////Learning about middleware
	/*
	What is middleware?
	 (req, res, next) => {}
	 cookie parser modified the response object, and placed the cookies content onto it.
	 to run middleware in response to requests, pass it into app.use. This runs the middleware function for every request that occurs. To only run it for a specific route, pass the router arguement before the middleware function (so I guess app.use('/hello', cookieParser())
	 earlier middleware functions run before the later ones.
	 next signals the end of the middleware function. If you comment it out, the app hangs and can't proceded to the next function called via app.use. You don't need to use next in most post/get functions, because you send a response, and that ends the process. next also helps with errors.
	 Anything in use, get or post function is middleware.
	*/
	/*Errors in middleware.

	Can be passed in next(err)
	*/

	app.use((req, res, next) =>{
		//new req property!
		req.cheese = 'swiss'
		console.log('1')
		//let's pretend we need an error message!
			/*
			const err = new Error('on noes!');
			//set status code to 500 to indicate this is a generic error. 
			err.status = 500
			//pass error along with next statement. It will go to our generic error ahandling app.use(err, req, res,next)
			next(err)
			*/
		next()
		
	},
	//what is this? are there two callback functions?
	//seems to be an expres-specific feature. You can put all your middleware functions in one app.use
	//or use multiple app.use
	(req, res, next) =>{
		console.log(req.url)
		next()
	})

	app.use((req, res, next) =>{
		console.log('2')
		console.log(req.cheese)
		next()
	})
	////////////////////

//ROUTES!




////////////////////////////////
//Some fun data I passed to sandbox.
		const colors = [
		  'pink',
		  'lightcoral',
		  'gold',
		  'lightgreen',
		  'cornflowerblue',
		  'thistle'
		];

		const names =
		[
			{first: 'Sebatian', last: 'Flyte'},
			{first: 'Julia', last: 'Flyte'},
			{first: 'Charles', last: 'Ryder'}
		]



		


		const name2 = 'Michelle'

		
		//this is the way the pug website tells you to import from pug and fill in the template
		// https://pugjs.org/api/getting-started.html
		//import and compile our template
		const compiledFunction = pug.compileFile('test.pug')

		app.get('/sandbox2' , (req, res) => {
			res.send(compiledFunction({
				name: 'Caroline',
				name2: name2
			}))
		})


		app.get('/sandbox', (req,res) =>{
			res.render('pugSandbox',
			{
				colors,
				names
			})
		})

///////////////////////////////


//load static, listen for app



app.listen(port, () => console.log(`App is listening at http://${hostname}:${port}`))

