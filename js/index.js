const access_token = "BQDHtWJNq_uB9kLoZwoscnAJkwLqfvBcmLyMWGzvP8pBhKtKHCNBCx1L2GM19MJ_sWCbb-ZKgh-8vVIIRcQ2L_mkv9xwDJ0CBq5cTN1OkCjm5qmcJe2nAhfBVcxILDdN4OahvoNMYkyv-g--vsSqL4p6v21F2M-BOrwN10iIpjSuzNV374THnxCfxOT96atvXtZLba1Iqd_zbfWqCx4lT8ekrSg4R3o4TK0_PkMKWsj-7G1LD3FJi_0TsVhMYc5ONmPfVjRQBXg";
// 
function invalidAccessToken(error) {
    // console.log(error);
    if (error.message == "The access token expired") {
        document.getElementById("loggedin").className = "uk-hidden";
        document.getElementById("loggedin-botton-playlist").className = "uk-hidden";
        document.getElementById("loggedin-botton-create-playlist").className = "uk-hidden";
        document.getElementById("loggedin-botton-search-track").className = "uk-hidden";
        alert(error.message);
    }
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
            document.getElementById("loggedin-botton-playlist").className = "";
            document.getElementById("loggedin-botton-create-playlist").className = "";
            document.getElementById("loggedin-botton-search-track").className = "";
            getPlaylists();
        }
    }
}

function getPlaylists() {
    const urlPlaylists = 'https://api.spotify.com/v1/me/playlists/'
    request(urlPlaylists, access_token, showPlaylists)
}
function showPlaylists(response) {
    // console.log(response);
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken(response.error);
        }
        else if (typeof response.items === "object") {
            document.getElementById("playlists").hidden = false;
            document.getElementById("playlist").hidden = true;
            document.getElementById("playlist-information").className = "";
            document.getElementById("playlist-tracks").className = "uk-hidden";
            let playlists = document.getElementById("playlists");
            while (playlists.hasChildNodes()) {
                playlists.removeChild(playlists.firstChild);
            }
            response.items.forEach(element => {
                let card = document.createElement("div");
                card.id = element.id;
                card.className = "uk-animation-toggle";
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
    // console.log(url);
    request(url, access_token, showPlaylist)
}
function showPlaylist(response) {
    // console.log(response);
    if (typeof response === "object") {

        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else {
            document.getElementById("playlists").hidden = true;
            document.getElementById("playlist").hidden = false;
            document.getElementById("playlist-information").className = "";
            document.getElementById("playlist-tracks").className = "";

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
    // console.log(response);
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
function cleanModalCreatePlaylist() {
    document.getElementById("create-playlist-name").value="";
    document.getElementById("create-playlist-description").value="";
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
    // console.log(response);
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
    // console.log("id", id_playlist);
    let urlDeletePlaylist = "https://api.spotify.com/v1/playlists/" + id_playlist + "/followers";
    var data = {}
    if (confirm("Are you sure?")) {
        requestDeletePlaylist(urlDeletePlaylist, access_token, showRemovePlaylist)
    }
}
function showRemovePlaylist(response) {
    // console.log("showRemovePlaylist",response);
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else if (response.ok)
            getPlaylists();
        else
            alert("Could not delete playlist")
    }
}

function showModalEditPlaylist() {
    document.getElementById("modal-playlist-name").value = document.getElementById("playlist-tittle").innerText;
    document.getElementById("modal-playlist-description").value = document.getElementById("playlist-description").innerHTML;

}
function editPlayList() {
    let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
    let urlEditPlaylists = "https://api.spotify.com/v1/playlists/" + id_playlist;
    let name = document.getElementById("modal-playlist-name").value;
    let description = document.getElementById("modal-playlist-description").value;
    if (name == "" || description == "")
        document.getElementById("modal-playlist-info").innerHTML = "Por favor digite los campos";
    else {
        document.getElementById("modal-playlist-info").innerHTML = "";
        var data = {
            "name": name,
            "description": description,
            "public": false
        }
        requestPut(urlEditPlaylists, access_token, data, showEditAPlaylist)
    }
}
function showEditAPlaylist(response) {
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken();
        }
        else if (!response.ok)
            alert("You cannot edit a playlist you don't own")
        else {
            UIkit.modal(document.getElementById("modal-playlist")).hide();
            let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
            getPlaylist("https://api.spotify.com/v1/playlists/"+id_playlist);
        }
    }
}

function removeTrackOfPlaylist(id_track, positionTrack) {
    let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
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
    if (confirm("Are you sure?")) {
        requestDelete(urlDeleteTrackOfPlaylist, access_token, data, showDeleteTrackOfPlaylist)
    }
}
function showDeleteTrackOfPlaylist(response) {
    // console.log(response);
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

// Search Track
function searchTrack() {
    let inputNameTrack = document.getElementById("search-track-name").value;
    if (inputNameTrack!="") {
        let nameTrack = inputNameTrack.replace(/ /g, '%20');
        let id_playlist = document.getElementById("playlist-tittle").getAttribute("id-playlist");
        let urlSearchTrack = "https://api.spotify.com/v1/search?q=" + nameTrack + "&type=track&limit=10"; //%2Cartist
        request(urlSearchTrack, access_token, showListTracks)
    }
}
function showListTracks(response) {
    if (typeof response === "object") {
        if (typeof response.error === "object") {
            invalidAccessToken(response.error);
        }
        else if (typeof response.tracks.items === "object") {
            document.getElementById("playlists").hidden = true;
            document.getElementById("playlist").hidden = false;
            document.getElementById("playlist-information").className = "uk-hidden";
            document.getElementById("playlist-tracks").className = "";

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
                if (typeof element.album.images[0] === "object")
                    img.src = element.album.images[0].url;
                td_img.appendChild(img);

                let td_name = document.createElement("td");
                let name = document.createElement("a");
                name.className = "uk-link-reset";
                name.appendChild(document.createTextNode(element.name));
                name.onclick = function () { getTrack(element.href) };
                td_name.appendChild(name);

                let td_remove = document.createElement("td");
                let a_remove = document.createElement("a");
                a_remove.onclick = function () { getTrack(element.href) };
                let span_remove = document.createElement("span");
                span_remove.setAttribute("uk-icon", "play")
                a_remove.appendChild(span_remove);
                td_remove.appendChild(a_remove);

                let td_artist = document.createElement("td");
                for (let index = 0; index < element.artists.length; index++) {
                    if (index == 0)
                        td_artist.appendChild(document.createTextNode(element.artists[index].name));
                    if (index > 0)
                        td_artist.appendChild(document.createTextNode(", " + element.artists[index].name));
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