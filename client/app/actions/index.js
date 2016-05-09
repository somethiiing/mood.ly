module.exports = {

  // ACTION CREATORS
  addLike: (item) => (
    {
      type: ADD_LIKE, item,
    }
  ),

  setVisibilityFilter: (filter) => (
    {
      type: SET_VISIBILITY_FILTER, filter,
    }
  ),
};
