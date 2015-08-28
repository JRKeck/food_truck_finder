
$(document).ready(function(){
    console.log('Stript is loaded');
    $('.map-menu').scroll( function(event){
        console.log('scroll detected');
        event.stopPropagation();
    });
    $('.listing a').on('click', function(){
        console.log('click detected');
    });
});

