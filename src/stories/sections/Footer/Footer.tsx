import { NewsletterForm } from '../../organisms/NewsletterForm/NewsletterForm';
import { Heading } from '../../atoms/Heading/Heading';
import { Logo } from '../../atoms/Logo/Logo';
import { Link } from '../../atoms/Link/Link';
import './Footer.css';

interface FooterProps {
  id?: string;
}

export function Footer({ id }: FooterProps) {
  return (
    <footer id={id} className="footer surface-dark">
      <div className="footer__col footer__col--1">
        <Heading level={2} className="footer__tagline">
          <span>Learning</span>
          <span>experience</span>
          <span>design</span>
        </Heading>
        <div className="footer__logo">
          <Logo height={50} />
        </div>
      </div>
      <div className="footer__col footer__col--2">
        <Heading level={3}>Suscríbete a nuestra newsletter</Heading>
        <NewsletterForm
          privacyLabel={<>He leído la <Link href="#">política de privacidad</Link> y consiento recibir la newsletter</>}
        />
      </div>
      <div className="footer__col footer__col--3">
        <ul className="footer__social">
          <li><Link href="#" external className="footer__social-link">LinkedIn</Link></li>
          <li><Link href="#" external className="footer__social-link">Instagram</Link></li>
          <li><Link href="#" external className="footer__social-link">GitHub</Link></li>
        </ul>
        <address className="footer__contact">
          <Link href="mailto:hello@studiolxd.com">hello@studiolxd.com</Link>
          <Link href="tel:+34623752862">+34 623 752 862</Link>
        </address>
      </div>
      <div className="footer__bottom">
        <ul className="footer__legal">
          <li><Link href="#">Aviso legal</Link></li>
          <li><Link href="#">Política de privacidad</Link></li>
          <li><Link href="#">Política de cookies</Link></li>
        </ul>
      </div>
    </footer>
  );
}
