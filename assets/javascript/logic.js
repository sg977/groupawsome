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

    $("#event-view").empty();

   console.log(city);

   startDate = $("#startDate-input").val().trim();
   endDate = $("#endDate-input").val().trim();

   var startDateGeek = startDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
   var endDateGeek = endDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");  
    // Event listener for all button elements
        // In this case, the "this" keyword refers to the button that was clicked
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.seatgeek.com/2/events?datetime_utc.gte=" + startDateGeek + "&datetime_utc.lte=" + endDateGeek + "&q=" +
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
                var eventDiv = $("<div class='card' style='width: 300px; height: 350px; float:left; margin:5px;'>");
  
                // Storing the result item's rating
                var event = results[i].title;
                var cost = results[i].stats.average_price;
                var eventType = results[i].type;
                var imageURL = results[i].url;
                var image = results[i].performers[0].image;
                var eventDate = results[i].datetime_local;

                var newDate = eventDate.substring(0, 10);
                console.log(newDate);
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<h5 class='card-title text-center'>").text(event);
                var price = $("<p class='card-text'>").text("Average Seat Price: $" + cost + "/each");
                var eventTime = $("<p class='card-text'>").text("Date of Event: " + newDate);
                // Creating an image tag
                var eventImage = '<a href="' + imageURL + '" target="_blank"><img src="' + image + '" class="card-img-top"></a>'                
  
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                eventDiv.append(p);
                eventDiv.append(eventImage);
                eventDiv.append(eventTime);
                eventDiv.append(price);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#event-view").append(eventDiv);
                    }
                }

            })
        }

    var googleHotels = function() {

        $("#hotel-view").empty();
    
    
        var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+" + city + "," + state + "&key=AIzaSyBXK_1E2arEvJivRllNhZjMlfEOA0XiQgE";
    
    
        
                console.log(queryURL);
          
                // Performing our AJAX GET request
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After the data comes back from the API
                .then(function(response) {
                    // Storing an array of results in the results variable
                    var results = response.results;
        
                    console.log(response);
                    console.log(results); 
          
            // Looping over every result item
            for (var i = 0; i < 6; i++) {

                // Only taking action if the photo has an appropriate rating

                // Creating a div with the class "item"
                var hotelDiv = $("<div class='card' style='width: 400px; height: 450px; float:left; margin:5px;'>");
                      // Only taking action if the photo has an appropriate rating

                        var name = results[i].name;
                        var location = results[i].formatted_address;
                        var rating = results[i].rating;
                        var photo = results[i].photos[0].photo_reference;
                        var imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + photo +"&key=AIzaSyBXK_1E2arEvJivRllNhZjMlfEOA0XiQgE";
                        var hotelURL = "https://www.expedia.com/Hotel-Search?destination=" + name
                       // console.log(photo);
          
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<h5 class='card-title text-center'>").text(name);
                        var locationText = $("<p class='card-text'>").text("Location: " + location);
                        var ratingText = $("<p class='card-text'>").text("Rating: " + rating);
                        // Creating an image tag
                        var hotelImage = '<a href="' + hotelURL + '" target="_blank"><img src="' + imgURL + '" class="card-img-top"></a>'                
          
          
                        hotelDiv.append(p);
                        hotelDiv.append(hotelImage);
                        hotelDiv.append(locationText);
                        hotelDiv.append(ratingText);
          
                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#hotel-view").append(hotelDiv);
                            }
                    
        
                    })
                }



        function zamato(){

            // var api_key = "94c22e46962c50fd3dc011bfbc900be7";
        
            var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&apikey=94c22e46962c50fd3dc011bfbc900be7";
            $("#restaurant-view").empty();    
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
        
                var results = (response);
                var cityID = results.location_suggestions[0].id;
        
                console.log(cityID);
                // $("#restaurant-view").append(cityID);


                        
        
                var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID +  "&entity_type=city&collection_id=1&apikey=94c22e46962c50fd3dc011bfbc900be7";
        
                    $.ajax({
                    url: queryURL,
                    method: "GET"
                    }).then(function(response) {
                    
                    console.log(response);
                    for(var i = 0; i < 12; i++){
                        var results = response.restaurants[i].restaurant;
                        var name = results.name;
                        var url = results.url;
                        var cuisines = results.cuisines;
                        var image = results.featured_image;
                        var averageCost = results.average_cost_for_two;
                        var restuarantDiv = $("<div class='card' style='width: 300px; height: 350px; float:left; margin:5px;'>");
                    
    
                        if(image !== ""){
                            console.log(name);
                            console.log(url);
                            console.log(image);
                            console.log(cuisines);

                            var p = $("<h5 class='card-title text-center'>").text(name);
                            var cuisine = $("<p class='card-text'>").text("Cuisines: " + cuisines);
                            var cost = $("<p class='card-text'>").text("Average Cost for two: " + averageCost);
                            // Creating an image tag
                            var restaurantImage = '<a href="' + url + '" target="_blank"><img src="' + image + '" class="card-img-top"></a>'                
              
              
                            restuarantDiv.append(p);                            
                            restuarantDiv.append(restaurantImage);
                            restuarantDiv.append(cuisine);
                            restuarantDiv.append(cost);
                            
              
                            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                            $("#restaurant-view").append(restuarantDiv);
                            
                        }
                    }
                });      
        
            });
        
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

        var startDateGeek = startDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
        var endDateGeek = endDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");  

        // Get Event Info
        seatGeek();
        googleHotels();
        zamato();
        
    
        // TESTING
        console.log("clicked")
        console.log(city +"|"+ state +"|"+ startDateGeek +"|"+ endDateGeek)
    });
    
});
