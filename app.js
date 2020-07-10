var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  app = express();

mongoose.connect("mongodb://localhost/restful_blog_app", {
  useNewUrlParser: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
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

app.get("/", function (req, res) {
  res.redirect("/blogs");
});

// index route - lists all the blogs
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// New route
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function (req, res) {
  // create blog
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }else {
      res.render("edit", {blog: foundBlog});
    }
  })
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    }else {
      res.redirect("/blogs/"+req.params.id);
    }
  })
})


app.listen(3000, function () {
  console.log("Server is listening on PORT: 3000");
});
