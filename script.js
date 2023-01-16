// Capturando elementos do html
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn_prev')
const buttonNext = document.querySelector('.btn_next')

const hpBase = document.querySelector('.hpbase')
const atkBase = document.querySelector('.atkbase')
const defBase = document.querySelector('.defbase')

const abt1 = document.querySelector('.abt1')

// const abt2 = document.querySelector('.abt2')
//const type1 = document.querySelector('.type1')
// const type2 = document.querySelector('.type2')
//const type = document.querySelector('.type')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIresponse.status === 200) {
    const data = await APIresponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'loading...'
  pokemonNumber.innerHTML = ''
  hpBase.innerHTML = ' loading...'
  atkBase.innerHTML = ' loading...'
  defBase.innerHTML = ' loading...'
  abt1.innerHTML = 'loading...'

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    hpBase.innerHTML = 'HP Base: ' + data['stats']['0']['base_stat']
    atkBase.innerHTML = 'ATK Base: ' + data['stats']['1']['base_stat']
    defBase.innerHTML = 'DEF Base: ' + data['stats']['2']['base_stat']

    abt1.innerHTML = 'Ability 1: ' + data['abilities']['0']['ability']['name']

    // type1.innerHTML = data['types']['0']['type']['name']

    searchPokemon = data.id
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'not found :c'
    pokemonNumber.innerHTML = ''

    hpBase.innerHTML = ' not found !'
    atkBase.innerHTML = ' not found !'
    defBase.innerHTML = ' not found !'

    abt1.innerHTML = 'not found !'
    // abt2.innerHTML = 'not found !'

    // type1.innerHTML = '...'
    // type2.innerHTML = '...'
  }

  input.value = ''
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
