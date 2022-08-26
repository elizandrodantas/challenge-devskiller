// * TODO: Implement function for updating user's step data in store
// * TODO: Function for getting user's step data may need some adjustments

/**
 * 
 * @typedef {object} iStore
 * @property {number} ts
 * @property {number} cumulativeSteps
 */

/**
 * 
 * @param {[key: string]: iStore} store 
 * @returns {[key: string]: iStore}
 */

module.exports = function stepService(store) {
  const service = {};
  
  service.get = (username) => typeof store[username] === "object" ? store[username] : undefined;

  service.add = (username, ts, newSteps) => {

    if(typeof username !== "string" || typeof ts !== "number" || typeof newSteps !== "number")
      return null;

    let cumulativeSteps = newSteps;


    if(store[username]){
      cumulativeSteps += +store[username]['cumulativeSteps']
    }

    store[username] = { ts, cumulativeSteps };

    return Object.assign({status: true}, { ts, cumulativeSteps });
  };

  return service;
};
