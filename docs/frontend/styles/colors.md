
# Colors

<div class="color-table">

| Variable             | Light theme | Dark theme | Description                                                  |
| -------------------- | ----------- | ---------- | ------------------------------------------------------------ |
| background           | #f1f1f1     | #171b19    | for primary background-color                                 |
| background-secondary | #696969     | #303030    | for registration, form-cards                                 |
| foreground           | #1B1B1B     | #f1f1f1    | for primary text-color                                       |
| header-bg            | #171B19     |            | header-background                                            |
| footer-bg            | #111215     |            | footer-background                                            |
| layout-background    | #111215     |            | layout-background                                            |
| admin-background     | #99999926   | #282828    | background for admin-panel                                   |
| admin-card-bg        | #9999994d   | #303030    | background for cards in admin-panel                          |
| text-help            | #696969     |            | form-placeholders, filter-background                         |
| text-gray            | #999999     |            | gray-text, lable-color                                       |
| text-placeholder     | #737373     |            | gray-text (for example: organization-email in admin-panel)   |
| white                | #f1f1f1     |            | for text and bg that doesn't change in dark theme            |
| black                | #010101     |            | for text that doesn't change in dark theme                   |
| text_tag             | #010101     | #f1f1f1    |                                                              |
| tag                  | #696969     |            | for tags (filter-buttons)                                    |
| post                 | #696969     | #171b19    |                                                              |
| post_gray            | #f1f1f1     | #696969    |                                                              |
| card                 | #cfcfcf     | #303030    | background for cards (task, organization, review in account) |
| toggle               | #303030     |            | for toggles (theme, special)                                 |
| border               | #2c8c8c     |            | for borders                                                  |
| btn                  | #2c8c8c     |            | button-background                                            |
| btn-primary          | #ffffff     |            | text for primary-buttons (with background)                   |
| btn-secondary        | #f1f1f1     | #010101    | text for secondary-buttons (outline)                         |
| btn-text             | #f1f1f1     |            | for buttons that doesn't change in dark theme                |
| btn-hover            | #00c1ac     |            | background-color for button-hover                            |
| btn-active           | #01425c     |            | background-color for active button                           |
| btn-outline          | #2c8c8c     |            | color for border (secondary-button)                          |
| btn-outline-hover    | #00c1ac     |            | hover for border (secondary-button)                          |
| btn-outline-active   | #01425c     |            | color for border (active secondary-button)                   |
| map-btn-bg           | #999999     | #303030    |                                                              |
| map-btn-icon         | #171b19     | #f1f1f1    |                                                              |
| news-item-hover      | #1ad3aa     |            |                                                              |
| bg-icon              | #171B19     | #f1f1f1    | background for icons (tasks)                                 |
| icon-color           | #f1f1f1     | #000000    | color for icon (tasks)                                       |
| image-bg             | #999999     | #e9e9e9    | image-background (for example about-section)                 |
| modal                | #fffcfc     | #303030    | modal-background                                             |
| review-bg            | #999999     | #696969    | background for review-cards (main page)                      |
| accent-bg            | #2c8c8c     | #01425c    | background for review-section                                |
| error                | #EE0606     |            | for errors                                                   |
| star                 | #FFEE00     |            | for rating-stars (profile)                                   |
| star-empty           | #747474     | #959595    | for empty rating-stars                                       |
| medicine             | #1f5eff     |            | medicine-icon                                                |
| animal               | #ff7d57     |            | animal-icon                                                  |
| nature               | #4caf50     |            | nature-icon                                                  |
| food                 | #e4a23c     |            | food-icon                                                    |

</div>

## Styles

```css
/* colors */
  --color-background: var(--background);
  --color-background-secondary: var(--background-secondary);
  --color-background-grants: var(--background-grants);
  --color-post: var(--post);
  --color-post_gray: var(--post_gray);
  --color-foreground: var(--foreground);
  --color-text-help: var(--text-help);
  --color-text-gray: var(--text-gray);
  --color-white: var(--white);
  --color-black: var(--black);
  --color-text_tag: var(--text_tag);
  --color-header-bg: var(--header-bg);
  --color-footer-bg: var(--footer-bg);
  --color-layout-background: var(--layout-background);
  --color-card: var(--card);
  --color-toggle: var(--toggle);
  --color-grant-card: var(--grant-card);
  --color-gradient: var(--gradient);
  --color-bg-icon: var(--bg-icon);
  --color-icon-color: var(--icon-color);
  --color-image-bg: var(--image-bg);
  --color-form-field: var(--form-field);
  --color-modal: var(--modal);
  --color-admin-background: var(--admin-background);
  --color-admin-card-bg: var(--admin-card-bg);
  --color-placeholder: var(--text-placeholder);

/* buttons */
--color-border: var(--border);
--color-btn: var(--btn);
--color-btn-text: var(--btn-text);
--color-btn-hover: var(--btn-hover);
--color-btn-active: var(--btn-active);
--color-btn-outline: var(--btn-outline);
--color-btn-outline-hover: var(--btn-outline-hover);
--color-btn-outline-active: var(--btn-outline-active);
--color-tag: var(--tag);

--color-error: var(--error);
--color-success: var(--success);
--color-attention: var(--attention);

--color-star: var(--star);
--color-star-empty: var(--star-empty);
--color-medicine: var(--medicine);
--color-animal: var(--animal);
--color-nature: var(--nature);
--color-food: var(--food);
--color-map-btn: var(--map-btn-bg);
--color-map-btn-icon: var(--map-btn-icon);
--color-news-item-hover: var(--btn-hover);

--color-review-bg: var(--review-bg);
--color-review-reverse: var(--review-reverse);
```

Light theme variables

```css
--background: #f1f1f1;
--background-secondary: #696969;
--background-grants: #f3f3f3;
--foreground: #1b1b1b;
--header-bg: #171b19;
--footer-bg: #111215;
--layout-background: #111215;
--text-help: #696969;
--text-gray: #999999;
--white: #f1f1f1;
--black: #010101;
--text_tag: #010101;
--tag: #696969;
--post: #696969;
--post_gray: #f1f1f1;
--form-field: #0d0d0d;
--modal: #fffcfc;
--admin-background: #99999926;
--admin-card-bg: #9999994d;
--text-placeholder: #737373;

--card: #e6e6e6;
--toggle: #303030;
--grant-card: #fffcfc;

--border: #2c8c8c;
--btn: #2c8c8c;
--btn-primary: #ffffff;
--btn-secondary: #f1f1f1;
--btn-text: #f1f1f1;
--btn-hover: #00c1ac;
--btn-active: #01425c;
--btn-outline: #2c8c8c;
--btn-outline-hover: #00c1ac;
--btn-outline-active: #01425c;
--map-btn-bg: #999999;
--map-btn-icon: #171b19;
--news-item-hover: #1ad3aa;

--bg-icon: #171b19;
--icon-color: #f1f1f1;
--image-bg: #999999;

--review-bg: #999999;
--accent-bg: #2c8c8c;

--error: #ee0606;
--success: #17814b;

--star: #ffee00;
--star-empty: #747474;
--medicine: #1f5eff;
--animal: #ff7d57;
--nature: #4caf50;
--food: #e4a23c;
```

Dark theme variables

```css
.dark {
  --background: #171b19;
  --background-secondary: #303030;
  --background-grants: #2a2d2d;
  --foreground: #f1f1f1;
  --card: #303030;
  --grant-card: #1d2020;
  --modal: #303030;
  --btn-secondary: #010101;
  --admin-background: #282828;
  --admin-card-bg: #303030;
  --post: #171b19;
  --text_tag: #f1f1f1;
  --post_gray: #696969;
  --bg-icon: #f1f1f1;
  --icon-color: #000000;
  --image-bg: #e9e9e9;
  --map-btn-bg: #303030;
  --map-btn-icon: #f1f1f1;
  --review-bg: #696969;
  --accent-bg: #01425c;
  --star-empty: #959595;
  --gradient:
    linear-gradient(
      238.09deg,
      rgba(26, 211, 170, 0.15) 30.81%,
      rgba(0, 0, 0, 0.15) 82.23%,
      rgba(0, 0, 0, 0.15) 83.94%,
      rgba(26, 211, 170, 0.15) 129.53%
    ),
    radial-gradient(circle, rgba(26, 211, 170, 0.1) 2px, transparent 2px),
    linear-gradient(0deg, #01425c, #01425c);
}
```

## How to use

| Class               | Usage                | Example                                                                                                              |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `bg-<variable>`     | for background-color | `className='bg-background'`;</br>`className='bg-btn hover:bg-btn-hover'`                                             |
| `text-<variable>`   | for text color       | `className='text-foreground'`; </br>`className='text-text-help' `                                                    |
| `border-<variable>` | for border-color     | `className='border-border'`;</br>`className='border-btn-outline hover:border-btn-outline active:border-btn-outline'` |
