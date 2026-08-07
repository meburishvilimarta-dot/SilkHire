import { useTranslations } from 'next-intl';
import type { CostCountry } from '@/data/cost-comparison';

/**
 * The hero's visual: the corridor SilkHire operates, drawn as a route.
 *
 * Two arcs leave Tbilisi and land in India and the Philippines. Each arc draws
 * itself once on load, then a short dash travels along it continuously. All of
 * it is CSS on an inline SVG — no canvas, no animation library, no image
 * request — and `pathLength="1"` normalises every path so the dash maths is
 * exact regardless of the actual curve length.
 */

interface Node {
  id: CostCountry;
  /** Percentage coordinates inside the square box. */
  x: number;
  y: number;
  origin?: boolean;
  labelSide: 'left' | 'right';
}

const nodes: Node[] = [
  { id: 'GE', x: 21, y: 29, origin: true, labelSide: 'right' },
  { id: 'IN', x: 55, y: 72, labelSide: 'right' },
  { id: 'PH', x: 82, y: 47, labelSide: 'left' },
];

/** Arcs in the SVG's own 400×400 user space. */
const arcs = [
  { id: 'to-in', d: 'M84 116C112 208 148 268 220 288', delay: '0.2s' },
  { id: 'to-ph', d: 'M84 116C168 62 268 96 328 188', delay: '0.45s' },
];

export function RouteGraphic() {
  const tCountries = useTranslations('taxonomies.countries');

  return (
    <div className="relative aspect-square w-full">
      {/* Depth behind the drawing: a soft brand glow, off-centre. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(60%_60%_at_35%_35%,rgba(23,131,106,0.28),transparent_70%)] blur-2xl"
      />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        className="relative h-full w-full overflow-visible"
      >
        {/* Reach rings, centred on Tbilisi. */}
        {[70, 128, 186, 244].map((r, index) => (
          <circle
            key={r}
            cx="84"
            cy="116"
            r={r}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 7"
            className="text-void-ink"
            opacity={0.26 - index * 0.05}
          />
        ))}

        {/* Horizon lines — a suggestion of a globe, not a literal one. */}
        {[52, 148, 244, 340].map((y) => (
          <path
            key={y}
            d={`M-20 ${y}Q200 ${y - 34} 420 ${y}`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-void-ink"
            opacity="0.11"
          />
        ))}

        {arcs.map((arc) => (
          <g key={arc.id}>
            {/* The route: drawn once, left in place. */}
            <path
              d={arc.d}
              pathLength={1}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw text-void-ink/45"
              style={
                {
                  '--draw-length': 1,
                  strokeDasharray: 1,
                  animationDelay: arc.delay,
                } as React.CSSProperties
              }
            />
            {/* A short dash running the same route, forever. */}
            <path
              d={arc.d}
              pathLength={1}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-travel text-accent-bright"
              style={
                {
                  '--travel-length': 1,
                  strokeDasharray: '0.14 0.86',
                  animationDelay: arc.delay,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </svg>

      {/* Nodes and labels sit in HTML rather than SVG <text>, so Georgian
          place names wrap and hyphenate like real text. */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute flex items-center gap-2.5"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            flexDirection: node.labelSide === 'left' ? 'row-reverse' : 'row',
          }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {node.origin ? (
              <span
                aria-hidden="true"
                className="animate-pulse-ring absolute inset-0 rounded-full bg-accent"
              />
            ) : null}
            <span
              className={`relative h-2.5 w-2.5 rounded-full ring-4 ${
                node.origin
                  ? 'bg-accent ring-accent/15'
                  : 'bg-void-ink ring-void-ink/10'
              }`}
            />
          </span>
          <span
            className={`text-[0.6875rem] font-medium tracking-wide whitespace-nowrap ${
              node.origin ? 'text-void-ink' : 'text-void-muted'
            }`}
          >
            {tCountries(node.id)}
          </span>
        </div>
      ))}
    </div>
  );
}
