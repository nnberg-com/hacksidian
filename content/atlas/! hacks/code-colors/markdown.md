---
cssclasses:
  - atlas-code-colors
---

```javascript
// Комментарий: подготовка карточки
function renderCard(title, count = 3) {
  const options = { title: "Hacksidian", enabled: true };
  return /card/i.test(title) && count > 0 ? options.title : "";
}
renderCard("card", 5);
```

```bash
# Переменная выделяется синтаксическим анализатором Bash
echo "$HOME"
```

```html
<article class="card">Карточка</article>
```
