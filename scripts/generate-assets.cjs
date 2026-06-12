const fs = require("fs");
const path = require("path");
const { PNG } = require("/Users/mark bauman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pngjs");

const root = path.resolve(__dirname, "..");

function rgba(hex, a = 255) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a];
}

function set(png, x, y, color) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const index = (png.width * y + x) * 4;
  png.data[index] = color[0];
  png.data[index + 1] = color[1];
  png.data[index + 2] = color[2];
  png.data[index + 3] = color[3];
}

function image(width, height, background = "#05070F") {
  const png = new PNG({ width, height });
  const color = rgba(background);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      set(png, x, y, color);
    }
  }
  return png;
}

function rect(png, x, y, width, height, color) {
  for (let yy = y; yy < y + height; yy += 1) {
    for (let xx = x; xx < x + width; xx += 1) {
      set(png, xx, yy, color);
    }
  }
}

function strokeRect(png, x, y, width, height, color, thickness = 2) {
  rect(png, x, y, width, thickness, color);
  rect(png, x, y + height - thickness, width, thickness, color);
  rect(png, x, y, thickness, height, color);
  rect(png, x + width - thickness, y, thickness, height, color);
}

function circle(png, cx, cy, radius, color) {
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= radius * radius) {
        set(png, x, y, color);
      }
    }
  }
}

function line(png, x0, y0, x1, y1, color, thickness = 2) {
  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;

  while (true) {
    rect(png, x0 - Math.floor(thickness / 2), y0 - Math.floor(thickness / 2), thickness, thickness, color);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function grid(png, step = 48) {
  const color = rgba("#94A3B8", 35);
  for (let x = 0; x < png.width; x += step) rect(png, x, 0, 1, png.height, color);
  for (let y = 0; y < png.height; y += step) rect(png, 0, y, png.width, 1, color);
}

const font = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
  ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"]
};

function drawText(png, text, x, y, scale, color) {
  let offset = x;
  for (const char of text.toUpperCase()) {
    const glyph = font[char] || font[" "];
    for (let yy = 0; yy < glyph.length; yy += 1) {
      for (let xx = 0; xx < glyph[yy].length; xx += 1) {
        if (glyph[yy][xx] === "1") {
          rect(png, offset + xx * scale, y + yy * scale, scale, scale, color);
        }
      }
    }
    offset += 6 * scale;
  }
}

function writePng(file, png) {
  fs.writeFileSync(path.join(root, file), PNG.sync.write(png));
}

const og = image(1200, 630);
grid(og, 48);
circle(og, 1010, 120, 260, rgba("#22D3EE", 35));
circle(og, 1020, 520, 220, rgba("#F59E0B", 28));
strokeRect(og, 72, 58, 112, 128, rgba("#22D3EE"), 6);
circle(og, 126, 122, 26, rgba("#F59E0B"));
line(og, 146, 142, 172, 168, rgba("#22D3EE"), 8);
drawText(og, "BRAND PROTECTION +", 72, 270, 12, rgba("#F8FAFC"));
drawText(og, "DMCA MONITORING", 72, 370, 12, rgba("#F8FAFC"));
drawText(og, "DETECT. DOCUMENT. REMOVE.", 72, 500, 6, rgba("#CBD5E1"));
rect(og, 72, 570, 260, 8, rgba("#22D3EE"));
rect(og, 352, 570, 150, 8, rgba("#F59E0B"));
writePng("public/brand/og-default.png", og);

const apple = image(180, 180);
grid(apple, 30);
strokeRect(apple, 46, 28, 88, 112, rgba("#22D3EE"), 5);
circle(apple, 90, 82, 28, rgba("#F59E0B"));
line(apple, 110, 105, 132, 128, rgba("#22D3EE"), 7);
writePng("public/brand/apple-icon.png", apple);

const dashboard = image(1200, 800);
grid(dashboard, 44);
strokeRect(dashboard, 60, 60, 1080, 680, rgba("#334155"), 3);
rect(dashboard, 90, 100, 300, 90, rgba("#101827"));
rect(dashboard, 420, 100, 300, 90, rgba("#101827"));
rect(dashboard, 750, 100, 300, 90, rgba("#101827"));
strokeRect(dashboard, 90, 100, 300, 90, rgba("#334155"), 2);
strokeRect(dashboard, 420, 100, 300, 90, rgba("#334155"), 2);
strokeRect(dashboard, 750, 100, 300, 90, rgba("#334155"), 2);
drawText(dashboard, "EVIDENCE READY", 120, 135, 4, rgba("#F8FAFC"));
drawText(dashboard, "WEB + SOCIAL", 450, 135, 4, rgba("#F8FAFC"));
drawText(dashboard, "TRACK + ESCALATE", 780, 135, 4, rgba("#F8FAFC"));
strokeRect(dashboard, 90, 250, 540, 430, rgba("#334155"), 2);
strokeRect(dashboard, 670, 250, 380, 430, rgba("#334155"), 2);
for (let i = 0; i < 5; i += 1) {
  rect(dashboard, 130, 300 + i * 70, 360 - i * 28, 12, rgba("#22D3EE", 210));
  circle(dashboard, 560, 306 + i * 70, 12, i % 2 ? rgba("#22D3EE") : rgba("#F59E0B"));
}
circle(dashboard, 860, 465, 118, rgba("#0A1020"));
circle(dashboard, 860, 465, 70, rgba("#101827"));
line(dashboard, 760, 465, 960, 465, rgba("#334155"), 3);
line(dashboard, 860, 365, 860, 565, rgba("#334155"), 3);
circle(dashboard, 925, 390, 12, rgba("#F59E0B"));
circle(dashboard, 808, 510, 12, rgba("#22D3EE"));
writePng("public/images/hero-dashboard.png", dashboard);

const map = image(720, 360);
grid(map, 36);
circle(map, 360, 180, 72, rgba("#101827"));
strokeRect(map, 74, 52, 150, 58, rgba("#334155"), 2);
strokeRect(map, 486, 52, 150, 58, rgba("#334155"), 2);
strokeRect(map, 74, 250, 150, 58, rgba("#334155"), 2);
strokeRect(map, 486, 250, 150, 58, rgba("#334155"), 2);
strokeRect(map, 38, 154, 142, 58, rgba("#334155"), 2);
strokeRect(map, 540, 154, 142, 58, rgba("#334155"), 2);
[
  [224, 81],
  [486, 81],
  [224, 279],
  [486, 279],
  [180, 183],
  [540, 183]
].forEach(([x, y]) => line(map, x, y, 360, 180, rgba("#22D3EE", 150), 2));
drawText(map, "BRAND", 322, 168, 5, rgba("#F8FAFC"));
drawText(map, "WEB", 120, 76, 3, rgba("#E2E8F0"));
drawText(map, "SOCIAL", 520, 76, 3, rgba("#E2E8F0"));
drawText(map, "SEARCH", 108, 276, 3, rgba("#E2E8F0"));
drawText(map, "DOMAINS", 520, 276, 3, rgba("#E2E8F0"));
circle(map, 224, 81, 6, rgba("#F59E0B"));
circle(map, 486, 81, 6, rgba("#F59E0B"));
circle(map, 224, 279, 6, rgba("#F59E0B"));
circle(map, 486, 279, 6, rgba("#F59E0B"));
writePng("public/images/threat-map.png", map);

const favicon = image(64, 64);
strokeRect(favicon, 16, 10, 32, 42, rgba("#22D3EE"), 3);
circle(favicon, 32, 30, 10, rgba("#F59E0B"));
line(favicon, 40, 38, 50, 48, rgba("#22D3EE"), 4);
const payload = PNG.sync.write(favicon);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(64, 0);
entry.writeUInt8(64, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(payload.length, 8);
entry.writeUInt32LE(22, 12);
fs.writeFileSync(path.join(root, "public/brand/favicon.ico"), Buffer.concat([header, entry, payload]));
