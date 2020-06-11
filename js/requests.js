function request(url, access_token, callback) {
    if (access_token) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(res => res.json())
            .catch(error => invalidAccessToken(error))
            .then(response => callback(response));
    }
}