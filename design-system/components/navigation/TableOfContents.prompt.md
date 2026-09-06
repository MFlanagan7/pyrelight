Right-rail contents on wiki articles over ~800 words.

```jsx
<TableOfContents activeId={active} items={[{id:"tides",label:"Tides"},{id:"wrecks",label:"Wrecks",depth:2}]} />
```

Sticks 5.5rem from the top to clear the fixed nav. Drive `activeId` from an IntersectionObserver;
without it the list still works as plain anchors.
