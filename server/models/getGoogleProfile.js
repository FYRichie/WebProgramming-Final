const request = require('request');

export default getGoogleProfile = function(TokenId) {
    return new Promise((resolve, reject) => {
        if(!accessToken){
            resolve(null);
            return
        };
        request(`https://oauth2.googleapis.com/tokeninfo?id_token=${TokenId}`,
        function (error, response, body) {
            if (error) {console.log(error)}
            console.log(body);
            body = JSON.parse(body);
            if(body.error) {reject(body.error);}
            else {
                resolve(body);
            }
        })
    })
}