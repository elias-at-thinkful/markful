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
    let radioGroupHTML = '';
    function _generateRadioGroupHTML(bookmark, idx) {
      return `
        <input
          type="radio"
          id="rating-${idx}"
          name="rating"
          value="${idx}"
          ${bookmark.rating === idx ? 'checked' : ''}
        />
        <label for="rating-${idx}">${idx}</label>
      `;
    }

    if (bookmarkKeys.length === 0) {
      bookmark.id = '';
      bookmark.title = '';
      bookmark.url = '';
      bookmark.desc = '';
      bookmark.rating = '';
    }

    for (let i = 1; i <= 5; i += 1) {
      radioGroupHTML += _generateRadioGroupHTML(bookmark, i);
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
        <fieldset class="form-group">
          <legend>
            <h3>Rating</h3>
          </legend>
          ${radioGroupHTML}
        </div>
        <div class="form-group">
          <button type="submit">Save</button>
          <button id="cancel-bookmark-form" type="button">Cancel</button>
        </div>
      </form>
    `;
  };

  const defaultControls = function(minimumRating) {
    let optionHTML = '';
    function _generateOptionHTML(idx) {
      if (idx === 0) {
        return `
        <option
          ${minimumRating === null ? 'selected' : ''}
          value="null"
        >
          Choose minimum rating
        </option>
      `;
      }
      return `
        <option
          ${minimumRating === idx ? 'selected' : ''}
          value="${idx}"
        >
          ${idx}
        </option>
      `;
    }
    for (let i = 0; i < 6; i += 1) {
      optionHTML += _generateOptionHTML(i);
    }

    return `
      <section class="default-controls">
        <div class="control">
          <button id="show-add-form">Add Bookmark</button>
          </div>
          <div class="control">
            <select id="rating-filter" name="rating-filter">
              ${optionHTML}
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
