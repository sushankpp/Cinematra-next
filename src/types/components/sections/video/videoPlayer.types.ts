export interface VideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement>{
    src: string;
    poster? :string;
    title: string;
    videoId: string;
    nextVideoSrc? : string;
    prevVideoSrc? : string;
    className? : string;
    onEnded? : ()=> void;
}