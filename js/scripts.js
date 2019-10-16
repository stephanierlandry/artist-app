var pokemonRepository = (
  function(){
    let repository = [];

    const APIURL = 'https://pokeapi.co/api/v2/pokemon/';
    //Loads Pokemon Details

    function loadDetails(item){

    }

    loadDetails();
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
          })
        })
      )
    }

    // add the pokemon

    function add(pokemon) {
      repository.push(pokemon);
    }

    // get all the pokemon

    function getAll() {
      return repository;
    }

    //Show Pokemon modal

    const $modalContainer = $('#modal-container');
    const modalCloseButton = $('#modal-close-btn').on('click', function(){
      hideModal();
    });
    const modalTitle = $('#modal-title');
    const modalImage = $('#modal-image');
    const modalHeight = $('#modal-height');

    function showModal(pokemon){
      $(modalTitle).text(pokemon.name);
      $($modalContainer).toggleClass('visible');

    }

    //Hide modal
    function hideModal(){
      $($modalContainer).removeClass('visible');
    }

    $(window).on('keydown', (e) => {
      if (e.key === 'Escape' && $modalContainer.hasClass('visible'))
        hideModal();
    });

    $($modalContainer).on('click', (e) => {
      var target = e.target;
      if (target === $modalContainer){
        hideModal();
      }
    });

    //Adds the button for each new pokemon

    const $ul = $('#list');

    function addListItem(pokemon){
      const button =  document.createElement('button');

      $(button).text(pokemon.name).addClass('btn').on('click', function(e){
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
    pokemonRepository.addListItem(pokemon);
  });
});
