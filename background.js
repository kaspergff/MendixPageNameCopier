chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-page-name") {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const script = document.createElement("script");
          script.src = chrome.runtime.getURL("inject.js");
          script.onload = () => script.remove();
          (document.head || document.documentElement).appendChild(script);
        },
      });
    }
  }
});
