function request(url, access_token, callback) {
    if (access_token) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(res => res.json())
            .catch(error => console.log(error))
            .then(response => callback(response));
    }
}

// var url = 'https://api.spotify.com/v1/users/fredgonz7/playlists';
// var data = {
//     "name": "New Playlist",
//     "description": "New playlist description",
//     "public": false
// }

function requestPost(url, access_token, data, callback) {
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }).then(res => res.json())
        .catch(error => console.error(error))
        .then(response => callback(response));
}

function requestDelete(url, access_token, data, callback) {
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }).then(res => res.json())
        .catch(error => console.error(error))
        .then(response => callback(response));
}
function requestDeletePlaylist(url, access_token, callback) {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }).then(res => res)
        .catch(error => console.error(error))
        .then(response => callback(response));
}

function requestPut(url, access_token, data, callback) {
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }).then(res => res)
        .catch(error => console.error(error))
        .then(response => callback(response));
}