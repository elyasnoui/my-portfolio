import type { Project } from '@/constants/projects';

type GlyphProps = {
  variant: Project['glyph'];
  className?: string;
};

/**
 * Abstract, code-inspired graphics drawn as inline SVG — no image weight, no
 * stock photography, and they scale cleanly at any panel size. Hairlines use
 * currentColor; the accent is applied directly.
 */
const ProjectGlyph = ({ variant, className = '' }: GlyphProps) => {
  const common = {
    className,
    viewBox: '0 0 800 480',
    preserveAspectRatio: 'xMidYMid slice',
    'aria-hidden': true,
    focusable: 'false' as const,
  };

  if (variant === 'grid') {
    // Modular grid with a few live cells — a page being composed.
    const cells = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 10; col++) {
        cells.push({ row, col });
      }
    }
    const live = new Set(['1-2', '2-3', '3-3', '2-6', '4-7', '1-8']);
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeWidth="1" opacity="0.28">
          {cells.map(({ row, col }) => (
            <rect
              key={`${row}-${col}`}
              x={40 + col * 72}
              y={40 + row * 66}
              width="72"
              height="66"
              fill="none"
            />
          ))}
        </g>
        <g fill="#ff5a1f">
          {[...live].map((key) => {
            const [row, col] = key.split('-').map(Number);
            return (
              <rect
                key={key}
                x={40 + col * 72}
                y={40 + row * 66}
                width="72"
                height="66"
                opacity={0.14 + (row % 3) * 0.08}
              />
            );
          })}
        </g>
        <g stroke="#ff5a1f" strokeWidth="1.5">
          <path d="M112 106h216v132" fill="none" />
          <path d="M472 172v198h144" fill="none" />
        </g>
      </svg>
    );
  }

  if (variant === 'nodes') {
    const nodes = [
      [130, 120], [300, 80], [470, 150], [640, 110],
      [180, 300], [360, 250], [540, 320], [680, 260],
      [260, 400], [470, 400],
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5],
      [3, 7], [4, 8], [5, 6], [6, 7], [6, 9], [8, 9], [5, 9],
    ];
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeWidth="1" opacity="0.35">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
            />
          ))}
        </g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 4 === 1 ? 9 : 5} fill={i % 4 === 1 ? '#ff5a1f' : 'currentColor'} opacity={i % 4 === 1 ? 1 : 0.5} />
            {i % 4 === 1 && (
              <circle cx={x} cy={y} r="20" fill="none" stroke="#ff5a1f" strokeWidth="1" opacity="0.5" />
            )}
          </g>
        ))}
      </svg>
    );
  }

  if (variant === 'flow') {
    // Request lanes moving left to right through a processing boundary.
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeWidth="1" opacity="0.25">
          {[100, 170, 240, 310, 380].map((y) => (
            <line key={y} x1="40" y1={y} x2="760" y2={y} />
          ))}
        </g>
        <rect x="330" y="60" width="140" height="360" fill="none" stroke="#ff5a1f" strokeWidth="1.5" />
        <g fill="#ff5a1f">
          {[100, 240, 380].map((y, i) => (
            <rect key={y} x={330} y={y - 6} width={140} height={12} opacity={0.18 + i * 0.08} />
          ))}
        </g>
        <g stroke="currentColor" strokeWidth="2" opacity="0.55" fill="none">
          <path d="M60 100h240m0 0-14-9m14 9-14 9" />
          <path d="M500 240h240m0 0-14-9m14 9-14 9" />
        </g>
        <g stroke="#ff5a1f" strokeWidth="2" fill="none">
          <path d="M60 310h240m0 0-14-9m14 9-14 9" />
        </g>
        <g fill="currentColor" opacity="0.4">
          <rect x="40" y="60" width="40" height="4" />
          <rect x="720" y="416" width="40" height="4" />
        </g>
      </svg>
    );
  }

  // 'stack' — layered infrastructure planes.
  return (
    <svg {...common}>
      <g strokeWidth="1.5" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} stroke={i === 1 ? '#ff5a1f' : 'currentColor'} opacity={i === 1 ? 1 : 0.35}>
            <path
              d={`M400 ${80 + i * 96} 700 ${170 + i * 96} 400 ${260 + i * 96} 100 ${170 + i * 96}Z`}
            />
          </g>
        ))}
      </g>
      <g fill="#ff5a1f" opacity="0.12">
        <path d="M400 176 700 266 400 356 100 266Z" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        <line x1="400" y1="80" x2="400" y2="452" strokeDasharray="4 8" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="400" cy="80" r="5" />
        <circle cx="700" cy="170" r="4" />
        <circle cx="100" cy="362" r="4" />
      </g>
    </svg>
  );
};

export default ProjectGlyph;
