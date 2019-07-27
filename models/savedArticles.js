const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedArticleSchema = new Schema ({
    title:{
        type: String,
        require: true,
    //    unique: true
},
    article:{
        type: String,
        require: true,
      //  unique: true
    },
    link:{
        type: String,
        required: true,
   //     unique: true
    }
    
    
});

const SavedArticles = mongoose.model("SavedArticles", SavedArticleSchema);

module.exports = SavedArticles;
