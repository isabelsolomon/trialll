console.log("app.js loaded");
if("serviceWorker"in navigator){
    console.log("service worker supported");
    navigator.serviceWorker.register("./sw.js")
    .then((reg) => {console.log("sw registered",reg);})
    .catch(err=>{ console.log("sw failed",err);});
}else{
console.log("service worker not supported in this browser");
}
