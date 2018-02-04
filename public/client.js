



document.addEventListener('DOMContentLoaded',()=>{
    console.log('dom loaded')
  
    const so = io()
    console.log('so',so)
  
    so.on('fg',(val)=>{
      console.log('new val man', val)
      let output = document.querySelector('#output')
      output.innerHTML = val
      //document.querySelector('body').appendChild(node)
    })
    so.on('color',(col)=>{
      //console.log(col)
      const body = document.querySelector('body')
      const r = col[0], g = col[1], b = col[2], a = col[3]
      console.log(r,g,b,a)
      body.style.backgroundColor = `rgba(${r},${g},${b},${a})`
    })
})




/*function geoFindMe() {
  //alert("hi");
  
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude.toFixed(7);
    var longitude = position.coords.longitude.toFixed(7);

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}*/
