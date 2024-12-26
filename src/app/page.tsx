import { VideoCard } from "@/components/video-card";
import { getVimeoVideos, testVimeoConnection } from "@/lib/vimeo";

export default async function Home() {
  try {
    // 接続テスト
    await testVimeoConnection();
    
    const videos = await getVimeoVideos();
    
    if (!videos || videos.length === 0) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg">動画が見つかりませんでした。</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto pt-16 md:pl-56">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((video) => (
            <VideoCard
              key={video.uri}
              id={video.uri.split('/').pop() || ''}
              title={video.name}
              thumbnail={video.pictures.sizes[3]?.link || ''}
              channelName={video.user.name}
              views={video.stats.plays}
              uploadedAt={new Date(video.created_time)}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    throw error;
  }
} 
