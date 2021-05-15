const SetUuidHook = exports = module.exports = {};
const { v4: uuidV4 } = require('uuid');

SetUuidHook.createUuid = async (modelInstance) => {
  modelInstance.id = uuidV4();
};
