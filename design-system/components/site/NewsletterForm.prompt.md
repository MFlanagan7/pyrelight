Newsletter capture, once per page, in the gold-glow band above the footer.

```jsx
<NewsletterForm note={note} onSubmit={handle} />
```

The note line is always rendered (min-height reserved) so submitting doesn't shift the layout.
Confirmation copy stays in world: "The map is on its way."
