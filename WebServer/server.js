const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use('/content', express.static('content'));

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render("start", { layout: false });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})