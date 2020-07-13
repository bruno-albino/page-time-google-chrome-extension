chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

    chrome.storage.sync.get(['sites'], result => { 

      for(let site of result.sites) {

        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: site
            },
          })
          ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      }

    })


  });
});