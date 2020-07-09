var express        = require("express");
    mongoose       = require("mongoose");
    bodyParser     = require("body-parser");
    app            = express();


mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now};
});



// title
// Image
// body
// created


app.listen(3000, function(){
    res.send("Server is listening on PORT: 3000");
})