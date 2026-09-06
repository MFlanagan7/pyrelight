Drop-in FAQ list for marketing, shop and Start Playing pages — rows open independently and it holds its own state, so you pass only content.

```jsx
<FaqAccordion defaultOpen={[0]} items={[
  { title: "Is this 5e compatible?", body: "Yes. Everything is written for fifth edition and tested at open tables." },
  { title: "Do PDFs come with print?", body: "Every print order includes the PDF at no extra cost." }
]} />
```

`allowMultiple={false}` collapses it to single-open. Reach for `Accordion` instead when a parent needs to control which row is open (linked tables of contents, deep links).
