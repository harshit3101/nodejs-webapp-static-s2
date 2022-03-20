const s2Url = window.location.origin + '/s2/latLngToKey'

async function callS2() {
    console.log("S2 js function called")

    if(navigator?.geolocation){
        navigator.geolocation?.getCurrentPosition(position => processCurrentPosition(position));
    }
    
}


function processCurrentPosition(position){
    console.log(`position: `, position?.coords)

    let latitude = position?.coords?.latitude;
    let longitude = position?.coords?.longitude;

    console.log(`latitude: ${latitude}`, )
    console.log(`longitude: ${longitude}`, )

    let data = {
        latitude: latitude,
        longitude: longitude
    }


    fetch(s2Url, {body: JSON.stringify(data), 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
        return data.json();
    })
    .then(msg => {
        console.log(msg);

        let s2Response = document.getElementById('s2Response');
        s2Response.innerHTML = JSON.stringify(msg);
    })
    .catch(err => {
        console.log(err);
        location.reload(); 
    });

}

