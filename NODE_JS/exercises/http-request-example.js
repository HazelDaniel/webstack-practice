const http = require("http");

const req = http.request("http://www.google.com",(res)=>{
    res.on("data",(chunk)=>{
        console.log(`Response Data: ${chunk}`);
    });
    res.on("end",()=>{
        console.log("response ended!");
    });
});
req.end();