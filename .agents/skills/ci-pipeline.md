# Skill: CI Pipeline Verification

## Rule

After every `git push`, verify the CI pipeline passes before considering the task done.

## CI Jobs (`.github/workflows/ci.yml`)

1. **Lint & Type Check** — `bun run lint` + `bun run type-check` + `bun run format:check`
2. **Run Tests** — `bun run test:ci` (needs lint job)
3. **Build Application** — `bun run build` (needs lint + test)
4. **Security Scan** — `bun audit` (needs lint)
5. **Generate Report** — summary; fails if any above job failed

## Local Pre-Check (run before push)

```bash
bun run lint        # ESLint — catches react-hooks/*, unused vars, etc.
bun run type-check  # tsc --noEmit
bun run format:check # Prettier
```

## Known Pitfalls

- `eslint-plugin-react-hooks` v7 adds `react-hooks/set-state-in-effect`: calling `setState()` directly inside `useEffect` body is an error.
  - Fix: move setState to event handlers (onClick) or use an async wrapper.
- The `format:check` step runs Prettier — always ensure formatting passes.
- "Generate Report" failing means an upstream job failed; investigate that job first.

## Workflow

1. Run local checks before committing.
2. Push and monitor GitHub Actions.
3. If CI fails, diagnose the failed job logs, fix locally, commit, and re-push.
4. Never mark a task complete with a red CI badge.
