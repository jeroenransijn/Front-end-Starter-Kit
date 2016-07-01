const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const config = require('config');
const marked = require('marked');
const fs = require('fs');

const app = express();

// Set up a directory for static resources
app.use(express.static(path.join(__dirname, 'static')));

if (app.get('env') === 'development') {
	// Make src available in dev to load JS scripts
	app.use(express.static(path.join(__dirname, 'src')));
}

// Register '.mustache' extension
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
	res.render('index', {
		scripts: config.get('scripts'),
		content: marked(fs.readFileSync('./README.md', { encoding: 'utf8' }))
	});
});

app.listen(3000, () => {
	console.log('Project listening on port 3000: http://localhost:3000');
});
