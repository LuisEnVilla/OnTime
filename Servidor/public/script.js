var map;

function initialize() {
  var mapOptions = {
    zoom: 12
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: Falló el servicio de geolocalización.';
  } else {
    var content = 'Error: Tu navegador no soporta geolocalización.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function updateMarkers(route) {
	setAllMap(null);
	var url = 'http://ontime.jit.su/ruta/' + route;
	function success(json){
		for (var i = 0; i < json.length; i++) {
			var pos = new google.maps.LatLng(json[i].lat, json[i].lng);
			var markerOpt = new google.maps.MarkerOptions({
				position: pos,
				map: map
			});
			var marker = new google.maps.Marker(markerOpt);
		};
	}

	$.ajax({
		dataType: "json",
		url: url,
		success: success
	});

}

$('#routeCombo').change(function(event) {
	var val = $('#routeCombo').find('option:selected').val();
	updateMarkers(val);
});

google.maps.event.addDomListener(window, 'load', initialize);