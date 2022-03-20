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

}

