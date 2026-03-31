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
export declare function HeroVideo({ landscape, portrait }: HeroVideoProps): import("react/jsx-runtime").JSX.Element;
export {};
