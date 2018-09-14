
var topics = ["True Romance", "Death Proof", "Snatch", "From Dusk Till Dawn", "Naked Gun"];

$(document).ready(function () {
  for (var i = 0; i < topics.length; i++) {
    var topicBtn = $("<button>").text(topics[i]);
    $(".buttonDiv").append(topicBtn);
    topicBtn.addClass("btn btn-warning newBtn mymargins");
  }
});


$("#search").on("click", function () {
  //trying to put whole function into if (search) statement so it doesn't create empty buttons but it doesn't work at all if I do that ???
  // if (search){
  var search = $("#search-term").val().trim();
  console.log(search);
  var btn = $("<button>").text(search);
  btn.attr("data-movie", search);
  $(".buttonDiv").append(btn);
  btn.addClass("btn btn-warning newBtn mymargins")
  $("#search-term").val("");
  // }


})


$(document).on("click", ".newBtn", function () {
  var movie = $(this).text();

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=npcTWp9cFWAGqU6WpH8ty1k24V8QDVCs&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      $("#gifs-appear-here").empty();

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          var gifDiv = $("<div>");
          var favGif = $("<button>");
          favGif.text("Favorite");
          favGif.addClass("fav");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);


          // Creating an image tag
          var personImage = $("<img>");
          personImage.addClass("gif");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("data-animate", results[i].images.fixed_height.url);
          personImage.attr("data-still", results[i].images.fixed_height_still.url);
          personImage.attr("src", results[i].images.fixed_height_still.url);
          personImage.attr("data-state", "still");



          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);
          


          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

$(document).on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    console.log('State was still');
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    console.log('State was animated');
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }


});









