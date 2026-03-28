import './FontSpecimen.css';

interface FontSpecimenProps {
  /** Font name to display */
  name: string;
  /** Literal CSS font-family value (do not use CSS variables) */
  fontFamily: string;
  /** Short description of the typeface */
  intro?: string;
  /** URL to the font source (e.g. Google Fonts) */
  link?: string;
}

export function FontSpecimen({ name, fontFamily, intro, link }: FontSpecimenProps) {
  return (
    <div
      className="font-specimen"
      style={{ '--font-specimen-family': fontFamily } as React.CSSProperties}
    >
      <p className="font-specimen__name">{name}</p>
      {intro && <p className="font-specimen__intro">{intro}</p>}
      <p className="font-specimen__alphabet">
        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
      </p>
      <p className="font-specimen__symbols">
        0 1 2 3 4 5 6 7 8 9 . , : ; ! ? ( ) [ ] {'{'} {'}'}
      </p>
      {link && (
        <p className="font-specimen__link">
          <a href={link} target="_blank" rel="noreferrer">{name}</a>
        </p>
      )}
    </div>
  );
}
