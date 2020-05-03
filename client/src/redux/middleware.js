const consoleMessages = (store) => (next) => (action) => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log("State before:", store.getState());
  result = next(action);

  console.log("Current state", store.getState());

  console.groupEnd();

  return result;
};

export default consoleMessages;
