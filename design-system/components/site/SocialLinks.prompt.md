Footer social row — round on Starfall, square on Pyrelight.

```jsx
<SocialLinks links={[{ key: "discord", label: "Discord", href: "https://discord.gg/…" }]} />
```

Every icon needs an aria-label; the glyph carries no text. Order: community first (Instagram,
Facebook, Reddit, Discord, YouTube, TikTok, Bluesky), then storefronts (itch, DriveThruRPG),
then support (Patreon, Ko-fi).
