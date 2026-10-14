// Ilustrasi SVG untuk soal kuis CoFun.
// Semua warna memakai token tema yang sudah ada di globals.css.

type Props = { id?: string };

// Warna tema (harus sama dengan @theme di app/globals.css).
const C = {
  primary: "#006194",
  secondary: "#006c49",
  tertiary: "#825100",
  error: "#ba1a1a",
  surface: "#ffffff",
  surfaceHigh: "#eef2f6",
  outline: "#bfc7d2",
  primaryFixed: "#cce5ff",
  secondaryFixed: "#6ffbbe",
  tertiaryFixed: "#ffddb8",
  errorContainer: "#ffdad6",
};

function Frame({ children, height = 160 }: { children: React.ReactNode; height?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest"
      role="img"
      style={{ height }}
      viewBox="0 0 480 160"
    >
      {children}
    </svg>
  );
}

function Robot({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      <rect fill={C.primary} height="34" rx="8" width="34" x="-17" y="-17" />
      <circle cx="-5" cy="-4" fill={C.secondaryFixed} r="4" />
      <circle cx="5" cy="-4" fill={C.secondaryFixed} r="4" />
      <rect fill={C.surface} height="4" rx="2" width="16" x="-8" y="6" />
      {/* panah hadap ke kanan (arah 0°) */}
      <polygon fill={C.tertiaryFixed} points="22,0 12,-6 12,6" />
    </g>
  );
}

// Bintang digambar sebagai poligon SVG (bukan emoji) supaya tampil konsisten
// di semua perangkat.
const STAR_POINTS = "0,-9 2.6,-3.5 8.5,-2.8 4.3,1.8 5.3,7.6 0,4.5 -5.3,7.6 -4.3,1.8 -8.5,-2.8 -2.6,-3.5";

function Star({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return <polygon fill={C.tertiary} points={STAR_POINTS} transform={`translate(${cx} ${cy}) scale(${scale})`} />;
}

// Kunci digambar dengan lingkaran + batang + gigi (bukan emoji).
function KeyGlyph({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g
      fill="none"
      stroke={C.tertiary}
      strokeLinecap="round"
      strokeWidth="2.5"
      transform={`translate(${cx} ${cy}) scale(${scale})`}
    >
      <circle cx="0" cy="-4" r="3.5" />
      <line x1="0" y1="-0.5" x2="0" y2="9" />
      <line x1="0" y1="5" x2="4" y2="5" />
      <line x1="0" y1="8" x2="4" y2="8" />
    </g>
  );
}

// Gambar kecil untuk kartu urutan (air panas, teh, cangkir, minum) —
// semua bentuk SVG sederhana, tanpa emoji.
function TehGlyph({ kind }: { kind: "air" | "teh" | "cangkir" | "minum" }) {
  if (kind === "air") {
    return (
      <g>
        <path d="M-8,-8 L-6,10 L6,10 L8,-8 Z" fill={C.primaryFixed} stroke={C.primary} strokeWidth="2" />
        <path d="M-3,-11 q1.5,-3 0,-6" fill="none" stroke={C.outline} strokeLinecap="round" strokeWidth="1.5" />
        <path d="M3,-11 q1.5,-3 0,-6" fill="none" stroke={C.outline} strokeLinecap="round" strokeWidth="1.5" />
      </g>
    );
  }
  if (kind === "teh") {
    return (
      <g>
        <ellipse cx="0" cy="3" fill={C.secondaryFixed} rx="10" ry="8" stroke={C.secondary} strokeWidth="2" />
        <path d="M10,-1 Q16,-5 13,-11" fill="none" stroke={C.secondary} strokeLinecap="round" strokeWidth="2.5" />
        <rect fill={C.secondary} height="3" rx="1" width="7" x="-3.5" y="-8" />
        <path d="M-10,-1 Q-15,3 -10,7" fill="none" stroke={C.secondary} strokeWidth="2" />
      </g>
    );
  }
  if (kind === "cangkir") {
    return (
      <g>
        <path d="M-8,-6 L-6,9 L6,9 L8,-6 Z" fill={C.surface} stroke={C.primary} strokeWidth="2" />
        <path d="M8,-3 Q13,1 8,5" fill="none" stroke={C.primary} strokeWidth="2" />
        <line stroke={C.outline} strokeLinecap="round" strokeWidth="1.5" x1="-3" y1="-10" x2="-3" y2="-14" />
        <line stroke={C.outline} strokeLinecap="round" strokeWidth="1.5" x1="2" y1="-10" x2="2" y2="-14" />
      </g>
    );
  }
  return (
    <g>
      <circle cx="0" cy="0" fill={C.tertiaryFixed} r="11" stroke={C.tertiary} strokeWidth="2" />
      <circle cx="-4" cy="-2" fill={C.tertiary} r="1.6" />
      <circle cx="4" cy="-2" fill={C.tertiary} r="1.6" />
      <path d="M-4.5,3.5 Q0,8 4.5,3.5" fill="none" stroke={C.tertiary} strokeLinecap="round" strokeWidth="2" />
    </g>
  );
}

function Grid({
  cells,
  cell = 34,
  ox,
  oy,
}: {
  cells: { col: number; row: number; kind: "path" | "rock" | "goal" | "key" | "door" }[];
  cell?: number;
  ox: number;
  oy: number;
}) {
  return (
    <g>
      {cells.map(({ col, row, kind }) => {
        const x = ox + col * cell;
        const y = oy + row * cell;
        if (kind === "rock")
          return <rect fill={C.errorContainer} height={cell - 2} rx="4" width={cell - 2} x={x + 1} y={y + 1} key={`${col}-${row}`} />;
        if (kind === "goal")
          return (
            <g key={`${col}-${row}`}>
              <rect fill={C.tertiaryFixed} height={cell - 2} rx="4" width={cell - 2} x={x + 1} y={y + 1} />
              <Star cx={x + cell / 2} cy={y + cell / 2 + 2} scale={0.9} />
            </g>
          );
        if (kind === "key")
          return (
            <g key={`${col}-${row}`}>
              <KeyGlyph cx={x + cell / 2} cy={y + cell / 2 + 2} scale={0.9} />
            </g>
          );
        if (kind === "door")
          return <rect fill={C.primaryFixed} height={cell - 2} rx="4" stroke={C.primary} width={cell - 2} x={x + 1} y={y + 1} key={`${col}-${row}`} />;
        return <rect fill={C.surface} height={cell - 2} rx="4" stroke={C.outline} width={cell - 2} x={x + 1} y={y + 1} key={`${col}-${row}`} />;
      })}
    </g>
  );
}

function Card({ x, label, sub, fill, stroke }: { x: number; label: string; sub?: string; fill: string; stroke?: string }) {
  return (
    <g>
      <rect fill={fill} height="76" rx="12" stroke={stroke ?? C.outline} strokeWidth="2" width="100" x={x} y="42" />
      <text fill={C.primary} fontFamily="monospace" fontSize="14" fontWeight="bold" textAnchor="middle" x={x + 50} y="78">
        {label}
      </text>
      {sub && (
        <text fill={C.tertiary} fontSize="12" textAnchor="middle" x={x + 50} y="98">
          {sub}
        </text>
      )}
    </g>
  );
}

// ---------- 15 ilustrasi ----------

function PolaBentuk() {
  const shapes = ["circle", "square", "circle", "square"];
  return (
    <Frame>
      {shapes.map((s, i) => {
        const x = 70 + i * 80;
        return s === "circle" ? (
          <circle cx={x} cy="80" fill={C.primaryFixed} key={i} r="24" stroke={C.primary} strokeWidth="2" />
        ) : (
          <rect fill={C.secondaryFixed} height="46" key={i} rx="6" stroke={C.secondary} strokeWidth="2" width="46" x={x - 23} y="57" />
        );
      })}
      <rect fill={C.tertiaryFixed} height="52" rx="10" stroke={C.tertiary} strokeDasharray="6 4" strokeWidth="2" width="52" x="390" y="54" />
      <text fill={C.tertiary} fontSize="28" fontWeight="bold" textAnchor="middle" x="416" y="90">
        ?
      </text>
      {shapes.map((_, i) => (
        <line key={`a${i}`} stroke={C.outline} strokeWidth="2" x1={70 + i * 80 + 30} x2={70 + (i + 1) * 80 - 30} y1="80" y2="80" />
      ))}
      <line stroke={C.outline} strokeWidth="2" x1="410" x2="390" y1="80" y2="80" />
    </Frame>
  );
}

function ObjekBulat() {
  return (
    <Frame>
      {/* bola */}
      <circle cx="70" cy="80" fill={C.primaryFixed} r="26" stroke={C.primary} strokeWidth="2" />
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="70" y="140">
        Bola
      </text>
      {/* kotak */}
      <rect fill={C.errorContainer} height="48" rx="4" stroke={C.error} strokeWidth="2" width="48" x="170" y="56" />
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="194" y="140">
        Kotak
      </text>
      {/* roda */}
      <circle cx="310" cy="80" fill={C.secondaryFixed} r="26" stroke={C.secondary} strokeWidth="2" />
      <circle cx="310" cy="80" fill={C.surface} r="8" stroke={C.secondary} strokeWidth="2" />
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="310" y="140">
        Roda
      </text>
      {/* segitiga */}
      <polygon fill={C.tertiaryFixed} points="410,50 438,110 382,110" stroke={C.tertiary} strokeWidth="2" />
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="410" y="140">
        Segitiga
      </text>
    </Frame>
  );
}

function RobotArah() {
  return (
    <Frame>
      <Robot rotate={0} scale={1.6} x={150} y={80} />
      <line stroke={C.tertiary} strokeWidth="3" x1="210" x2="330" y1="80" y2="80" />
      <polygon fill={C.tertiary} points="350,80 328,68 328,92" />
      <text fill={C.primary} fontSize="15" fontWeight="bold" x="250" y="60">
        maju 1 langkah
      </text>
      <rect fill={C.tertiaryFixed} height="34" rx="8" width="34" x="360" y="63" />
      <Star cx={377} cy={80} scale={0.9} />
    </Frame>
  );
}

function UrutanTeh() {
  const cards = [
    { x: 30, kind: "air" as const, label: "Air panas" },
    { x: 150, kind: "teh" as const, label: "Teh" },
    { x: 270, kind: "cangkir" as const, label: "Cangkir" },
    { x: 390, kind: "minum" as const, label: "Minum" },
  ];
  return (
    <Frame>
      {cards.map((c) => (
        <g key={c.label}>
          <rect fill={C.surfaceHigh} height="90" rx="12" stroke={C.outline} strokeWidth="2" width="60" x={c.x} y="35" />
          <g transform={`translate(${c.x + 30} 72)`}>
            <TehGlyph kind={c.kind} />
          </g>
          <text fill={C.primary} fontSize="10" textAnchor="middle" x={c.x + 30} y={145}>
            {c.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function GridRobotKecil() {
  const cells = [];
  for (let r = 0; r < 3; r += 1) for (let c = 0; c < 3; c += 1) cells.push({ col: c, row: r, kind: "path" as const });
  return (
    <Frame>
      <Grid cells={cells} ox={160} oy={28} />
      <Robot rotate={0} scale={1.1} x={177} y={45} />
      <text fill={C.primary} fontSize="12" fontWeight="bold" x="20" y="60">
        (0,0)
      </text>
      <text fill={C.tertiary} fontSize="12" x="20" y="80">
        robot hadap kanan
      </text>
      <text fill={C.primary} fontSize="12" fontWeight="bold" x="380" y="60">
        program:
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="380" y="82">
        maju
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="380" y="100">
        maju
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="380" y="118">
        belok kanan
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="380" y="136">
        maju
      </text>
    </Frame>
  );
}

function RuteDebug() {
  return (
    <Frame>
      <Robot rotate={0} x={60} y={80} />
      <polyline fill="none" points="80,80 160,80 240,80 320,80" stroke={C.secondary} strokeDasharray="6 5" strokeWidth="3" />
      <circle cx="160" cy="80" fill={C.primaryFixed} r="14" stroke={C.primary} strokeWidth="2" />
      <text fill={C.primary} fontSize="12" fontWeight="bold" textAnchor="middle" x="160" y="85">
        1
      </text>
      <circle cx="240" cy="80" fill={C.errorContainer} r="14" stroke={C.error} strokeWidth="2" />
      <text fill={C.error} fontSize="12" fontWeight="bold" textAnchor="middle" x="240" y="85">
        2
      </text>
      <line stroke={C.error} strokeWidth="2" x1="232" x2="248" y1="72" y2="88" />
      <line stroke={C.error} strokeWidth="2" x1="248" x2="232" y1="72" y2="88" />
      <text fill={C.tertiary} fontSize="11" textAnchor="middle" x="240" y="115">
        belok kiri?
      </text>
      <rect fill={C.tertiaryFixed} height="34" rx="8" width="34" x="335" y="63" />
      <Star cx={352} cy={80} scale={0.9} />
      <text fill={C.primary} fontSize="12" fontWeight="bold" x="400" y="85">
        bintang
      </text>
    </Frame>
  );
}

function SlotProgram() {
  return (
    <Frame>
      <Card fill={C.surface} label="maju" x={30} />
      <Card fill={C.surface} label="maju" x={140} />
      <g>
        <rect fill={C.tertiaryFixed} height="76" rx="12" stroke={C.tertiary} strokeDasharray="6 4" strokeWidth="2" width="100" x="250" y="42" />
        <text fill={C.tertiary} fontSize="30" fontWeight="bold" textAnchor="middle" x="300" y="90">
          ?
        </text>
      </g>
      <Card fill={C.surface} label="maju" x={360} />
      <Robot rotate={0} scale={0.8} x={40} y={150} />
    </Frame>
  );
}

function RobotBintang() {
  return (
    <Frame>
      <Grid
        cells={[
          { col: 0, row: 0, kind: "path" },
          { col: 1, row: 0, kind: "path" },
          { col: 2, row: 0, kind: "path" },
          { col: 3, row: 0, kind: "path" },
          { col: 3, row: 1, kind: "path" },
          { col: 3, row: 2, kind: "path" },
          { col: 3, row: 3, kind: "goal" },
        ]}
        ox={160}
        oy={14}
      />
      <Robot rotate={0} scale={1} x={177} y={31} />
      <text fill={C.primary} fontSize="13" fontWeight="bold" x="20" y="50">
        Instruksi:
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="20" y="72">
        maju
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="20" y="92">
        belok kanan
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="20" y="112">
        belok kiri
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="12" x="20" y="132">
        ulangi 3
      </text>
    </Frame>
  );
}

function RuteLangkah() {
  return (
    <Frame>
      <Robot rotate={0} x={60} y={80} />
      <polyline fill="none" points="85,80 150,80 150,120 280,120 280,60" stroke={C.secondary} strokeDasharray="6 5" strokeWidth="3" />
      <circle cx="150" cy="80" fill={C.primaryFixed} r="14" stroke={C.primary} strokeWidth="2" />
      <text fill={C.primary} fontSize="12" fontWeight="bold" textAnchor="middle" x="150" y="85">
        1
      </text>
      <circle cx="150" cy="120" fill={C.errorContainer} r="14" stroke={C.error} strokeWidth="2" />
      <text fill={C.error} fontSize="12" fontWeight="bold" textAnchor="middle" x="150" y="125">
        2
      </text>
      <line stroke={C.error} strokeWidth="2" x1="142" x2="158" y1="112" y2="128" />
      <line stroke={C.error} strokeWidth="2" x1="158" x2="142" y1="112" y2="128" />
      <circle cx="280" cy="120" fill={C.primaryFixed} r="14" stroke={C.primary} strokeWidth="2" />
      <text fill={C.primary} fontSize="12" fontWeight="bold" textAnchor="middle" x="280" y="125">
        3
      </text>
      <rect fill={C.tertiaryFixed} height="34" rx="8" width="34" x="263" y="26" />
      <Star cx={280} cy={43} scale={0.9} />
      <text fill={C.primary} fontSize="12" fontWeight="bold" x="330" y="70">
        langkah 2
      </text>
      <text fill={C.error} fontSize="12" x="330" y="90">
        menyimpang
      </text>
    </Frame>
  );
}

function SituasiBatu() {
  return (
    <Frame>
      <text fill={C.error} fontSize="12" fontWeight="bold" textAnchor="middle" x="120" y="30">
        Ada batu di depan
      </text>
      <rect fill={C.errorContainer} height="30" rx="4" stroke={C.error} strokeWidth="2" width="30" x="170" y="65" />
      <Robot rotate={0} scale={0.8} x={120} y={80} />
      <text fill={C.secondary} fontSize="12" fontWeight="bold" textAnchor="middle" x="120" y="140">
        → belok
      </text>
      <line stroke={C.outline} strokeWidth="2" x1="240" x2="240" y1="30" y2="150" />
      <text fill={C.secondary} fontSize="12" fontWeight="bold" textAnchor="middle" x="360" y="30">
        Jalan aman
      </text>
      <rect fill={C.surface} height="30" rx="4" stroke={C.outline} strokeWidth="2" width="30" x="400" y="65" />
      <Robot rotate={0} scale={0.8} x={350} y={80} />
      <text fill={C.secondary} fontSize="12" fontWeight="bold" textAnchor="middle" x="360" y="140">
        → maju
      </text>
    </Frame>
  );
}

function KotakVariabel() {
  return (
    <Frame>
      <rect fill={C.primaryFixed} height="70" rx="12" stroke={C.primary} strokeWidth="2" width="160" x="40" y="45" />
      <text fill={C.primary} fontSize="13" fontWeight="bold" textAnchor="middle" x="120" y="72">
        variabel: jumlah
      </text>
      <text fill={C.primary} fontFamily="monospace" fontSize="22" fontWeight="bold" textAnchor="middle" x="120" y="100">
        0
      </text>
      <line stroke={C.secondary} strokeWidth="3" x1="215" x2="285" y1="80" y2="80" />
      <polygon fill={C.secondary} points="300,80 278,68 278,92" />
      <rect fill={C.secondaryFixed} height="70" rx="12" stroke={C.secondary} strokeWidth="2" width="160" x="320" y="45" />
      <text fill={C.secondary} fontSize="13" fontWeight="bold" textAnchor="middle" x="400" y="72">
        ambil kunci +1
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="22" fontWeight="bold" textAnchor="middle" x="400" y="100">
        3
      </text>
      <text fill={C.tertiary} fontSize="11" textAnchor="middle" x="400" y="130">
        setelah 3 kunci
      </text>
    </Frame>
  );
}

function UlangiKondisi() {
  return (
    <Frame>
      <rect fill="none" height="110" rx="14" stroke={C.secondary} strokeDasharray="8 5" strokeWidth="2" width="260" x="110" y="25" />
      <rect fill={C.secondaryFixed} height="30" rx="15" width="110" x="25" y="65" />
      <text fill={C.secondary} fontSize="12" fontWeight="bold" textAnchor="middle" x="80" y="85">
        ULANGI 3
      </text>
      <line stroke={C.secondary} strokeWidth="2" x1="110" x2="135" y1="80" y2="80" />
      <rect fill={C.tertiaryFixed} height="56" rx="10" stroke={C.tertiary} strokeWidth="2" width="200" x="140" y="52" />
      <text fill={C.tertiary} fontSize="12" fontWeight="bold" textAnchor="middle" x="240" y="74">
        JIKA ada batu?
      </text>
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="240" y="94">
        MAKA belok · SELAIN ITU maju
      </text>
      <text fill={C.tertiary} fontSize="11" textAnchor="middle" x="240" y="150">
        diperiksa setiap putaran
      </text>
    </Frame>
  );
}

function KondisiBertingkat() {
  return (
    <Frame>
      <rect fill={C.tertiaryFixed} height="70" rx="12" stroke={C.tertiary} strokeWidth="2" width="180" x="40" y="45" />
      <text fill={C.tertiary} fontSize="12" fontWeight="bold" textAnchor="middle" x="130" y="75">
        JIKA 1: ada batu?
      </text>
      <line stroke={C.outline} strokeWidth="2" x1="220" x2="260" y1="80" y2="80" />
      <rect fill={C.primaryFixed} height="70" rx="12" stroke={C.primary} strokeWidth="2" width="180" x="260" y="45" />
      <text fill={C.primary} fontSize="12" fontWeight="bold" textAnchor="middle" x="350" y="68">
        JIKA 2: jalan kiri
      </text>
      <text fill={C.primary} fontSize="12" fontWeight="bold" textAnchor="middle" x="350" y="88">
        aman?
      </text>
      <text fill={C.tertiary} fontSize="11" textAnchor="middle" x="130" y="140">
        1. cek luar dulu
      </text>
      <text fill={C.primary} fontSize="11" textAnchor="middle" x="350" y="140">
        2. baru cek dalam
      </text>
    </Frame>
  );
}

function DuaVariabel() {
  return (
    <Frame>
      <rect fill={C.primaryFixed} height="80" rx="12" stroke={C.primary} strokeWidth="2" width="170" x="30" y="40" />
      <text fill={C.primary} fontSize="13" fontWeight="bold" textAnchor="middle" x="115" y="70">
        kunci
      </text>
      <text fill={C.primary} fontFamily="monospace" fontSize="24" fontWeight="bold" textAnchor="middle" x="115" y="102">
        0
      </text>
      <rect fill={C.secondaryFixed} height="80" rx="12" stroke={C.secondary} strokeWidth="2" width="170" x="280" y="40" />
      <text fill={C.secondary} fontSize="13" fontWeight="bold" textAnchor="middle" x="365" y="70">
        energi
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="24" fontWeight="bold" textAnchor="middle" x="365" y="102">
        3
      </text>
      <text fill={C.tertiary} fontSize="11" textAnchor="middle" x="240" y="86">
        +
      </text>
      <text fill={C.tertiary} fontSize="10" textAnchor="middle" x="115" y="140">
        +1 tiap ambil kunci
      </text>
      <text fill={C.tertiary} fontSize="10" textAnchor="middle" x="365" y="140">
        -1 tiap langkah
      </text>
    </Frame>
  );
}

function RobotBelok() {
  return (
    <Frame>
      <Robot rotate={0} x={80} y={60} />
      <polyline fill="none" points="100,60 180,60 260,60" stroke={C.secondary} strokeDasharray="6 5" strokeWidth="3" />
      <Robot rotate={-90} x={260} y={60} />
      <polyline fill="none" points="260,80 260,110 260,130" stroke={C.secondary} strokeDasharray="6 5" strokeWidth="3" />
      <path d="M 220 60 A 40 40 0 0 1 260 100" fill="none" stroke={C.tertiary} strokeWidth="2" />
      <text fill={C.tertiary} fontSize="12" fontWeight="bold" x="200" y="40">
        belok kiri
      </text>
      <rect fill={C.secondaryFixed} height="30" rx="15" width="120" x="330" y="65" />
      <text fill={C.secondary} fontSize="12" fontWeight="bold" textAnchor="middle" x="390" y="85">
        ULANGI 2
      </text>
      <text fill={C.secondary} fontFamily="monospace" fontSize="11" textAnchor="middle" x="390" y="110">
        [maju, belok kiri]
      </text>
    </Frame>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  "pola-bentuk": PolaBentuk,
  "objek-bulat": ObjekBulat,
  "robot-arah": RobotArah,
  "urutan-teh": UrutanTeh,
  "grid-robot-kecil": GridRobotKecil,
  "rute-debug": RuteDebug,
  "slot-program": SlotProgram,
  "robot-bintang": RobotBintang,
  "rute-langkah": RuteLangkah,
  "situasi-batu": SituasiBatu,
  "kotak-variabel": KotakVariabel,
  "ulangi-kondisi": UlangiKondisi,
  "kondisi-bertingkat": KondisiBertingkat,
  "dua-variabel": DuaVariabel,
  "robot-belok": RobotBelok,
};

export default function KuisVisual({ id }: Props) {
  if (!id) return null;
  const Visual = VISUALS[id];
  if (!Visual) return null;
  return <Visual />;
}
