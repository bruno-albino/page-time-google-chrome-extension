// let changeColor = document.getElementById('changeColor');
let page = document.getElementById('main-div')

chrome.storage.sync.get(['sites'], data => {
  
  for(site of data.sites) {
    const siteURLDiv = document.createElement('div')
    const timerDiv = document.createElement('div')

    const h3 = document.createElement('h3')
    h3.innerHTML = site.URL
    h3.style.paddingLeft = '5px'

    const timer = document.createElement('h3')
    timer.innerHTML = site.timer >= 60 ? `${Math.floor(site.timer / 60)} minutos` : `${site.timer} segundos`

    // div.appendChild(h3)
    // div.appendChild(timer)
    // div.appendChild(div2)
    siteURLDiv.appendChild(h3)
    timerDiv.appendChild(timer)
    page.appendChild(siteURLDiv)
    page.appendChild(timerDiv)
  }

});

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };