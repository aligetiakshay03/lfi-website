// Re-mounted on every navigation (App Router template), giving each route a short entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="lf-page-enter">{children}</div>;
}
