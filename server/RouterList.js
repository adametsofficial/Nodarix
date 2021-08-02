class Router extends Core.RouterFactory {
    constructor(params) {
        super(params);
    }

    async errorHandler(req, res) {
        res.templates.changeLoadStackState({ errorCode: res.statusCode })
        res.end(await res.templates.render("/404.ejs"))
    }

    declare() {
        this.register("GET", "/", (req, res) => {
            res.end(`
                <h1>News</h1>
                <a href="/news">news</a>
            `);

        })
        this.register("GET", "/build", require("./Routing/api/news/GetAll"));
        this.register("GET", "/news", (req, res) => {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(
                '<form action="/" enctype="multipart/form-data" method="post">'+
                '<input type="text" name="title"><br>'+
                '<input type="file" name="upload" multiple="multiple"><br>'+
                '<input type="submit" value="Upload">'+
                '</form>'
            );

            /*req.params => /news/:detail -> detail as key*/
            /*req.query => query string as object*/
        })
    }
}

class RouterApi extends Core.RouterFactory {
    constructor(params) {
        super(params);
    }

    declare() {
        this.register("GET", "/news", (req, res) => {
            res.end(JSON.stringify({title: "lorem ipsum"}, null, 2))
        })
    }
}

module.exports = [
    new RouterApi({
        subdomain: "api"
    }),
    new Router()
];