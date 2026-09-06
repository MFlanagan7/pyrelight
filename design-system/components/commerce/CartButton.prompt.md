Nav cart. The count bubble is the only gold fill allowed in the nav bar, so when the cart has
items the newsletter CTA drops to a ghost button.

```jsx
<CartButton count={2} onClick={openCart} />
```

Empty carts show no bubble and still announce "Cart, empty" to screen readers.
