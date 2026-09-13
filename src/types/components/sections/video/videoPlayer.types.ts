export interface VideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement>{
    src: string;
    poster? :string;
    title: string;
    videoId: string;
    description?:string;
    moderationLabel?:string;
    moderationConfidence?:number;
    nextVideoSrc? : string;
    prevVideoSrc? : string;
    className? : string;
    onEnded? : ()=> void;
}