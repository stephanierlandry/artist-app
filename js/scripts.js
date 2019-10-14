var pokemonRepository = (
  function(){
    var repository = [];

// //Loads Pokemon Details
// function loadDetails(item){
//
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

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function loadList(){
    $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON){
      return responseJSON;
    }).then(function(json){
      $(json.results).each(function(name,value){
        const pokemon = {
          name: value.name,
          detailsUrl: value.url,
        };
          add(pokemon);
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
    console.log('hit');
    return repository;
  }

  getAll();

  function showModal(){}




  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
  }
  }
)();
