//Os estados
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(res => res.json()) //função anonima que retorna valor
      .then(states => {
          for (const state of states) {
              ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
          }
      })
}

// Carregar estados
populateUFs()

// Carregando cidades
function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Seleciona a cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json()) //função anonima que retorna valor
  .then(cities => {

      for (const city of cities) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false

  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

// input escondido para os itens
const collectedItems = document.querySelector("input[name=items]")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  // Adicionar ou remover uma classe com JavaScript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // Verificar se existem itens selecionados
  // Se sim, Pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex( item => {
      const itemFound = item == itemId // isso será true ou false
      return itemFound
  })

  // Se já estiver selecionado, 
  if(alreadySelected >= 0) {
      //retirar da seleção
      const filteredItems = selectedItems.filter( item => {
          const itemIsDifferente = item != itemId
          return itemIsDifferente
      })

      selectedItems = filteredItems
  } else {
      // Se não, estiver selecionado, 
      //acionar à seleção
      selectedItems.push(itemId)
  }
  // Atualizar o input escondico com os itens selecionados
  collectedItems.value = selectedItems
  
}