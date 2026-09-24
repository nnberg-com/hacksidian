---
cssclasses:
  - atlas-code-wrap-backslash
---

```sh
curl --request GET "https://example.com/api/search?query=markdown&include=examples,notes,references&sort=updated_at&direction=descending" --header "Accept: application/json"
printf "%s\n" "Эта отдельная короткая строка не получает маркер"
```
