const els = store.bookmarks.map(b => templates.bookmark(b));
$('.bookmarks').html(els);
