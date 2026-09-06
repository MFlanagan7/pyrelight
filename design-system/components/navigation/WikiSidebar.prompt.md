Wiki rail. Group titles mirror the home page's wiki grid, so the two never disagree.

```jsx
<WikiSidebar currentHref="/wiki/sea/tides" groups={[
  { title: "The world", links: [{ label: "Regions", href: "/wiki/regions", count: 4 }] }
]} footer={<SearchField />} />
```

Counts hold their width (`flex:none` + `nowrap`) so a two-line label can't squeeze them —
the same rule as ContentCard.
