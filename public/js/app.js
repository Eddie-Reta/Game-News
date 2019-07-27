
    $("#scrape").on("click", () => {
  
        const modal = $("#articles_added");
    
        $("#articles").empty();
        modal.css("display", "block");
        $(".close").on("click", () => {
            modal.css("display", "none");
        });
        $("#close-modal").on("click", () => {
            modal.css("display", "none");
        });
        setTimeout(() => {
            modal.css("display", "none");
        },6500);

        //grabbing json data from the /scrape url

         $.getJSON("/articles", function(data){
          //  console.log(data._id)
        for (var i = 0; i < data.length; i++){
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + 
            "<h1>"+ data[i].title.trim() + "</h1>" + 
            "<br />" + "<strong>" + data[i].article + "</strong>" + 
            "<br />" + "<a href=" + data[i].link + ">" + data[i].link + "</a>" + 
            "<br />" + "<button id='save_article' data-id='"+ data[i]._id + "'>Save Article</button>" +
             "</p>");
            console.log(data[i]._id)
        }
    });
});
//save articles
    $(document).on("click", "#save_article", function() {
            console.log("save article")
            var thisId = $(this).attr("data-id");
    
            $.ajax({
                method: "GET",
                url: "/articles/" + thisId, 
            })
            .then(function(data) {
                console.log(data)
            })
        })
//displays articles
    $("#savedArticles").on("click", () => {
        $("#articles").empty();
        $.getJSON("/savedArticles", function(data) {
            for (var i = 0; i < data.length; i++){
                $("#articles").append("<p data-id='" + data[i]._id + "'>" + 
                "<h1>"+ data[i].title.trim() + "</h1>" + 
                "<br />" + "<strong>" + data[i].article + "</strong>" + 
                "<br />" + "<a href=" + data[i].link + ">" + data[i].link + "</a>" + 
                "<br />" + "<button id='save_article' data-id='"+ data[i]._id + "'>Save Article</button>" +
                 "</p>");
                console.log(data[i]._id)
            }
        });
    });