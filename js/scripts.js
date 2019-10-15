var pokemonRepository = (
  function(){
    var repository = [];

    //Loads Pokemon Details

  function loadDetails(item){

    const url = item.detailsUrl;


    return $.ajax(url)
    .then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
    })
    .catch(function(error){
      console.log(error);
    })
  }

//Loads API info

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

   function loadList(){
     return $.ajax(apiUrl, {dataType: 'json'})
     .then(function(item){
       $(item.results).each(function(index, item){
         const poke = {
           name: item.name,
           detailsUrl: item.url,
         };
           add(poke);
       });
     }).catch(function(error){
       console.log("Error!")
     });
   }

    // Adds a Pokemon to List

  function add(pokemon) {
    repository.push(pokemon);
  }

    //Gets all Pokemon in the Repository

  function getAll() {
    return repository;
  }

    //Show Pokemon Modal

  function showModal(pokemon){
      const $modalContainer = $('#modal-container').addClass('visible');
      const modalCloseButton = $('#modal-close-btn').on('click', hideModal);
      const modalTitle = $('#modal-title').text(pokemon.name);
      const modalImage = $('#modal-image');
      const modalHeight = $('#modal-height');

  //Shows Pokemon details

  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){
      modalHeight.text('height: ' + pokemon.height);
      modalImage.prop('src', pokemon.imageUrl).attr('alt', pokemon.name);
    });
  }

  showDetails();

    //Hide Pokemon Modal

  function hideModal(){
    $modalContainer.removeClass('visible');
  }

  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass('visible'))
      hideModal();
  })

    $modalContainer.on('click', (e) => {
      var target = e.target;
      if (target === $modalContainer){
        hideModal();
      }
    });
  }

    //Adds the button for each new Pokemon

    function addListItem(pokemon){
      let $ul = document.querySelector('list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');

      button.innerText = pokemon.name;
      button.classList.add('btn');

      listItem.appendChild(button);
      document.getElementById('list').appendChild(listItem);

      button.addEventListener('click', function(e){
        showModal(pokemon);
      });
    }

    //Return

    return {
      add: add,
      getAll: getAll,
      addListItem : addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    }
  }
)();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
