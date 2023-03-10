document.addEventListener('DOMContentLoaded', function () {
   // Code qui sera exécuté lorsque le DOM sera chargé

   // Récupération de l'URL de la page actuelle
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = tabs[0].url;

      // jump in (StreetView, Maps, Asset viewer) --> Jakartowns
      // Extraction de la latitude et de la longitude de l'URL
      const google_localization_encoded_regex = /@([-0-9.]+),([-0-9.]+)/;
      const bing_localization_encoded_regex = /cp=([-0-9.]+)%7E([-0-9.]+)/;
      const xyz_tiles_regex = /#[-0-9.]+\/([-0-9.]+)\/([-0-9.]+)/;

      let jump_in_match = url.match(new RegExp(google_localization_encoded_regex.source))
      jump_in_match = jump_in_match || url.match(new RegExp(bing_localization_encoded_regex.source))
      jump_in_match = jump_in_match || url.match(new RegExp(xyz_tiles_regex.source))
      if (jump_in_match) {
         var latitude = jump_in_match[1];
         var longitude = jump_in_match[2];

         // Aller sur Jakartowns avec les coordonnées récupérées
         var newUrl = `https://maps.jakarto.com?lat=${latitude}&lng=${longitude}`;

         // Ouverture de la nouvelle URL dans un nouvel onglet
         chrome.tabs.create({ url: newUrl });
         return
      }

      // jump out (Jakartowns) --> StreetView
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