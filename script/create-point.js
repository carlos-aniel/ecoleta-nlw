//Utilizando a Api do IBGE e mudando com DOM a opções de estado 
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option`;
      }
    });
}
//Chamando os estados com a Api do IBGE
populateUFs();

//Utilizando a Api do IBGE e mudando com DOM a opções de Cidades
function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState];

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option`;
      }
      citySelect.disabled = false
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
