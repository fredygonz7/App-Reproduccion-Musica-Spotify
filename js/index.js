// const client_id = "501e5a501f034393aba506f904c5142a";
// const redirect_uri = "http://localhost:8888/";
// const client_secret = 'f4182aa413d5415fb695ed26bb054e14';
// var scopes = 'user-read-private user-read-email';

const access_token = "BQDotvgS1GAZJBxYIGZXmJoGtHoptI1NWsdAlLKg-88H1saLYue_3E4oA25AcofonZkJ0YQEqEabXYDGMa3KHrKFQ3OvcA6-kB72bvzGxaDfmnjPwddBIxTWJb08mUGSARgELHTk5Bm_wbiarIdqF6Zg10VZQLndBu1P-9v4K-bq"

function invalidAccessToken() {
    document.getElementById("loggedin").className = "uk-hidden";
}

// user profile
const urlUserProfile = "https://api.spotify.com/v1/me";
request(urlUserProfile, access_token, showUserProfile)
function showUserProfile(response) {
    // console.log(response);
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken();
            // console.log(response.error);
        }
        else if (typeof response.display_name === "string") {
            document.getElementById("user-login").innerHTML = response.display_name;
            document.getElementById("user-display-name").innerHTML = response.display_name;
            document.getElementById("user-id").innerHTML = response.id;
            document.getElementById("user-email").innerHTML = response.email;
            document.getElementById("user-img").src = response.images[0].url;
            document.getElementById("user-country").innerHTML = response.country;
            document.getElementById("user-external_urls-spotify").innerHTML = response.external_urls.spotify;
            document.getElementById("user-external_urls-spotify").href = response.external_urls.spotify;
            document.getElementById("user-href").innerHTML = response.href;
            document.getElementById("user-href").href = response.href;

            document.getElementById("loggedin").className = "uk-show";
        }
    }
}

function getPlaylist() {
    request(urlPlaylist, access_token, showPlaylist)
}
const urlPlaylist= 'https://api.spotify.com/v1/me/playlists/'
request(urlPlaylist, access_token, showPlaylist);
function showPlaylist(response) {
    console.log(response);
    if (typeof response === "object") {
        
        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else if (typeof response.items === "object") {
            let playlist = document.getElementById("playlist");
            while (playlist.hasChildNodes()) {
                playlist.removeChild(playlist.firstChild);
            }
            response.items.forEach(element => {
                console.log(element);
                let card = document.createElement("div");
                card.id = "playlist-" + element.name;
                card.className = "uk-card uk-card-default";

                // imagen
                let div_img = document.createElement("div");
                div_img.className = "uuk-card-media-top";

                let img = document.createElement("img");
                // img.className = "uk-border-circle";
                // img.style.width = "150px"
                img.src = element.images[0].url;

                div_img.appendChild(img)

                // descripcion
                let div_desp = document.createElement("div");
                div_desp.className = "uk-card-body";

                let h3 = document.createElement("h3");
                h3.className = "uk-card-title";
                h3.appendChild(document.createTextNode(element.name));

                let p = document.createElement("p");
                p.appendChild(document.createTextNode(element.description));

                div_desp.appendChild(h3);
                div_desp.appendChild(p);

                card.appendChild(div_img);
                card.appendChild(div_desp);
                playlist.appendChild(card);
            })
        }
    }
}


// url = "https://accounts.spotify.com/api/token";
// fetch(url, {
//     method: 'POST',
//     // headers: { 'Authorization': 'Basic ' + client_id },
//     // data: {
//     //    'grant_type': client_secret}
//     headers: { 'Authorization': 'Basic ' + (new ArrayBuffer(client_id + ':' + client_secret).toString('base64')) }
// }).then(res => res.json())
//     .catch(error => console.log(error))
//     .then(response => console.log(response));