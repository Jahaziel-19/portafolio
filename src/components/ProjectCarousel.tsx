import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCarouselProps {
  images: string[];
  video?: string;
  title: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, video, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    ...(video ? [{ type: 'video', url: video }] : []),
    ...images.map(img => ({ type: 'image', url: img }))
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-600 font-bold">
        No media available
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full group">
      <div className="h-48 md:h-64 w-full bg-slate-900 rounded-t-xl overflow-hidden relative">
        {currentSlide.type === 'video' ? (
          getYoutubeId(currentSlide.url) ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYoutubeId(currentSlide.url)}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : (
            <video 
              src={currentSlide.url} 
              controls 
              className="w-full h-full object-cover"
            >
              Tu navegador no soporta el elemento de video.
            </video>
          )
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
            style={{ backgroundImage: `url(${currentSlide.url})` }}
          >
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-300"></div>
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <>
          {/* Left Arrow */}
          <div className="absolute top-[50%] -translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors md:group-hover:block hidden z-10">
            <ChevronLeft onClick={(e) => { e.preventDefault(); prevSlide(); }} size={24} />
          </div>

          {/* Right Arrow */}
          <div className="absolute top-[50%] -translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors md:group-hover:block hidden z-10">
            <ChevronRight onClick={(e) => { e.preventDefault(); nextSlide(); }} size={24} />
          </div>

          {/* Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center py-2 gap-2 z-10">
            {slides.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={(e) => { e.preventDefault(); goToSlide(slideIndex); }}
                className={`text-2xl cursor-pointer w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                  currentIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
