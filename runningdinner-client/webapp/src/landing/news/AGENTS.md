# Agents guidance: /src/landing/news

- **Correctness first:** Preserve existing behavior and rendering; don’t change visuals/layout unless explicitly requested.
- **i18n is mandatory:** No hardcoded user-facing strings in TSX/TS; add/update message keys in **both** `NewsMessages_lang_en.ts` and `NewsMessages_lang_de.ts`.
- **Separation of concerns:** Keep `NewsCard.tsx` presentational; put data shaping/sorting/filtering logic in `NewsItemsHook.ts` (not in components).
- **Stable data contracts:** Avoid breaking prop or item shapes; if a change is necessary, update all call sites and types consistently.
- **Deterministic ordering:** Any list ordering must be explicit and stable (avoid non-deterministic sorts).
- **Accessibility:** Ensure clickable elements have proper semantics/labels; don’t introduce keyboard traps or missing aria labels.
- **Minimal diff:** Prefer small, localized changes within this folder; don’t refactor unrelated code.
- **Safety checks:** Handle empty/undefined news items gracefully (no runtime crashes); add basic guards where needed.
