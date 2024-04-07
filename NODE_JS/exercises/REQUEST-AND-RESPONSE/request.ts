const http = require("http");

const request = http.request("http://www.google.com", (request: any) => {
  request.on("data", (data: any)=>{
    console.log(`data received ${data}`);
  });

  request.on("end", ()=>{
    console.log("connection closed");
  })
});
request.end();