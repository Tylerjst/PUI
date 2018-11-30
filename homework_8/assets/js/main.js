





$(document).ready(function(){
     $('.menu-icon').click(function(){
        $('.menu').removeClass('hidden');
        $('.menu').animate({
            width: "300px",
        }, 700, function(){
            
        });
        
    });
    
    $('.exit').click(function(){
        $('.menu').animate({
            width: "0px",
        }, 700, function(){}).queue(function(next){
          $('.menu').addClass('hidden').delay(700);
            next();  //For whatever reason, this makes my JS file wait until the menu closes to add the hidden class            
        });
    }); 
    
    
    
    //Code that controls the fading statistics. Taken from: https://codepen.io/maaviles/pen/olKxr
    var divs = $('div[id^="content-"]').hide(),

    i = 0;

    (function cycle() { 

        divs.eq(i).fadeIn(400)
                  .delay(8000)
                  .fadeOut(400, cycle);

        i = ++i % divs.length;

    })();
    
    
});
