import utils from "./utils";
import store from "./redux/store";

const act_on_url_change = (urlSearch) => {
  var query = utils.parseURL(location.search);
  var current_state = store.getState();

  // if visiting a new path
  if (query.dir != current_state.query.current_path) {
    store.dispatch(set_query(query.dir, 1, ""));
  }

  // if changing page only
  else if (query.page != current_state.query.current_page) {
    store.dispatch(set_current_page(query.page));
  }

  // if changing keyword only
  else if (query.keyword != current_state.query.keyword) {
    store.dispatch(set_keyword(query.keyword));
  }
};

export default act_on_url_change;
