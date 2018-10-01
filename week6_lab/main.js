function addNewList() {
    alert('hello world!');
}

function addListItem() {
    var list = document.getElementById("grocery-list");
    var itemInput = document.getElementById("new-list-item");
    var newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(itemInput.value));
    list.appendChild(newItem);
    console.log('hello world');
}

function deleteListItem(item){
    item.parentNode.removeChild(item);
}

function completeListItem(item){
    if (item.checked) {
        item.parentNode.style.textDecoration = "line-through";
    } else {
        item.parentNode.style.textDecoration = "none";
    }
}

//$(document).ready(function(){
//    $("#add-item").click(function(){
//        var list = $("#grocery-list");
//        var itemInput = $("#new-list-item");
//        list.append("<li>" +itemInput.val() + " <button class = 'delete-item'>X</button></li>");
//    });
//    
//    $(".delete-item").click(function(){
//        $(this).parent().remove();
//        console.log("test");
//    });
//});

$(document).on("click", ".delete-item", function(){
    $(this).parent().remove();
});

$(document).on("click", "#add-item", function(){
    var list = $("#grocery-list");
    var itemInput = $("#new-list-item");
    list.append("<li>" + itemInput.val() + " <button class='delete-item'>X</button></li>");
});