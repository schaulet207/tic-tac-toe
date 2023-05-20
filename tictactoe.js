// Fix issue with notification bell on hover
function toggleImage() {
    var button = document.getElementById("notification");
    var image = button.querySelector("img");
  
    if (image) {
      var currentSrc = image.src;
      var newSrc = "";
  
      if (currentSrc.endsWith("Notifications.svg")) {
        newSrc = currentSrc.replace("Notifications.svg", "Notifications2.svg");
      } else if (currentSrc.endsWith("Notifications2.svg")) {
        newSrc = currentSrc.replace("Notifications2.svg", "Notifications.svg");
      }
  
      if (newSrc) {
        image.src = newSrc;
      }
    }
  }
  