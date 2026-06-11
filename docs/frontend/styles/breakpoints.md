# Breakpoints

| Name | Width  | Description (usage) |
| ---- | ------ | ------------------- |
| sm   | 393px  | mobile (default)    |
| md   | 768px  | tablet              |
| lg   | 1440px | desktop             |

## Styles

```css
/* breakpoints */
--breakpoint-*: initial;
--breakpoint-sm: 24.5625rem; /*393px*/
--breakpoint-md: 48rem; /*768px*/
--breakpoint-lg: 90rem; /*1440px*/
```

## Example usage

```tsx
<Component className="w-full md:w-[100px] lg:w-[200px]">Content</Component>
```