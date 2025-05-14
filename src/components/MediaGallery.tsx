import { BASE_URL } from '@/constants';
import { MediaItem } from '@/types';
import { Image, Video } from 'lucide-react';
import { useState } from 'react';
import './MediaGallery.scss';

interface MediaGalleryProps {
  media: MediaItem[];
}

const MediaGallery = ({ media }: MediaGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const videoItems = media.filter(item => item.type === 'VIDEO');
  const imageItems = media.filter(item => item.type === 'IMAGE');
  const allMedia = [...imageItems, ...videoItems];
  const activeMedia = allMedia[activeIndex];

  return (
    <div className="media-gallery">
      <div className="media-main">
        {activeMedia.type === 'IMAGE' ? (
          <img src={`${BASE_URL}${activeMedia.url}`} alt="Travel media" />
        ) : (
          <video controls poster={`${BASE_URL}${activeMedia.thumbnailUrl}`}>
            <source src={`${BASE_URL}${activeMedia.url}`} type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
        )}
        <div className="media-index">
          {activeMedia.type === 'IMAGE' ? <Image size={14} /> : <Video size={14} />}
          <span>
            {activeIndex + 1}/{allMedia.length}
          </span>
        </div>
      </div>
      {allMedia.length > 1 && (
        <div className="media-thumbnails">
          {allMedia.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`media-thumb${index === activeIndex ? ' active' : ''}`}
            >
              <img src={`${BASE_URL}${item.thumbnailUrl || item.url}`} alt={`Thumbnail ${index}`} />
              {item.type === 'VIDEO' && <Video className="video-icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
