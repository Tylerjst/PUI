function bedPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Bed Pillow";
    this.position = 0;
    this.price = 10;
    this.colors = ["images/bed-denim.jpg", "images/bed-haze.jpg", "images/bed-school.jpg","images/bed-rainy.jpg"];
}

function couchPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Couch Pillow";
    this.position = 0;
    this.price = 10;
}

function roundPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Round Pillow";
    this.position = 0;
    this.price = 10;
}

function poufPillow(color){
    this.color = color;
    this.fill = "";
    this.type = "Pouf Pillow";
    this.position = 0;
    this.price = 10;
    
}

//var colors = {
//    denim: ,
//    school: 
//    haze: 
//    rainy: 
//};

//This function will call one of the constructors depending on the webpage that is loaded. 
//This will create a product with the default color property (blue) and an empty property for the fill. Only when the user clicks on a fill button will that update. If the user clicks on a new color, that property will also update.
//
function generateNewProduct(){
    if($("#main").hasClass("product-bed")){
        console.log("New bed pillow!");
        return new bedPillow("Denim");
    } else if( $("#main").hasClass("product-round")){
        console.log("New round pillow!");
        return new roundPillow("Denim");
    } else if( $("#main").hasClass("product-couch")){
        console.log("New couch pillow!");
        return new couchPillow("Denim");
    } else {
        console.log("New pouf!");
        return new poufPillow("Denim");
    }
};
  

//Shopping Cart array to store products
var shoppingCart = [];
var subTotal = 0; 

var removeProductListener = function(){
        
        console.log("YOOOO");
//        for(i = 0; i < shoppingCart.length; i++){
//            console.log("loop entered");
//            if($(this).parent().attr("id") === ""+i){
//                console.log("product found");
//                $(this).parent().remove();
//                shoppingCart.splice(i,1);
//                localStorage.setItem("Cart", JSON.stringify(shoppingCart));
//                break;
//            };
//        };
        var index = $(this).parent().attr("id");
        
        shoppingCart.splice(parseInt(index),1);
        localStorage.setItem("Cart", JSON.stringify(shoppingCart));
        $(this).parent().remove();
        console.log("Removed from cart!");
        updateCart();        
};


function updateCart(){
    getCart();
    if(JSON.parse(localStorage.getItem("Cart")).length === 0){
        $('.cart-list').append("<li><p>Treat yo self!</p>"+"<a href = 'products.html'><button class = 'treat-button'>Buy Some Pillows!</button></a></li>");
    } else{
        console.log("Something in the cart");
//        getCart();
        $('.cart-list').empty();
        for(i = 0; i < shoppingCart.length; i++){
            shoppingCart[i].position = i; 
            $('.cart-list').append("<li class = 'list-product' id = "+i+">"+'<img class = "remove-product" src="images/cross-out.png">'+"<h3>"+shoppingCart[i].type+"</h3>"+"<p>"+shoppingCart[i].color+", "+shoppingCart[i].fill+"</p>"+"</li>");
            subTotal = subTotal + shoppingCart[i].price;
                
        }
        //Add onclick listeners to all the cart list items again
        $('.remove-product').on("click", removeProductListener);
        
    }
    $('.cart-number').empty().append(shoppingCart.length); 
    $('.subtotal').empty().append("$"+subTotal);
    console.log("Cart Updated!");
};


function getCart(){
    shoppingCart = JSON.parse(localStorage.getItem("Cart"));
    subTotal = 0;
};



$(document).ready(function(){
    
//    Creates product
    var product = generateNewProduct();
    updateCart();
    
    
//Changes active color and adjust color attribute of the product object
    $(".color-denim").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        $('.product-img').attr("src",product.colors[0]);
        console.log("this is working"); //Testing to see if this is working 
        product.color = "Cozy Denim";
    });

    $(".color-morning").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        $('.product-img').attr("src",product.colors[1]);
        product.color = "Morning Haze";
    });
    
    $(".color-school").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        $('.product-img').attr("src",product.colors[2]);
        product.color = "Afterschool Special";
    });

    $(".color-rainy").click(function(){
        $(".active-color").toggleClass('active-color');
        $(this).toggleClass('active-color');
        $('.product-img').attr("src",product.colors[3]);
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
    $('.exit-cart').click(function(){
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
        getCart();
        shoppingCart.push(product);
        JSON.parse(localStorage.getItem("Cart")).push(product);
        localStorage.setItem("Cart",JSON.stringify(shoppingCart));
        //This isn't working
        $('.confirm').toggleClass('hidden', "slow");
        
        
        console.log("Added to cart!");
        updateCart();
        
        
    });
    
    $('.exit').click(function(){
        $('.confirm').toggle();

            
    });
     
    
    
    
//Remove from Cart
    
    
});
  
