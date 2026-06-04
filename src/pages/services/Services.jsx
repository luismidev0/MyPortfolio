import { useApp } from '../../context/AppContext';
import { useReveal } from '../../components/ui/useReveal';
import { useSeo } from '../../hooks/useSeo';
import SectionHead from '../../components/ui/SectionHead';
import Icon from '../../components/ui/Icon';
import Totoro3D from '../../components/Totoro3D';

export default function Services() {
  const { t } = useApp();
  const s = t.services;
  const ref = useReveal([t]);
  useSeo({ title: `${s.title} — Luis Miguel Álvarez`, description: s.intro, path: '/services' });
  const icoFor = (k) => (k === 'front' ? 'layout' : 'server');

  return (
    <div ref={ref} className="page-enter">
      <section className="block-lg">
        <SectionHead idx={s.idx} title={s.title} />
        <p className="prose reveal" style={{ marginBottom: 40 }}>{s.intro}</p>
        <div className="grid-2">
          {s.cards.map((c, i) => (
            <div className="card svc-card reveal" key={i}>
              <div className="ico"><Icon name={icoFor(c.key)} /></div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <div className="tags">
                {c.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <Totoro3D label={s.totoro} />
        </div>
      </section>
    </div>
  );
}
