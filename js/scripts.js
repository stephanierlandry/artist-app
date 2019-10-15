var pokemonRepository = (
  function(){
    var repository = [
      {name: 'Steph',  age: 31, type: 'water'},
      {name:'John', age: 36, type: 'fire'},
      {name: 'Barry', age: 57, type: 'earth'},
    ];

// //Loads Pokemon Details
// function loadDetails(item){
//   const url = item.detailsUrl;
//
//   console.log(url);
//
//   $.ajax(url, {dataType: 'json'}).then(function(responseJSON){
//     return responseJSON;
//   }).then(function(details){
//     item.imageUrl = details.sprites.front_default;
//     item.height = details.height;
//   })
// }
//
// loadDetails();

//Loads Data from API

//   const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
//
//   function loadList(){
//     $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON){
//       return responseJSON;
//     }).then(function(json){
//       $(json.results).each(function(name,value){
//         const pokemon = {
//           name: value.name,
//           detailsUrl: value.url,
//         };
//           add(pokemon);
//       });
//     }).catch(function(error){
//       console.log("Error!")
//     });
//   }
//

  // Adds a Pokemon to List

  function add(pokemon) {
    repository.push(pokemon);
  }

  //Gets all Pokemon in the Repository

  function getAll() {
    return repository;
  }

//
//  //Show Pokemon Modal
//
//   function showModal(pokemon){
//
//     const $modalContainer = $('#modal-container').addClass('visible');
//     const modalCloseButton = $('#modal-close-btn').on('click', hideModal);
//     const modalTitle = $('#modal-title').text(pokemon.name);
//     const modalImage = $('#modal-image');
//     const modalHeight = $('#modal-height');
//   }
//

//Adds the button for each new pokemon

function addListItem(pokemon){
  const $ul = $('.pokemon-list');

  $.each(pokemonRepository.getAll(),function(key, value){
    const $listItem = $('<li></li>').appendTo($ul);

    const $button = $('<button>').addClass('btn').text(value.name);

    $($listItem).appendTo($button);

    $($button).on('click', showDetails(value));
  });
}

//Shows Pokemon details
function showDetails(pokemon){
  console.log(pokemon);
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    }
  }
)();

pokemonRepository.addListItem();

// $.each(pokemonRepository.getAll(),function(key, value){
//   document.write('<br> <li class="pokemon-element">' + value.name + '<br>' + value.age + '<br>' + value.type +'</li>');
// });
