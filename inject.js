(function () {
  function showTemporaryPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.top = "10px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "10000";
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.style.transition = "opacity 0.5s";
      popup.style.opacity = "0";
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 1000);
  }

  function copyPageName() {
    try {
      if (typeof mx !== "undefined" && mx.ui && mx.ui.getContentForm) {
        const path = mx.ui.getContentForm().path;
        const pageName = path.split("/")[1].split(".")[0];
        navigator.clipboard
          .writeText(pageName)
          .then(() => {
            console.log("Paginanaam gekopieerd:", pageName);
            showTemporaryPopup(
              "Paginanaam '" + pageName + "' gekopieerd naar klembord"
            );
          })
          .catch((err) => {
            console.error("Fout bij kopiëren:", err);
            showTemporaryPopup("Fout bij kopiëren: " + err);
          });
      } else {
        console.error("mx object niet gevonden");
        showTemporaryPopup(
          "mx object niet gevonden. Is de Mendix app volledig geladen?"
        );
      }
    } catch (error) {
      console.error("Fout bij ophalen paginanaam:", error);
      showTemporaryPopup("Fout bij ophalen paginanaam: " + error);
    }
  }

  copyPageName();
})();
