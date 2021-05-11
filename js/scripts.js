
let pokemonList = [
    {number: 19, name: 'Rattata', color: 'purple', height: 0.3, typing: ["normal"] },
    {number: 112, name: 'Rhydon', color: 'grey', height: 1.9, typing: ["rock","ground"] },
    {number: 131, name: 'Lapras', color: 'blue', height: 2.5, typing: ["water","ice"] },
    {number: 149, name: 'Dragonite', color: 'Orange', height: 2.2, typing: ["dragon","flying"] },
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 2) {
    document.write(pokemonList[i].name + " is a big pokemon! <br/>");
  } else if (pokemonList[i].height < 0.5 ) {
    document.write(pokemonList[i].name + "is a tiny pokemon! <br/>");
  } if (pokemonList[i].typing.includes("dragon") ){
    document.write(pokemonList[i].name + " is a dragon! <br/>");
  } if (pokemonList[i].typing.includes("flying") ){
    document.write(pokemonList[i].name + " can fly! <br/>");
  }
}
