import utils from "./utils";
import store from "./redux/store";
import apiWrapper from "./api_action_wrapper";
import * as actions from "./redux/actions";

const act_on_url_change = (urlSearch) => {
  var query = utils.parseURL(urlSearch);
  var current_state = store.getState();

  // if visiting a new path
  if (query.dir != current_state.query.current_path) {
    store.dispatch(actions.set_query(query.dir, 1, ""));
    apiWrapper.initServer().then(apiWrapper.getPageItems);
  }

  // if changing page only
  else if (query.page != current_state.query.current_page) {
    store.dispatch(actions.set_current_page(query.page));
    apiWrapper.getPageItems();
  }

  // if changing keyword only
  else if (query.keyword != current_state.query.keyword) {
    store.dispatch(actions.set_keyword(query.keyword));
    apiWrapper.filterByKeyword().then(apiWrapper.getPageItems);
  }
};

export default act_on_url_change;
