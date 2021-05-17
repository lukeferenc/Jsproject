let pokemonRepository = (function () {
  let pokemonList = [
    {number: 19, name: 'Rattata', color: 'purple', height: 0.3, typing: ["normal"] },
    {number: 112, name: 'Rhydon', color: 'grey', height: 1.9, typing: ["rock","ground"] },
    {number: 131, name: 'Lapras', color: 'blue', height: 2.5, typing: ["water","ice"] },
    {number: 149, name: 'Dragonite', color: 'Orange', height: 2.2, typing: ["dragon","flying"] },
  ];
  
  pokemonList.forEach(function(pokemon) {
    if (pokemon.height > 2) {
      document.write(pokemon.name + "is a big pokemon <br/>");
    } else if (pokemon.height < 0.5 ) {
      document.write(pokemon.name + "is a tiny pokemon! <br/>");
    } if (pokemon.typing.includes("dragon")) {
      document.write(pokemon.name + "is a dragon <br/>");
    } if (pokemon.typing.includes("flying")) {
      document.write(pokemon.name + "can fly <br/>");
    }
  });
  
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
  getAll: getAll
  };
})();