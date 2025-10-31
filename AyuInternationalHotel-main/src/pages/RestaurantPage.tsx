import { Clock, ChefHat, Award, Utensils } from 'lucide-react';

export default function RestaurantPage() {
  const signatureDishes = [
    {
      name: 'Grilled Mediterranean Sea Bass',
      description: 'Fresh sea bass with herbs, lemon butter, and seasonal vegetables',
      price: 45,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    },
    {
      name: 'Wagyu Beef Tenderloin',
      description: 'Premium Japanese wagyu with truffle mash and red wine reduction',
      price: 85,
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
    },
    {
      name: 'Lobster Thermidor',
      description: 'Succulent lobster in a rich cognac cream sauce with gruyere',
      price: 68,
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
    },
    {
      name: 'Saffron Risotto with Scallops',
      description: 'Creamy Italian risotto with pan-seared scallops and microgreens',
      price: 52,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Culinary Excellence
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
              Experience a symphony of flavors crafted by world-renowned chefs using the finest
              ingredients from around the globe.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-white">
                <Award className="text-[#C9A227]" size={24} />
                <span className="text-lg">Michelin Recommended</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Utensils className="text-[#C9A227]" size={24} />
                <span className="text-lg">International Cuisine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
                A Dining Experience Like No Other
              </h2>
              <div className="w-24 h-1 bg-[#C9A227] mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our restaurant combines elegant ambiance with innovative cuisine. Each dish is a
                masterpiece, meticulously prepared using locally sourced ingredients and
                time-honored techniques passed down through generations.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                From intimate dinners to grand celebrations, our culinary team creates
                unforgettable moments that delight all your senses. Experience fine dining
                elevated to an art form.
              </p>
              <div className="flex items-center space-x-4 p-6 bg-[#F8F8F8] rounded-xl">
                <Clock size={32} className="text-[#C9A227]" />
                <div>
                  <h3 className="font-semibold text-[#0A1F44] text-lg">Opening Hours</h3>
                  <p className="text-gray-600">Breakfast: 6:30 AM - 10:30 AM</p>
                  <p className="text-gray-600">Lunch: 12:00 PM - 3:00 PM</p>
                  <p className="text-gray-600">Dinner: 6:00 PM - 11:00 PM</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg"
                alt="Fine dining"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#C9A227]/10 rounded-full -z-10"></div>
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#0A1F44]/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
              Signature Dishes
            </h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our chef's most celebrated creations, each dish a perfect harmony of
              flavor, texture, and presentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {signatureDishes.map((dish, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#C9A227] transition-colors">
                          {dish.name}
                        </h3>
                        <p className="text-gray-200">{dish.description}</p>
                      </div>
                      <div className="text-3xl font-bold text-[#C9A227] ml-4">${dish.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg"
                alt="Chef"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-4 mb-6">
                <ChefHat size={48} className="text-[#C9A227]" />
                <div>
                  <h2 className="text-4xl font-bold text-[#0A1F44]">Meet Our Chef</h2>
                  <p className="text-[#C9A227] text-lg font-medium">Chef Alessandro Rossi</p>
                </div>
              </div>
              <div className="w-24 h-1 bg-[#C9A227] mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                With over 25 years of culinary excellence across Europe and Asia, Chef Alessandro
                brings a wealth of expertise and passion to every plate. His innovative approach
                combines classical French techniques with modern molecular gastronomy.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Trained in the finest establishments of Paris and Rome, Chef Alessandro has earned
                numerous accolades including two Michelin stars and the prestigious James Beard
                Award for culinary innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Michelin Star Chef', '25+ Years Experience', 'International Awards'].map(
                  (badge, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[#F8F8F8] rounded-full text-[#0A1F44] font-medium"
                    >
                      {badge}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-32 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Reserve Your Table</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Indulge in an extraordinary dining experience. Book your table today and embark on a
            culinary journey you'll never forget.
          </p>
          <a
            href="tel:+1234567890"
            className="inline-block bg-[#C9A227] hover:bg-white hover:text-[#0A1F44] text-white px-12 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Call to Reserve
          </a>
        </div>
      </section>
    </div>
  );
}
