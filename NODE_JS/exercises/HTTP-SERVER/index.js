import { createServer } from "http";
import { friends } from "./data.js";
const PORT = process.env.PORT || 5000;
function validateEndpoint(req, res, endpoint, statusOptions) {
    var _a;
    res.statusCode = statusOptions.success;
    if (!((endpoint === null || endpoint === void 0 ? void 0 : endpoint.length) || ((_a = req.url) === null || _a === void 0 ? void 0 : _a.length)) || !req.url) {
        res.statusCode = statusOptions.failure;
        res.end();
        return false;
    }
    return true;
}
const server = createServer((req, res) => {
    var _a;
    let endpoint = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")) || [""];
    endpoint = endpoint === null || endpoint === void 0 ? void 0 : endpoint.filter((point) => {
        return point.length;
    });
    endpoint = endpoint.length ? endpoint : [""];
    if (req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        const configOptions = { success: 200, failure: 404 };
        if (!validateEndpoint(req, res, endpoint, configOptions))
            return;
        if (endpoint.length === 1 && endpoint[0] === "friends") {
            res.statusCode = 200;
            res.write("<html>");
            res.write("<ul>");
            for (const [index, item] of friends.entries()) {
                res.write("<li>");
                res.write(`<a href='http://127.0.0.1:${PORT}${req.url}${index}'/>${item.name}</a>`);
                res.write("</li>");
            }
            res.write("</ul>");
            res.write(`<a href='http://127.0.0.1:${PORT}/'>go back</a>`);
            res.write("</html>");
            res.end();
        }
        else if (endpoint.length === 1 && endpoint[0] === "") {
            res.statusCode = 200;
            res.write("<html>");
            res.write(`<p>your friend is Isaac Newton. Wanna find out who his friends are? <a href='http://127.0.0.1:${PORT}${req.url}friends/'> find out</a></p>`);
            res.write("</html>");
            res.end();
        }
        else if (endpoint.length === 2 &&
            typeof +endpoint[1] === "number" &&
            !Number.isNaN(+endpoint[1])) {
            const index = +endpoint[1];
            if (index >= friends.length) {
                res.statusCode = 400;
                res.end();
            }
            res.statusCode = 200;
            res.write(`<a href='http://127.0.0.1:${PORT}/friends/'>go back</a>`);
            res.write(`<pre>${JSON.stringify(friends[index])}</pre>`);
            res.end();
        }
        else {
            res.statusCode = 404;
            res.end();
        }
    }
    else if (req.method === "POST") {
        const configOptions = { success: 201, failure: 401 };
        if (!validateEndpoint(req, res, endpoint, configOptions))
            return;
        res.setHeader("Content-Type", "application/json");
        if (endpoint.length === 1 && endpoint[0] === "friends") {
            req.on("data", (chunk) => {
                console.log(`data received: ${chunk.toString}`);
                const friendData = JSON.parse(chunk);
                if (!("name" in friendData)) {
                    res.statusCode = 401;
                }
                else {
                    friendData.id = friends.length + 1;
                    friends.push(friendData);
                }
            });
            req.pipe(res);
        }
    }
});
server.listen(PORT, () => {
    console.log(`server is active an listening on port ${PORT}`);
});
