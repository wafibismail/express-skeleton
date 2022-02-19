const DATA_HANDLER = {
    init: function() {
        this.paginateCategories();
        DOM_HANDLER.pages.resources.showCategory("frontPage");
    },
    paginateCategories: function() {
        Object.entries(this.rawData.categories).forEach(([key, value]) => {
            if (!this.categories[key]) this.categories[key] = {children:{}};
            this.categories[key]["name"] = value.name;
            this.categories[key]["parentId"] = value.parentId;

            if (value.parentId || value.parentId == 0){
                if (!this.categories[value.parentId]) {
                    this.categories[value.parentId] = {
                        name: null,
                        parentId: null,
                        children: {}
                    };
                }
                this.categories[value.parentId]["children"][key] = value.name;
            }
            else {
                this.categories.frontPage.children[key] = value.name;
                this.categories[key].parentId = "frontPage";
            }
        });
    },
    rawData: {
        categories: null,
        resources: null,
        resource: {
            bookRequests: null
        }
    },
    categories: {
        frontPage: {
            name:"Resources",
            parentId: null,
            children: {}
        }
    }
}