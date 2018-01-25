const store = (function(){

  const bookmarks = [
    {
      title: 'Something',
      url: 'http://example.com',
      rating: 4,
      desc: 'Lorem ipsum etc',
      id: 1
    },
    {
      title: 'Article on Cats',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium omnis reprehenderit beatae soluta sapiente optio repellat nulla ipsam, architecto harum in consectetur suscipit unde delectus atque. Ex a soluta eveniet?',
      url: 'http://google.com',
      rating: 3,
      id: 2
    }
  ];

  return {
    bookmarks
  };
}());

