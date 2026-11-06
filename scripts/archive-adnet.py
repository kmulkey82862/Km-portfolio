"""Builds the archived AdNet 2027 pages (public/work/adnet/) from Katelyn's HTML.

  python3 scripts/archive-adnet.py [source folder, default media-src/adnet-pages]

Links between the pages point to the copies, images are downloaded and stored
with the site, and forms and outbound links are switched off.
"""
import hashlib, os, re, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'media-src', 'adnet-pages')
OUT = os.path.join(ROOT, 'public', 'work', 'adnet')
BASE = '/work/adnet/'
PAGES = {  # source file -> (slug used by the live site, folder in the archive)
    'AdNet-2027.html': ('', ''),
    'AdNet-2027-Agenda.html': ('-agenda', 'agenda'),
    'AdNet-2027-Sessions.html': ('-sessions', 'sessions'),
    'AdNet-2027-Hotel.html': ('-hotel', 'hotel'),
    'AdNet-2027-Registration.html': ('-registration', 'registration'),
    'AdNet-2027-Sponsorship.html': ('-sponsorship', 'sponsorship'),
    'AdNet-2027-Sponsors.html': ('-sponsors', 'sponsors'),
    'AdNet-2027-FAQ-v2.html': ('-faq', 'faq'),
}
SLUG = {slug: folder for slug, folder in PAGES.values()}
FORM_OFF = ('<p style="font:15px/1.5 Inter,Arial,sans-serif;color:#555;padding:28px;text-align:center;margin:0">'
            'Forms are switched off in this archived copy.</p>')
BAR = f'''<a href="/#websites" style="position:fixed;left:16px;bottom:16px;z-index:99999;display:flex;gap:8px;align-items:center;
padding:9px 14px;border-radius:999px;background:rgba(20,20,24,.86);color:#fff !important;font:500 12px/1.2 Inter,Arial,sans-serif;
text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.18)">&larr; Katelyn Mulkey portfolio
<span style="opacity:.6">&middot; archived build</span></a>'''

os.makedirs(os.path.join(OUT, 'img'), exist_ok=True)

def local(url):
    ext = os.path.splitext(url.split('?')[0])[1].lower() or '.jpg'
    name = hashlib.sha1(url.encode()).hexdigest()[:12] + ext
    p = os.path.join(OUT, 'img', name)
    if not os.path.exists(p):
        subprocess.run(['curl', '-sSLf', '--max-time', '90', '-o', p, url], check=True)
    return BASE + 'img/' + name

def page_link(m):
    folder = SLUG.get(m.group(1) or '')
    if folder is None:
        return 'href="#"'
    return f'href="{BASE}{folder + "/" if folder else ""}{m.group(2) or ""}"'

for src, (slug, folder) in PAGES.items():
    h = open(os.path.join(SRC, src), encoding='utf-8').read()
    h = re.sub(r'src="(https://adnetcf\.site-ym\.com/[^"]+)"', lambda m: f'src="{local(m.group(1))}"', h)
    h = re.sub(r'href="/page/conference-2027([a-z-]*)(#[^"]*)?"', page_link, h)
    # forms off: embedded Jotforms, their scripts, and every link that leaves the archive
    h = re.sub(r'<iframe[^>]*jotform[^>]*></iframe>', f'<iframe srcdoc="{FORM_OFF.replace(chr(34), "&quot;")}" style="width:100%;height:120px;border:none;display:block;margin-top:24px"></iframe>', h)
    h = re.sub(r'<script[^>]*jotfor[^>]*></script>\s*', '', h)
    h = re.sub(r'<script>window\.jotformEmbedHandler[^<]*</script>\s*', '', h)
    h = re.sub(r'(<a\b[^>]*?)href="(?!/work/adnet/|#)[^"]*"', r'\1href="#"', h)
    h = re.sub(r'\s+target="_blank"', '', h)
    h = re.sub(r'\s+rel="noopener"', '', h)
    h = h.replace('</head>', '<meta name="robots" content="noindex">\n</head>', 1)
    h = h.replace('</body>', BAR + '\n</body>', 1)
    d = os.path.join(OUT, folder)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(h)
    print(folder or '(home)', len(h))
