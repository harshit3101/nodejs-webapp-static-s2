const esUrl = window.location.origin + '/utils/es'

async function getNearestPoints() {
    console.log("getNearestPoints js function called")

    if(navigator?.geolocation){
        navigator.geolocation?.getCurrentPosition(position => processCurrentPosition2(position));
    }
    
    
}

function processCurrentPosition2(position){

    let latitude = position?.coords?.latitude;
    let longitude = position?.coords?.longitude;
    let radius = document?.getElementById('radius')?.value;

    let data = {
        latitude: latitude,
        longitude: longitude,
        radius:  (radius === ''? '1m': radius)
    }


    fetch((esUrl+'/getNearestPoints'), {body: JSON.stringify(data), 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
        return data.json();
    })
    .then(msg => {
        let s2Response = document.getElementById('nearestPoints');
        s2Response.innerHTML = JSON.stringify(msg);
    })
    .catch(err => {
        console.log(err);
    });

}