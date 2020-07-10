var express        = require("express"),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    app            = express();


mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// title
// Image
// body
// created

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body: "Hello this is a Blog POST!"
// })

// RESTful routes

app.get("/", function(req, res){
    res.redirect("/blog");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
})


app.listen(3000, function(){
    console.log("Server is listening on PORT: 3000");
})