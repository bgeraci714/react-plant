exports.plant = (state, action) => {
  switch(action.type) {
    case 'ADD_PLANT':
      return {
        name: action.name,
        description: action.description
      }
    default:
      return state;
  }
};

const plant = exports.plant;

exports.plants = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_PLANT':
      return {
        nameField:'',
        descField:'',
        plantDB: [...state.plantDB, plant(undefined, action)]
      };
    default:
      return state;
  }
};
