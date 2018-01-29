// eslint-disable-next-line no-unused-vars
const store = (function(){

  const bookmarks = [];
  let adding = false;
  let editing = null;
  let minimumRating = null;
  let lastClickedBookmark = null;

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

  const updateBookmark = function(id, updateData) {
    const bookmark = this.findBookmarkById(id);
    Object.assign(bookmark, updateData);
  };

  return {
    bookmarks,
    adding,
    editing,
    minimumRating,
    lastClickedBookmark,
    
    addBookmark,
    findBookmarkById,
    toggleBookmarkExpand,
    updateBookmark,
  };
}());
