/* global app, store, api */
'use strict';

$(() => {
  app.bindEventListeners();
  api.getBookmarks(res => {
    res.forEach(b => store.addBookmark(b));
    app.render();
  });
});
