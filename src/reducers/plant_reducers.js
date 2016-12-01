exports.plant = (state, action) => {
  switch(action.type) {
    case 'ADD_PLANT':
      return {
        id: action.lastAdded,
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
    case 'INCORPORATE_DB_PLANTS':
      return {
        ...state,
        plantDB: action.plants
      }
    case 'ADD_PLANT':
      return {
        receivedData: state.receivedData,
        lastAdded: action.lastAdded,
        nameField:'',
        descField:'',
        plantDB: [...state.plantDB, plant(undefined, action)]
      };
    case 'DELETE_PLANT':
      return {
        ...state,
        plantDB: state.plantDB.filter((plant) => {
          return plant.id !== action.id;
        })
      }
    case 'REPLACE_PLANT_WITH_DB':
        let currentId = action.lastAdded;
        let updatedPlantDB = state.plantDB.map((item) => {
          return item.id === currentId ? action.plant : item;
        });
        return {
          ...state,
          plantDB: updatedPlantDB
        }
    default:
      return state;
  }
};
