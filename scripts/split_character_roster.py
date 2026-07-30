from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "public" / "character-roster-v2.png").convert("RGB")
names = ["commander", "dali", "wawa", "gaogao", "xiaoyan", "xuanfeng"]
cell_w, cell_h = source.width // 3, source.height // 2
out = root / "public" / "characters"
out.mkdir(exist_ok=True)

for index, name in enumerate(names):
    col, row = index % 3, index // 3
    crop = source.crop((col * cell_w, row * cell_h, (col + 1) * cell_w, (row + 1) * cell_h))
    crop.save(out / f"{name}.webp", "WEBP", quality=92, method=6)

print(f"Created {len(names)} character portraits in {out}")
