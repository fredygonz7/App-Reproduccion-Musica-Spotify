// const client_id = "501e5a501f034393aba506f904c5142a";
// const redirect_uri = "http://localhost:8888/";
// const client_secret = 'f4182aa413d5415fb695ed26bb054e14';
// var scopes = 'user-read-private user-read-email';

const access_token = "BQC2v2dbmbNTt-28iawev6I0KUSwVIoPTuxCDGZ4AuEpbsO42dIaXkRnv_q8rKw0Iwu_IDCbtoBln94fSWvm2PfPWTlEQSwmq5NGdHTFWLOH9V-wmEzrdeW3WnTT8vuMjwb-a2ShYNpIhtj8xO1cV5AETIdSHSoJJtgjYiB4hCuCvtnSTMwSwLW43NOmlVVhkIp5qGrw1tV84lX9fcV43vEI7tL_3zsEKuCBB8r_f8cZI-ULzC76nje5MviBwcGGAb8upSTpbf0";

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
            if (typeof response.images[0] === "object")
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
                if (typeof element.images[0] === "object")
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
            document.getElementById("playlist-tittle").setAttribute("id-playlist", response.id);
            document.getElementById("playlist-description").innerHTML = response.description;

            if (typeof response.images[0] === "object")
                document.getElementById("playlist-img").src = response.images[0].url;
            else
                document.getElementById("playlist-img").src = "";
            
            let tbody_description = document.getElementById("playlist-table-tbody-description");
            while (tbody_description.hasChildNodes()) {
                tbody_description.removeChild(tbody_description.firstChild);
            }

            response.tracks.items.forEach(function (element, index) {
                let tr = document.createElement("tr");

                let td_img = document.createElement("td");
                let img = document.createElement("img");
                img.className = "uk-border-circle";
                img.style.width = "40px"
                if (typeof element.track.album.images[0] === "object")
                img.src = element.track.album.images[0].url;
                td_img.appendChild(img);

                let td_name = document.createElement("td");
                let name = document.createElement("a");
                name.className = "uk-link-reset";
                name.appendChild(document.createTextNode(element.track.name));
                name.onclick = function () { getTrack(element.track.href)};
                // name.href = "modal-container";
                td_name.appendChild(name);

                let td_remove = document.createElement("td");
                let a_remove = document.createElement("a");
                a_remove.onclick = function () { removeTrackOfPlaylist(element.track.id, index) };
                let span_remove = document.createElement("span");
                span_remove.setAttribute("uk-icon","trash")
                a_remove.appendChild(span_remove);
                td_remove.appendChild(a_remove);

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
                tr.appendChild(td_remove);

                tbody_description.appendChild(tr);
            });
        }
    }
}

function getTrack(url) {
    UIkit.modal(document.getElementById('modal-container')).show(); 
    request(url, access_token, showTrack)
}

function showTrack(response) {
    console.log(response);
    if (typeof response === "object") {

        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else {
            if (typeof response.album.images[0] === "object")
                document.getElementById("track-img").src = response.album.images[0].url;
            document.getElementById("track-name").innerHTML = response.name;
            document.getElementById("track-album").innerHTML = response.album.name;

            let track_play = document.getElementById("track-play");
            while (track_play.hasChildNodes()) {
                track_play.removeChild(track_play.firstChild);
            }
            let track_video = document.createElement("audio");
            track_video.setAttribute("controls", "");

            let track_source = document.createElement("source");
            track_source.type = "audio/mpeg";
            track_source.src = response.preview_url;

            track_video.appendChild(track_source);

            track_play.appendChild(track_video);

            let artist = document.getElementById("track-artist");
            for(let index = 0; index < response.artists.length; index++) {
                if (index == 0)
                    artist.appendChild(document.createTextNode(response.artists[index].name));
                if (index > 0)
                    artist.appendChild(document.createTextNode(", " + response.artists[index].name));
            }
        }
    }
}

function postCreateAPlaylist() {
    let urlCreatePlaylists = "https://api.spotify.com/v1/users/" + document.getElementById("user-display-name").innerHTML + "/playlists";
    let name;
    name = document.getElementById("create-playlist-name").value;
    let description;
    description = document.getElementById("create-playlist-description").value;
    if (name == "" || description == "")
        document.getElementById("info-create-playlist").innerHTML = "Por favor digite los campos";
    else {
        document.getElementById("info-create-playlist").innerHTML = "";
        var data = {
            "name": name,
            "description": description,
            "public": false
        }
        requestPost(urlCreatePlaylists, access_token, data, showCreateAPlaylist)
    }
}
function showCreateAPlaylist(response) {
    console.log("showCreateAPlaylist");
    console.log(response);
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else {
            UIkit.modal(document.getElementById("modal-create-playlist")).hide();
            getPlaylist(response.href)
        }
    }
}

function removePlaylist() {
    let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
    console.log("id", id_playlist);
    
    // let urlCreatePlaylists = "https://api.spotify.com/v1/users/" + id_playlist + "/playlists";
    // let name;
    // name = document.getElementById("create-playlist-name").value;
    // let description;
    // description = document.getElementById("create-playlist-description").value;
    // if (name == "" || description == "")
    //     document.getElementById("info-create-playlist").innerHTML = "Por favor digite los campos";
    // else {
    //     document.getElementById("info-create-playlist").innerHTML = "";
    //     var data = {
    //         "name": name,
    //         "description": description,
    //         "public": false
    //     }
    //     requestPost(urlCreatePlaylists, access_token, data, showCreateAPlaylist)
    // }
}

/*
PUT https://api.spotify.com/v1/playlists/{playlist_id}
{
    "name": "Updated Playlist Name",
        "description": "Updated playlist description",
            "public": false
}*/

function removeTrackOfPlaylist(id_track, positionTrack) {
    let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
    console.log("id", id_playlist);

    var data = {
        "tracks": [
            {
                "uri": "spotify:track:"+id_track,
                "positions": [
                    positionTrack
                ]
            }
        ]
    }
    let urlDeleteTrackOfPlaylist = "https://api.spotify.com/v1/playlists/" + id_playlist + "/tracks";
    console.log("data", data);
    if (confirm("Are you sure?")) {
        requestDelete(urlDeleteTrackOfPlaylist, access_token, data, showDeleteTrackOfPlaylist)
    }
}
function showDeleteTrackOfPlaylist(response) {
    console.log(response);
    
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            if (response.error.message == "You cannot remove tracks from a playlist you don't own.")
                alert(response.error.message)
            else
                invalidAccessToken();
        }
        else if (typeof response.snapshot_id === "string") {
            let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
            getPlaylist("https://api.spotify.com/v1/playlists/"+id_playlist)
        }
    }
}
// request("https://api.spotify.com/v1/tracks/4QjHUnSUkpMhunzvgK0efE", access_token, data, showConsole)
// function showConsole(response) {
//     console.log(response);
// }