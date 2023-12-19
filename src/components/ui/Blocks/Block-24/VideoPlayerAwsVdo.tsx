import VREPlayer from "videojs-react-enhanced";
import "video.js/dist/video-js.css";

export default function VideoPlayerAwsVdo(props: any) {
  const { url, onTimeUpdate } = props;

  const playerOptions: VREPlayer.IPlayerOptions = {
    src: url,
    controls: true,
    // autoplay: "play",
  };

  const videojsOptions: VREPlayer.IVideoJsOptions = {
    fluid: true,
  };

  return (
    <div className="w-full aspect-video">
      <VREPlayer
        playerOptions={playerOptions}
        videojsOptions={videojsOptions}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
}
