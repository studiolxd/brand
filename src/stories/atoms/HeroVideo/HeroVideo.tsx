import './HeroVideo.css';

interface VideoSource {
  webm?: string;
  mp4?: string;
}

interface HeroVideoProps {
  /** Vídeo para orientación landscape. */
  landscape: VideoSource;
  /** Vídeo para orientación portrait. */
  portrait: VideoSource;
}

export function HeroVideo({ landscape, portrait }: HeroVideoProps) {
  return (
    <div className="hero-video" aria-hidden="true">
      <div className="hero-video__landscape">
        <video autoPlay loop muted playsInline>
          {landscape.webm && <source src={landscape.webm} type="video/webm" />}
          {landscape.mp4  && <source src={landscape.mp4}  type="video/mp4"  />}
        </video>
      </div>
      <div className="hero-video__portrait">
        <video autoPlay loop muted playsInline>
          {portrait.webm && <source src={portrait.webm} type="video/webm" />}
          {portrait.mp4  && <source src={portrait.mp4}  type="video/mp4"  />}
        </video>
      </div>
    </div>
  );
}
