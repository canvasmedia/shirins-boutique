interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 56, color = '#D4AF37' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label="Shirin's Boutique monogram"
      style={{ display: 'block' }}
    >
      <text
        x="28"
        y="29"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="700"
        fill={color}
      >
        S
      </text>
    </svg>
  );
}
