const poke_container = document.getElementById('poke-container');
const searchInput = document.getElementById('search-input');
const urlBack = ` https://cdn2.tfx.company/images/clickwallpapers-pokemon-4k-img9.jpg `

const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)



const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}





const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const fullName = `${name} #${id}`;

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;

    pokemonEl.dataset.name = fullName.toLowerCase();

    poke_container.appendChild(pokemonEl);
};



//     const pokemonElements = document.querySelectorAll('.pokemon');
//     pokemonElements.forEach(pokemonEl => {
//       const name = pokemonEl.querySelector('.name').innerText.toLowerCase();
//       const id = pokemonEl.querySelector('.number').innerText.slice(1).toLowerCase();
//       if (name.includes(searchTerm) || id.includes(searchTerm)) {
//         pokemonEl.style.display = 'block';
//       } else {
//         pokemonEl.style.display = 'none';
//       }
//     });
//   };

const filterPokemon = (searchTerm) => {
    const pokemonElements = document.querySelectorAll('.pokemon');
    pokemonElements.forEach(pokemonEl => {
        const fullName = pokemonEl.dataset.name;
        if (fullName.includes(searchTerm)) {
            pokemonEl.style.display = 'block';
        } else {
            pokemonEl.style.display = 'none';
        }
    });
};
  
  
  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    filterPokemon(searchTerm);
  });
  


fetchPokemons()
