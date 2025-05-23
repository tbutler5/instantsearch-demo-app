const { algoliasearch, instantsearch } = window;
const { sortBy } = 'instantsearch.js/es/widgets';
const searchClient = algoliasearch('OV0QTLOG6H', '815c0dd87c2cea0ccdb7a129bf693afe');

const search = instantsearch({
  indexName: 'products',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src=${ hit.image } alt=${ hit.name } />
          <div>
            <h1>${components.Highlight({hit, attribute: "name"})}</h1>
            <p><strong>$${hit.price}</strong></p>
            <p>${components.Highlight({hit, attribute: "description"})}</p>
            <p>${components.Highlight({hit, attribute: "hierarchicalCategories.lvl0"})}</p>
            <p>Rating: ${'🌟'.repeat(Math.min(hit.rating, 5))}${hit.rating > 5 ? ' +' : ''}</p>
          </div>
        </article>
        `,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#category-list',
    attribute: 'categories',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.refinementList({
    container: '#free-shipping-list',
    attribute: 'free_shipping',
    transformItems(items) {
      return items.filter(item => item.label === 'true');
    },
    templates: {
      item: `
        <label>
          <input type="checkbox" value="true" />
          Free Shipping
        </label>
      `
    }
  }),
  instantsearch.widgets.ratingMenu({
    container: '#rating-list',
    attribute: 'rating',
  }),
  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { label: 'Featured', value: 'products' },
      { label: 'Price (asc)', value: 'products_price_asc' },
      { label: 'Price (desc)', value: 'products_price_desc' },
    ],
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();

