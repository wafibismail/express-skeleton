const HTTP_HANDLER = {
    auth: {
        user: {
            //btw need to figure out how to implement server side api protection here:
            //https://docs.microsoft.com/en-us/azure/active-directory/develop/web-app-quickstart?pivots=devlang-nodejs-msal
            bearerToken: null,
            data: null
        },
        config: {
            auth:{
                clientId : "77d7a34b-9853-4113-9d57-3136eb0149e4",
                //app id registered on azure app registration.
                authority : "https://login.microsoftonline.com/3f46b7a8-385a-4569-9af5-c43dd63dad93/",
                //3f46 ... is ubd's azure tenant id
                //the above are available to us via azure portal. no need special consent.
                redirectUri: "http://localhost:8080"
            }
        },
        login: async function () {
            DOM_HANDLER.nav.hideButton("login");
            DOM_HANDLER.nav.showButton("pleaseWait");
            let client = new msal.PublicClientApplication(this.config);
            let loginRequest = {scopes: ['user.read']};
            let loginResponse = await client.loginPopup(loginRequest);
            //console.log("Login Response", loginResponse);
            let tokenRequest = {
                scopes: ['user.read'],
                account: loginResponse.account
            };
            let tokenResponse = await client.acquireTokenSilent(tokenRequest);
            //console.log("Token Response", tokenResponse);
            this.user.bearerToken = tokenResponse.accessToken;
            let payload = await fetch('https://graph.microsoft.com/v1.0/me', {
                headers:{
                    'Authorization': `Bearer ${this.user.bearerToken}`
                }
            });
            this.user.data = await payload.json()
            DOM_HANDLER.nav.hideButton("pleaseWait");
            DOM_HANDLER.nav.showButton("logout");
        },
        logout: function () {
            DOM_HANDLER.nav.hideButton("logout");
            DOM_HANDLER.nav.showButton("login");
        },
    },
    fetchCategories: function() {
        fetch('/categories')
        .then(response => response.json())
        .then(data => {
            //its init has to be after categories are fetched
            DATA_HANDLER.rawData.categories = data;
            DATA_HANDLER.init();
        });
    },
    fetchResourcesFromCategory: function(categoryId) {
        fetch('/categories/' + categoryId + '/resources')
        .then(response => response.json())
        .then(data => {
            DATA_HANDLER.rawData.resources = data;
            DOM_HANDLER.pages.resources.displayFetchedResources();
        })
    },
    fetchSingleResourceData: function(resourceId) {
        fetch('resources/' + resourceId + '/requests')
        .then(response => response.json())
        .then(data => {
            DATA_HANDLER.rawData.resource.bookRequests = data;
            console.log(data)
        })
    }
}