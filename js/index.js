// const client_id = "501e5a501f034393aba506f904c5142a";
// const redirect_uri = "http://localhost:8888/";
// const client_secret = 'f4182aa413d5415fb695ed26bb054e14';
// var scopes = 'user-read-private user-read-email';

const access_token = "BQCjSbcTBKq1447YGF4maRvfD3kwEA0t4K_QDMfy1KVJfNKDipH7qTi0s-KHmFOFj29QJ1NiyMTv_a0Ay-jUP0PCjDDvr3mNda066F3o9dahBn_tZIaS67bridhBlm80CCGm63rcEWAA4iC7Xgm3XFJs6_4y8H0BG--FvlWgH03W"

function invalidAccessToken() {
    document.getElementById("loggedin").className = "uk-hidden";
}

// user profile
let url = "https://api.spotify.com/v1/me";
request(url, access_token, showUserProfile)
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