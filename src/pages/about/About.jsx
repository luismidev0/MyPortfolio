import { useApp } from '../../context/AppContext';
import { useReveal } from '../../components/ui/useReveal';
import SectionHead from '../../components/ui/SectionHead';
import Hero from '../../components/Hero';

export default function About() {
  const { t, theme } = useApp();
  const a = t.about;
  const ref = useReveal([t]);

  return (
    <div ref={ref}>
      <Hero t={t} />

      <section className="block-lg">
        <SectionHead idx={a.idx} title={a.title} />
        <div className="profile-row reveal">
          <img className="avatar" src="/assets/img/Image Profile.png" alt="Luis Miguel Álvarez" />
          <div>
            <h3>Luis Miguel Álvarez</h3>
            <p>{a.role}</p>
          </div>
        </div>
        <p className="prose reveal" style={{ marginTop: 30 }}>{a.body}</p>
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">·</span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)' }}>{a.bioTitle}</h2>
          <span className="rule"></span>
        </div>
        <div className="timeline">
          {a.bio.map((b, i) => (
            <div className="tl-item reveal" key={i}>
              <div className="tl-year">{b.year}</div>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">·</span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)' }}>{a.expTitle}</h2>
          <span className="rule"></span>
        </div>
        <div className="exp-list">
          {a.experience.map((co, i) => (
            <div className="exp-co reveal" key={i}>
              <div className="exp-co-head">
                <span className="exp-logo">{co.company.charAt(0)}</span>
                <div>
                  <h3>{co.company}</h3>
                  <p className="exp-meta">{co.meta}</p>
                </div>
              </div>
              <div className="exp-roles">
                {co.roles.map((r, j) => (
                  <div className="exp-role" key={j}>
                    <div className="exp-role-head">
                      <h4>{r.title}{r.product && <span className="exp-prod">{r.product}</span>}</h4>
                      <div className="exp-period">
                        <span>{r.period}</span>
                        <span className="exp-dot">·</span>
                        <span>{r.length}</span>
                        <span className="exp-mode">{r.mode}</span>
                      </div>
                    </div>
                    <p>{r.desc}</p>
                    <div className="exp-tags">
                      {r.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="section-head reveal">
          <span className="idx">·</span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)' }}>{a.recsTitle}</h2>
          <span className="rule"></span>
        </div>
        <div className="rec-grid">
          {a.recs.map((r, i) => (
            <div className="rec reveal" key={i}>
              <img src={r.img} alt={r.name} />
              <h4>{r.name}</h4>
              <div className="r1">{r.r1}</div>
              <div className="r2">{r.r2}</div>
            </div>
          ))}
        </div>
        <div className="sign-row reveal">
          <img src={theme === 'light' ? '/assets/img/FirmaBlack.png' : '/assets/img/FirmarWhite.png'} alt="Signature" />
        </div>
      </section>
    </div>
  );
}
