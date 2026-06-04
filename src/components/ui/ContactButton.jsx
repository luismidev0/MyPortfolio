import { PF } from '../../data';
import Icon from './Icon';

// Contact button with a single Totoro that peeks up, centered, on hover.
export default function ContactButton({ label, ghost }) {
  return (
    <span className="contact-totoro">
      <img className="tp t2" src="/assets/img/totoro.png" alt="" aria-hidden="true" />
      <a className={'btn ' + (ghost ? 'btn-ghost' : 'btn-primary')} href={'mailto:' + PF.social.email}>
        <Icon name="mail" /> {label}
      </a>
    </span>
  );
}
