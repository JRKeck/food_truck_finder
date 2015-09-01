$(document).ready(function(){

    console.log('Client script is loaded');

    // Check to see if we can get the users info
    userGetInfo();

    $('.user-logout').on('click', function(){
       userLogout();
    });

    $( window ).resize(function() {
        trucksNearbyHeight();
    });
});
function userLogout(){
    $.ajax({
        url: "/user/logout",
        success: function(){
        }
    });//End ajax call
}

function userGetInfo(){
    $.ajax({
        url: "/user/profile",
        success: function(data){
            if(data.email) {
                displayProfile(data);
            }
            else{
                $('.user-login').show();
            }
        }
    });//End ajax call
}

function displayProfile(user){
    $('.user-info').html(user.displayName);
}

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