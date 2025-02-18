'use client';

import { useState } from 'react';
import LoginModal from '../components/LoginModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center w-1/2">
        <img
          src="https://assets.website-files.com/6172baee6151547debc65160/6172c483b3cd9b59c1b6744c_Frequency-Logo-2.svg"
          loading="lazy"
          alt="Frequency Logo"
          className="w-full h-auto mb-8"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Login
        </button>
      </div>
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

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
