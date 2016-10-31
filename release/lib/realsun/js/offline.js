 
 var onloadFn = function() {
     colors = {
       progress: "#FFA",
       done: "#AFA",
       error: "#FAA",
       other: "#AAA"
     }
     var displayUpdate = function(message, color) {
           document.getElementById("cache_status").innerHTML = message;
           document.getElementById("cache_status").style.setProperty('background-color', color);
     }
 if (typeof window.applicationCache !== "undefined") {
   var eventList = {
     "cached" : [ "Done caching...", colors.done ],
     "checking" : [ "Checking cache...", colors.progress ],
     "downloading" : [ "Downloading...", colors.progress ],
     "error" : [ "Error! (Are you already offline?)", colors.error ],
     "noupdate" : [ "Cache is up to date.", colors.done ],
     "obsolete" : [ "Cache is obsolete.", colors.error ],
     "progress" : [ "正在更新程序,需约1分钟,请稍等...", colors.progress ],
     "updateready" : [ "Update ready...", colors.other ]};
 function cachedCallback(e) {
    console.log("Cache event: " + e.type + "(status is " + window.applicationCache.status + ", online is " + navigator.onLine + ")");
   
     if (navigator.onLine) {
         displayUpdate(eventList[e.type][0], eventList[e.type][1]);
        online = navigator.onLine;
	    console.log('Loaded: ' + (online ? 'Online' : 'Offline'));
        }
     else{
         displayUpdate("You're offline!", colors.done);
     }
    if (window.applicationCache.status==1||window.applicationCache.status==4){
        
        if (window.location.pathname=="/")
        {
           // alert("goto app");
            //setTimeout(function() {window.location="app.html";}, 500);
        }
     }

 }
  
 var updateReady = function() {
        // window.applicationCache.swapCache();
         setTimeout(function() {location.reload(true)}, 1000);} 
         window.applicationCache.addEventListener('cached', cachedCallback, false);
         window.applicationCache.addEventListener('checking', cachedCallback, false);
         window.applicationCache.addEventListener('downloading', cachedCallback, false);
         window.applicationCache.addEventListener('error', cachedCallback, false);
         window.applicationCache.addEventListener('noupdate', cachedCallback, false);
         window.applicationCache.addEventListener('obsolete', cachedCallback, false);
         window.applicationCache.addEventListener('progress', cachedCallback, false);
         window.applicationCache.addEventListener('updateready', updateReady, false);}
 else {
  displayUpdate("Sorry, your browser doesn't support offline caching.", colors.error);
  }
 };