
// IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

// push

  function add(pokemon) {
    if (
      typeof pokemon === "object")
      // "detailsUrl" in pokemon 
     {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

// return

  function getAll() {
    return pokemonList;
  }

// list & items

  function addListItem(pokemon) {
    let ul = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    ul.appendChild(listItem);
    button.addEventListener("click", function(){
      showDetails(pokemon)
    });
  }

// API list

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;

let indexes = getAllindexes(pokemonList);

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url,
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

// Details

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    item.weight = details.weight;
    item.abilities = details.abilities;
  }).catch(function (e) {
    console.error(e);
  });
}


  // showDetails

function showDetails(pokemon) {
      pokemonRepo.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
      });
    }

    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
    
      modalContainer.innerHTML = '';
        
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerHTML = `<img width="30px" height="30px" src="img/close-icon.png">` ;
      closeButtonElement.addEventListener('click', hideModal);

      let nameElement = document.createElement('h2');
        nameElement.innerText = pokemon.name;

      let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.classList.add('pokemon-image');

      let heightElement = document.createElement('p');
        heightElement.innerText = 'Height ' + pokemon.height;
      
      let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight ' + pokemon.weight;

      let typesDiv = document.createElement('div');
        typesDiv.classList.add('type-wrapper');
      
        pokemon.types.forEach((type) => {
        let typesElement = document.createElement('div');
        let typesText = document.createElement('p');
        typesText.innerText = type.type.name;

        typesElement.classList.add('type');
        typesElement.classList.add(type.type.name);
        typesElement.appendChild(typesText);
        typesDiv.appendChild(typesElement);
      });

      modal.appendChild(closeButtonElement);
      modal.appendChild(imageElement);
      modal.appendChild(nameElement);
      modal.appendChild(typesDiv); 
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');

  }

  function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
});


  // return

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon, index) {
    pokemonRepository.addListItem(pokemon);
  })
});

  
