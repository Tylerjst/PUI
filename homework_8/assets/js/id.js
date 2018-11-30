


var layer = new L.StamenTileLayer("toner-background");

var map = new L.Map("map").setView([37.8, -96], 4);



L.tileLayer(layer, {retina: '@2x',detectRetina:true});

map.addLayer(layer);

var voterIDMap;
var countyMap;

function getvoterIDColor(d){
     switch(d){
            case "photo":
                console.log("photo");
                return "#88419d";
                break;

            case "strictNonPhoto":
                console.log("strictNonPhoto");
                return "#8c96c6";
                break;

            case "nonPhoto":
                console.log("nonPhoto");
                return "#b3cde3";
                break;

            case "none":
                console.log("none");
                return "#edf8fb";
                break;

            default:
                return "ffffff";

        };

};


//Styles
//
var myStyle = {
    "color": "#5c007a",
    "weight": 5,
    "opacity": .7
};



function voterIDStyle(feature) {
  return {
    fillColor: getvoterIDColor(feature.properties.voterID),
    weight: 2,
    opacity: 1,
    fillOpacity: .9,
    color:"#666"
  };
    
}
//
//


//Interactive Listeners
//
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    };
    
    info.update(layer.feature.properties);
    
}


function resetHighlight(e) {
//    countyMap.resetStyle(e.target);
    voterIDMap.resetStyle(e.target);
    info.update();
    

}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
//
//

// Overlay Maps
//countyMap = L.geoJSON(counties, {
//    style: myStyle,
//    onEachFeature: onEachFeature
//}).bindPopup( function(counties){
//    return this.properties.NAME+" "+this.properties.LSAD;
//});

voterIDMap = L.geoJSON(statesData, {
    style: voterIDStyle,
    onEachFeature: onEachFeature
}).bindPopup( function(statesData){
    return this.properties.name;
    
}).addTo(map);

var overlays = {
    
};

var baselayers = {
    "Voter ID": voterIDMap
};

//L.control.layers(baselayers, overlays).addTo(map);



//Info Control

var info = L.control({position: 'bottomleft'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

//Legend

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Photo ID", "Strict Non-Photo ID", "Non-Photo ID", "None"],
        labels = ["#88419d", "#8c96c6", "#b3cde3", "#edf8fb"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i> ' + '<span>'+
            grades[i] + '</span>' + '<br>';
    }

    return div;
};

legend.addTo(map);




// method that we will use to update the control based on feature properties passed
info.update = function(props) {
    this._div.innerHTML = '<h4>Voter ID Requirement</h4>' + (props ?
        '<b>' + props.name + '</b><br />' + 
            (props.voterID === "photo" ?
                '<p>This state requires photo ID</p>': 
            props.voterID === "strictNonPhoto" ? 
                '<p>This state allows non photo ID, but uses a strict policy</p>':
            props.voterID === "nonPhoto" ?
                '<p>This state allows non photo ID</p>':
            props.voterID === "none" ?
                '<p>This state does not require ID to vote</p>'  
            : '<p>Bollocks</p>')
                
        : 'Hover over a state');
};

info.addTo(map);





$(document).ready(function(){
    
    $('#map').hide();
    $('#map').fadeIn(1000);
    
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
    
});
