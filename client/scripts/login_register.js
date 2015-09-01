$(document).ready(function(){

    console.log('login script is loaded');

    $('.btn-truck').on('click', function(){
        $('.user-check').hide();
        $('.register-truck').show();
    });

    $('.btn-user').on('click', function(){
        $('.user-check').hide();
        $('.register-user').show();
    });

});