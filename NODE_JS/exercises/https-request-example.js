const {get} = require("https");

get("https://www.google.com",(res)=>{
    let requestCount = 0;
    res.on("data",(chunk)=>{
        console.log(`Data received: ${chunk}`);
        requestCount++;
    });
    res.on("end",()=>{
        console.log(`response ended! returned ${requestCount} times`);
    });
});