# Документація по взаємодії фронтенда і бекенда.

## Запуск локально

```bash
npm install
npm run dev
```

Build
```bash
npm run docs
```

Build with mermaid-generation
```bash
npm run docs:build
```

Preview build
```bash
npm run docs:preview
```

## Генерування Mermaid-діаграм
### Створення діаграми

Створіть файл діаграми у директорії:
```
/docs/diagrams
```
у форматі `.mmd`.

Наприклад:
```
/docs/diagrams/userERD.mmd
```

### Генерування SVG

Для генерації SVG-файлів виконайте команду:
```bash
npm run diagrams:build
```
або під час повного білду документації:

```bash
npm run docs:build
```

Скрипт автоматично:

- генерує SVG із Mermaid-діаграм;
- створює окремі версії для світлої та темної тем;
- зберігає результати в директорії:
    ```
    /docs/public/diagrams
    ```
Наприклад:
```
userERD-light.svg
userERD-dark.svg
```

### Використання діаграми в документації

Для відображення діаграми використовуйте компонент Diagram:
```tsx
<Diagram name="userERD" />
```

Компонент автоматично:

- підбирає light або dark SVG залежно від активної теми VitePress;
- застосовує базові стилі для всіх діаграм;
- підтримує додаткові CSS-класи.

Приклад із власним класом:
```tsx
<Diagram name="userERD" class="big-diagram" />
```

**Іменування файлів**

Ім'я, передане в компонент Diagram, повинно збігатися з назвою Mermaid-файлу:
```
/docs/diagrams/userERD.mmd
```
```tsx
<Diagram name="userERD" />
```