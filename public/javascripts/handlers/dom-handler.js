const DOM_HANDLER = {
    init: function() {
        this.nav.init();
        this.pages.showResources();

        let mainContainer = document.getElementById("base-container");
        mainContainer.appendChild(this.nav.container);
        mainContainer.appendChild(this.pages.container);
    },
    nav: {
        container: document.createElement("div"),
        init: function() {
            this.container.appendChild(this.buttons.resources);
            this.container.appendChild(this.buttons.requests);
            this.container.appendChild(this.buttons.login);
        },
        buttons: {
            resources: Object.assign(
                document.createElement("button"),
                {
                    type: "button",
                    innerHTML: "resources",
                    onclick: function() {DOM_HANDLER.pages.showResources()}
                }
            ),
            requests: Object.assign(
                document.createElement("button"),
                {
                    type: "button",
                    innerHTML: "requests",
                    onclick: function() {DOM_HANDLER.pages.showRequests()}
                }
            ),
            login: Object.assign(
                document.createElement("button"),
                {
                    type: "button",
                    innerHTML: "login",
                    onclick: function() {HTTP_HANDLER.auth.login()}
                }
            ),
            pleaseWait: Object.assign(
                document.createElement("button"),
                {
                    type: "button",
                    innerHTML: "please wait",
                    disabled: "disabled"
                }
            ),
            logout: Object.assign(
                document.createElement("button"),
                {
                    type: "button",
                    innerHTML: "logout",
                    onclick: function() {HTTP_HANDLER.auth.logout()}
                }
            )
        },
        hideButton: function(buttonName) {
            this.container.removeChild(this.buttons[buttonName]);
        },
        showButton: function(buttonName) {
            this.container.appendChild(this.buttons[buttonName]);
        }
    },
    pages: {
        showRequests: function() {
            this.clearContainer();
            this.container.appendChild(this.requests);
        },
        showSingleResource: function(resourceId) {
            this.clearContainer();
            this.container.appendChild(this.singleResource);
            this.singleResource.innerHTML = "<h2>"+DATA_HANDLER.rawData.resources[resourceId].name+"<h2";
            if (resourceId || resourceId == 0) HTTP_HANDLER.fetchSingleResourceData(resourceId);
        },
        showResources: function() {
            this.clearContainer();
            this.container.appendChild(this.resources);
        },
        container: document.createElement("div"),
        requests: Object.assign(
            document.createElement("div"),
            {
                innerHTML: "<h2>Requests page</h2>"
            }
        ),
        singleResource: Object.assign(
            document.createElement("div"),
            {
                innerHTML: "<h2>Loading</h2>"
            }
        ),
        resources: Object.assign(
            document.createElement("div"),
            {
                innerHTML: "<h2>Resources page</h2>",
                showCategory: function(categoryId) {
                    let page = DOM_HANDLER.pages.resources;
                    while (page.hasChildNodes()) page.removeChild(page.lastChild);
                    page.appendChild(Object.assign(document.createElement("h2"),{
                        innerHTML: (categoryId != "frontPage" ? "< " : "") + DATA_HANDLER.categories[categoryId].name,
                        className: categoryId != "frontPage" ? "clickable" : "",
                        onclick: function() {
                            let parentId = DATA_HANDLER.categories[categoryId].parentId;
                            if (parentId || parentId == 0) DOM_HANDLER.pages.resources.showCategory(parentId);
                            if (parentId != "frontPage") HTTP_HANDLER.fetchResourcesFromCategory(parentId);
                        }
                    }));

                    let listDom = document.createElement("ul");
                    listDom.classList.add("category-contents");
                    page.appendChild(listDom);

                    Object.entries(DATA_HANDLER.categories[categoryId].children).forEach(([key, value]) => {
                        listDom.appendChild(
                            Object.assign(document.createElement("li"),{
                                innerHTML: "+ " + value + " >",
                                className: "clickable nested-category-name",
                                onclick: function() {
                                    DOM_HANDLER.pages.resources.showCategory(key);
                                    HTTP_HANDLER.fetchResourcesFromCategory(key);
                                }
                            })
                        )
                    });
                },
                displayFetchedResources: function() {
                    let listDom = DOM_HANDLER.pages.resources.getElementsByClassName("category-contents")[0];
                    Object.entries(DATA_HANDLER.rawData.resources).forEach(([key, value]) => {
                        let isDuplicate = false;
                        Object.entries(listDom.getElementsByClassName("resource-name")).forEach((dom) => {
                            if (dom[1].id == ("res-li-"+value.name)){
                                isDuplicate = true;
                                let now = dom[1].getElementsByClassName("now")[0];
                                let total = dom[1].getElementsByClassName("total")[0];
                                now.innerHTML = parseInt(now.innerHTML) + 1;
                                total.innerHTML = parseInt(total.innerHTML) + 1;
                            }
                        });
                        if (!isDuplicate) listDom.appendChild(
                            Object.assign(document.createElement("li"),{
                                innerHTML: value.name + " [<span class=now>1</span>/<span class=total>1</span>]",
                                id: "res-li-"+value.name,
                                className: "clickable available resource-name",
                                onclick: function() {
                                    DOM_HANDLER.pages.showSingleResource(key);
                                    alert("Clicked on item with id " + key);
                                }
                            }));
                    });
                }
            }
        ),
        clearContainer: function() {
            while (this.container.hasChildNodes()){
                this.container.removeChild(this.container.childNodes[0]);
            }
        }
    }
}