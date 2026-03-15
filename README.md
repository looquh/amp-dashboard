# AML Regulatory Intelligence Dashboard

Live-News-Dashboard für EU AML/CFT-Regulierung — Banken & Versicherer.

## Deployment auf Vercel (kostenlos)

### Einmalig: Setup

1. Erstelle ein GitHub-Repository und pushe diesen Ordner
2. Gehe zu [vercel.com](https://vercel.com) → Sign up mit GitHub
3. "Add New Project" → wähle dein Repository
4. Klick "Deploy" — fertig

Vercel gibt dir eine URL wie `https://aml-dashboard-xyz.vercel.app`

### Danach

Jede Änderung, die du in GitHub pushst, wird automatisch deployed.

## Lokale Entwicklung

```bash
npm i -g vercel
vercel dev
```

Öffne http://localhost:3000

## Projektstruktur

```
├── public/
│   └── index.html          ← Dashboard UI
├── api/
│   ├── rss.js              ← RSS Proxy (serverless function)
│   └── check-link.js       ← Link Checker (serverless function)
├── vercel.json              ← Routing config
└── package.json
```

## Quellen
- Google News RSS (AML, Sanctions, KYC, Enforcement, Big4, EIOPA)
- BaFin, EBA, AMLA, FATF, Europol, PwC, EY, Deloitte, KPMG (Papers)
- Fachtagungen: AFME, ACAMS, Forum Institut, AML Intelligence u.a.
