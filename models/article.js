var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticlesSchema = new Schema ({
  
    title:{
        type: String,
        require: true
},
    article:{
        type: String,
        require: true
    },
    link:{
        type: String,
        required: true
    }
    
    
});

var Articles = mongoose.model("Article", ArticlesSchema);

// Export the Article model
module.exports = Articles;