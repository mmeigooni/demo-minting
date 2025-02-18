import HomeContent from '../components/HomeContent';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <HomeContent />
      <div
        data-poster-url="https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-poster-00001.jpg"
        data-video-urls="https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-transcode.mp4,https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-transcode.webm"
        data-autoplay="true"
        data-loop="true"
        data-wf-ignore="true"
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          className="w-full h-full object-cover"
          style={{
            backgroundImage:
              'url("https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-poster-00001.jpg")',
          }}
        >
          <source
            src="https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-transcode.mp4"
            data-wf-ignore="true"
          />
          <source
            src="https://assets.website-files.com/6172baee6151547debc65160/6172be2aced31a796cc3ebb6_video no logo-transcode.webm"
            data-wf-ignore="true"
          />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}
