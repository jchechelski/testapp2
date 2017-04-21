(function() {
    window.onload = function() {
        init();
    }
})();

function init() {
    document.addEventListener('deviceready', onDeviceReady, false);
}


function onDeviceReady() {
    
    checkConnection();
    
    //track();
    
    
    var track_button = document.getElementById('track');

    track_button.addEventListener('click', function() {
    
    var xhr = new XMLHttpRequest();
    
    //var url = 'http://zeenek.webd.pl/aftership2/xhr.php';
        var url = 'https://api.aftership.com/v4/trackings/';
    
    var t_number = document.getElementById('tracking_number').value;
    
    var data = 'track_number='+t_number;
    
    xhr.open('POST', url, true);
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('aftership-api-key', '07183679-df7c-4c64-b7d5-4cef43e0deca');
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('status').innerHTML = xhr.responseText;
        }
    }
    
    //xhr.send(data);
        xhr.send("tracking_number=8912133414");
    document.getElementById("status").innerHTML = 'processing...';
    
    
    
});
    
    
    
    
}


// sledzenie
function track() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.aftership.com/v4/trackings/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('aftership-api-key', '07183679-df7c-4c64-b7d5-4cef43e0deca');

    xhr.onload = function() {
        if(xhr.status === 200) {
            console.log(' works? : ' + xhr.responseText);
            navigator.notification.alert('Działa!' + xhr.responseText);
        }
        else {
            console.log('DOESN NOT WORK!' + xhr.status);
            navigator.notification.alert('NIE DZIAŁA!' + xhr.status + xhr.responseText);
        }
    }
    navigator.notification.alert('NIE DZIAŁA!' + xhr.status + xhr.responseText);
    xhr.send("tracking_number=8912133414");
    //xhr.send();
}


// sprawdzamy czy jest internet
function checkConnection() {
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(networkState == Connection.NONE) {
        navigator.notification.alert(states[networkState].toUpperCase() + '\n You can not track parcels');
    }
}