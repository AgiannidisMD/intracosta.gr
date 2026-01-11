import React, { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  nameKey: string;
  role: string;
  image: string;
  email?: string;
}

const TeamCarousel: React.FC = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Team members - focusing on key team members
  const teamMembers: TeamMember[] = [
    {
      nameKey: 'teamMember.kostasFilippos',
      role: t('teamGeneralDirector'),
      image: '/team/kostas-filippos.JPG',
      email: 'filippos.costas@intracosta.com'
    },
    {
      nameKey: 'teamMember.katerinaNtaoula',
      role: t('teamImportManager'),
      image: '/team/katerina-ntaoula.JPG',
      email: 'katerina.ntaoula@intracosta.com'
    },
    {
      nameKey: 'teamMember.pleplesTheodoros',
      role: t('teamExportManager'),
      image: '/team/pleples-theodoros.JPG',
      email: 'theodoros.pleples@intracosta.com'
    },
    {
      nameKey: 'teamMember.papadimitriouDimitrios',
      role: t('teamAccountingManager'),
      image: '/team/dimitrios-papadimitriou.JPG',
      email: 'dpapadimitriou@intracosta.com'
    },
    {
      nameKey: 'teamMember.kostaKaterina',
      role: t('teamImportDepartment'),
      image: '/team/kosta-katerina.JPG',
      email: 'katerina.kosta@intracosta.com'
    },
    {
      nameKey: 'teamMember.petridisDimitrios',
      role: t('teamImportDepartment'),
      image: '/team/petridis-dimitrios.JPG',
      email: 'dimitris.petridis@intracosta.com'
    },
    {
      nameKey: 'teamMember.emmanouilidouAnastasia',
      role: t('teamImportDepartment'),
      image: '/team/emmanouilidou-anastasia.JPG',
      email: 'aemmanouilidou@intracosta.com'
    },
    {
      nameKey: 'teamMember.dimouMaria',
      role: t('teamImportDepartment'),
      image: '/team/dimou-maria.JPG',
      email: 'mdimou@intracosta.com'
    },
    {
      nameKey: 'teamMember.kouloudiIrini',
      role: t('teamAccountingDepartment'),
      image: '/team/kouloudi-irini.JPG',
      email: 'account@intracosta.com'
    },
    {
      nameKey: 'teamMember.tsitlakidouKyriaki',
      role: t('teamAccountingDepartment'),
      image: '/team/kyriaki-tsitlakidou.JPG',
      email: 'account@intracosta.com'
    },
    {
      nameKey: 'teamMember.kouloudiNikoleta',
      role: t('teamAccountingDepartment'),
      image: '/team/kouloudi-nikoleta.JPG',
      email: 'account@intracosta.com'
    },
    {
      nameKey: 'teamMember.giannakidouIrini',
      role: t('teamImportDepartment'),
      image: '/team/giannakidou-irini.JPG'
    },
    {
      nameKey: 'teamMember.vangelisSaakian',
      role: t('teamExportDepartment'),
      image: '/team/vaggelis.JPG',
      email: 'vaggelis@intracosta.com'
    },
    {
      nameKey: 'teamMember.eleniAlbani',
      role: t('teamExportDepartment'),
      image: '/team/eleni-almpani.JPG',
      email: 'eleni.albani@intracosta.com'
    }
  ];

  const cardsPerView = 4;
  const maxIndex = Math.max(0, teamMembers.length - cardsPerView);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 280; // Width of each card including gap
    const scrollAmount = cardWidth * cardsPerView;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/intracosta-logo.svg';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600">
            {t('teamTitle')}
          </h2>
          
          {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl'
              }`}
              aria-label={t('teamPreviousMembers')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl'
              }`}
              aria-label={t('teamNextMembers')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            <div className="flex gap-4 sm:gap-6 pb-4 px-2 sm:px-0" style={{ width: 'max-content' }}>
              {teamMembers.map((member, index) => {
                const displayName = t(member.nameKey);
                
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[240px] sm:w-[260px] h-[380px] sm:h-[420px]"
                    style={{
                      scrollSnapAlign: 'start'
                    }}
                  >
                    {/* Card with Yellow Background */}
                    <div className="bg-yellow-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col w-full h-full">
                      {/* Image Container with Monochromatic Yellow Filter - Consistent Cropping */}
                      <div className="relative w-full overflow-hidden h-[250px] sm:h-[280px] min-h-[250px] sm:min-h-[280px]">
                        <img
                          src={member.image}
                          alt={displayName}
                          className="team-carousel-image w-full h-full"
                          style={{
                            filter: 'grayscale(100%) brightness(0.9) contrast(1.2) sepia(30%) saturate(150%) hue-rotate(5deg)',
                          }}
                          onError={handleImageError}
                          loading="lazy"
                        />
                        
                        {/* Yellow overlay for monochromatic effect */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.4) 0%, rgba(234, 179, 8, 0.2) 100%)',
                            mixBlendMode: 'multiply',
                            zIndex: 1
                          }}
                        />
                        
                        {/* Role Badge - Top Left (White text) */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-white text-xs font-bold px-2 py-1">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Name and Email - Bottom Section (Yellow text on yellow background) */}
                      <div className="p-5 bg-yellow-500 flex-1 flex flex-col justify-end">
                        <h3 className="text-yellow-900 font-bold text-base mb-1.5">
                          {displayName}
                        </h3>
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-yellow-800 hover:text-yellow-900 text-sm font-medium transition-colors duration-200"
                          >
                            {member.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="text-center mt-6 md:hidden">
          <p className="text-sm text-gray-500">
            ← {t('teamNavigationHint')} →
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;

