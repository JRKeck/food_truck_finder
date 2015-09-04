$(document).ready(function(){

    $( window ).resize(function() {
        trucksNearbyHeight();
    });
    // Toggle the map-menu on mobile
    $('body').on('click', '.menu-close', function(){
        $('.trucks-nearby').addClass('hide');
    });
    // Close the map menu
    $('body').on('click', '.footer-nav .map-list', function(){
        $('.trucks-nearby').toggleClass('hide');
    })

});

function trucksNearbyHeight(){
    // Get height of parent div
    var mapHeight = $('.map-container').height();
    // Get top margin of .trucks-nearby and parse to Int
    var trucksNearbyMargin = $('.trucks-nearby').css('margin-top');
    trucksNearbyMargin = parseInt(trucksNearbyMargin);
    // Calculate max height
    var maxTruckMenuHeight = mapHeight - (trucksNearbyMargin*2);
    $('.trucks-nearby').css('max-height', maxTruckMenuHeight+'px');
    // Resize the truck listing
    truckListingHeight();
}

function truckListingHeight(){
    // Reset the listing height
    $('.truck-listing').css('max-height', '');
    var truckMenuHeight = parseInt($('.trucks-nearby').height());
    var truckMenuHeader = parseInt($('.trucks-nearby-header').outerHeight(true));
    var truckMenuFooter = parseInt($('.trucks-nearby-footer').outerHeight(true));
    var listingHeight = truckMenuHeight - (truckMenuHeader + truckMenuFooter);
    listingHeight = listingHeight + "px";
    // Set the listing height
    $('.truck-listing').css('max-height', listingHeight);
}