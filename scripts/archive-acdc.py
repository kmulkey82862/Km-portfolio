"""Builds the archived ACDC site (public/work/acdc/) from the WordPress paste files.

  python3 scripts/archive-acdc.py /path/to/acdc-website/wordpress

Each page = site head + header + page body + footer + site scripts, the same
pieces WordPress stitches together. Links between pages and image paths are
rewritten to the archive; forms are switched off so nothing reaches the client.
"""
import os, re, shutil, sys

SRC = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'public', 'work', 'acdc')
BASE = '/work/acdc/'
STAGING_ASSETS = '/wp-content/uploads/2026/10/'
PAGES = {  # slug: (paste file, title)
    '': ('home.html', 'ACDC 2027 · American Chronic Disease Convention'),
    'about': ('about.html', 'About ACDC'),
    'registration': ('registration.html', 'Registration · ACDC 2027'),
    'hotel-travel': ('hotel-travel.html', 'Hotel & Travel · ACDC 2027'),
    'sponsorship': ('sponsorship.html', 'Sponsorship · ACDC 2027'),
    'contact': ('contact.html', 'Contact · ACDC 2027'),
}
FORM_OFF = ('<p style="font:15px/1.5 Poppins,Arial,sans-serif;color:#555;padding:28px;text-align:center;margin:0">'
            'Forms are switched off in this archived copy.</p>')

SILHOUETTE = ('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%23e7e3ee%22/%3E%3Ccircle cx=%2260%22 cy=%2246%22 r=%2222%22 fill=%22%23c4bcd2%22/%3E%3Cpath d=%22M18 120c4-26 22-40 42-40s38 14 42 40z%22 fill=%22%23c4bcd2%22/%3E%3C/svg%3E')
read = lambda *p: open(os.path.join(SRC, 'paste', *p), encoding='utf-8').read()

def fix(html):
    html = html.replace(STAGING_ASSETS, BASE + 'assets/')
    # page-to-page links
    html = re.sub(r'href="/(about|registration|hotel-travel|sponsorship|contact)/?(#[^"]*)?"',
                  lambda m: f'href="{BASE}{m.group(1)}/{m.group(2) or ""}"', html)
    html = re.sub(r'href="/(#[^"]*)?"', lambda m: f'href="{BASE}{m.group(1) or ""}"', html)
    html = re.sub(r'(home|about|registration|hotel|sponsorship|contact): "/([a-z-]*/?)"',
                  lambda m: f'{m.group(1)}: "{BASE}{m.group(2)}"', html)
    # forms off: embedded Jotforms and links out to them
    html = html.replace("frame.src = 'https://form.jotform.com/' + id;", f"frame.srcdoc = {FORM_OFF!r};")
    html = html.replace('src: `https://form.jotform.com/${id}`', f'srcDoc: {FORM_OFF!r}')
    html = re.sub(r'href="https://form\.jotform\.com/\d+"( target="_blank")?( rel="[^"]*")?', 'href="#" aria-disabled="true"', html)
    html = re.sub(r'href: "https://form\.jotform\.com/\d+", target: "_blank", rel: "[^"]*"', 'href: "#"', html)
    html = re.sub(r'<iframe src="https://form\.jotform\.com/\d+"', '<iframe srcdoc="' + FORM_OFF.replace('"', '&quot;') + '"', html)
    html = html.replace('const posting = !!(cfg && cfg.id && cfg.fields);', 'const posting = false;')
    html = re.sub(r'href="/(privacy-policy|terms-of-service)/"', 'href="#"', html)
    # real people's photos stay out of the archive (portfolio privacy rule):
    # founders fall back to their initials, speakers to a neutral silhouette
    html = re.sub(r'photo: asset\("[a-z-]+-web\.webp"\)', 'photo: null', html)
    html = re.sub(r'https://vepimg\.b8cdn\.com/[^"\']+\.(?:jpe?g|png|webp)', SILHOUETTE, html, flags=re.I)
    html = re.sub(r'https?://data-us\.vfairs\.com/[^"\' )]+\.(?:jpe?g|png|webp)', SILHOUETTE, html)
    return html

ARCHIVE_BAR = f'''<a href="/#websites" style="position:fixed;left:16px;bottom:16px;z-index:99999;display:flex;gap:8px;align-items:center;
padding:9px 14px;border-radius:999px;background:rgba(20,20,24,.86);color:#fff;font:500 12px/1.2 Poppins,Arial,sans-serif;
text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.18);backdrop-filter:blur(6px)">&larr; Katelyn Mulkey portfolio
<span style="opacity:.6">&middot; archived build</span></a>'''

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    head, scripts = fix(read('1-site-head.html')), fix(read('2-site-footer-code.html'))
    header, footer = fix(read('3-header.html')), fix(read('4-footer.html'))
    used = set()
    for slug, (file, title) in PAGES.items():
        body = fix(read('pages', file))
        doc = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="{BASE}assets/acdc-favicon-32.png">
<style>html,body{{margin:0;padding:0}}</style>
{head}</head>
<body class="acdc-archive">
{header}
<main>
{body}</main>
{footer}
{scripts}
{ARCHIVE_BAR}
</body></html>
'''
        used |= set(re.findall(re.escape(BASE + 'assets/') + r'([^"\'`) \\]+)', doc))
        used |= set(re.findall(r'asset\("([^"]+)"\)', doc))
        d = os.path.join(OUT, slug)
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(doc)
    # assets: only what the pages reference, plus anything named in the glass/sector grid
    script_all = scripts + head
    for f in os.listdir(os.path.join(SRC, 'assets')):
        if f in used or (f in script_all and not f.endswith('.mp4')) or f == 'acdc-favicon-32.png':
            os.makedirs(os.path.join(OUT, 'assets'), exist_ok=True)
            shutil.copy2(os.path.join(SRC, 'assets', f), os.path.join(OUT, 'assets', f))
    missing = sorted(u for u in used if not os.path.exists(os.path.join(OUT, 'assets', u)))
    print('pages:', len(PAGES), 'assets:', len(os.listdir(os.path.join(OUT, 'assets'))), 'missing:', missing)

main()
