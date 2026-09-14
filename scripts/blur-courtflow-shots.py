"""One-off: copy CourtFlow shots from temp_pics, blur account + firm name."""

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "temp_pics"
DST = ROOT / "public" / "projects"


def pixelate(im: Image.Image, box: tuple[int, int, int, int], scale: int = 14) -> None:
    x0, y0, x1, y1 = (max(0, int(v)) for v in box)
    x1, y1 = min(im.width, x1), min(im.height, y1)
    if x1 <= x0 or y1 <= y0:
        return
    crop = im.crop((x0, y0, x1, y1))
    small = crop.resize(
        (max(1, (x1 - x0) // scale), max(1, (y1 - y0) // scale)),
        Image.Resampling.BILINEAR,
    )
    blurred = small.resize((x1 - x0, y1 - y0), Image.Resampling.NEAREST)
    blurred = blurred.filter(ImageFilter.GaussianBlur(2))
    im.paste(blurred, (x0, y0))


def redact_common(im: Image.Image) -> None:
    w, h = im.size
    # Sidebar account: avatar, username, CLSU email
    pixelate(im, (12, int(h * 0.90), int(w * 0.205), h - 6), scale=16)
    # Header avatar / initials on the far right
    pixelate(im, (int(w * 0.935), int(h * 0.025), w - 8, int(h * 0.08)), scale=12)


def redact_dashboard(im: Image.Image) -> None:
    redact_common(im)
    # "Joson Law Office" in the top bar — client name stays off the public site
    pixelate(im, (612, 52, 920, 108), scale=12)


def redact_documents(im: Image.Image) -> None:
    redact_common(im)


JOBS = [
    ("Dashboard.png", "courtflow-cover.png", redact_dashboard),
    ("Calendar.png", "courtflow-calendar.png", redact_common),
    ("documents.png", "courtflow-documents.png", redact_documents),
    ("client_dashboard.png", "courtflow-clients.png", redact_common),
    ("client_overview.png", "courtflow-client-overview.png", redact_common),
    ("client_cases.png", "courtflow-client-cases.png", redact_common),
]


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    for src_name, dst_name, redact in JOBS:
        im = Image.open(SRC / src_name).convert("RGB")
        redact(im)
        out = DST / dst_name
        im.save(out, "PNG", optimize=True)
        print(f"wrote {out.relative_to(ROOT)} {im.size}")


if __name__ == "__main__":
    main()
