interface SparklineProps {
  values: number[];
  className?: string;
  color?: string;
  strokeWidth?: number;
  showArea?: boolean;
}

export default function Sparkline({
  values,
  className = "",
  color = "#e08a68",
  strokeWidth = 1.6,
  showArea = true,
}: SparklineProps) {
  const width = 120;
  const height = 40;
  const pad = 3;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = pad + (index / Math.max(values.length - 1, 1)) * (width - pad * 2);
    const y =
      height - pad - ((value - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const midX = (px + cx) / 2;
    path += ` C ${midX} ${py}, ${midX} ${cy}, ${cx} ${cy}`;
  }

  const areaPath = `${path} L ${points[points.length - 1][0]} ${height} L ${points[0][0]} ${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {showArea && (
        <path d={areaPath} fill={color} opacity="0.08" />
      )}
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last[0]} cy={last[1]} r="2.4" fill={color} />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill={color} opacity="0.18" />
    </svg>
  );
}
