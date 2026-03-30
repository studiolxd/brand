import { NewsletterForm } from '../../organisms/NewsletterForm/NewsletterForm';
import { Heading } from '../../atoms/Heading/Heading';
import { Logo } from '../../atoms/Logo/Logo';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer dark">
      <div className="footer__col footer__col--1">
        <h2 className="footer__tagline">
          <span>Learning</span>
          <span>experience</span>
          <span>design</span>
        </h2>
        <div className="footer__logo">
          <Logo height={50} />
        </div>
      </div>
      <div className="footer__col footer__col--2">
        <Heading level={3}>Suscríbete a nuestra newsletter</Heading>
        <NewsletterForm
          privacyLabel={<>He leído la <a href="#">política de privacidad</a> y consiento recibir la newsletter</>}
        />
      </div>
      <div className="footer__col footer__col--3">
        <ul>
          <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
        <address className="footer__contact">
          <a href="mailto:hello@studiolxd.com">hello@studiolxd.com</a>
          <a href="tel:+34623752862">+34 623 752 862</a>
        </address>
      </div>
      <div className="footer__bottom">
        <ul className="footer__legal">
          <li><a href="#">Aviso legal</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Política de cookies</a></li>
        </ul>
      </div>
    </footer>
  );
}
