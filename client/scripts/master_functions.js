var mapboxToken = 'pk.eyJ1IjoianJrZWNrIiwiYSI6IjgzZTA0NmVhOGUxMjc2NjhmODYwYmQ3ZGIyZTRkOWQ1In0.XM9mizd6bF8zCqwafrGLDQ';

//Document ready actions for all pages
$(document).ready(function(){

    // Check to see if we can get the users info
    userGetInfo();

    // Log the user out
    $('.user-logout').on('click', function(){
        userLogout();
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
        url: "/user/getprofile",
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

