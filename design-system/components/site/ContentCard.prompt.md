Primary card for lore, wiki categories, regions and factions.

```jsx
<ContentCard href="#wiki" title="The Sea" count="11 articles"
  body="Tides, wrecks, the cartel, and what still moves down there."
  image={<img src="assets/sea.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />} />
```

Titles are Alegreya Sans SC uppercase — not Cormorant — so a grid of cards reads as an index.
Hover lifts 4px and warms the border to gold. Use `gradientBorder` sparingly, 4 cards at most.
