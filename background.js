chrome.commands.onCommand.addListener(function(command) {
  if (command === "copy-page-name") {
    chrome.tabs.executeScript({
      code: `
        (function() {
          function injectScript(code) {
            var script = document.createElement('script');
            script.textContent = code;
            (document.head || document.documentElement).appendChild(script);
            script.remove();
          }

          function showTemporaryPopup(message) {
            var popup = document.createElement('div');
            popup.textContent = message;
            popup.style.position = 'fixed';
            popup.style.top = '10px';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
            popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            popup.style.color = 'white';
            popup.style.padding = '10px 20px';
            popup.style.borderRadius = '5px';
            popup.style.zIndex = '10000';
            document.body.appendChild(popup);
            
            setTimeout(function() {
              popup.style.transition = 'opacity 0.5s';
              popup.style.opacity = '0';
              setTimeout(function() {
                document.body.removeChild(popup);
              }, 500);
            }, 1000);
          }

          function copyPageName() {
            if (typeof mx !== 'undefined' && mx.ui && mx.ui.getContentForm) {
              try {
                var path = mx.ui.getContentForm().path;
                var pageName = path.split('/')[1].split('.')[0];
                navigator.clipboard.writeText(pageName).then(function() {
                  console.log("Paginanaam '" + pageName + "' gekopieerd naar klembord");
                  showTemporaryPopup("Paginanaam '" + pageName + "' gekopieerd naar klembord");
                }).catch(function(err) {
                  console.error('Fout bij kopiëren: ', err);
                  showTemporaryPopup('Fout bij kopiëren: ' + err);
                });
              } catch (error) {
                console.error('Fout bij ophalen paginanaam:', error);
                showTemporaryPopup('Fout bij ophalen paginanaam: ' + error);
              }
            } else {
              console.error("mx object niet gevonden");
              showTemporaryPopup("mx object niet gevonden. Is de Mendix app volledig geladen?");
            }
          }

          injectScript(showTemporaryPopup.toString() + ';' + copyPageName.toString() + ';copyPageName();');
        })();
      `
    });
  }
});