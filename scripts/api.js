'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/richie/bookmarks';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const postBookmark = function(data, callback) {
    $.ajax({
      method: 'POST',
      url: BASE_URL,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: callback
    });
  };

  const patchBookmark = function(id, data, callback) {
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/${id}`,
      data: JSON.stringify(data),
      success: callback,
      contentType: 'application/json'
    });
  };

  return {
    getBookmarks,
    postBookmark,
    patchBookmark
  };
})();
