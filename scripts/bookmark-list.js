/* global store, templates */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){
  const handleClickBookmark = function(e) {
    const id = $(e.target).closest('li').data('id');
    store.toggleBookmarkExpand(id);
    render();
  };

  const render = function() {
    const els = store.bookmarks.map(b => templates.bookmark(b));
    $('.bookmarks').html(els);
  };

  const bindEventListeners = function() {
    $('.bookmarks').on('click', '.bookmark-item header', handleClickBookmark);
  };

  return {
    render,
    bindEventListeners,
  };
}());
