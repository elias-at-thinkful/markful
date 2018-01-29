/* global app, store, api */

$(() => {
  app.bindEventListeners();
  api.getBookmarks(res => {
    res.forEach(b => store.addBookmark(b));
    app.render();
  });
});



