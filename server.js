var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");
var exphb = require("express-handlebars");

// Require all models
var db = require("./models");

//port connection
var PORT = 3000;

// Initialize Express
var app = express();

app.engine("handlebars", exphb({ defaultLayout: "main",
 layoutsDir: path.join(__dirname, "views/mainLayout" )
}));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join("public/")));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// link to the homepage 
app.get("/", function(req,res){
res.render("articles", {title: "Home Page"});

// scrape the page for info
    
     axios.get("https://www.gameinformer.com/previews").then(function(response){
        const $ = cheerio.load(response.data);
        
        const results = [];
      
        const linkSite = "https://www.gameinformer.com";
            // for(var i = 0; i = results.length; i++){
            //     console.log(results[i])
            // };
        console.log(results)
        $("div.teaser-right").each(function(i, element){

            if (i > 19){
                element = null;
                return false;
            };  
            
            const title = $(element).find("h2.page-title").text().trim();
            const article = $(element).find(".promo-summary").text().trim();
            const link = linkSite + $(element).find("a").attr("href");
           // console.log(i);
            
            results.push({ 
                            "title": title,
                            "article": article,
                            "link": link});
                        
        });
      
     db.Articles.create(results);
   // console.log(results)
    });
});

   //limit of 20 articles passed to client

   app.get("/articles", function(req, res){
       db.Articles.find({}).limit(20)
       .then(function(results){
           res.json(results)
         // console.log(results)
       })
       
   })
   
 // svaed articles passed in by there id

app.get("/articles/:id", function(req,res) {
   console.log( req.params.id);
   db.SavedArticles.create();
    db.Articles.findOne({ _id: req.params.id })
    
    .then(function(dbArticle) {
        res.json(dbArticle);
        const result = [];
        result.push({ 
            "title": dbArticle.title,
            "article": dbArticle.article,
            "link": dbArticle.link});
        db.SavedArticles.insertMany(result)
})     
     .catch(function(err) {
         res.json(err)
     });
});
//grab articles from the saved article database
app.get("/savedArticles",function(req,res){
  
    db.SavedArticles.find({})
    .then(function(results) {
        res.json(results)
    })
    .catch(function(err) {
        res.json(err)
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
