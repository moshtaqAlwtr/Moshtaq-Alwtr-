/**
 * Abstract UI mockups for the project cards.
 *
 * Real screenshots of client systems can't be published, and stock imagery
 * would read as filler — so each project gets a schematic drawn from theme
 * tokens. They adapt to light/dark automatically and cost nothing to load.
 *
 * `hue` comes from the project meta and tints the mock without leaving the
 * surrounding palette.
 */

const surface = 'rgb(var(--surface-2))'
const line = 'rgb(var(--border))'

function tint(hue, s, l, a = 1) {
  return `hsl(${hue} ${s}% ${l}% / ${a})`
}

function Frame({ children, hue }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(160deg, ${tint(hue, 60, 50, 0.1)}, transparent 55%), ${surface}`,
        border: `1px solid ${line}`,
      }}
      aria-hidden
    >
      {children}
    </div>
  )
}

/* Window chrome dots shared by the desktop-style mocks. */
function Chrome({ hue }) {
  return (
    <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: line }}>
      {[0.5, 0.32, 0.22].map((o, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ background: tint(hue, 55, 55, o) }}
        />
      ))}
      <span
        className="ms-2 h-1.5 w-20 rounded-full"
        style={{ background: 'rgb(var(--border-strong))' }}
      />
    </div>
  )
}

function Bar({ w, h = 6, hue, o = 0.25, rounded = 'rounded-full' }) {
  return (
    <span
      className={`block ${rounded}`}
      style={{ width: w, height: h, background: tint(hue, 50, 55, o) }}
    />
  )
}

/* ---------------------------------------------------------------- variants */

function Dashboard({ hue }) {
  const bars = [38, 62, 45, 78, 55, 90, 68]

  return (
    <Frame hue={hue}>
      <Chrome hue={hue} />
      <div className="flex h-[calc(100%-41px)] gap-3 p-4">
        {/* sidebar */}
        <div className="flex w-14 shrink-0 flex-col gap-2">
          {[0.55, 0.2, 0.2, 0.2, 0.2].map((o, i) => (
            <span
              key={i}
              className="h-6 rounded-lg"
              style={{ background: tint(hue, 55, 55, o) }}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* stat tiles */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg p-2"
                style={{ background: tint(hue, 50, 55, 0.09), border: `1px solid ${line}` }}
              >
                <Bar w="60%" h={4} hue={hue} o={0.3} />
                <div className="mt-1.5">
                  <Bar w="80%" h={8} hue={hue} o={0.5} />
                </div>
              </div>
            ))}
          </div>

          {/* chart */}
          <div
            className="flex flex-1 items-end gap-1.5 rounded-lg p-3"
            style={{ background: tint(hue, 50, 55, 0.06), border: `1px solid ${line}` }}
          >
            {bars.map((h, i) => (
              <span
                key={i}
                className="mock-bar flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  // taller bars have less headroom before they clip the panel
                  '--mock-grow': 1 + (100 - h) / 260,
                  transitionDelay: `${i * 45}ms`,
                  background: `linear-gradient(180deg, ${tint(hue, 65, 58, 0.75)}, ${tint(hue, 65, 58, 0.2)})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function FactoryLine({ hue }) {
  return (
    <Frame hue={hue}>
      <Chrome hue={hue} />
      <div className="flex h-[calc(100%-41px)] items-center gap-4 p-4">
        {/* gauge */}
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="10"
              stroke={tint(hue, 40, 55, 0.16)}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              stroke={tint(hue, 70, 55, 0.9)}
              strokeDasharray="251"
              strokeDashoffset="63"
              className="mock-gauge"
            />
          </svg>
          <span
            className="absolute inset-0 grid place-items-center font-mono text-sm font-bold"
            style={{ color: tint(hue, 65, 55, 1) }}
          >
            75%
          </span>
        </div>

        {/* production lines */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {[85, 62, 94, 47].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: tint(hue, 70, 55, i === 3 ? 0.35 : 0.9) }}
              />
              <span
                className="h-2 flex-1 overflow-hidden rounded-full"
                style={{ background: tint(hue, 40, 55, 0.14) }}
              >
                <span
                  className="mock-fill block h-full rounded-full"
                  style={{
                    width: `${w}%`,
                    '--mock-to': `${Math.min(w + 12, 100)}%`,
                    transitionDelay: `${i * 70}ms`,
                    background: `linear-gradient(90deg, ${tint(hue, 70, 58, 0.85)}, ${tint(hue, 70, 58, 0.4)})`,
                  }}
                />
              </span>
              <Bar w={22} h={5} hue={hue} o={0.3} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function MapTracking({ hue }) {
  const pins = [
    { x: 26, y: 32 },
    { x: 58, y: 24 },
    { x: 44, y: 58 },
    { x: 72, y: 62 },
    { x: 34, y: 76 },
  ]

  return (
    <Frame hue={hue}>
      <div className="relative h-full w-full">
        {/* map grid */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="none">
          {[20, 45, 70, 95].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke={line} strokeWidth="0.6" />
          ))}
          {[30, 70, 110, 150].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="120" stroke={line} strokeWidth="0.6" />
          ))}
          <path
            d="M0 78 Q 48 62 92 74 T 200 58"
            fill="none"
            stroke={tint(hue, 60, 55, 0.35)}
            strokeWidth="2.5"
          />
        </svg>

        {/* geofence */}
        <span
          className="absolute rounded-full"
          style={{
            left: '30%',
            top: '26%',
            width: '46%',
            height: '52%',
            border: `1.5px dashed ${tint(hue, 65, 55, 0.55)}`,
            background: tint(hue, 65, 55, 0.08),
          }}
        />

        {pins.map((p, i) => (
          <span
            key={i}
            className={`mock-pin absolute h-2.5 w-2.5 rounded-full ring-4 ${
              i === 4 ? 'mock-pin-alert' : ''
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transitionDelay: `${i * 60}ms`,
              background: tint(hue, 70, 52, 1),
              // the outlier pin flags the geofence breach the app alerts on
              ...(i === 4
                ? { background: 'rgb(var(--brand-3))', boxShadow: '0 0 0 4px rgb(var(--brand-3) / 0.25)' }
                : { boxShadow: `0 0 0 4px ${tint(hue, 70, 52, 0.2)}` }),
            }}
          />
        ))}
      </div>
    </Frame>
  )
}

function Subscriptions({ hue }) {
  return (
    <Frame hue={hue}>
      <div className="flex h-full items-stretch gap-3 p-4">
        {/* phone */}
        <div
          className="flex w-[34%] shrink-0 flex-col gap-2 rounded-xl p-2.5"
          style={{ background: tint(hue, 50, 55, 0.1), border: `1px solid ${line}` }}
        >
          <span
            className="mx-auto h-1 w-6 rounded-full"
            style={{ background: 'rgb(var(--border-strong))' }}
          />
          <div
            className="rounded-lg p-2"
            style={{ background: tint(hue, 60, 55, 0.22) }}
          >
            <Bar w="70%" h={4} hue={hue} o={0.6} />
            <div className="mt-1.5">
              <Bar w="45%" h={7} hue={hue} o={0.8} />
            </div>
          </div>
          {[0.2, 0.16, 0.12].map((o, i) => (
            <span
              key={i}
              className="h-4 rounded-md"
              style={{ background: tint(hue, 50, 55, o) }}
            />
          ))}
        </div>

        {/* dashboard */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="mock-tile rounded-lg p-2"
                style={{
                  background: tint(hue, 50, 55, 0.09),
                  border: `1px solid ${line}`,
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <Bar w="55%" h={4} hue={hue} o={0.3} />
                <div className="mt-1.5">
                  <Bar w="75%" h={7} hue={hue} o={0.55} />
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex flex-1 flex-col justify-center gap-2 rounded-lg p-2.5"
            style={{ background: tint(hue, 50, 55, 0.06), border: `1px solid ${line}` }}
          >
            {[92, 74, 58, 40].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: tint(hue, 60, 55, 0.3) }}
                />
                <Bar w={`${w}%`} h={4} hue={hue} o={0.28} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function Store({ hue }) {
  return (
    <Frame hue={hue}>
      <Chrome hue={hue} />
      <div className="h-[calc(100%-41px)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <Bar w={70} h={6} hue={hue} o={0.4} />
          <span
            className="h-5 w-5 rounded-md"
            style={{ background: tint(hue, 65, 55, 0.45) }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="mock-tile overflow-hidden rounded-lg"
              style={{
                background: tint(hue, 50, 55, 0.09),
                border: `1px solid ${line}`,
                transitionDelay: `${i * 50}ms`,
              }}
            >
              <span
                className="block h-8"
                style={{ background: tint(hue, 55, 55, i % 2 ? 0.16 : 0.24) }}
              />
              <div className="space-y-1 p-1.5">
                <Bar w="80%" h={3} hue={hue} o={0.3} />
                <Bar w="45%" h={3} hue={hue} o={0.5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Contract({ hue }) {
  return (
    <Frame hue={hue}>
      <div className="flex h-full items-stretch gap-3 p-4">
        {/* the contract sheet: clauses above, two signature blocks below */}
        <div
          className="flex min-w-0 flex-[1.5] flex-col rounded-lg p-3"
          style={{ background: tint(hue, 45, 55, 0.08), border: `1px solid ${line}` }}
        >
          <div className="mb-2 flex items-center justify-between">
            <Bar w={54} h={5} hue={hue} o={0.5} />
            <span
              className="h-4 w-4 rounded-full"
              style={{ background: tint(hue, 65, 55, 0.35) }}
            />
          </div>

          <div className="flex-1 space-y-1.5">
            {['92%', '78%', '86%', '64%'].map((w, i) => (
              <Bar key={i} w={w} h={3} hue={hue} o={0.22} />
            ))}
          </div>

          {/* both parties signed */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-1">
                <svg viewBox="0 0 60 14" className="h-3.5 w-full">
                  <path
                    d={
                      i === 0
                        ? 'M2 10 q6 -9 11 -1 t9 -1 q5 6 10 -3 t12 2'
                        : 'M2 9 q5 -7 10 0 t8 -3 q6 7 11 -2 t13 3'
                    }
                    fill="none"
                    stroke={tint(hue, 70, 55, 0.85)}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className={`mock-sign ${i === 1 ? 'mock-sign-2' : ''}`}
                  />
                </svg>
                <span
                  className="block h-px w-full"
                  style={{ background: tint(hue, 40, 55, 0.3) }}
                />
                <Bar w="55%" h={2.5} hue={hue} o={0.3} />
              </div>
            ))}
          </div>
        </div>

        {/* lawyer side: case rows with status dots */}
        <div
          className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg p-3"
          style={{ background: tint(hue, 45, 55, 0.05), border: `1px solid ${line}` }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="h-5 w-5 shrink-0 rounded-md"
              style={{ background: tint(hue, 65, 55, 0.4) }}
            />
            <Bar w="60%" h={4} hue={hue} o={0.35} />
          </div>

          {[
            { w: '85%', o: 0.9 },
            { w: '70%', o: 0.55 },
            { w: '78%', o: 0.35 },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-md p-1.5"
              style={{ background: tint(hue, 50, 55, 0.07) }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: tint(hue, 70, 55, row.o) }}
              />
              <Bar w={row.w} h={3} hue={hue} o={0.25} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

const VARIANTS = {
  dashboard: Dashboard,
  factory: FactoryLine,
  map: MapTracking,
  subscriptions: Subscriptions,
  store: Store,
  contract: Contract,
}

export default function ProjectVisual({ variant, hue = 258, className = '' }) {
  const Variant = VARIANTS[variant] ?? Dashboard
  return (
    <div className={className}>
      <Variant hue={hue} />
    </div>
  )
}
