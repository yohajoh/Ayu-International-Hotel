import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { GalleryImage } from '../types';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setImages(data);
  };

  const filteredImages = images.filter(
    (img) => filter === 'all' || img.category === filter
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-xl text-gray-200">Explore the beauty of Ayu International Hotel</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {[
            { label: 'All', value: 'all' },
            { label: 'Rooms', value: 'rooms' },
            { label: 'Restaurant', value: 'restaurant' },
            { label: 'Pool', value: 'pool' },
            { label: 'Events', value: 'events' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === cat.value
                  ? 'bg-[#C9A227] text-white shadow-lg scale-105'
                  : 'bg-white text-[#0A1F44] hover:bg-gray-100 shadow'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => openLightbox(index)}
              style={{
                gridRow: index % 7 === 0 ? 'span 2' : 'span 1',
              }}
            >
              <img
                src={image.url}
                alt={image.title || 'Gallery image'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                  <p className="text-gray-200 text-sm capitalize">{image.category}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#C9A227] transition-colors z-10"
          >
            <X size={36} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all z-10"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all z-10"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-6xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title || 'Gallery image'}
              className="max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            {filteredImages[lightboxIndex].title && (
              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl font-semibold mb-2">
                  {filteredImages[lightboxIndex].title}
                </h3>
                <p className="text-gray-300 capitalize">
                  {filteredImages[lightboxIndex].category}
                </p>
              </div>
            )}
            <div className="mt-4 text-white text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
