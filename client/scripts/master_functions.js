var mapboxToken = 'pk.eyJ1IjoianJrZWNrIiwiYSI6IjgzZTA0NmVhOGUxMjc2NjhmODYwYmQ3ZGIyZTRkOWQ1In0.XM9mizd6bF8zCqwafrGLDQ';

var userObj = {};
//Document ready actions for all pages
$(document).ready(function(){

    // Check to see if we can get the users info
    userGetInfo();

    // Log the user out
    $('.user-logout').on('click', function(){
        userLogout();
    });

    $('.user-expand').on('click', function(){
        console.log("clicked");
        $('.user-extended').slideToggle("fast");
    })

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
                userObj.displayName = data.displayName;
                userObj.type = data.userType;
                displayProfile();
            }
            else{
                $('.user-login').show();
            }
        }
    });//End ajax call
}

function displayProfile(){
    $('.user-info').show();
    $('.user-info .user-name').html(userObj.displayName);
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
};