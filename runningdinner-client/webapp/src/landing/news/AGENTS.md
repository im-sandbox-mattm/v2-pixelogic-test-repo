# Agents guidance: /src/landing/news

- **Hardcoded content:** News items are now hardcoded directly in NewsPage.tsx (English only). No i18n infrastructure for news content.
- **All in one place:** The fetchNewsItems() logic is embedded directly in NewsPage.tsx using useMemo for simplicity.
- **Modern design:** NewsCard.tsx features a modern layout with hover effects, improved typography, and "New" badges for recent items.
- **Correctness first:** Preserve existing behavior and rendering; don't change visuals/layout unless explicitly requested.
- **Stable data contracts:** Avoid breaking prop or item shapes; if a change is necessary, update all call sites and types consistently.
- **Deterministic ordering:** News items are explicitly sorted by date descending (newest first).
- **Accessibility:** Ensure clickable elements have proper semantics/labels; don't introduce keyboard traps or missing aria labels.
- **Safety checks:** Handle empty/undefined news items gracefully (no runtime crashes); add basic guards where needed.
