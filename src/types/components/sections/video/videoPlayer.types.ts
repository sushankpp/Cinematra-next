export interface VideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement>{
    src: string;
    poster? :string;
    title: string;
    nextVideoSrc? : string;
    prevVideoSrc? : string;
    className? : string;
    onEnded? : ()=> void;
}