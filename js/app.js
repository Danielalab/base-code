window.onload = function() {
  let divMap = document.getElementById('mapdiv');
    
  // argumentos de getCurrentPosition (GEOLOCATION API) 
  let options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
  };

  let success = function(position) {
    // iniciando con API GOOGLEMAP para visualizar locación 
    let googlePosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapOptions = {
      zoom: 12,
      center: googlePosition,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    let googleMap = new google.maps.Map(divMap, googlePosition);

    // añade marcador con mensaje en la posición .
    let markerOption = {
      map: googleMap,
      position: googlePosition,
      title: 'Hi , I am here',
      animation: google.maps.Animation.DROP
    };
    let googleMarker = new google.maps.Marker(markerOption);

    // añadiendo popup con la dirección obtenida
    let createAdresssPopup = (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let popupOptions = {
            content: results[1].formatted_address,
            position: googlePosition
          };
          let popup = new google.maps.InfoWindow(popupOptions);
          google.maps.event.addListener(googleMarker, 'click', () => {
            popup.open(googleMap);
          });
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    };

    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng': googlePosition
    }, createAdresssPopup);

  };

  let error = function(error) {
    console.warn('ERROR ' + error.code + ': ' + error.message);
    switch (error.code) {
    case error.PERMISSION_DENIED:
      divMap.innerHTML = '<p>User denied the request for Geolocation.</p>';
      break;
    case error.POSITION_UNAVAILABLE:
      divMap.innerHTML = '<p>Location information is unavailable.</p>';
      break;
    case error.TIMEOUT:
      divMap.innerHTML = '<p>The request to get user location timed out.</p>';
      break;
    case error.UNKNOWN_ERROR:
      divMap.innerHTML = '<p>An unknown error occurred.</p>';
      break;
    }
  };

  //  navigator.geolocation.getCurrentPosition(success, error, options);
  let wachID = navigator.geolocation.watchPosition(success, error, options);  
};