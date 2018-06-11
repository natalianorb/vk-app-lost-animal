require('./css/layout.css');
require('./css/app.css');

function login() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 5900424
        });
        VK.Auth.login(function(result) {
            if (result.status == 'connected') {
                resolve();
            } else {
                reject();
            }
        });
    });
}

function callAPI(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, function(result) {
            if (result.error) {
                reject();
            } else {
                resolve(result.response);
            }
        });
    });
}

var newReport = document.querySelector('#newReport');

newReport.addEventListener('click', () => {
    login()
        .then(() => callAPI('friends.get', {v: 5.62, fields: ['photo_100']}))
        .then(() => {
        })
        .catch((e) => console.error(e));
});

