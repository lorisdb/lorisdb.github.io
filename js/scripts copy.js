/*
* This code was mostly written by
* Esa and the source can be seen here
* http://koti.mbnet.fi/ojalesa/boundsbox/makemarker_sidebar.htm
* The page styles and some additional code
* was written by Derek
* http://3design-dlo.com
*/

google.maps.event.addDomListener(window, 'load', init);

function init() {

/**
 * map 
 */  
var mapOpts = {
  mapTypeId: google.maps.MapTypeId.ROADMAP,


/* map style */
  styles: [
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b5cbe4"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#efefef"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#83a5b0"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#bdcdd3"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e3eed3"
              }
          ]
      },
      {
          "featureType": "administrative",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 33
              }
          ]
      },
      {
          "featureType": "road"
      },
      {
          "featureType": "poi.park",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {},
      {
          "featureType": "road",
          "stylers": [
              {
                  "lightness": 20
              }
          ]
      }
  ],

  center: new google.maps.LatLng(26.568877,4.588622),
  zoom: 3,
  zoomControl: true,
  zoomControlOptions: {
  style: google.maps.ZoomControlStyle.SMALL,
  },
  disableDoubleClickZoom: true,
  mapTypeControl: true,
  mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
  },
  scaleControl: true,
  scrollwheel: true,
  panControl: true,
  streetViewControl: true,
  draggable : true,
  overviewMapControl: true,
  overviewMapControlOptions: {
      opened: false,
  }
}

var map = new google.maps.Map(document.getElementById("map"), mapOpts);
//  We set zoom and center later by fitBounds()



/**
 * makeMarker() ver 0.2
 * creates Marker and InfoWindow on a Map() named 'map'
 * creates sidebar row in a DIV 'sidebar'
 * saves marker to markerArray and markerBounds
 * @param options object for Marker, InfoWindow and SidebarItem
 * @author Esa 2009
 */

var infoWindow = new google.maps.InfoWindow({maxWidth:250});
var markerBounds = new google.maps.LatLngBounds();
var markerArray = [];
 
function makeMarker(options){
  var pushPin = new google.maps.Marker({map:map});
  pushPin.setOptions(options);
  google.maps.event.addListener(pushPin, "click", function(){
    infoWindow.setOptions(options);
    infoWindow.open(map, pushPin);
    if(this.sidebarButton)this.sidebarButton.button.focus();
  });
  var idleIcon = pushPin.getIcon();
  if(options.sidebarItem){
    pushPin.sidebarButton = new SidebarItem(pushPin, options);
    pushPin.sidebarButton.addIn("sidebar");
  }
  markerBounds.extend(options.position);
  markerArray.push(pushPin);
  return pushPin;
}

google.maps.event.addListener(map, "click", function(){
  infoWindow.close();
});


/**
 * Creates an sidebar item 
 * @constructor
 * @author Esa 2009
 * @param marker
 * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
 */
function SidebarItem(marker, opts){
  var tag = opts.sidebarItemType || "button";
  var row = document.createElement(tag);
  row.innerHTML = opts.sidebarItem;
  row.className = opts.sidebarItemClassName || "sidebar_item";  
  row.style.display = "block";
  row.style.width = opts.sidebarItemWidth || "100%";
  row.onclick = function(){
    google.maps.event.trigger(marker, 'click');
  }
  row.onmouseover = function(){
    google.maps.event.trigger(marker, 'mouseover');
  }
  row.onmouseout = function(){
    google.maps.event.trigger(marker, 'mouseout');
  }
  this.button = row;
}
// adds a sidebar item to a <div>
SidebarItem.prototype.addIn = function(block){
  if(block && block.nodeType == 1)this.div = block;
  else
    this.div = document.getElementById(block)
    || document.getElementById("sidebar")
    || document.getElementsByTagName("body")[0];
  this.div.appendChild(this.button);
}
// deletes a sidebar item
SidebarItem.prototype.remove = function(){
  if(!this.div) return false;
  this.div.removeChild(this.button);
  return true;
}




/**
 * markers and info window contents
 * copy/paste entries to create new ones
 * 
 */

/* this variable is for 
* the pins on the map. 
* Any icon can be used by changing the source. 
* If left blank, it will use the default google maps pins.
*/
var image = 'http://mcin-cnim.ca/wp-content/uploads/2015/11/mini-db.png';

/*
* this variable sets the 
* content inside the container window

var contentString = 
      '<div>'+
      '<img src=" url here " class="logo">'+
      '<h1> HEADER HERE </h1>'+
      '<p><b> Name of Inst. </b> description here.</p>'+
      '<p>Website: <a href=" url of inst. " target="blank"> url </a></p>'+
      '</div>';

* this makes the marker on the map as well as the sidebar      
makeMarker({

  * the lat/long can be obtained on
  * google maps br right clicking the
  * location on the map and selecting 'what's here'

  position: new google.maps.LatLng(45.5089835, -73.5813425),
  title: "Neuro",
  sidebarItem: "Neuro",
  content: contentString,
  icon: image
}); 
*/

var contentString = 
      '<div>'+
      '<img src="http://www.mcgill.ca/neuro/files/neuro/neurotext_final_0.gif" class="logo">'+
      '<h1>The Neuro</h1>'+
      '<p><b>The Neuro</b> is located in Montreal Canada and is the development center for LORIS.</p>'+
      '<p>Website: <a href="http://mcin-cnim.ca" target="blank">mcin-cnim.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.5089835, -73.5813425),
  title: "Neuro",
  sidebarItem: "Neuro",
  content: contentString,
  icon: image
});   

var contentString = 
      '<div>'+
      '<img src="http://douglasbrainbank.ca/img/douglas-logo.jpg" class="logo">'+
      '<h1>Douglas Mental Health University Institute</h1>'+
      '<p><b>The Douglas Mental Health</b> University Institute is located in Montreal Canada.</p>'+
      '<p>Website: <a href="http://www.douglas.qc.ca/" target="blank">douglas.qc.ca/</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.442508, -73.584851),
  title: "Douglas Mental Health University Institute",
  sidebarItem: "Douglas Mental Health",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.sickkids.ca/resources/hospital/images/logos/sickkids.gif" class="logo">'+
      '<h1>Sick Kids Hospital</h1>'+
      '<p><b>Sick Kids</b> is located in Toronto Canada.</p>'+
      '<p>Website: <a href="http://www.sickkids.ca/" target="blank">www.sickkids.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(43.657299, -79.3873968),
  title: "Sick Kids",
  sidebarItem: "Sick Kids",
  content: contentString,
  icon: image
});   

var contentString = 
      '<div>'+
      '<img src="http://www.queensu.ca/sites/all/themes/queensbase_omega/images/wordmark.png" class="logo">'+
      '<h1>Queens University</h1>'+
      '<p><b>Queens University</b> is located in Kingston Canada.</p>'+
      '<p>Website: <a href="http://queensu.ca/" target="blank">queensu.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(44.225572, -76.495506),
  title: "Queens University",
  sidebarItem: "Queens University",
  content: contentString,
  icon: image
});  
   
var contentString = 
      '<div>'+
      '<img src="" class="logo">'+
      '<h1>NIH Paediatric Database</h1>'+
      '<p><b>NIH Paediatric Database</b> is located in California USA.</p>'+
      '<p>Website: <a href="http://pediatricmri.nih.gov" target="blank">pediatricmri.nih.gov</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(37.327618, -121.768387),
  title: "NIH Paediatric Database",
  sidebarItem: "NIH Paediatric Database",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="https://www.humanbrainproject.eu/image/company_logo?img_id=10795&t=1441492532899" class="logo">'+
      '<h1>Human Brain Project</h1>'+
      '<p><b>Human Brain Project</b> is part of the European Commission and is centered in Geneva Switzerland.</p>'+
      '<p>Website: <a href="https://www.humanbrainproject.eu/" target="blank">humanbrainproject.eu</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(46.226888, 6.148227),
  title: "Human Brain Project",
  sidebarItem: "Human Brain Project",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://en.kisti.re.kr/media/tpl/common/logo-kisti.jpg" class="logo">'+
      '<h1>Korean Institute of Science and Technology</h1>'+
      '<p><b>Korean Institute of Science and Technology</b> is located in Seoul Korea.</p>'+
      '<p>Website: <a href="http://en.kisti.re.kr/" target="blank">en.kisti.re.kr</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(37.591091, 127.045123),
  title: "Korean Institute of Science and Technology",
  sidebarItem: "Korean Institute of Science and Technology",
  content: contentString,
  icon: image
});  

/**
 *   fit viewport to markers
 * commented out as the map is set to focus on the center of the atlantic ocean.
 */

/*map.fitBounds(markerBounds);*/

}

