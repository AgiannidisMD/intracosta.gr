import React, { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMemberMeta {
  nameKey: string;
  roleKey: string;
  image: string;
  email?: string;
}

const defaultImageDimensions = { width: 4024, height: 6048 };

const teamImageDimensions: Record<string, { width: number; height: number }> = {
  'dimitrios-papadimitriou': { width: 4024, height: 6048 },
  'dimou-maria': { width: 4024, height: 6048 },
  'eleni-almpani': { width: 4024, height: 6048 },
  'emmanouilidou-anastasia': { width: 4024, height: 6048 },
  'giannakidou-irini': { width: 3600, height: 5020 },
  'katerina-ntaoula': { width: 3659, height: 5410 },
  'kosta-katerina': { width: 4024, height: 6048 },
  'kostas-filippos': { width: 4024, height: 6048 },
  'kouloudi-irini': { width: 4024, height: 6048 },
  'kouloudi-nikoleta': { width: 3471, height: 5292 },
  'kyriaki-tsitlakidou': { width: 4024, height: 6048 },
  'petridis-dimitrios': { width: 4024, height: 6048 },
  'pleples-theodoros': { width: 4024, height: 6048 },
  'vaggelis': { width: 4024, height: 6048 }
};

const teamMembersMeta: TeamMemberMeta[] = [
  {
    nameKey: 'teamMember.kostasFilippos',
    roleKey: 'teamGeneralDirector',
    image: 'kostas-filippos',
    email: 'filippos.costas@intracosta.com'
  },
  {
    nameKey: 'teamMember.katerinaNtaoula',
    roleKey: 'teamImportManager',
    image: 'katerina-ntaoula',
    email: 'katerina.ntaoula@intracosta.com'
  },
  {
    nameKey: 'teamMember.pleplesTheodoros',
    roleKey: 'teamExportManager',
    image: 'pleples-theodoros',
    email: 'theodoros.pleples@intracosta.com'
  },
  {
    nameKey: 'teamMember.papadimitriouDimitrios',
    roleKey: 'teamAccountingManager',
    image: 'dimitrios-papadimitriou',
    email: 'dpapadimitriou@intracosta.com'
  },
  {
    nameKey: 'teamMember.kostaKaterina',
    roleKey: 'teamImportDepartment',
    image: 'kosta-katerina',
    email: 'katerina.kosta@intracosta.com'
  },
  {
    nameKey: 'teamMember.petridisDimitrios',
    roleKey: 'teamImportDepartment',
    image: 'petridis-dimitrios',
    email: 'dimitris.petridis@intracosta.com'
  },
  {
    nameKey: 'teamMember.emmanouilidouAnastasia',
    roleKey: 'teamImportDepartment',
    image: 'emmanouilidou-anastasia',
    email: 'aemmanouilidou@intracosta.com'
  },
  {
    nameKey: 'teamMember.dimouMaria',
    roleKey: 'teamImportDepartment',
    image: 'dimou-maria',
    email: 'mdimou@intracosta.com'
  },
  {
    nameKey: 'teamMember.kouloudiIrini',
    roleKey: 'teamAccountingDepartment',
    image: 'kouloudi-irini',
    email: 'account@intracosta.com'
  },
  {
    nameKey: 'teamMember.tsitlakidouKyriaki',
    roleKey: 'teamAccountingDepartment',
    image: 'kyriaki-tsitlakidou',
    email: 'account@intracosta.com'
  },
  {
    nameKey: 'teamMember.kouloudiNikoleta',
    roleKey: 'teamAccountingDepartment',
    image: 'kouloudi-nikoleta',
    email: 'account@intracosta.com'
  },
  {
    nameKey: 'teamMember.giannakidouIrini',
    roleKey: 'teamImportDepartment',
    image: 'giannakidou-irini'
  },
  {
    nameKey: 'teamMember.vangelisSaakian',
    roleKey: 'teamExportDepartment',
    image: 'vaggelis',
    email: 'vaggelis@intracosta.com'
  },
  {
    nameKey: 'teamMember.eleniAlbani',
    roleKey: 'teamExportDepartment',
    image: 'eleni-almpani',
    email: 'eleni.albani@intracosta.com'
  }
];

interface TeamMemberCardProps {
  member: TeamMemberMeta;
  displayName: string;
  roleLabel: string;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

const TeamMemberCard = React.memo(({ member, displayName, roleLabel, onImageError }: TeamMemberCardProps) => {
  const dimensions = teamImageDimensions[member.image] ?? defaultImageDimensions;
  const webpSrc = `/team-webp/${member.image}.webp`;
  const fallbackSrc = `/team/${member.image}.JPG`;

  return (
    <div
      className="flex-shrink-0 w-[240px] sm:w-[260px] h-[380px] sm:h-[420px]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="bg-yellow-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col w-full h-full">
        <div className="relative w-full overflow-hidden h-[250px] sm:h-[280px] min-h-[250px] sm:min-h-[280px]">
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={fallbackSrc}
              alt={displayName}
              className="team-carousel-image w-full h-full object-cover"
              style={{
                filter: 'grayscale(100%) brightness(0.9) contrast(1.2) sepia(30%) saturate(150%) hue-rotate(5deg)'
              }}
              width={dimensions.width}
              height={dimensions.height}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 80vw, 260px"
              onError={onImageError}
            />
          </picture>
        </div>
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
            <p className="text-sm uppercase tracking-wider text-gray-800 mb-2">{roleLabel}</p>
          </div>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-xs text-gray-700 hover:text-yellow-600 transition-colors"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

const TeamCarousel: React.FC = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerView = 4;
  const maxIndex = Math.max(0, teamMembersMeta.length - cardsPerView);

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600">
            {t('teamTitle')}
          </h2>

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
              {teamMembersMeta.map((member) => {
                const displayName = t(member.nameKey);
                const roleLabel = t(member.roleKey);

                return (
                  <TeamMemberCard
                    key={member.image}
                    member={member}
                    displayName={displayName}
                    roleLabel={roleLabel}
                    onImageError={handleImageError}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
