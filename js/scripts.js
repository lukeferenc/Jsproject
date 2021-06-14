
// IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// push

  function add(pokemon) {
    if (
      typeof pokemon === 'object')
      // "detailsUrl" in pokemon 
     {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

// return

  function getAll() {
    return pokemonList;
  }

// list & items

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('list-group-item','list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn','btn-block');
    button.setAttribute('data-target','#pokemonModal','data-toggle','modal');
    pokemonList.appendChild(listPokemon);
    listPokemon.appendChild(button);
    button.addEventListener('click', function(){
      showDetails(pokemon);
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
        detailsUrl: item.url,
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  });
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
      pokemonRepository.loadDetails(pokemon).then(function () {

    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let pokemonTypes = document.createElement('ul');
    let types = 'Type: ';
    pokemon.types.forEach(function (item) {
    types += '<li>' + item.type.name + '</li>';
    });
    pokemonTypes.innerHTML = types;

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
      
      
    $('#pokemonModal').modal('toggle');
  });
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


