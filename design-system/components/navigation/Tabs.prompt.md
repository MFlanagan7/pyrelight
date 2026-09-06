Filters a panel in place: shop tiers, article sections, gallery categories.

```jsx
<Tabs value={tier} onChange={setTier}
  items={[{value:"all",label:"All",count:24},{value:"free",label:"Free",count:6}]} />
```

Two to five tabs. More than five means the content wants a sidebar, not tabs. Remember the shop's
default view shows free and premium together — tabs narrow, they don't hide.
