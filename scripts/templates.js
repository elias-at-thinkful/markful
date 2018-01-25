const templates = (function () {

  const _generateRating = function (num) {
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

  const bookmark = function ({ id, expanded, title, url, desc, rating }) {
    const article = expanded ? `
      <p class="description">
        ${desc}
        <span class="site-link"><a href="${url}">Visit Site</a></span>
      </p>
    ` : '';

    return `
      <li class="bookmark-item" data-id="${id}">
        <a class="bookmark-header-link" href="#">
          <header class="${expanded ? 'expanded' : ''}">
            <span class="header-text">${title}</span>
          </header>
        </a>
        <article>
          ${article}
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
