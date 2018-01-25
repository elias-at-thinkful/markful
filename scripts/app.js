/* global store, templates */

// eslint-disable-next-line no-unused-vars
const app = (function(){
  const _queryToObject = function(query) {
    const pairs = query.split('&');
    const res = {};
    pairs.forEach(pair => {
      pair = pair.split('=');
      if (pair[0] === 'rating') {
        const val = Number(decodeURIComponent(pair[1]));
        return res[pair[0]] = val;
      }
      res[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return res;
  };

  const handleClickBookmark = function(e) {
    const id = $(e.target).closest('li').data('id');
    store.toggleBookmarkExpand(id);
    render();
  };

  const handleSubmitBookmark = function(e) {
    e.preventDefault();
    const formInputs = $('#add-bookmark-form').serialize();
    const bookmark = _queryToObject(formInputs);
    store.addBookmark(bookmark);
    render();
  };

  const handleClickAddBookmark = function() {
    store.adding = true;
    render();
  };

  const handleCancelAddBookmark = function() {
    store.adding = false;
    render();
  };

  const handleChangeRatingFilter = function() {
    const rating = Number($('#rating-filter').val());
    store.minimumRating = isNaN(rating) ? 1 : rating;
    render();
  };

  const _renderControls = function() {
    let el = templates.defaultControls(store.minimumRating);

    if (store.adding) {
      el = templates.addBookmarkForm();
    }

    $('.bookmark-controls').html(el);
  };

  const _renderBookmarkList = function() {
    let viewBookmarks = store.bookmarks;
    if (store.minimumRating && store.minimumRating > 1) {
      viewBookmarks = viewBookmarks.filter(b => b.rating >= store.minimumRating);
    }

    const els = viewBookmarks.map(b => templates.bookmark(b));
    $('.bookmarks').html(els);
  };

  const render = function() {
    _renderBookmarkList();
    _renderControls();
  };

  const bindEventListeners = function() {
    $('.bookmarks').on('click', '.bookmark-item header', handleClickBookmark);
    $('.bookmark-controls').on('click', '#show-add-form', handleClickAddBookmark);
    $('.bookmark-controls').on('click', '#cancel-add-form', handleCancelAddBookmark);
    $('.bookmark-controls').on('change', '#rating-filter', handleChangeRatingFilter);
    $('.bookmark-controls').on('submit', '#add-bookmark-form', handleSubmitBookmark);
  };

  return {
    render,
    bindEventListeners,
  };
}());