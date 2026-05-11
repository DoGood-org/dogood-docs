# Документація по взаємодії фронтенда і бекенда.

## Запуск локально

```bash
npm install
npm run dev
```

Build
```bash
npm run docs:build
```

Preview build
```bash
npm run docs:preview
```

## Генерування mermaid-svg

1. Додати діаграму в директорію `/docs/diagrams` у форматі `.mmd`

2. Запустити скрипт 
    ```bash
    npm run diagrams:build
    ```
    або з одночасним білдом
    ```bash
    npm run docs:build
    ```

3. Після цього svg з'явиться в директорії `/docs/public/diagrams`. 
   
4. Приклад використовувати далі в коді
    ```html
    <img src="/diagrams/userSettings.svg" class="diagram" />
    ```
