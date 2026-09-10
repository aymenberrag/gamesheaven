import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ScreenshotGallery.css';

export default function ScreenshotGallery({ screenshots }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!screenshots?.length) return null;

  const close = () => setActiveIndex(null);
  const next = (e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % screenshots.length); };
  const prev = (e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length); };

  return (
    <>
      <div className="screenshot-grid">
        {screenshots.map((shot, i) => (
          <button key={shot.id} className="screenshot-thumb" onClick={() => setActiveIndex(i)}>
            <img src={shot.image} alt={`Screenshot ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="screenshot-lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="screenshot-lightbox-close" onClick={close} aria-label="Close">
            <X size={22} />
          </button>
          <button className="screenshot-lightbox-nav left" onClick={prev} aria-label="Previous screenshot">
            <ChevronLeft size={26} />
          </button>
          <img
            src={screenshots[activeIndex].image}
            alt={`Screenshot ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="screenshot-lightbox-nav right" onClick={next} aria-label="Next screenshot">
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}
