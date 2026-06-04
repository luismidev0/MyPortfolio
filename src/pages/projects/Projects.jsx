import { PF } from '../../data';
import { useApp } from '../../context/AppContext';
import { useReveal } from '../../components/ui/useReveal';
import SectionHead from '../../components/ui/SectionHead';
import ProjectCard from '../../components/ProjectCard';

export default function Projects() {
  const { t, lang } = useApp();
  const ref = useReveal([t]);

  return (
    <div ref={ref} className="page-enter">
      <section className="block-lg">
        <SectionHead idx={t.projects.idx} title={t.projects.title} />
        <p className="prose reveal" style={{ marginBottom: 44 }}>{t.projects.intro}</p>
        <div className="proj-grid feature">
          {PF.projects.map((p, i) => <ProjectCard key={i} p={p} t={t} lang={lang} />)}
        </div>

        <div className="section-head reveal" style={{ marginTop: 80 }}>
          <span className="idx">·</span>
          <h2 style={{ fontSize: 'clamp(24px,4vw,34px)' }}>{t.projects.participation}</h2>
          <span className="rule"></span>
        </div>
        <div className="proj-grid">
          {PF.participation.map((p, i) => <ProjectCard key={i} p={p} t={t} lang={lang} />)}
        </div>
      </section>
    </div>
  );
}
