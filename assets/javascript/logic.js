// GLOBAL VARIABLES
// ================================================================================
var city = ""
var state = ""
var startDate ="MM/DD/YYYY"
var endDate ="MM/DD/YYYY"








// FUNCTIONS
// ==================================================================================












// PROCESS
// ==================================================================================
$( document ).ready(function() {
    
    console.log( "ready!" );
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
        city = $("#city-input").val().trim();
        state = $("#state-input").val().trim();
        startDate = $("#startDate-input").val().trim();
        endDate = $("#endDate-input").val().trim();
    
        // TESTING
        console.log("clicked")
        console.log(city +"|"+ state +"|"+ startDate +"|"+ endDate)
        
    });
});
