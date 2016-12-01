exports.deletePlant = (plantId) => {
  return {
    type:'DELETE_PLANT',
    id: plantId
  }
}

exports.incorporateDB = (plantDBData) => {
  return {
    type: 'INCORPORATE_DB_PLANTS',
    plants: plantDBData
  }
}

exports.replacePlant = (currentId, plantFromDB) => {
  return {
    type:'REPLACE_PLANT_WITH_DB',
    lastAdded: currentId,
    plant: plantFromDB
  }
}

exports.addPlant = (currentId, nameField, descField) => {
  return {
    type: 'ADD_PLANT',
    lastAdded: currentId,
    name: nameField,
    description: descField
  }
}
