
# Text

| Class      | Font-size | Line-height | Description (usage)                        |
| ---------- | --------- | ----------- | ------------------------------------------ |
| .text-xs   | 12px      | 20px        | very small paragraph                       |
| .text-sm   | 14px      | 16px        | small paragraph                            |
| .text-base | 16px      | 24px        | base text, paragraph, buttons              |
| .text-reg  | 20px      | 24px        | paragraph                                  |
| .text-md   | 18px      | 26px        | paragraph                                  |
| .text-lg   | 32px      | 48px        | big paragraph                              |
| .text-h1   | 32px      | 48px        | h1 - mobile and tablet (only one to page)  |
| .text-h1-d | 72px      | 92px        | h1 - desktop-version (only one to page)    |
| .text-h2-m | 24px      | 32px        | h2 - mobile-version (when tablet is other) |
| .text-h2   | 32px      | 48px        | h2 (section-titles)                        |
| .text-h2-d | 48px      | 64px        | h2 - desktop-version                       |
| .text-h3   | 24px      | 32px        | h3                                         |
| .text-h3-d | 48px      | 64px        | h3 - desktop-version                       |

## Styles

```css
@theme {
  /* font sizes and line-height desktop */
  --text-xs: 12px;
  --leading-xs: 20px;
  --text-sm: 14px;
  --leading-sm: 16px;
  --text-base: 16px;
  --leading-base: 24px;
  --text-md: 18px;
  --leading-md: 26px;
  --text-lg: 32px;
  --leading-lg: 48px;

  --text-h1-d: 72px;
  --leading-h1-d: 92px;
  --text-h2-d: 48px;
  --leading-h2-d: 64px;
  --text-h3-d: 48px;
  --leading-h3-d: 64px;

  /* font sizes and line-height mobile */
  --text-h1: 32px;
  --leading-h1: 48px;
  --text-h2-m: 24px;
  --leading-h2-m: 32px;
  --text-h2: 32px;
  --leading-h2: 48px;
  --text-h3: 24px;
  --leading-h3: 32px;
}

@layer utilities {
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--leading-xs);
  }

  @media (min-width: 48rem) {
    .md\:text-xs {
      font-size: var(--text-xs);
      line-height: var(--leading-xs);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-xs {
      font-size: var(--text-xs);
      line-height: var(--leading-xs);
    }
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--leading-sm);
  }

  @media (min-width: 48rem) {
    .md\:text-sm {
      font-size: var(--text-sm);
      line-height: var(--leading-sm);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-sm {
      font-size: var(--text-sm);
      line-height: var(--leading-sm);
    }
  }

  .text-base {
    font-size: var(--text-base);
    line-height: var(--leading-base);
  }

  @media (min-width: 48rem) {
    .md\:text-base {
      font-size: var(--text-base);
      line-height: var(--leading-base);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-base {
      font-size: var(--text-base);
      line-height: var(--leading-base);
    }
  }

  .text-reg {
    font-size: var(--text-reg);
    line-height: var(--leading-reg);
  }

  @media (min-width: 48rem) {
    .md\:text-reg {
      font-size: var(--text-reg);
      line-height: var(--leading-reg);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-reg {
      font-size: var(--text-reg);
      line-height: var(--leading-reg);
    }
  }


  .text-md {
    font-size: var(--text-md);
    line-height: var(--leading-md);
  }

  @media (min-width: 48rem) {
    .md\:text-md {
      font-size: var(--text-md);
      line-height: var(--leading-md);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-md {
      font-size: var(--text-md);
      line-height: var(--leading-md);
    }
  }

  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--leading-lg);
  }

  @media (min-width: 48rem) {
    .md\:text-lg {
      font-size: var(--text-lg);
      line-height: var(--leading-lg);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-lg {
      font-size: var(--text-lg);
      line-height: var(--leading-lg);
    }
  }

  .text-h1 {
    font-size: var(--text-h1);
    line-height: var(--leading-h1);
  }

  @media (min-width: 48rem) {
    .md\:text-h1 {
      font-size: var(--text-h1);
      line-height: var(--leading-h1);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h1 {
      font-size: var(--text-h1);
      line-height: var(--leading-h1);
    }
  }

  .text-h1-d {
    font-size: var(--text-h1-d);
    line-height: var(--leading-h1-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h1-d {
      font-size: var(--text-h1-d);
      line-height: var(--leading-h1-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h1-d {
      font-size: var(--text-h1-d);
      line-height: var(--leading-h1-d);
    }
  }

  .text-h2-m {
    font-size: var(--text-h2-m);
    line-height: var(--leading-h2-m);
  }

  @media (min-width: 48rem) {
    .md\:text-h2-m {
      font-size: var(--text-h2-m);
      line-height: var(--leading-h2-m);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2-m {
      font-size: var(--text-h2-m);
      line-height: var(--leading-h2-m);
    }
  }

  .text-h2 {
    font-size: var(--text-h2);
    line-height: var(--leading-h2);
  }

  @media (min-width: 48rem) {
    .md\:text-h2 {
      font-size: var(--text-h2);
      line-height: var(--leading-h2);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2 {
      font-size: var(--text-h2);
      line-height: var(--leading-h2);
    }
  }

  .text-h2-d {
    font-size: var(--text-h2-d);
    line-height: var(--leading-h2-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h2-d {
      font-size: var(--text-h2-d);
      line-height: var(--leading-h2-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2-d {
      font-size: var(--text-h2-d);
      line-height: var(--leading-h2-d);
    }
  }

  .text-h3 {
    font-size: var(--text-h3);
    line-height: var(--leading-h3);
  }

  @media (min-width: 48rem) {
    .md\:text-h3 {
      font-size: var(--text-h3);
      line-height: var(--leading-h3);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h3 {
      font-size: var(--text-h3);
      line-height: var(--leading-h3);
    }
  }

  .text-h3-d {
    font-size: var(--text-h3-d);
    line-height: var(--leading-h3-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h3-d {
      font-size: var(--text-h3-d);
      line-height: var(--leading-h3-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h3-d {
      font-size: var(--text-h3-d);
      line-height: var(--leading-h3-d);
    }
  }
}
```

## Example usage

```html
<h1 className="text-h1 lg:text-h1-d">Title 1</h1>

<p className="text-base lg:text-lg">Big paragraph</p>

<p className="text-sm">Small paragraph</p>

<button className="text-base">Button</button>
```