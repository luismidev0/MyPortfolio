import { PF } from '../data';
import { useApp } from '../context/AppContext';
import Icon from './ui/Icon';
import ContactButton from './ui/ContactButton';

export default function Footer() {
  const { t, lang } = useApp();
  const s = PF.social;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <h2>
            {t.footer.cta}{' '}
            <a href={'mailto:' + s.email}>{t.footer.ctaLink}</a>
          </h2>
          <ContactButton label={t.hero.cta1} />
        </div>
        <div className="footer-bottom">
          <span className="cr">© {new Date().getFullYear()} Luis Miguel Álvarez. {t.footer.rights}</span>
          <div className="socials">
            <a className="social" href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a className="social" href={'mailto:' + s.email} aria-label="Email"><Icon name="mail" /></a>
            <a className="social" href={s.live} target="_blank" rel="noreferrer" aria-label="Live site"><Icon name="external" /></a>
            <a className="social" href={s.cv[lang]} download aria-label={t.hero.cv} title={t.hero.cv}><Icon name="download" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
