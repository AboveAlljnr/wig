import os, glob, re

# Files to scan
html_files = glob.glob('*.html') + glob.glob('ai-stylist-app/*.html') + glob.glob('ai-stylist/*.html')
css_files = glob.glob('assets/css/*.css')
js_files = glob.glob('assets/js/*.js')

all_files = html_files + css_files + js_files

replacements = [
    # The brand name variations
    ('Maison <span>Crème</span>', "SISSY'S <span>LUXURY</span>"),
    ('Maison <span>CrA"me</span>', "SISSY'S <span>LUXURY</span>"),
    ('Maison Crème', "SISSY'S LUXURY"),
    ('MAISON CRÈME', "SISSY'S LUXURY"),
    ('Maison CrA"me', "SISSY'S LUXURY"),
    # Title variations
    ('The Maison Crème Story', "The SISSY'S LUXURY Story"),
    ('Join the Maison', 'Join SISSY\'S LUXURY'),
    ('Maison-enchanted', 'SISSY\'S LUXURY-enchanted'),
    # Logo text (partial brand match)
    ('<a href="index.html" class="nav-logo">Maison <span>Crème</span></a>', '<a href="index.html" class="nav-logo">SISSY\'S <span>LUXURY</span></a>'),
    # Meta description
    ('<meta name="description" content="The Silk Blouse', '<meta name="description" content="The Silk Blouse'),
    # Page titles
    ('<title>Maison — AI Stylist</title>', "<title>SISSY'S LUXURY — AI Stylist</title>"),
    ('<title>Maison', "<title>SISSY'S LUXURY"),
    # | MAISON CRÈME in titles
    ('| MAISON CRÈME', "| SISSY'S LUXURY"),
    # Logo in nav
    ('nav-logo">Maison <span>CrA"me</span>', 'nav-logo">SISSY\'S <span>LUXURY</span>'),
    # Copyright
    ('&copy; 2026 Maison Crème. All rights reserved.', "&copy; 2026 SISSY'S LUXURY. All rights reserved."),
    ('&copy; 2026 Maison CrA"me. All rights reserved.', "&copy; 2026 SISSY'S LUXURY. All rights reserved."),
    # alt text on images
    ('Model wearing Maison Crème fashion', "Model wearing SISSY'S LUXURY fashion"),
    ('Maison Crème editorial fashion photography', "SISSY'S LUXURY editorial fashion photography"),
    ('Maison CrA"me editorial fashion photography', "SISSY'S LUXURY editorial fashion photography"),
    # Testimonial
    ('nothing compares to Maison Crème', "nothing compares to SISSY'S LUXURY"),
    ('nothing compares to Maison CrA"me', "nothing compares to SISSY'S LUXURY"),
    # Section text
    ('Every Maison Crème garment', "Every SISSY'S LUXURY garment"),
    ('earn the Maison Crème designation', "earn the SISSY'S LUXURY designation"),
    ('Each Maison Crème piece', "Each SISSY'S LUXURY piece"),
    ('Your Maison Crème piece', "Your SISSY'S LUXURY piece"),
    # JS comment headers
    ('MAISON CRÈME', "SISSY'S LUXURY"),
    ('Maison CrA"me', "SISSY'S LUXURY"),
    # MailChimp (the "Join the Maison" section uses "MAISONENCHANTED")
    ('MAISONENCHANTED', 'SISSYSLUXURY'),
    # CSS comment header
    ('MAISON CRÈME — Design System Tokens', "SISSY'S LUXURY — Design System Tokens"),
    ('MAISON CRÈME — Components', "SISSY'S LUXURY — Components"),
]

for fp in all_files:
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    
    if content != original:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fp}')
    else:
        print(f'No changes: {fp}')
