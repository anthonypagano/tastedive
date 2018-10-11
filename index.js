'use strict';

const TASTEDIVE_SEARCH = 'https://tastedive.com/api/similar';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    type: 'music',
    limit: 5,
    info: 1,
    k: '321241-thinkful-00S0FKX3'
  }
  $.getJSON(TASTEDIVE_SEARCH, query, callback);
}

function renderResult(result) {
    return `
        <p>${result.Results.Name}</p>
  `;
}

function displayTastediveSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
    $.prop('hidden', false);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayTastediveSearchData);
  });
}

$(watchSubmit);
