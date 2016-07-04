const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const config = require('config');
const marked = require('marked');
const fs = require('fs');

const app = express();

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

// Set up a directory for static resources
app.use(express.static(path.join(__dirname, 'static')));

if (app.get('env') === 'development') {
	// Make src available in dev to load JS scripts
	app.use(express.static(path.join(__dirname, 'src')));
}

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);

/**
 * Homepage
 */
app.get('/', (req, res) => {
	res.render('pages/index.html', {
		content: marked(fs.readFileSync('./README.md', { encoding: 'utf8' }))
	});
});

app.get('/:page', (req, res) => {
	res.render(`pages/${req.params.page}.html`);
});

app.listen(3000, () => {
	console.log('Project listening on port 3000: http://localhost:3000');
});
