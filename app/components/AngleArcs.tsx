"use client";

// Create an SVG arc path for the interior angle at a vertex
function createAngleArc(
  vertex: { x: number; y: number },
  prevVertex: { x: number; y: number },
  nextVertex: { x: number; y: number },
  arcRadius: number
) {
  // Vectors from vertex to adjacent vertices
  const toPrev = { x: prevVertex.x - vertex.x, y: prevVertex.y - vertex.y };
  const toNext = { x: nextVertex.x - vertex.x, y: nextVertex.y - vertex.y };

  // Normalize and scale to arc radius
  const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2);
  const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2);

  const startX = vertex.x + (toPrev.x / lenPrev) * arcRadius;
  const startY = vertex.y + (toPrev.y / lenPrev) * arcRadius;
  const endX = vertex.x + (toNext.x / lenNext) * arcRadius;
  const endY = vertex.y + (toNext.y / lenNext) * arcRadius;

  // Sweep flag 0 = counter-clockwise (inside the polygon)
  return `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 0 0 ${endX} ${endY}`;
}

// Get position for the angle label
function getAngleLabelPosition(
  vertex: { x: number; y: number },
  prevVertex: { x: number; y: number },
  nextVertex: { x: number; y: number },
  labelDistance: number
) {
  const toPrev = { x: prevVertex.x - vertex.x, y: prevVertex.y - vertex.y };
  const toNext = { x: nextVertex.x - vertex.x, y: nextVertex.y - vertex.y };

  const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2);
  const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2);

  const bisectorX = toPrev.x / lenPrev + toNext.x / lenNext;
  const bisectorY = toPrev.y / lenPrev + toNext.y / lenNext;
  const bisectorLen = Math.sqrt(bisectorX ** 2 + bisectorY ** 2);

  return {
    x: vertex.x + (bisectorX / bisectorLen) * labelDistance,
    y: vertex.y + (bisectorY / bisectorLen) * labelDistance,
  };
}

// Generate vertex positions for a regular polygon (matches Polygon.tsx logic)
function getVertices(n: number) {
  const cx = 50, cy = 50, r = 50;
  const rot = n % 2 === 0 ? -Math.PI / 2 - Math.PI / n : -Math.PI / 2;

  return Array.from({ length: n }, (_, k) => {
    const angle = rot + (2 * Math.PI * k) / n;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
    };
  });
}

function getInteriorAngleAsFraction(sides: number) {
  if (sides < 3) throw new Error("Polygon must have at least 3 sides");

  const numerator = (sides - 2) * 180;
  const denominator = sides;

  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;

  const gcd = (a: number, b: number): number =>
    b === 0 ? a : gcd(b, a % b);

  const d = gcd(remainder, denominator);

  return {
    whole,
    numerator: remainder / d,
    denominator: denominator / d,
  };
}

function formatInteriorAngle(sides: number) {
  const { whole, numerator, denominator } = getInteriorAngleAsFraction(sides);

  if (numerator === 0) {
    return (
      <>
        <tspan>{whole}</tspan>
        <tspan>°</tspan>
      </>
    );
  }

  return (
    <>
      <tspan>{whole}</tspan>
      <tspan>{" "}</tspan>
      <tspan className="diagonal-fractions">
        {numerator}/{denominator}
      </tspan>
      <tspan>°</tspan>
    </>
  );
}


type AngleArcsProps = {
  sides: number;
  arcRadius?: number;
  labelDistance?: number;
};

export function AngleArcs({ sides, arcRadius = 8, labelDistance = 12 }: AngleArcsProps) {
  const vertices = getVertices(sides);

  return (
    <g>
      {vertices.map((vertex, i) => {
        const prevVertex = vertices[(i - 1 + sides) % sides];
        const nextVertex = vertices[(i + 1) % sides];

        const arcPath = createAngleArc(vertex, prevVertex, nextVertex, arcRadius);
        const labelPos = getAngleLabelPosition(vertex, prevVertex, nextVertex, labelDistance);

        return (
          <g key={i}>
            <path
              d={arcPath}
              fill="none"
              className="stroke-(--color-foreground)"
              strokeWidth="0.33"
              strokeDasharray={"0.66 0.66"}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fontSize="3.5"
              className="fill-(--color-foreground)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {formatInteriorAngle(sides)}
            </text>
          </g>
        );
      })}
    </g>
  );
}
