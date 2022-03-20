const addUserUrl = window.location.origin + '/register/add-user'

async function addUser() {
   
    if(navigator?.geolocation){
        navigator.geolocation?.getCurrentPosition(position => addUser2(position));
    }
    
    
}

function addUser2(position){

    let latitude = position?.coords?.latitude;
    let longitude = position?.coords?.longitude;

    let username = document?.getElementById('username')?.value;
    let password = document?.getElementById('password')?.value;

    if(username && password){
        let data = {
            latitude: latitude,
            longitude: longitude,
            username: username,
            password: password
        }

        fetch((addUserUrl), {body: JSON.stringify(data), 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}
        })
        .then(data => {
            return data.json();
        })
        .then(msg => {
           
            if(!msg?.err?.message){
                alert(JSON.stringify(msg));
                window.location = window.location.origin
            }else{
                alert(JSON.stringify(msg.err.message));
            }
        })
        .catch(err => {
            location.reload();
        });
    }else{
        alert('Please enter username and password');
    }

}