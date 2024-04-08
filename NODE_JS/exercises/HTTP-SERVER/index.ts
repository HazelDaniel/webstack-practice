///<reference path="data.ts"/>
const {createServer} = require("http")!;
const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {
  let endpoint: string[] = req.url?.split("/") || [""];

  endpoint = endpoint?.filter((point) => {
    return point.length;
  });
  endpoint = endpoint.length ? endpoint : [""];

  if (!(endpoint?.length || req.url?.length) || !req.url) {
    res.statusCode = 404;
    res.end();
    return;
  }

  if (endpoint.length === 1 && endpoint[0] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<ul>");

    for (const [index, item] of HttpServerData.friends.entries()) {
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
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      `<p>your friend is Isaac Newton. Wanna find out who his friends are? <a href='http://127.0.0.1:${PORT}${req.url}friends/'> find out</a></p>`
    );
    res.write("</html>");
    res.end();
  }

  else if (endpoint.length === 2 && typeof +endpoint[1] === 'number' && !Number.isNaN(+endpoint[1])) {
    const index = +endpoint[1];
    if (index >= HttpServerData.friends.length) {
      res.statusCode = 400;
      res.end();
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`<a href='http://127.0.0.1:${PORT}/friends/'>go back</a>`);
    res.write(`<pre>${JSON.stringify(HttpServerData.friends[index])}</pre>`);
  }

  else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server is active an listening on port ${PORT}`);
});
