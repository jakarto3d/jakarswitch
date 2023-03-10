document.addEventListener('DOMContentLoaded', function () {
   // Code qui sera exécuté lorsque le DOM sera chargé

   // Récupération de l'URL de la page actuelle
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = tabs[0].url;

      // Extraction de la latitude et de la longitude de l'URL
      var google_localization_encoded_match = url.match(/@([-0-9.]+),([-0-9.]+)/);
      if (google_localization_encoded_match) {
         var latitude = google_localization_encoded_match[1];
         var longitude = google_localization_encoded_match[2];

         // Aller sur Jakartowns avec les coordonnées récupérées
         var newUrl = `https://maps.jakarto.com?lat=${latitude}&lng=${longitude}`;

         // Ouverture de la nouvelle URL dans un nouvel onglet
         chrome.tabs.create({ url: newUrl });
         return
      }

      var jktowns_localization_encoded_match = url.match(/^https:\/\/maps\.jakarto\.com\/\?.*?(?:lat|latitude)=([-0-9.]+).*?(?:lng|long|longitude)=([-0-9.]+)/i);
      if (jktowns_localization_encoded_match) {
         var latitude = jktowns_localization_encoded_match[1];
         var longitude = jktowns_localization_encoded_match[2];

         // Aller sur Jakartowns avec les coordonnées récupérées
         var newUrl = `http://maps.google.com/?cbll=${latitude},${longitude}&layer=c`;

         // Ouverture de la nouvelle URL dans un nouvel onglet
         chrome.tabs.create({ url: newUrl });
         return
      }

   });
});