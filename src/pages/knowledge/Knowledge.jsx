import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useReveal } from '../../components/ui/useReveal';
import SectionHead from '../../components/ui/SectionHead';
import Icon from '../../components/ui/Icon';

export default function Knowledge() {
  const { t } = useApp();
  const k = t.knowledge;
  const ref = useReveal([t]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const bars = root.querySelectorAll('.bar i');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.v + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach((b) => io.observe(b));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const catIcon = (i) => ['layout', 'server', 'wrench'][i] || 'spark';

  return (
    <div ref={ref} className="page-enter">
      <section className="block-lg">
        <SectionHead idx={k.idx} title={k.title} />
        <p className="prose reveal" style={{ marginBottom: 44 }}>{k.intro}</p>
        <div className="skills-grid">
          {k.cats.map((cat, i) => (
            <div className="skill-cat reveal" key={i}>
              <div className="ch"><Icon name={catIcon(i)} /><h3>{cat.name}</h3></div>
              <div className="skill-list">
                {cat.skills.map((sk, j) => (
                  <div className="skill-row" key={j}>
                    <div className="top"><span>{sk.n}</span><span className="lvl">{sk.l}</span></div>
                    <div className="bar"><i data-v={sk.v}></i></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="reveal"
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
            marginTop: 56, color: 'var(--faint)', fontFamily: 'var(--font-mono)',
            fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          <Icon name="mouse" style={{ width: 18, height: 18 }} /> {k.hint}
        </div>
      </section>
    </div>
  );
}
