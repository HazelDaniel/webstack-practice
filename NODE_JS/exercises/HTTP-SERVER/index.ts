import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { friends } from "./data";
const PORT = process.env.PORT || 5000;

interface ResConfigOption {
  success: number;
  failure: number;
}

function validateEndpoint(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  endpoint: string[],
  statusOptions: ResConfigOption
): Boolean {
  res.statusCode = statusOptions.success;
  if (!(endpoint?.length || req.url?.length) || !req.url) {
    res.statusCode = statusOptions.failure;
    res.end();
    return false;
  }
  return true;
}

const server = createServer((req, res) => {
  let endpoint: string[] = req.url?.split("/") || [""];

  endpoint = endpoint?.filter((point) => {
    return point.length;
  });
  endpoint = endpoint.length ? endpoint : [""];

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    const configOptions: ResConfigOption = { success: 200, failure: 404 };
    if (!validateEndpoint(req, res, endpoint, configOptions)) return;

    if (endpoint.length === 1 && endpoint[0] === "friends") {
      res.statusCode = 200;
      res.write("<html>");
      res.write("<ul>");

      for (const [index, item] of friends.entries()) {
        res.write("<li>");
        res.write(
          `<a href='http://127.0.0.1:${PORT}${req.url}${index}'/>${item.name}</a>`
        );
        res.write("</li>");
      }

      res.write("</ul>");
      res.write(`<a href='http://127.0.0.1:${PORT}/'>go back</a>`);
      res.write("</html>");
      res.end();
    } else if (endpoint.length === 1 && endpoint[0] === "") {
      res.statusCode = 200;
      res.write("<html>");
      res.write(
        `<p>your friend is Isaac Newton. Wanna find out who his friends are? <a href='http://127.0.0.1:${PORT}${req.url}friends/'> find out</a></p>`
      );
      res.write("</html>");
      res.end();
    } else if (
      endpoint.length === 2 &&
      typeof +endpoint[1] === "number" &&
      !Number.isNaN(+endpoint[1])
    ) {
      const index = +endpoint[1];
      if (index >= friends.length) {
        res.statusCode = 400;
        res.end();
      }
      res.statusCode = 200;
      res.write(`<a href='http://127.0.0.1:${PORT}/friends/'>go back</a>`);
      res.write(`<pre>${JSON.stringify(friends[index])}</pre>`);
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if (req.method === "POST") {
    const configOptions: ResConfigOption = { success: 201, failure: 401 };
    if (!validateEndpoint(req, res, endpoint, configOptions)) return;
    res.setHeader("Content-Type", "application/json");

    if (endpoint.length === 1 && endpoint[0] === "friends") {
      req.on("data", (chunk) => {
        console.log(`data received: ${chunk.toString}`);
        const friendData = JSON.parse(chunk);
        if (!("name" in friendData)) {
          res.statusCode = 401;
        } else {
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
