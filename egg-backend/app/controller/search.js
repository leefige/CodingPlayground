// app/controller/search.js
module.exports = app => {
    class SearchController extends app.Controller {
        async search() {
            this.ctx.body = `search: ${this.ctx.query.name}`;
        }
    }
    return SearchController;
};


