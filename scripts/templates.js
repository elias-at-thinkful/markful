'use strict';

// eslint-disable-next-line no-unused-vars
const templates = (function() {
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

    let counter = 5;
    return stars
      .map(star => {
        return `
        <span
          class="star-rating"
          data-rating="${counter--}">
        ${star}
        </span>`;
      })
      .join('');
  };

  const bookmarkForm = function(bookmark = {}) {
    const bookmarkKeys = Object.keys(bookmark);
    if (bookmarkKeys.length === 0) {
      bookmark.id = '';
      bookmark.title = '';
      bookmark.url = '';
      bookmark.desc = '';
      bookmark.rating = '';
    }

    return `
      <form id="bookmark-form" data-id="${bookmark.id}">
        <div class="form-group">
          <label for="input-title">Title</label>
          <input
            type="text"
            name="title"
            id="input-title"
            value="${bookmark.title}" />
        </div>
        <div class="form-group">
          <label for="input-url">URL</label>
            <input
            type="text"
            name="url"
            id="input-url"
            value="${bookmark.url}" />
        </div>
        <div class="form-group">
          <label for="input-description">Description</label>
          <input 
            type="text"
            name="desc"
            id="input-description" 
            value="${bookmark.desc}" />
        </div>
        <div class="form-group">
          <h3>Rating</h3>
          <input 
            type="radio" 
            id="rating-5" 
            name="rating" 
            value="5" 
            ${bookmark.rating === '' || bookmark.rating === 5 ? 'checked' : ''}
          /> 
          <label for="rating-5">5</label>
          <input 
            type="radio" 
            id="rating-4" 
            name="rating" 
            value="4" 
            ${bookmark.rating === 4 ? 'checked' : ''}
          />
          <label for="rating-4">4</label>
          <input 
            type="radio" 
            id="rating-3" 
            name="rating" 
            value="3" 
            ${bookmark.rating === 3 ? 'checked' : ''}
          />
          <label for="rating-3">3</label>
          <input 
            type="radio" 
            id="rating-2" 
            name="rating" 
            value="2"
            ${bookmark.rating === 2 ? 'checked' : ''}
          /> 
          <label for="rating-2">2</label>
          <input 
            type="radio" 
            id="rating-1" 
            name="rating" 
            value="1"
            ${bookmark.rating === 1 ? 'checked' : ''}
          />
          <label for="rating-1">1</label>
        </div>
        <div class="form-group">
          <button type="submit">Save</button>
          <button id="cancel-bookmark-form" type="button">Cancel</button>
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
              <option 
              ${minimumRating === null ? 'selected' : ''}
              value="null"
            >
              Choose Minimum Rating
            </option>
              <option
                ${minimumRating === 5 ? 'selected' : ''}
                value="5"
              >
                5
              </option>
              <option
                ${minimumRating === 4 ? 'selected' : ''}
                value="4"
              >
                4
              </option>
              <option
                ${minimumRating === 3 ? 'selected' : ''}
                value="3"
              >
                3
              </option>
              <option
                ${minimumRating === 2 ? 'selected' : ''}
                value="2"
              >
                2
              </option>
              <option
                ${minimumRating === 1 ? 'selected' : ''}
                value="1"
              >
                1
              </option>
            </select>
          </div>
      </section>
    `;
  };

  const bookmark = function({ id, expanded, title, url, desc, rating }) {
    const article = expanded
      ? `
      <p class="description">
        ${desc}
        <span class="site-link"><a href="${url}">Visit Site</a></span>
        ( <a class="edit-item" href="#">Edit</a> )
        </p>
    `
      : '';

    return `
      <li class="bookmark-item" id="bookmark-${id}" data-id="${id}">
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
    bookmarkForm,
    defaultControls
  };
})();
