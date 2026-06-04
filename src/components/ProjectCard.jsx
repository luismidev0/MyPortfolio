import Icon from './ui/Icon';

export default function ProjectCard({ p, t, lang }) {
  const desc = lang === 'es' ? p.desc_es : p.desc_en;
  const linkLabel = p.icon === 'github' ? t.projects.code : t.projects.visit;
  const monogram = p.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
  return (
    <article className="card proj-card reveal">
      <div className="proj-thumb">
        {p.img
          ? <img src={p.img} alt={p.name} />
          : <div className="ph-art"><span className="ph-mono">{monogram}</span><span className="ph-name">{p.name}</span></div>}
        <span className="badge">{p.badge}</span>
      </div>
      <div className="proj-body">
        <h3>{p.name}</h3>
        <p>{desc}</p>
        <div className="proj-stack">
          {p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
        </div>
        {p.link && (
          <a className="proj-link" href={p.link} target="_blank" rel="noreferrer">
            <Icon name={p.icon === 'github' ? 'github' : 'external'} /> {linkLabel}
          </a>
        )}
      </div>
    </article>
  );
}
