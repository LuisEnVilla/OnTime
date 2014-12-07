var map, val, lat, lng;

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
        content: 'Actualmente estás aquí'
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
	//setAllMap(null);
	var url = 'http://localhost/api/ruta/' + route;
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

$('#comboRoute').change(function(event) {
	val = $('#comboRoute').find('option:selected').val();
  console.log(val)
  updateMarkers(val);
});

$('#check').click(function(event) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
       lat = position.coords.latitude;
       lng = position.coords.longitude;
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  $.ajax({
type: "POST",
url: 'http://localhost/api/ruta/' + val,
data: {lat: lat, lng : lng, date: Date.now()},
success: function(data, textStatus, xhr) {
    console.log('success post');
  }
});
});

google.maps.event.addDomListener(window, 'load', initialize);