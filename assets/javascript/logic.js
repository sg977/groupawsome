$( document ).ready(function() {
    console.log( "ready!" );
    
    $('#startDate').datepicker({
        uiLibrary: 'bootstrap4'
    });

    $('#endDate').datepicker({
        uiLibrary: 'bootstrap4'
    });
});
