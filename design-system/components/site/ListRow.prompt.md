Dense hairline list — the right choice when items have parallel metadata (level range, price, status).

```jsx
<ListGroup>
  <ListRow title="Salt & Sovereignty" body="A salvage claim turns into a succession crisis."
    meta="Levels 1–4" trailing="$12" thumb={<img src="assets/cover.jpg" alt="" />} />
</ListGroup>
```

Prefer a list over cards when there are more than four items and each has the same shape.
Cover thumbs are 4.75×6.35rem — never smaller, or the empty state collapses.
