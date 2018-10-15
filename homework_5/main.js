function bedPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Bed Pillow";
    
}

function couchPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Couch Pillow";
}

function roundPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Round Pillow";
}

function poufPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Pouf Pillow";
}

//This function will call one of the constructors depending on the webpage that is loaded. 
//This will create a product with the default color property (blue) and an empty property for the fill. Only when the user clicks on a fill button will that update. If the user clicks on a new color, that property will also update.
//
function generateNewProduct(){
    if($(".product-img").hasClass("product-bed")){
        console.log("New bed pillow!");
        return new bedPillow("Denim");
    } else if( $(".product-img").hasClass("product-round")){
        console.log("New round pillow!");
        return new roundPillow("Denim");
    } else if( $(".product-img").hasClass("product-couch")){
        console.log("New couch pillow!");
        return new couchPillow("Denim");
    } else {
        console.log("New pouf!");
        return new poufPillow("Denim");
    }
};
  

//Shopping Cart array to store products
var shoppingCart = [];



$(document).ready(function(){
    
//    Creates product
    var product = generateNewProduct();
    
    
//Changes active color and adjust color attribute of the product object
    $(".color-denim").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        console.log("this is working"); //Testing to see if this is working 
        product.color = "Cozy Denim";
    });

    $(".color-morning").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        product.color = "Morning Haze";
    });
    
    $(".color-school").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        product.color = "Afterschool Special";
    });

    $(".color-rainy").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        product.color = "Rainy Day";
        console.log(product.color);  //Also testing to see if this is working
    });

    
    
    
//Opening and closing menu
    
    $('.cart-nav').click(function(){
        $('.cart-menu').removeClass('hidden');
        $('.cart-menu').animate({
            width: "300px",
        }, 700, function(){
            
        });
        
    });
    $('.exit').click(function(){
        $('.cart-menu').animate({
            width: "0px",
        }, 700, function(){}).queue(function(next){
          $('.cart-menu').addClass('hidden').delay(700);
            next();  //For whatever reason, this makes my JS file wait until the menu closes to add the hidden class
            

            
        });
    }); 
    
    
//Picking the fill 
    $('.fill-duck').click(function(){
        $(".active-button-color").toggleClass('active-button-color');
        $(this).toggleClass('active-button-color');
        product.fill = "Duck Down";
        $('.cart-button').removeAttr('disabled'); //Only when the user clicks a fill will they be allowed to add a product to their cart.
    });
    
    $('.fill-allergy').click(function(){
        $(".active-button-color").toggleClass('active-button-color');
        $(this).toggleClass('active-button-color');
        product.fill = "Hypoallergenic";
        $('.cart-button').removeAttr('disabled');
    });
    
    $('.fill-memory').click(function(){
        $(".active-button-color").toggleClass('active-button-color');
        $(this).toggleClass('active-button-color');
        product.fill = "Memory Foam";
        $('.cart-button').removeAttr('disabled');
    });
    
//Add to cart
    $('.cart-button').click(function(){
        shoppingCart.push(product);
        
        //This isn't working
        $('.confirm').toggleClass('hidden', "slow");
        
        
        console.log("Added to cart!");
        $('.cart-list').append("<li>"+'<img class = "remove-product" src="images/cross-out.png">'+"<p>"+product.type+"</p>"+"<br>"+"<p>"+product.color+", "+product.fill+"</p>"+"</li>");
        $('.cart-number').empty().append(shoppingCart.length);
    });
    
    
    
//Cart Info
    $('.cart-number').append(shoppingCart.length);
    
    
});
  
