// get a reference to the install button
var button = document.getElementById('install');
var clear = document.getElementById('clear');

clear.addEventListener('click',function(){
  document.getElementById('url').value='';
})

// if browser has support for installable apps, run the install code; it not, hide the install button
if('mozApps' in navigator) {

    function install(ev) {
      ev.preventDefault();
      // install the app
      var installLocFind = navigator.mozApps.install(document.getElementById('url').value);
      installLocFind.onsuccess = function(data) {
        // App is installed, do something if you like
      };
      installLocFind.onerror = function() {
        // App wasn't installed, info is in
        // installapp.error.name
        alert(installLocFind.error.name);
      };
    };

    button.addEventListener('click', install, false);

} else {
  document.getElementById('form').style.display = "none";
  document.getElementById('notice').innerHTML = "Sorry, your browser does not support installable web app. <br> Please switch to firefox OS's browser."
}
