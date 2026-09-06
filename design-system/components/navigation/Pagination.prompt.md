Numbered pager. Prefer `hrefFor` so pages are linkable and crawlable.

```jsx
<Pagination page={3} pages={12} hrefFor={(n) => `/wiki?page=${n}`} />
```

The current page is the only gold-filled element — so a pager and a primary button should not share
a viewport. Use "Load more" instead on the gallery if the grid is infinite.
