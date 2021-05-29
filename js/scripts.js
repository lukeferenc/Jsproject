let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  function getAll() {
    return pokemonList;
  }

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

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json){
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
})



  })
}

  function showDetails(pokemon) {
    console.log(pokemon)
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({name: "Pikachu", height: 0.3, types: ["electic"] });


pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
   
});

  
  /* let ul = document.querySelector(".pokemon-list") */
