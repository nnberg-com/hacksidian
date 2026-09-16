---
cssclasses:
  - atlas-code-e030
---

```
GET /api/search?query=markdown&include=examples,notes,references&sort=updated_at&direction=descending HTTP/1.1
Authorization: Bearer example_token_for_documentation_only
Accept: application/json

{"status":"ok","message":"A deliberately long response that demonstrates horizontal scrolling and soft wrapping without changing the source text."}
```
