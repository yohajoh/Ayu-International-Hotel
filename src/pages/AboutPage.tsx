import { Heart, Award, Users, TrendingUp, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '1995', title: 'Foundation', description: 'Ayu International Hotel opens its doors' },
    { year: '2005', title: 'Expansion', description: 'Added luxury spa and wellness center' },
    { year: '2015', title: 'Recognition', description: 'Received 5-star luxury hotel certification' },
    { year: '2020', title: 'Innovation', description: 'Introduced sustainable eco-friendly practices' },
    { year: '2025', title: 'Excellence', description: 'Celebrating 30 years of hospitality' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Genuine Care',
      description: 'Every guest is treated like family, with warmth and personalized attention',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in service, comfort, and luxury',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting relationships with guests, staff, and our local community',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously evolving to offer the best modern hospitality experience',
    },
  ];

  const team = [
    {
      name: 'Michael Chen',
      role: 'General Manager',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    },
    {
      name: 'Sarah Thompson',
      role: 'Director of Operations',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    },
    {
      name: 'David Martinez',
      role: 'Head of Guest Relations',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our Story
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
              For three decades, Ayu International Hotel has been a beacon of luxury, comfort, and
              exceptional hospitality. We don't just offer rooms—we create memories that last a
              lifetime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
                Where Comfort Meets Class
              </h2>
              <div className="w-24 h-1 bg-[#C9A227] mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded in 1995, Ayu International Hotel began with a simple vision: to create a
                sanctuary where travelers could experience true luxury combined with genuine
                warmth. What started as a boutique establishment has grown into a world-renowned
                destination.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our name "Ayu" means "beautiful" in Sanskrit, reflecting our commitment to beauty
                in every detail—from the architecture and interior design to the quality of service
                and the culinary artistry that graces our tables.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we stand proud as a testament to timeless elegance, having hosted
                dignitaries, celebrities, and families from around the globe. Yet, we never forget
                our core philosophy: every guest deserves to feel at home.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
                alt="Hotel exterior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#C9A227]/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and inspire us to exceed expectations every
              single day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#0A1F44] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Three decades of excellence, innovation, and unforgettable guest experiences
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#C9A227]"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-block">
                      <div className="text-3xl font-bold text-[#C9A227] mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-[#0A1F44] mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#C9A227] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
              Meet Our Leadership
            </h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to making your stay exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center -mt-16 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#C9A227] font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-gradient-to-br from-[#0A1F44] to-[#1a3a6e] rounded-2xl p-12 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <Target size={48} className="text-[#C9A227]" />
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">
                To provide an unparalleled hospitality experience that combines luxury, comfort,
                and genuine care. We strive to create a home away from home where every guest feels
                valued, pampered, and inspired.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#C9A227] to-[#a88820] rounded-2xl p-12 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <Eye size={48} className="text-[#0A1F44]" />
                <h2 className="text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-100 text-lg leading-relaxed">
                To be recognized globally as the premier destination for luxury hospitality,
                setting industry standards for service excellence, innovation, and sustainability
                while creating unforgettable memories for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
