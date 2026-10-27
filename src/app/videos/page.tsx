import type { Metadata } from "next";

import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { SourceCredit } from "@/components/source-credit";
import { VideoEmbed } from "@/components/video-embed";
import { getPapers, getVideos } from "@/lib/queries";
import { sourceFor } from "@/lib/sources";

export const revalidate = 300;

const intro =
  "A collection of YouTube videos from the RoboPhysics Laboratory. Click a thumbnail to play.";

export const metadata: Metadata = {
  title: "Videos",
  description: intro,
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const [{ data: videos, offline }, { data: papers }] = await Promise.all([
    getVideos(),
    getPapers(),
  ]);

  return (
    <main>
      <InnerHero eyebrow="Videos" title="Watch the lab in motion">
        {intro}
      </InnerHero>

      <Container>
        <div className="griglia-video">
          {videos.map((video) => (
            <article className="card-video" key={video.id}>
              <div className="player">
                <VideoEmbed
                  youtubeId={video.youtube_id}
                  title={video.title}
                  fallbackLabel={video.thumb_label}
                />
              </div>
              <div className="corpo">
                <div className="data">
                  {video.date_label} · {video.category}
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <SourceCredit source={sourceFor(papers, video.paper_slug)} />
              </div>
            </article>
          ))}
        </div>
      </Container>

      <OfflineNotice show={offline} />
    </main>
  );
}
