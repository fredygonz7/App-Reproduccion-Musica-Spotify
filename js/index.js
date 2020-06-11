// const client_id = "501e5a501f034393aba506f904c5142a";
// const redirect_uri = "http://localhost:8888/";
// const client_secret = 'f4182aa413d5415fb695ed26bb054e14';
// var scopes = 'user-read-private user-read-email';

const access_token = "BQARBgJwIfx8XCznd4Ww852AYh0KDcPPXUrQ3tJXVJxb8oCg4uNbqlbvEgFbrQ551QdkLnGbY_6bWHPJ7osqoRBgro5pZoXaJa5pDuF3e0FjHTBqJs3bBBMdXj1wLAF2S7TPPhZTBfyB2ebjOTxI9pxdeXZSGoIPHO5y2RbpWmutCR3cWRDODBknWWfN57T6u93kPpsonIAiUVsjt2YWPWaJoTI6j0WOem72V-Z6GZ6URMaN3SiS6fnvKCvxh2yz7I6kD0kZ6fc";

function invalidAccessToken(error) {
    document.getElementById("loggedin").className = "uk-hidden";
    console.log(error);
}

// user profile
const urlUserProfile = "https://api.spotify.com/v1/me";
request(urlUserProfile, access_token, showUserProfile)
function showUserProfile(response) {
    // console.log(response);
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken(response.error);
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

            // show information
            document.getElementById("loggedin").className = "";
        }
    }
}

function getPlaylists() {
    request(urlPlaylists, access_token, showPlaylists)
}
const urlPlaylists= 'https://api.spotify.com/v1/me/playlists/'
getPlaylists();
function showPlaylists(response) {
    // console.log(response);
    if (typeof response === "object") {
        
        if (typeof response.error === "object") {
            invalidAccessToken(response.error);
        }
        else if (typeof response.items === "object") {
            document.getElementById("playlists").hidden = false;
            document.getElementById("playlist").hidden = true;
            let playlists = document.getElementById("playlists");
            while (playlists.hasChildNodes()) {
                playlists.removeChild(playlists.firstChild);
            }
            response.items.forEach(element => {
                // console.log(element);
                let card = document.createElement("div");
                card.id = element.id;
                card.className = "uk-animation-toggle";
                // card.setAttribute("value-href", response.href);
                card.onclick = function () { getPlaylist(element.href) };

                let div = document.createElement("div");
                div.className = "uk-card uk-card-default uk-card-body uk-animation-scale-up";
                div.style.height = "100%";

                let img = document.createElement("img");
                img.src = element.images[0].url;

                div.appendChild(img)

                let tittle = document.createElement("h4");
                tittle.className = "uk-card-title";
                tittle.appendChild(document.createTextNode(element.name));

                div.appendChild(tittle);

                card.appendChild(div);

                playlists.appendChild(card);
            })
        }
    }
}

let urlplay = "https://api.spotify.com/v1/playlists/1LqopOK31Etx30eCDyApNR";
function getPlaylist(url) {
    request(url, access_token, showPlaylist)
}

function showPlaylist(response) {
    console.log(response);
    if (typeof response === "object") {

        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else {
            document.getElementById("playlists").hidden = true;
            document.getElementById("playlist").hidden = false;

            document.getElementById("playlist-tittle").innerHTML = response.name;
            document.getElementById("playlist-description").innerHTML = response.description;
            document.getElementById("playlist-img").src = response.images[0].url;
            
            let tbody_description = document.getElementById("playlist-table-tbody-description");
            while (tbody_description.hasChildNodes()) {
                tbody_description.removeChild(tbody_description.firstChild);
            }

            response.tracks.items.forEach(element => {
                let tr = document.createElement("tr");

                let td_img = document.createElement("td");
                let img = document.createElement("img");
                img.className = "uk-border-circle";
                img.style.width = "40px"
                img.src = element.track.album.images[0].url;
                td_img.appendChild(img);

                let td_name = document.createElement("td");
                let name = document.createElement("a");
                name.className = "uk-link-reset";
                name.appendChild(document.createTextNode(element.track.name));
                name.onclick = function () { alert() };
                td_name.appendChild(name);

                let td_artist = document.createElement("td");
                for (let index = 0; index < element.track.album.artists.length; index++) {
                    if (index == 0)
                        td_artist.appendChild(document.createTextNode(element.track.album.artists[index].name));
                    if (index > 0)
                        td_artist.appendChild(document.createTextNode(", " + element.track.album.artists[index].name));
                }

                tr.appendChild(td_img);
                tr.appendChild(td_name);
                tr.appendChild(td_artist);

                tbody_description.appendChild(tr);
            });
        }
    }
}