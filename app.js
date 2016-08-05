// get a reference to the install button
var button = document.getElementById('install')
var clear = document.getElementById('clear');

clear.addEventListener('click',function(){
  document.getElementById('url').value='';
})

// if browser has support for installable apps, run the install code; it not, hide the install button
if('mozApps' in navigator) {
  function install(ev){
    ev.preventDefault();
    
    //if the url not ends with manifest.webapp, add 'manifest.webapp'.
    if(!document.getElementById('url').value.endsWith('manifest.webapp')){
      document.getElementById('url').value+='manifest.webapp';
    }

    //try to install as package, if failed: install as host
    if(!installPackage(ev)){
      installHost(ev);
    }
  }
    function installPackage(ev) {
      ev.preventDefault();
      // install the app
      var installLocFind = navigator.mozApps.installPackage(document.getElementById('url').value);
      installLocFind.onsuccess = function(data) {
        // App is installed, do something if you like
        return true;
      };
      installLocFind.onerror = function() {
        // App wasn't installed, info is in
        // installapp.error.name
        alert("fail to install as package app, now install as host app")
        alert(installLocFind.error.name);
        return false;
      };
    };
    function installHost(ev){
      ev.preventDefault();

      var installLocFind = navigator.mozApps.install(document.getElementById('url').value);
      installLocFind.onsuccess = function(data) {
        // App is installed, do something if you like
      };
      installLocFind.onerror = function() {
        // App wasn't installed, info is in
        // installapp.error.name
        alert("fail to install as host app")
        alert(installLocFind.error.name);
      };
    }

    button.addEventListener('click', install, false);

} else {
  document.getElementById('form').style.display = "none";
  document.getElementById('notice').innerHTML = "Sorry, your browser does not support installable web app. <br> Please switch to firefox OS's browser."
}

//handle activity
navigator.mozSetMessageHandler('activity', function(activityRequest) {
  var option = activityRequest.source;
  
  if (option.name === "share") {
    // Do something to handle the activity
    document.getElementById('url').value = option.data.url;
    
    
  }
});
