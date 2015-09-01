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