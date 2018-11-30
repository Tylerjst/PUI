


var layer = new L.StamenTileLayer("toner-background");

var map = new L.Map("map").setView([37.8, -96], 4);



L.tileLayer(layer, {retina: '@2x',detectRetina:true});

map.addLayer(layer);

var purgeMap;

function getPurgeColor(d){
     if(d === true){
         return "#88419d";
     } else {
         return "#edf8fb";
     }

};


//Styles
//



function purgeStyle(feature) {
  return {
    fillColor: getPurgeColor(feature.properties.purge),
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
    purgeMap.resetStyle(e.target);
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

purgeMap = L.geoJSON(statesData, {
    style: purgeStyle,
    onEachFeature: onEachFeature
}).bindPopup( function(statesData){
    return this.properties.name;
    
}).addTo(map);

var overlays = {
    
};

var baselayers = {
    "Purges": purgeMap
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
        grades = ["Purged Voters", "Did Not Purge Voters"],
        labels = ["#88419d", "#edf8fb"];

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
    this._div.innerHTML = '<h4>Voter Roll Purges</h4>' + 

    (props ?
        props.purge ?
        '<b>' + props.name + '</b><br />' + '<p>This state purged people</p>'
        :'<b>' + props.name + '</b><br />' + '<p>This state did not purge people</p>'
     
    : 'Hover over a state to learn more');
};

info.addTo(map);





$(document).ready(function(){
    $('#map').hide();
    $('.article').hide();
    $('.article').fadeIn(1000);
    $('#map').fadeIn(500);
    
    
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
