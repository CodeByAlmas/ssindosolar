import { Sun, Bolt, Shield } from './Icons';

const P = [
  { ic: <Sun />, t: 'Renewable energy', d: 'Power from the sun, which never runs out and never sends a fuel bill.' },
  { ic: <Bolt />, t: 'Green energy', d: 'Clean units generated on your own roof, used first by you and the surplus sent to the grid.' },
  { ic: <Shield />, t: 'CO2 reduction', d: 'Our goal: cut the carbon emissions of every home, school and factory we power.' },
];
export default function Green({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? 'g3' : 'g3 green'} data-stagger>
      {P.map((p, i) => <div key={p.t} className="card tall gcard"><span className="icn">{p.ic}</span><div><span className="no2">0{i + 1}</span><h3>{p.t}</h3><p>{p.d}</p></div></div>)}
    </div>
  );
}
