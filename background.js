chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ sites: [] })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    var rule2 = {
      conditions: [ new chrome.declarativeContent.PageStateMatcher() ],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    };

    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});

chrome.tabs.onSelectionChanged.addListener(tabId => {
  chrome.tabs.get(tabId, tab => {
    // const activeURL = tab.url.split('www.')[1] ? tab.url.split('www.')[1] : tab.url.split('/')[0] ? tab.url.split('/')[0] : tab.url
    const activeURL = tab.url

    chrome.storage.sync.get(['sites'], result => {

      // const site = result.sites.find(site => site.URL.includes(activeURL) || activeURL.includes(site.URL))
      const site = result.sites.find(site => activeURL.includes(site.URL))

      if(!site) return
      
      const intervalID = setInterval(() => {

        chrome.tabs.query({ active: true }, tabs => {
          if(tabs[0].id !== tabId) {
            clearInterval(intervalID)
          }
        })
        
        site.timer = site.timer + 1

        chrome.storage.sync.set({ sites: [...result.sites.filter(child => child.URL !== site.URL), site]})

      }, 1000);
    })
  })

})