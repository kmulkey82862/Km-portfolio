"""Two-ink risograph prints of portfolio work for the section folders and heads.

Halftone separations (key ink from the shadows, spot ink from the colour), a
slight misregistration, uneven ink density and paper grain. Writes
public/media/prints/{section}-{folder,head}.webp plus a -color crop of each.
Run: python3 scripts/riso-prints.py
"""
import sys, numpy as np
from PIL import Image, ImageFilter, ImageOps
import os
M = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'media') + '/'
OUT = M + 'prints/'
PAPER = np.array([244, 236, 223]) / 255.0

SECTIONS = {
  # key: (source, focus x,y for folder, focus for header, ink A (key), ink B (spot))
  'ai':       ('tool-speaker-1200.webp',                       (0.64, 0.40), (0.5, 0.42), '#4a2546', '#ff48b0'),
  'websites': ('site-cdc-1600.webp',                            (0.30, 0.62), (0.5, 0.55), '#a8481c', '#3255a4'),
  'email':    ('gallery/1zkVKnji_n4XbFOemmX-UW3LkxW7zTEPX-1800.webp', (0.18, 0.35), (0.5, 0.30), '#5f6118', '#ff48b0'),
  'social':   ('gallery/km-trivial-matters-1-1800.webp',       (0.40, 0.45), (0.5, 0.45), '#2b2a6b', '#e8a522'),
  'brand':    ('gallery/1isAUKSboqf7mWBb8aCoqfzuopII19MVL-1800.webp', (0.50, 0.70), (0.5, 0.72), '#7a2f4f', '#ff6c2f'),
  'resume':   ('site-matt-chapin-1600.webp', (0.50, 0.40), (0.5, 0.45), '#4a2546', '#ff6c2f'),
}

def hexrgb(h): return np.array([int(h[i:i+2], 16) for i in (1, 3, 5)]) / 255.0

def crop(img, w, h, focus):
  s = max(w / img.width, h / img.height)
  im = img.resize((round(img.width * s) + 1, round(img.height * s) + 1), Image.LANCZOS)
  x = int(np.clip(focus[0] * im.width - w / 2, 0, im.width - w))
  y = int(np.clip(focus[1] * im.height - h / 2, 0, im.height - h))
  return im.crop((x, y, x + w, y + h))

def screen(cov, cell, angle, shift=(0, 0)):
  h, w = cov.shape
  yy, xx = np.mgrid[0:h, 0:w].astype(float)
  xx -= shift[0]; yy -= shift[1]
  a = np.deg2rad(angle)
  u = (xx * np.cos(a) + yy * np.sin(a)) / cell
  v = (-xx * np.sin(a) + yy * np.cos(a)) / cell
  du = u - np.floor(u) - 0.5; dv = v - np.floor(v) - 0.5
  d = np.sqrt(du * du + dv * dv)
  r = np.sqrt(np.clip(cov, 0, 1) / np.pi) * 1.08
  # soft edge for antialiasing
  edge = 0.6 / cell
  return np.clip((r - d) / edge + 0.5, 0, 1)

def separate(rgb):
  arr = np.asarray(rgb).astype(float) / 255.0
  lum = arr @ np.array([0.299, 0.587, 0.114])
  mx, mn = arr.max(2), arr.min(2)
  sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
  # key ink: shadows, contrast pushed
  a = np.clip((1 - lum - 0.12) * 1.35, 0, 1) ** 1.1
  # spot ink: saturated colour and midtones
  b = np.clip(sat * (0.35 + 0.65 * mx) * 1.25 + (1 - lum) * 0.15, 0, 1)
  b = np.clip(b - a * 0.35, 0, 1)
  return a, b

def shift_img(x, dx, dy):
  return np.roll(np.roll(x, dy, 0), dx, 1)

def riso(rgb, inkA, inkB, cell):
  a, b = separate(rgb.filter(ImageFilter.GaussianBlur(cell * 0.35)))
  ma = screen(a, cell, 45)
  mb = screen(b, cell * 0.92, 15)
  mb = shift_img(mb, max(1, round(cell * 0.35)), max(1, round(cell * 0.2)))  # misregistration
  h, w = a.shape
  rng = np.random.default_rng(7)
  grain = rng.normal(0, 1, (h, w))
  grain = np.asarray(Image.fromarray(((grain * 18) + 128).clip(0, 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))).astype(float) / 255 - 0.5
  # ink density varies a little across the sheet, like a real drum
  dens = 0.86 + 0.08 * np.asarray(Image.fromarray((rng.random((8, 8)) * 255).astype('uint8')).resize((w, h), Image.BICUBIC)).astype(float) / 255
  out = np.ones((h, w, 3)) * PAPER
  for m, ink in ((mb, inkB), (ma, inkA)):
    k = (m * dens)[..., None]
    out = out * (1 - k * (1 - ink))  # multiply, inks overprint
  out = out * (1 + grain[..., None] * 0.10)
  return Image.fromarray((out.clip(0, 1) * 255).astype('uint8'))

if __name__ == '__main__':
  import os; os.makedirs(OUT, exist_ok=True)
  for key, (src, ff, fh, A, B) in SECTIONS.items():
    img = ImageOps.exif_transpose(Image.open(M + src)).convert('RGB')
    for kind, (w, h), focus, cell in (('folder', (680, 396), ff, 12), ('head', (1600, 520), fh, 9)):
      c = crop(img, w, h, focus)
      riso(c, hexrgb(A), hexrgb(B), cell).save(f'{OUT}{key}-{kind}.webp', quality=82)
      c.save(f'{OUT}{key}-{kind}-color.webp', quality=78)
  print('ok')
