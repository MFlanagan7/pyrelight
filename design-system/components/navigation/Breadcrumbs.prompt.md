Wiki and shop trail.

```jsx
<Breadcrumbs items={[{label:"Wiki",href:"/wiki"},{label:"Regions",href:"/wiki/regions"},{label:"The Drowned Coast"}]} />
```

Middots, not chevrons — chevrons belong to the scroll cue. The last item is unlinked and carries
`aria-current="page"`. Never include "Home".
