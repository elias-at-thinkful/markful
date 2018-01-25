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

  const addBookmarkForm = function() {
    return `
      <form id="add-bookmark-form">
        <div class="form-group">
          <label for="input-title">Title</label>
          <input type="text" name="title" id="input-title" />
        </div>
        <div class="form-group">
          <label for="input-url">URL</label>
          <input type="text" name="url" id="input-url" />
        </div>
        <div class="form-group">
          <label for="input-description">Description</label>
          <input type="text" name="description" id="input-description" />
        </div>
        <div class="form-group">
          <h3>Rating</h3>
          <input type="radio" id="rating-5" name="rating" value="5" checked="checked" /> <label for="rating-5">5</label>
          <input type="radio" id="rating-4" name="rating" value="4" /> <label for="rating-4">4</label>
          <input type="radio" id="rating-3" name="rating" value="3" /> <label for="rating-3">3</label>
          <input type="radio" id="rating-2" name="rating" value="2" /> <label for="rating-2">2</label>
          <input type="radio" id="rating-1" name="rating" value="1" /> <label for="rating-1">1</label>
        </div>
        <div class="form-group">
          <button type="submit">Save</button>
          <button id="cancel-add-form" type="button">Cancel</button>
        </div>
      </form>
    `;
  };

  const defaultControls = function(minimumRating) {
    return `
      <section class="default-controls">
        <div class="control">
          <button id="show-add-form">Add Bookmark</button>
          </div>
          <div class="control">
            <select id="rating-filter" name="rating-filter">
              <option ${minimumRating === null ? 'selected' : ''} value="null">Choose Minimum Rating</option>
              <option ${minimumRating === 5 ? 'selected' : ''} value="5">5</option>
              <option ${minimumRating === 4 ? 'selected' : ''} value="4">4</option>
              <option ${minimumRating === 3 ? 'selected' : ''} value="3">3</option>
              <option ${minimumRating === 2 ? 'selected' : ''} value="2">2</option>
              <option ${minimumRating === 1 ? 'selected' : ''} value="1">1</option>
            </select>
          </div>
      </section>
    `;
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
    addBookmarkForm,
    defaultControls,
  };
}());
