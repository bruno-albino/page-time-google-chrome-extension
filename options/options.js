let page = document.getElementById('sitesDiv');
let insertDiv = document.getElementById('insertSiteDiv')

chrome.storage.sync.get('sites', res => {
  if(!res.sites) {
    chrome.storage.sync.set({ sites: [] })
  }
  constructOptions(res.sites)

})

function constructOptions(sites) {
  for (let item of sites) {

    let div = document.createElement('div')
    let input = document.createElement('input')
    let button = document.createElement('button')

    button.innerHTML = 'Remover'
    input.type = 'text'
    input.disabled = true
    input.value = item
    
    div.appendChild(input)
    div.appendChild(button)
    
    button.addEventListener('click', () => removeSite(div, item))
    
    page.appendChild(div);
  }


  let div = document.createElement('div')
  let input = document.createElement('input')
  let AddButton = document.createElement('button')
  input.type = 'text'

  AddButton.innerHTML = 'Adicionar'

  AddButton.addEventListener('click', () => appendSite(input.value))

  div.appendChild(input)
  div.appendChild(AddButton)

  insertDiv.appendChild(div);
}


const removeSite = (div, item) => {

  chrome.storage.sync.get(['sites'], result => {
    const sitesFiltered = result.sites.filter(site => site !== item)

    chrome.storage.sync.set({ sites: sitesFiltered })

  })

  page.removeChild(div)
}

const appendSite = site => {
  if(site === '' || !site) return alert('Insira um site')

  chrome.storage.sync.get(['sites'], result => {

    const newSites = [
      ...result.sites,
      site
    ]

    chrome.storage.sync.set({ sites: newSites })

    let newDiv = document.createElement('div')
    let newInput = document.createElement('input')
    let newButton = document.createElement('button')

    newButton.innerHTML = 'Remover'
    newInput.type = 'text'
    newInput.disabled = true
    newInput.setAttribute('value', site)

    newButton.addEventListener('click', () => removeSite(newDiv))
    
    newDiv.appendChild(newInput)
    newDiv.appendChild(newButton)

    page.appendChild(newDiv)
  })
}