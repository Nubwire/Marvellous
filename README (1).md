# Marvellous Entertainment — website

Static site for Marvellous Entertainment, an Australian independent cinema company.
Plain HTML, CSS and a little JavaScript. No build step, no dependencies — the files
in this repo are exactly what gets served.

## Pages

| File | Page |
| --- | --- |
| `public/index.html` | Home — hero, today's sessions, on screen this week, what we do, cinemas, membership |
| `public/whats-on.html` | Full session board with cinema filter, now showing, coming soon, email signup |
| `public/cinemas.html` | Each cinema, access information, good-to-know FAQ |
| `public/about.html` | The company, programming approach, filmmakers, membership detail |
| `public/contact.html` | Contact form, direct emails, venue hire, press |
| `public/404.html` | Not found page (served automatically on any unknown path) |

Everything served lives in `public/`: the pages above plus `assets/css/styles.css`,
`assets/js/main.js`, `assets/img/`, `favicon.svg`, `robots.txt`, `sitemap.xml`,
`site.webmanifest`, `_headers` and `_redirects`. `wrangler.jsonc` sits at the repo root
and is not served.

## Put it on GitHub

```bash
cd marvellous-entertainment
git init
git add .
git commit -m "Marvellous Entertainment website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/marvellous-entertainment.git
git push -u origin main
```

## Deploy to Cloudflare

The repo is laid out for **Workers Builds** (a static-asset Worker). `wrangler.jsonc`
points Wrangler at `public/`, which is where every served file lives.

Build settings in the Worker → **Settings → Build**:

- Build command: *empty*
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Push to `main` and it deploys. `html_handling` gives clean URLs (`/about` serves
`about.html`), and `not_found_handling` serves `public/404.html` with a real 404 status.

Custom domain: Worker → **Domains & Routes** → **Add** → **Custom domain**, then
`marvellousentertainment.com.au` and `www.marvellousentertainment.com.au`.

### If you'd rather use Cloudflare Pages

Create a **Pages** project instead (**Workers & Pages → Create → Pages → Connect to Git**),
framework preset **None**, no build command, build output directory `public`.
`wrangler.jsonc` is ignored by Pages and can stay.

## Before you go live — replace the placeholder content

Everything below is written to be plausible, not accurate. Search and replace it.

- **Films, session times and dates.** All titles in the session board and film grids are
  invented (`The Long Paddock`, `Saltwater Hotel`, `Ninety Mile`, `A Bright Interior`)
  and all times are hardcoded. Swap in your real programme, or feed the board from your
  ticketing provider.
- **Cinemas.** Newtown, Fitzroy, Fremantle and West End are placeholders, along with
  their addresses, phone numbers and opening hours.
- **Company details.** ABN, head office address and all `@marvellousentertainment.com.au`
  addresses.
- **Membership.** Prices ($99 / $79 concession) and benefits.
- **Social links** in the footer point at bare instagram.com / facebook.com.
- **Acknowledgement of Country** in the footer — name the specific Traditional Custodians
  of the lands each cinema stands on once the locations are confirmed.
- **Domain.** Canonical tags, Open Graph URLs and `sitemap.xml` all assume
  `marvellousentertainment.com.au`.

## Wiring up the forms

The contact form and the email signup currently show a confirmation message and do
nothing else (`data-demo-form` in `main.js`). Two easy options:

- **Cloudflare Worker / Pages Function** — add `functions/api/contact.js`, remove the
  `data-demo-form` attribute, and set `method="post" action="/api/contact"` on the form.
- **Hosted form service** (Formspree, Basin, Getform) — set `action` to the endpoint
  they give you, `method="post"`, and remove `data-demo-form`.

Ticket links currently point at `/contact.html`. Point them at your ticketing system
(e.g. Ticketune, Veezi, Savoy) when it's live.

## Brand

| Colour | Hex | Use |
| --- | --- | --- |
| Midnight | `#0B1B33` | Primary brand colour |
| Gold | `#F6C945` | Accent, highlight |
| Coral | `#FF6B57` | Energy, action |
| Teal | `#00B3A4` | Balance, creativity |
| Cream | `#F7F6EF` | Backgrounds |
| Charcoal | `#333333` | Secondary text |

Type: **Montserrat** for headlines and the wordmark, **Inter** for body text, both loaded
from Google Fonts. The starburst is `assets/img/starburst.svg` and is also inlined in the
header and footer so it never flashes. Logo lockups and the brand sheet are in
`assets/img/`. All colours and fonts are CSS custom properties at the top of
`assets/css/styles.css` — change them there and the whole site follows.

## Local preview

```bash
cd public && python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Or `npx wrangler dev` from the repo root to preview
exactly as Cloudflare will serve it.) Use a server rather than opening the files directly,
so the root-relative paths (`/assets/...`) resolve.
