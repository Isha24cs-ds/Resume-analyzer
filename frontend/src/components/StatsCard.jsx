export default function StatsCard({ value, title }) {
  return (
    <div className="stats-card">
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}