const pokemonRepository = (function () {
  const repository = [];

  const APIURL = 'https://pokeapi.co/api/v2/pokemon/';

  // Loads Pokemon Details

  function loadDetails(pokemon) {
    // pokemon is defined in showModal method
    const url = pokemon.detailsUrl;

    return $.get(url).then((response) => response).then((details) => {
    // response returns all of the details from the API
    // pokemon defined in loadDetails argument
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
    }).catch((error) => {
      console.error(error);
    });
  }

  // Add the Pokemon

  function add(pokemon) {
    repository.push(pokemon);
  }

  // Loading & Adding from API

  function loadList() {
    return (
      $.get(APIURL).then((response) => response.results).then((json) => {
        $.each(json, (ii, item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch((error) => {
        console.log(error);
      })
    );
  }

  // Get all the Pokemon

  function getAll() {
    return repository;
  }

  // Show Pokemon modal

  const modalCenter = $('#ModalCenter');
  const modalTitle = $('#modal-title');
  const modalImage = $('#modal-image');
  const modalHeight = $('#modal-height');

  function showModal(pokemon) {
    // pokemon defined in addListItem method
    $(modalCenter).modal();

    // Show Details of Pokemon

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(() => {
        $(modalTitle).text(pokemon.name);
        $(modalHeight).text(`height ${pokemon.height}`);
        $(modalImage).attr('src', pokemon.imageUrl).prop('alt', `This is an image of${pokemon.name}`);
      });
    }
    showDetails(pokemon);
  }

  // Adds the button for each new pokemon

  const $ul = $('#list');

  function addListItem(pokemon) {
    // pokemon is defined in getAll method after loadList is called
    const button = $(`<button class="button list-group-item" data-toggle="modal" data-target="#ModalCenter">${pokemon.name}</button>`);

    $(button).on('click', () => {
      showModal(pokemon);
    });

    $($ul).append('<li>').append(button);
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
}());

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    // pokemon is defined by being inside the repository
    // that is populated by the loadList method
    pokemonRepository.addListItem(pokemon);
  });
});
