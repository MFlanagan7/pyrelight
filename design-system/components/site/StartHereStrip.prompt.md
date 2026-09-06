Wayfinding strip that overlaps the hero.

```jsx
<StartHereStrip items={[{ kicker: "New here", title: "What is Starfall", body: "The premise in three minutes.", href: "#world" }]} />
```

Always four cells. Kickers name an audience or a mode ("New here", "Readers", "Free", "Run it") —
not a section name.

**Stacking requirement.** The strip pulls itself up into the hero, so its containing section needs
`position: relative; z-index: 1`. Without it the hero's absolute scrim layers paint over the
overlap and the cards appear cut off at the top.
