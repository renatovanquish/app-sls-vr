import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import * as customQueries from "graphql/custom-queries";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

import { useEffect, useState, useRef } from "react";
import { Loading } from "components/ui";

import { useRestrictedContentView } from "hooks/useRestrictedContentView";
import { useSignedUrl } from "hooks/useSignedUrl";

import { Storage } from "aws-amplify";
Storage.configure({ level: "protected" });

import awsExports from "../../../../aws-exports";
import awsvideoconfig from "../../../../aws-video-exports";

import VideoPlayer from "./VideoPlayer";
import VideoPlayerAwsVdo from "./VideoPlayerAwsVdo";

interface Props {
  contentSel: any;
  userID: string;
  width: number;
}

export default function Play(props: Props) {
  const { contentSel, userID, width } = props;

  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [restrictedContent, setRestrictedContent] = useState(false as any);
  const [progressLocal, setProgressLocal] = useState(0);
  const [videoSource, setVideoSource] = useState("");

  const playerRef = useRef<any>(null);
  const currentProgressRef = useRef(progressLocal);
  const { SignedUrl } = useSignedUrl();

  const {
    listRestrictedContentViewByRestrictedContentUser,
    createRestrictedContentView,
    updateRestrictedContentView,
  } = useRestrictedContentView();

  const fetchData = async () => {
    setVideoSource("");
    setLoading(true);
    setRestrictedContent(contentSel as any);
    setUrl("");
    setProgressLocal(0);
    if (contentSel && contentSel.content && contentSel.content[0]) {
      console.log("contentSel", contentSel);

      if (contentSel.content[0].vimeo) {
        setUrl(`https://vimeo.com/${contentSel.content[0].vimeo}`);
        setVideoSource("Vimeo");
        setLoading(false);
      } else {
        if (contentSel.content[0].isAWSVDO) {
          let m = "AWSVDO"; // AWSVDO || AWSVDOProd

          if (m === "AWSVDO") {
            const params = {
              // id: uuid,
              key: `${contentSel.content[0].id}/${contentSel.content[0].id}.m3u8`,
              bucket: awsvideoconfig.awsInputVideo.replace("input", "output"), // awsvideoconfig.awsOutputVideo, //awsvideoconfig.awsOutputVideo,
              region: awsExports.aws_user_files_s3_bucket_region,
              action: "getObject",
              contentType: "video/*",
            };
            console.log("params", params);

            const presigned = await SignedUrl(params);
            console.log("presigned", presigned);

            const presignedUrl = JSON.parse(
              `{${presigned.SignedUrl.substring(
                presigned.SignedUrl.indexOf('"data"'),
                presigned.SignedUrl.length
              ).replace("}}", "")}}`
            );
            console.log("presignedUrl", presignedUrl);

            setUrl(presignedUrl.data);
            setVideoSource("AWSVDO");
            setLoading(false);
          }

          if (m === "AWSVDOProd") {
            const r = (await API.graphql(
              graphqlOperation(queries.getVideoObject, {
                id: contentSel.content[0].id,
              })
            )) as any;

            if (r) {
              const token = r.data.getVideoObject.token;
              const t = `https://${awsvideoconfig.awsOutputVideo}/${contentSel.content[0].id}/${contentSel.content[0].id}.m3u8${token}`;
              setUrl(t);
              setVideoSource("AWSVDOProd");
              setLoading(false);
            }
          }
        } else {
          const u = await Storage.get(
            contentSel.content && contentSel.content.key
              ? contentSel.content.key
              : contentSel.content[0].key,
            {
              level: "protected",
              contentType: "video/*",
              download: false,
              expires: 14400, // 4 hours
              identityId: contentSel.identityId,
            }
          );
          setUrl(u.toString());
          setVideoSource("S3");
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const handleViewReport = async (
    percentage: number,
    restrictedContent: any
  ) => {
    if (percentage > 0 && restrictedContent && restrictedContent.id) {
      const { items } = await listRestrictedContentViewByRestrictedContentUser({
        restrictedContentID: restrictedContent.id,
        userID: { eq: userID },
      });
      if (items.length > 0) {
        if (items[0].percentage < percentage) {
          await updateRestrictedContentView({
            id: items[0].id,
            percentage,
          });
          // fetchData();
        }
      } else {
        await createRestrictedContentView({
          restrictedContentID: restrictedContent.id,
          userID,
          percentage,
        });
        // fetchData();
      }
    } else {
      setRestrictedContent(false as any);
      setUrl("");
      setProgressLocal(0);
    }
  };

  useEffect(() => {
    if (contentSel && contentSel.content) {
      // if (!restrictedContent) {
      fetchData();
      // }
    }
    return () => {
      handleViewReport(currentProgressRef.current, contentSel);
      setVideoSource("");
      setUrl("");
      setRestrictedContent(false as any);
      setProgressLocal(0);
    };
  }, [contentSel]);

  useEffect(() => {
    currentProgressRef.current = progressLocal;
  }, [progressLocal]);

  const handleOnTimeUpdate = () => {
    const p = (
      (playerRef.current.currentTime / playerRef.current.duration) *
      100
    ).toFixed(0);
    setProgressLocal(parseInt(p));
  };

  const handleOnTimeUpdate2 = (event: any, player: any, currentTimeSecond: number) => {
    const currentTime = player.cache_.currentTime
    const duration = player.cache_.duration
    const p = ((currentTime / duration) * 100).toFixed(0)
    setProgressLocal(parseInt(p));
  };

  return (
    <div className="w-full aspect-video">
      {loading && <Loading />}

      {!loading && url && videoSource === "Vimeo" && (
        <div className="w-full">
          <iframe
            src={`https://player.vimeo.com/video/${restrictedContent.content[0].vimeo}?h=a606945fd0&color=09b9d0`}
            width={width}
            height={width - width * 0.44}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            ref={playerRef}
            onTimeUpdate={handleOnTimeUpdate}
          ></iframe>
        </div>
      )}

      {!loading && url && videoSource === "S3" && (
        <video
          className="w-full bg-black"
          ref={playerRef}
          src={url}
          onTimeUpdate={handleOnTimeUpdate}
          controls={true}
          controlsList="nodownload"
          crossOrigin="anonymous"
          autoPlay={false}
          muted={false}
          playsInline={true}
        ></video>
      )}

      {!loading && url && videoSource === "AWSVDOProd" && (
        <VideoPlayer
          className="w-full bg-black"
          ref={playerRef}
          onTimeUpdate={handleOnTimeUpdate}
          controlsList="nodownload"
          crossOrigin="anonymous"
          autoPlay={false}
          controls
          sources={[
            {
              src: url,
              type: "application/x-mpegURL",
            },
          ]}
        />
      )}

      {!loading && url && videoSource === "AWSVDO" && (
        <VideoPlayerAwsVdo
          url={url}
          onTimeUpdate={handleOnTimeUpdate2}
        />
      )}

      {false && <pre>{JSON.stringify(contentSel, null, 4)}</pre>}
    </div>
  );
}
