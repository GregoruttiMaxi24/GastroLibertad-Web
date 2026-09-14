export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Gastrolibertad"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}
