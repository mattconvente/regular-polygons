"use client";

// Generate vertex positions for a regular polygon (matches Polygon.tsx logic)
function getVertices(n: number) {
  const cx = 50, cy = 50, r = 50;
  const rot = n % 2 === 0 ? -Math.PI / 2 - Math.PI / n : -Math.PI / 2;

  return Array.from({ length: n }, (_, k) => {
    const angle = rot + (2 * Math.PI * k) / n;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });
}

type SideLabelsProps = {
  sides: number;
  label?: string;
  labelOffset?: number;
};

export function SideLabels({ sides, label = "s", labelOffset = 4 }: SideLabelsProps) {
  const vertices = getVertices(sides);
  const cx = 50, cy = 50;

  return (
    <g>
      {vertices.map((vertex, i) => {
        const nextVertex = vertices[(i + 1) % sides];

        // Midpoint of the side
        const midX = (vertex.x + nextVertex.x) / 2;
        const midY = (vertex.y + nextVertex.y) / 2;

        // Direction from center to midpoint (outward normal)
        const toMidX = midX - cx;
        const toMidY = midY - cy;
        const toMidLen = Math.sqrt(toMidX ** 2 + toMidY ** 2);

        // Label position: offset outward from midpoint
        const labelX = midX + (toMidX / toMidLen) * labelOffset;
        const labelY = midY + (toMidY / toMidLen) * labelOffset;

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            fontSize="4"
            className="fill-(--color-foreground)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}
