const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.port || 3000;

const staticPath = path.join(__dirname,"../public");
const viewPath = (path.join(__dirname,'../views'));

console.log(staticPath);

app.set("view engine", "hbs");
app.set("views",viewPath);

hbs.registerPartials(path.join(__dirname, "../partials"));

app.use(express.static(staticPath));

app.get('/', (req, res) => {

    res.render(path.join(viewPath, 'index'));
});

app.get('/about', (req, res) => {

    res.render(path.join(viewPath, 'about'));
});

app.get('/weather', (req, res) => {

    res.render(path.join(viewPath, 'weather'));
});



app.get('*', (req, res) => {

    res.sendFile(path.join(staticPath, '/404.html'));
    
});

app.listen(port, () => {
    console.log("listening on port");
});