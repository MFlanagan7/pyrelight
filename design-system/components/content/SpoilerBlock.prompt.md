Hides GM-facing information inside a player-safe page until the reader clicks Reveal — use it for act structure, secret motives and monster tactics on wiki articles and adventure pages.

```jsx
<SpoilerBlock title="GM only" note="Spoilers for the Marrow Bay arc.">
  <p>The Synod already knows what fell. They are waiting to see who talks first.</p>
</SpoilerBlock>
```

Uncontrolled by default. Pass `open` + `onToggle` to lift state (e.g. a single "Reveal all spoilers" switch on an adventure page). `note` renders only while closed, so the reader can judge whether the spoiler is safe for them. Use `Callout tone="gm"` instead when the information is already visible and just needs marking.
