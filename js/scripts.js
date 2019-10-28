var pokemonRepository = (
  function(){
    let repository = [];

    const APIURL = 'https://pokeapi.co/api/v2/pokemon/';

    //Loads Pokemon Details

    function loadDetails(pokemon){
      //pokemon is defined in showModal method
      const url = pokemon.detailsUrl;

      return $.get(url).then(function(response){
        //response returns all of the details from the API
        return response;
      }).then(function(details){
        //pokemon defined in loadDetails argument
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height
      }).catch(function(error){
        console.log(error);
      })
    }

    //Loading & Adding from API

    function loadList(){
      return (
        $.get(APIURL).then(function(response){
          return response.results;
        }).then(function(json) {
          $.each(json, function(ii, item){
            const pokemon = {
              name: item.name,
              detailsUrl:  item.url
            };
            add(pokemon);
          });
        }).catch(function(error){
          console.log(error);
        })
      )
    }

    // Add the Pokemon

    function add(pokemon) {
      repository.push(pokemon);
    }

    // Get all the Pokemon

    function getAll() {
      return repository;
    }

    //Show Pokemon modal

    const modalCenter = $('#ModalCenter');
    const $modalContainer = $('#modal-container');
    const modalTitle = $('#modal-title');
    const modalImage = $('#modal-image');
    const modalHeight = $('#modal-height');

    function showModal(pokemon){
      //pokemon defined in addListItem method
      $(modalCenter).modal();

  // Show Details of Pokemon

      function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function(){
          $(modalTitle).text(pokemon.name);
          $(modalHeight).text('height ' + pokemon.height);
          $(modalImage).attr('src', pokemon.imageUrl ).prop('alt', 'This is an image of' + pokemon.name);
        })
      }
      showDetails(pokemon);
    }

    //Adds the button for each new pokemon

    const $ul = $('#list');

    function addListItem(pokemon){
      //pokemon is defined in getAll method after loadList is called
      const button = $('<button class="button list-group-item" data-toggle="modal" data-target="#ModalCenter">' + pokemon.name + '</button>');

      $(button).on('click', function(e){
        showModal(pokemon);
      })

      $($ul).append('<li>').append(button);
    }

    return {
      add,
      getAll,
      addListItem,
      loadList,
      loadDetails
    }
  }
)();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    // pokemon is defined by being inside the repository
    // that is populated by the loadList method
    pokemonRepository.addListItem(pokemon);
  });
});
