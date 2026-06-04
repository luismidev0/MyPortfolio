import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initHero3D } from '../three/scenes';
import Icon from './ui/Icon';
import ContactButton from './ui/ContactButton';

export default function Hero({ t }) {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dispose = initHero3D(canvasRef.current, { onLoaded: () => setLoaded(true) });
    return dispose;
  }, []);

  return (
    <section className="hero">
      <div className="hero-text page-enter">
        <span className="greet"><span className="dot"></span>{t.hero.greet}</span>
        <h1>
          {t.hero.line1}<br />
          {t.hero.line2} <span className="accent">{t.hero.line3}</span>
        </h1>
        <p className="role" dangerouslySetInnerHTML={{ __html: t.hero.role }}></p>
        <div className="hero-cta">
          <ContactButton label={t.hero.cta1} />
          <button className="btn btn-ghost" onClick={() => navigate('/projects')}>
            {t.hero.cta2} <Icon name="arrowRight" />
          </button>
        </div>
      </div>

      <div className="hero-canvas-wrap">
        <div id="hero-canvas" ref={canvasRef}></div>
        <div className={'hero-loader' + (loaded ? ' hide' : '')}>
          <img src="/assets/img/TotoroMovimiento.gif" alt="" />
          <span>Loading…</span>
        </div>
        {loaded && (
          <div className="hint">
            <Icon name="spark" style={{ width: 13, height: 13 }} /> {t.hero.drag}
          </div>
        )}
      </div>

      <div className="scroll-cue"><span className="line"></span>{t.hero.scroll}</div>
    </section>
  );
}
