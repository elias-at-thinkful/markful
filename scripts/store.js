const store = (function(){

  const bookmarks = [
  ];

  let adding = false;
  let minimumRating = null;

  const _jsonToStore = function(bookmark) {
    return Object.assign(bookmark, { expanded: false });
  };

  const addBookmark = function(bookmarkJson) {
    const bookmark = _jsonToStore(bookmarkJson);
    this.bookmarks.push(bookmark);
  };

  const findBookmarkById = function(id) {
    return this.bookmarks.find(b => b.id === id);
  };

  const toggleBookmarkExpand = function(id) {
    const bookmark = this.findBookmarkById(id);
    bookmark.expanded = !bookmark.expanded;
  };

  return {
    bookmarks,
    adding,
    minimumRating,

    addBookmark,
    findBookmarkById,
    toggleBookmarkExpand,
  };
}());
