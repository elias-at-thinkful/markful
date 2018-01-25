const store = (function(){

  const bookmarks = [
    {
      title: 'Something',
      url: 'http://example.com',
      rating: 4,
      desc: 'Lorem ipsum etc',
      id: 1,
      expanded: false,
    },
    {
      title: 'Article on Cats',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium omnis reprehenderit beatae soluta sapiente optio repellat nulla ipsam, architecto harum in consectetur suscipit unde delectus atque. Ex a soluta eveniet?',
      url: 'http://google.com',
      rating: 3,
      id: 2,
      expanded: true,
    },
    {
      title: "Naughty Bookmark I shouldn't bookmark",
      url: 'http://bookmark.com',
      rating: 5,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium omnis reprehenderit beatae soluta sapiente optio repellat nulla ipsam, architecto harum in consectetur suscipit unde delectus atque. Ex a soluta eveniet?',
      id: 3,
      expanded: false,
    },
  ];

  const findBookmarkById = function(id) {
    return this.bookmarks.find(b => b.id === id);
  };

  const toggleBookmarkExpand = function(id) {
    const bookmark = this.findBookmarkById(id);
    bookmark.expanded = !bookmark.expanded;
  };

  return {
    bookmarks,
    findBookmarkById,
    toggleBookmarkExpand,
  };
}());
