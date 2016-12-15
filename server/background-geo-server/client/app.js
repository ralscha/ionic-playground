var map, eventSource, uuid, marker, locationMarkers = [], stationaryCircles = [],
  currentLocationMarker, locationAccuracyCircle, path, previousPosition;


function init() {
  uuid = uuid.v4();
  loadMap();
  subscribeToServer();
}

window.onbeforeunload = function (e) {
  if (eventSource) {
    eventSource.close();
  }
}

function loadMap() {
  var latLng = new google.maps.LatLng(39, 34);

  var mapOptions = {
    center: latLng,
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function subscribeToServer() {
  eventSource = new EventSource(`/register/${uuid}`);

  eventSource.addEventListener('pos', response => {
		for (let line of response.data.split('\n')) {
			handlePositions(JSON.parse(line));
		}
	}, false);
  
  eventSource.addEventListener('stationary', response => {
		for (let line of response.data.split('\n')) {
			handleStationaries(JSON.parse(line));
		}
	}, false);

  eventSource.addEventListener('clear', x => clear(), false);
  eventSource.addEventListener('open', () => fetch(`/subscribe/${uuid}/pos,stationary,clear`), false);
}

function handlePositions(positions) {
  for (let i = 0; i < positions.length; i++) {
    handlePosition(positions[i]);
  }
  if (positions.length > 0) {
    const lastPos = positions[positions.length - 1];
    const latlng = new google.maps.LatLng(lastPos.latitude, lastPos.longitude);
    map.setCenter(latlng);
  }
}

function clear() {
	console.log('here');
  locationMarkers.forEach(r => r.setMap(null));
  locationMarkers = [];

  stationaryCircles.forEach(r => r.setMap(null));
  stationaryCircles = [];

  if (currentLocationMarker) {
    currentLocationMarker.setMap(null);
    currentLocationMarker = null;
  }

  if (locationAccuracyCircle) {
    locationAccuracyCircle.setMap(null);
    locationAccuracyCircle = null;
  }

  if (path) {
    path.setMap(null);
    path = null;
  }
}


function handlePosition(position) {
  const latlng = new google.maps.LatLng(position.latitude, position.longitude);

  if (!currentLocationMarker) {
    currentLocationMarker = new google.maps.Marker({
      map: map,
      position: latlng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: 'gold',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 3
      }
    });
    locationAccuracyCircle = new google.maps.Circle({
      fillColor: 'purple',
      fillOpacity: 0.4,
      strokeOpacity: 0,
      map: map,
      center: latlng,
      radius: position.accuracy
    });
  }
  else {
    currentLocationMarker.setPosition(latlng);
    locationAccuracyCircle.setCenter(latlng);
    locationAccuracyCircle.setRadius(position.accuracy);
  }

  if (previousPosition) {
    locationMarkers.push(new google.maps.Marker({
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: 'green',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 3
      },
      map: map,
      position: new google.maps.LatLng(previousPosition.latitude, previousPosition.longitude)
    }));

    if (locationMarkers.length > 100) {
      const removedMarker = locationMarkers.shift();
      removedMarker.setMap(null);
    }
  }
  else {
    map.setCenter(latlng);
    if (map.getZoom() < 15) {
      map.setZoom(15);
    }
  }

  if (!path) {
    path = new google.maps.Polyline({
      map: map,
      strokeColor: 'blue',
      strokeOpacity: 0.4
    });
  }
  const pathArray = path.getPath();
  pathArray.push(latlng);
  if (pathArray.getLength() > 100) {
    pathArray.removeAt(0);
  }

  previousPosition = position;

}

function handleStationaries(stationary) {
  for (let i = 0; i < stationary.length; i++) {
    handleStationary(stationary[i]);
  }
}

function handleStationary(stationary) {
  if (stationary.radius) {
	  const stationaryCircle = new google.maps.Circle({
	    fillColor: 'pink',
	    fillOpacity: 0.4,
	    strokeOpacity: 0,
	    map: map,
	    center: new google.maps.LatLng(stationary.latitude, stationary.longitude),
	    radius: stationary.radius
	  });
	  stationaryCircles.push(stationaryCircle);
	
	  if (stationaryCircles.length > 10) {
	    const removedCircle = stationaryCircles.shift();
	    removedCircle.setMap(null);
	  }
  }
}

function showMarker(position) {
  if (marker != null) {
    marker.setMap(null);
  }

  const latLng = new google.maps.LatLng(position.latitude, position.longitude);
  marker = new google.maps.Marker({
    map: map,
    position: latLng
  });

  map.setCenter(latLng);
  map.setZoom(10);
}


