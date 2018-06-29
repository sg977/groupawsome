$( document ).ready(function() {
// GLOBAL VARIABLES
// ================================================================================
var city = ""
var state = ""
var startDate ="MM/DD/YYYY"
var endDate ="MM/DD/YYYY"








// FUNCTIONS
// ==================================================================================

var seatGeek = function() {
   console.log(city);
    // Event listener for all button elements
        // In this case, the "this" keyword refers to the button that was clicked
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.seatgeek.com/2/events?datetime_utc.gte=2018-08-01&datetime_utc.lte=2018-08-30&q=" +
          city + "&client_id=Mjc5OTkwOHwxNTMwMDQ1MDAwLjY4";
  
          console.log(queryURL);
  
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.events;
  
            console.log(response.events);
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].stats.average_price > 0 && results[i].performers[0].image !== null) {
                // Creating a div with the class "item"
                var eventDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var event = results[i].title;
                var cost = results[i].stats.average_price;
                var eventType = results[i].type;
                var imageURL = results[i].url;
                var image = results[i].performers[0].image;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Event Title: " + event);
                var price = $("<p>").text("Average Seat Price: $" + cost + "/each");
                var type = $("<p>").text("Event Type: " + eventType);
                // Creating an image tag
                var eventImage = '<a href="' + imageURL + '" target="_blank"><img src="' + image + '"></a>'
  
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                eventDiv.append(eventImage);
                eventDiv.append(p);
                eventDiv.append(type);
                eventDiv.append(price);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#event-view").prepend(eventDiv);
                    }
                }

            })
        }












// PROCESS
// ==================================================================================
// Render Date Picker    
    $('#startDate-input').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('#endDate-input').datepicker({
        uiLibrary: 'bootstrap4'
    });
// Submit Button
    $("#submit-form").on("click", function(event) {
        event.preventDefault();
        // Set Variables
        city = $("#city-input").val().trim();
        state = $("#state-input").val().trim();
        startDate = $("#startDate-input").val().trim();
        endDate = $("#endDate-input").val().trim();
        // Get Event Info
        seatGeek();
        
    
        // TESTING
        console.log("clicked")
        console.log(city +"|"+ state +"|"+ startDate +"|"+ endDate)
    });
    
});
