Cart panel for the shop.

```jsx
<CartDrawer open={open} onClose={close} subtotal="$36"
  note="PDFs are delivered immediately. Print ships in 3–5 days.">
  <CartLineItem title="The Starfall Setting" meta="Hardcover + PDF" price="$24" qty={1} onRemove={drop} />
</CartDrawer>
```

Free items still appear as rows, priced "Free" — the download and the purchase share one flow.
Show an `EmptyState` inside the drawer when there are no rows.
