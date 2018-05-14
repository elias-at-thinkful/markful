/* global store, templates, api */
'use strict';

// eslint-disable-next-line no-unused-vars
const app = (function() {
  const _queryToObject = function(query) {
    const pairs = query.split('&');
    const res = {};
    pairs.forEach(pair => {
      pair = pair.split('=');
      if (pair[0] === 'rating') {
        const val = Number(decodeURIComponent(pair[1]));
        return (res[pair[0]] = val);
      }
      res[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return res;
  };

  const handleClickBookmark = function(e) {
    const id = $(e.target)
      .closest('li')
      .data('id');
    store.toggleBookmarkExpand(id);
    store.lastClickedBookmark = id;
    render();
  };

  const handleSubmitBookmark = function(e) {
    e.preventDefault();
    const id = $(e.target).data('id');
    const formInputs = $('#bookmark-form').serialize();
    const bookmark = _queryToObject(formInputs);

    if (id) {
      api.patchBookmark(id, bookmark, () => {
        store.updateBookmark(id, bookmark);
        store.editing = null;
        render();
      });
    } else {
      api.postBookmark(bookmark, res => {
        store.addBookmark(res);
        render();
      });
    }
  };

  const handleClickAddBookmark = function() {
    store.adding = true;
    render();
  };

  const handleCancelAddBookmark = function() {
    store.adding = false;
    store.editing = null;
    render();
  };

  const handleClickEditBookmark = function(e) {
    store.editing = $(e.target)
      .closest('li')
      .data('id');
    render();
  };

  const handleChangeRatingFilter = function() {
    const rating = Number($('#rating-filter').val());
    store.minimumRating = isNaN(rating) ? 1 : rating;
    render();
  };

  const handleSetRating = function(e) {
    const id = $(e.target)
      .closest('li')
      .data('id');
    const rating = $(e.target).data('rating');
    api.patchBookmark(id, { rating }, () => {
      store.updateBookmark(id, { rating });
      render();
    });
  };

  const handleAllExceptBookmarkClick = function(e) {
    if (
      !$(e.target).closest('li.bookmark-item')[0] ||
      $(e.target).hasClass('edit-item')
    ) {
      store.lastClickedBookmark = null;
    }
  };

  const _renderControls = function() {
    let el = templates.defaultControls(store.minimumRating);

    if (store.adding) {
      el = templates.bookmarkForm();
    }

    if (store.editing) {
      const bookmark = store.findBookmarkById(store.editing);
      el = templates.bookmarkForm(bookmark);
    }

    $('.bookmark-controls').html(el);
  };

  const _renderBookmarkList = function() {
    let viewBookmarks = store.bookmarks;
    if (store.minimumRating && store.minimumRating > 1) {
      viewBookmarks = viewBookmarks.filter(
        b => b.rating >= store.minimumRating
      );
    }

    const els = viewBookmarks.map(b => templates.bookmark(b));
    $('.bookmarks').html(els);

    setTimeout(() => {
      if (store.lastClickedBookmark) {
        const el = $(`.bookmark-item#bookmark-${store.lastClickedBookmark}`);
        el[0].scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }, 1);
  };

  const render = function() {
    _renderControls();
    _renderBookmarkList();
  };

  const bindEventListeners = function() {
    $('.bookmarks').on('click', '.bookmark-item header', handleClickBookmark);
    $('.bookmark-controls').on(
      'click',
      '#show-add-form',
      handleClickAddBookmark
    );
    $('.bookmark-controls').on(
      'click',
      '#cancel-bookmark-form',
      handleCancelAddBookmark
    );
    $('.bookmark-controls').on(
      'change',
      '#rating-filter',
      handleChangeRatingFilter
    );
    $('.bookmark-controls').on(
      'submit',
      '#bookmark-form',
      handleSubmitBookmark
    );
    $('.bookmarks').on('click', '.star-rating', handleSetRating);
    $('.bookmark-controls, .bookmarks-list').on(
      'click submit',
      handleAllExceptBookmarkClick
    );
    $('.bookmarks').on('click', '.edit-item', handleClickEditBookmark);
  };

  return {
    render,
    bindEventListeners
  };
})();
