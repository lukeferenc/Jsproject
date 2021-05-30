
// IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

// push

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon 
    ) {
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

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
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
  }).catch(function (e) {
    console.error(e);
  });
}


  // Display 

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Modal

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    // eslint-disable-next-line no-unused-vars
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $('<p>' + 'height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');
    let typesElement = $('<p>' + 'types : ' + item.types + '</p>');
    let abilitiesElement = $('<p>' + 'abilities : ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

  
  /* let ul = document.querySelector(".pokemon-list") */
