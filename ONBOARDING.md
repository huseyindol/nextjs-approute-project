# Welcome to huseyindol

## How We Use Claude

Based on Claude's usage over the last 30 days:

Work Type Breakdown:

```
Write Docs      ████████████░░░░░░░░  47%
Build Feature   ██████░░░░░░░░░░░░░░  27%
Plan Design     ███░░░░░░░░░░░░░░░░░  13%
Improve Quality ███░░░░░░░░░░░░░░░░░  13%
```

Top Skills & Commands:

```
/context  ████████████████████  10x/month
/model    ████████░░░░░░░░░░░░   4x/month
```

Top MCP Servers:

```
github  ████████████████████  12 calls
```

## Your Setup Checklist

### Codebases

- [ ] nextjs-approute-project — https://github.com/huseyindol/nextjs-approute-project
- [ ] elly — https://github.com/huseyindol/elly

### MCP Servers to Activate

- [ ] github — Browse commits, review PRs, and search code across repos without leaving Claude. Request access via your GitHub account and connect it through Claude Code's MCP settings.

### Skills to Know About

- `/context` — Shows current token usage and how much context window is left. Used frequently here to avoid hitting limits mid-task — run it before long sessions.
- `/model` — Switches between Claude models (Sonnet, Opus, Haiku). Used when you need faster responses or heavier reasoning for a task.

## Team Tips

- **Blog makalelerini `.agents/blog-writer.md` pipeline'ı ile yaz** — araştırma, yazım, SEO optimizasyonu, `llms.txt` güncellemesi ve commit tek bir akışta çalışır. Konu vermek için: `Konu: Frontend -> <başlık>`.
- **`bun` kullan, `npm` değil** — tüm komutlar `bun run`, `bun install`, `bunx` şeklinde olmalı. `npm` veya `npx` kullanma.
- **Uzun oturumlardan önce `/context` çalıştır** — özellikle repo tarama veya çok dosyalı görevlerde context dolmadan önce nerede olduğunu bil.
- **GitHub MCP ile `elly` repo'sunu doğrudan inceleyebilirsin** — commit geçmişi, dosya içerikleri ve PR'lar için `gh` CLI ya da tarayıcı açmana gerek yok.
- **Her API route'una rate limiting ekle** — `src/lib/rate-limiter.ts` ve `src/lib/security.ts` zorunlu; CLAUDE.md'deki bu kural pre-commit hook tarafından `tsc --noEmit` ile dolaylı olarak korunuyor.
- **`order: 1` yeni makalelerde her zaman yaz** — blog sıralaması bu alana göre yapılır; `article-order` skill'i mevcut makalelerin sıralarını otomatik kaydırır.

## Get Started

1. **Her iki repoyu klonla** — `nextjs-approute-project` (portfolio/blog) ve `elly` (Spring Boot backend). Projenin büyük kısmı bu ikisi arasındaki bağlamla çalışır.
2. **CLAUDE.md'yi oku** — proje kuralları burada. TypeScript strict mode, `bun` kullanımı, API güvenlik zorunlulukları ve agent koordinasyon yapısı hepsi orada.
3. **GitHub MCP'yi bağla** — `elly` commit geçmişi makale içeriği ve mimari kararlar için sık kullanılıyor. MCP olmadan bu bilgiyi WebFetch ile almak daha yavaş.
4. **`.agents/` dizinini incele** — `blog-writer.md` ve `skills/` altındaki dosyalar mevcut otomasyon pipeline'ını tanımlar. Yeni bir makale yazmadan önce bunları oku.
5. **İlk görev önerisi:** `nextjs-approute-project`'i klonladıktan sonra `bun install && bun run type-check` çalıştır — sıfır hata görmen gerekir.

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
