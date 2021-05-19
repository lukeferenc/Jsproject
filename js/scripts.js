let pokemonRepository = (function () {
  let Repository = [
    {number: 19, name: 'Rattata', color: 'purple', height: 0.3, typing: ["normal"] },
    {number: 112, name: 'Rhydon', color: 'grey', height: 1.9, typing: ["rock","ground"] },
    {number: 131, name: 'Lapras', color: 'blue', height: 2.5, typing: ["water","ice"] },
    {number: 149, name: 'Dragonite', color: 'Orange', height: 2.2, typing: ["dragon","flying"] },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      Repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  function getAll() {
    return Repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    input.addEventListener('click', function () {
    }
    button.innerText = pokemon.name;
    button.classList.add("button-class"); 
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
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

console.log(pokemonRepository.getAll());
pokemonRepository.add({name: "Pikachu", height: 0.3, types: ["electic"] });

console.log(pokemonRepository.getAll());
  
  pokemonRepository.getAll().forEach(function(pokemon) {
    
    pokemonRepository.addListItem(pokemon)
  });
  
  
  let ul = document.querySelector(".pokemon-list")
