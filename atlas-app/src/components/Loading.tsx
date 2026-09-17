interface Props {
  label?: string
}

export default function Loading({ label = 'Loading…' }: Props) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}