const templates = (function(){
  
  const _generateRating = function(num) {
    const solid = '&#x2605';
    const hollow = '&#x2606';
  
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= num) {
        stars.unshift(solid);
      } else {
        stars.unshift(hollow);
      }
    }
    return stars.map(star => `<span>${star}</span>`).join('');
  };

  const bookmark = function({ id, title, url, desc, rating }) {
    return `
      <li class="bookmark-item" data-id="${id}">
        <header>
          <span class="header-text">${title}</span>
        </header>
        <article>
          <p class="description">
            ${desc}
            <span class="site-link"><a href="${url}">Visit Site</a></span>
          </p>
        </article>
        <div class="rating">
          ${_generateRating(rating)}
        </div>
      </li>
    `;
  };

  return {
    bookmark,
  };
}());
