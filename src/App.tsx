/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import {
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronRight,
  Sparkles,
  Utensils,
  Waves,
  Dumbbell,
  ConciergeBell,
  Home,
  MapPin,
  Phone,
  Share2,
  Bookmark,
  Navigation,
  Smartphone,
  Star,
  Building2,
  Clock,
  MessageSquarePlus
} from 'lucide-react';

// Generated authentic Faisalabad Real Estate imagery
import faisalabadHeroEstateImg from './assets/images/faisalabad_canal_road_estate_hero_1793359837417.jpg';
import madinaTown1KanalImg from './assets/images/faisalabad_madina_town_1kanal_house_1793359839353.jpg';
import kohinoorCommercialPlazaImg from './assets/images/faisalabad_kohinoor_commercial_plaza_1793359840276.jpg';
import citiHousing10MarlaImg from './assets/images/faisalabad_10marla_citi_housing_villa_1793359841172.jpg';

// Generated luxury suite & interior imagery
import heroInfinityPoolImg from './assets/images/hotel_sunset_infinity_pool_hero_1793357107446.jpg';
import deluxeOceanSuiteImg from './assets/images/hotel_deluxe_ocean_suite_1793357108192.jpg';
import marbleSpaSanctuaryImg from './assets/images/hotel_marble_spa_sanctuary_1793357111565.jpg';

// Uploaded media assets in /public/assets/aistudio
const UPLOADED_ASSETS = {
  videoFacilities: '/assets/aistudio/Highlighting_hotel_facilities_an__39d8ceec_30342d50.mp4',
  videoRoomShowcase: '/assets/aistudio/Luxury_hotel_website_room_showcase_fc2ae850_33281e95.mp4',
  videoGalleryTour: '/assets/aistudio/Hotel_website_design_voiceover_62901a9d_8165e79a.mp4',
  woodlandChaletImg: '/assets/aistudio/unnamed_89661b6e.jpg',
  waterfallGrottoOneImg: '/assets/aistudio/unnamed__1__f1c37e85.jpg',
  waterfallGrottoTwoImg: '/assets/aistudio/unnamed__2__f1c37e85.jpg',
};

interface PropertyListing {
  id: string;
  name: string;
  locationTag: string;
  category: 'residential' | 'commercial' | 'suites';
  categoryLabel: string;
  priceDisplay: string;
  pricePerNightUsd: number;
  areaSpec: string;
  bedrooms: number;
  bedType: string;
  highlight: string;
  description: string;
  image: string;
  amenities: string[];
}

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  metrics: string;
  image: string;
  video?: string;
}

interface GalleryMediaItem {
  id: string;
  title: string;
  location: string;
  category: 'faisalabad_homes' | 'commercial' | 'suites_interiors' | 'videos';
  type: 'image' | 'video';
  src: string;
  poster?: string;
  priceTag?: string;
}

interface ReviewItem {
  id: string;
  author: string;
  badge: string;
  rating: number;
  dateLabel: string;
  comment: string;
}

const PROPERTIES_DATA: PropertyListing[] = [
  {
    id: 'madina-town-z-1kanal-kothi',
    name: 'Block Z 1-Kanal Modern Designer House',
    locationTag: 'Block Z, Madina Town, Faisalabad',
    category: 'residential',
    categoryLabel: '1-Kanal Brand New Kothi',
    priceDisplay: 'PKR 7.25 Crore · Direct Transfer',
    pricePerNightUsd: 599,
    areaSpec: '1 Kanal (500 Sq. Yds)',
    bedrooms: 5,
    bedType: '5 Master Bedrooms + Double-Height Lobby',
    highlight: 'CNC Gate & Travertine Elevation',
    description:
      'Brand-new architectural 1-Kanal designer house in Block Z, Madina Town, Faisalabad featuring grey stone cladding, warm teak louvers, 3-car porch, and imported Spanish fittings.',
    image: madinaTown1KanalImg,
    amenities: [
      'Prime Block Z 60-Ft Carpeted Road',
      '2 Imported Kitchens + Dirty Kitchen',
      'Servant Quarters & 3-Car Porch',
      'Clear FDA / Registry Title',
    ],
  },
  {
    id: 'canal-road-executive-mansion',
    name: 'Canal Road Royal Travertine Corner Villa',
    locationTag: 'Main Canal Expressway, Faisalabad',
    category: 'residential',
    categoryLabel: '1-Kanal Corner Residence',
    priceDisplay: 'PKR 8.50 Crore · Possession Ready',
    pricePerNightUsd: 680,
    areaSpec: '1 Kanal Corner (540 Sq. Yds)',
    bedrooms: 6,
    bedType: '6 En-Suite Bedrooms + Home Theater',
    highlight: 'Corner Plot with Landscaped Lawn',
    description:
      'Flagship corner residence on Faisalabad’s prestigious Canal Road corridor with concealed warm LED facade lighting, expansive private lawn, and smart home automation.',
    image: faisalabadHeroEstateImg,
    amenities: [
      'Corner Plot Facing Lush Park',
      '15kW Hybrid Solar System Installed',
      'Double-Glazed Thermal Windows',
      '24/7 Gated Armed Security',
    ],
  },
  {
    id: 'kohinoor-susan-commercial-plaza',
    name: 'Kohinoor & Susan Road Corporate Plaza',
    locationTag: 'Kohinoor City / Susan Road, Faisalabad',
    category: 'commercial',
    categoryLabel: 'High-Rise Commercial Plaza',
    priceDisplay: 'PKR 18.50 Crore · 10.5% Rental Yield',
    pricePerNightUsd: 890,
    areaSpec: '4 Marla Commercial (9 Floors)',
    bedrooms: 9,
    bedType: 'Ground Showrooms + Corporate Floors',
    highlight: 'Pre-Leased Multinational Brands',
    description:
      'Landmark glass-curtain commercial building in Faisalabad’s highest-footfall commercial hub near Kohinoor City and Susan Road Madina Town, offering immediate rental income.',
    image: kohinoorCommercialPlazaImg,
    amenities: [
      'Frontage on Main Commercial Boulevard',
      '2 High-Speed Capsule Elevators',
      'Dedicated Basement & Front Parking',
      'FDA Approved Commercial Map',
    ],
  },
  {
    id: 'citi-housing-10marla-villa',
    name: '10-Marla Spanish-Modern Designer Villa',
    locationTag: 'Citi Housing / Wapda City, Faisalabad',
    category: 'residential',
    categoryLabel: '10-Marla Luxury Villa',
    priceDisplay: 'PKR 3.95 Crore · Bank Loan Eligible',
    pricePerNightUsd: 490,
    areaSpec: '10 Marla (250 Sq. Yds)',
    bedrooms: 4,
    bedType: '4 Master Suites + Terrace Lounge',
    highlight: 'Double-Height Entrance Portal',
    description:
      'Elegantly proportioned 10-Marla luxury house combining warm travertine stone with modern glass terraces, double-car garage, and designer chandeliers.',
    image: citiHousing10MarlaImg,
    amenities: [
      'Near Main Markaz & Grand Mosque',
      'Solid Ash Wood Doors & Wardrobes',
      'Underground Electrification',
      'Immediate Key Handover',
    ],
  },
  {
    id: 'deluxe-overseas-executive-suite',
    name: 'Deluxe Furnished Overseas Executive Suite',
    locationTag: 'Madina Town / Canal Enclave, Faisalabad',
    category: 'suites',
    categoryLabel: 'Serviced Luxury Suite',
    priceDisplay: 'From $599/night · Or PKR 3.20 Crore Purchase',
    pricePerNightUsd: 599,
    areaSpec: '1,850 Sq. Ft. Turnkey',
    bedrooms: 2,
    bedType: 'Custom Tufted King Bed + Lounge',
    highlight: 'Fine Dining & Butler Service',
    description:
      'Five-star turnkey furnished suite tailored for overseas Pakistani families and visiting textile executives, complete with walnut interiors and private terrace.',
    image: deluxeOceanSuiteImg,
    amenities: [
      'Fine Dining Breakfast & Dinner',
      'Calacatta Marble Spa Bathroom',
      '24-Hour Concierge & Chauffeur',
      'Guaranteed Rental Pool Option',
    ],
  },
  {
    id: 'calacatta-marble-penthouse',
    name: 'Calacatta Marble Spa Penthouse & Farmhouse',
    locationTag: 'Canal Road Farmhouse District, Faisalabad',
    category: 'suites',
    categoryLabel: 'Luxury Farmhouse & Spa Suite',
    priceDisplay: 'PKR 12.80 Crore · Or $749/night Stay',
    pricePerNightUsd: 749,
    areaSpec: '2 Kanal (1,000 Sq. Yds)',
    bedrooms: 5,
    bedType: '5 Royal Suites + Private Infinity Pool',
    highlight: 'Heated Infinity Pool & Marble Spa',
    description:
      'Private resort-style farmhouse estate in Faisalabad featuring book-matched Italian marble bathrooms, freestanding soaking tub, and private temperature-controlled pool.',
    image: marbleSpaSanctuaryImg,
    amenities: [
      'Private Heated Infinity Pool',
      'Imported Italian Marble Bath',
      'Private Gazebo & Event Lawn',
      'Dedicated Estate Manager',
    ],
  },
];

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'sales-acquisition',
    index: '01',
    title: 'Madina Town & Canal Road Residential Sales',
    shortLabel: 'House Sales',
    subtitle: '5-Marla, 10-Marla & 1-Kanal Designer Houses in Faisalabad',
    description:
      'Direct verified inventory of brand-new designer houses and residential plots in Block Z Madina Town, Canal Road, Citi Housing, Wapda City, and Eden Valley.',
    metrics: 'Block Z Headquarters · 5.0 ★ Verified Google Rating',
    image: madinaTown1KanalImg,
  },
  {
    id: 'commercial-plazas',
    index: '02',
    title: 'Kohinoor City & Susan Road Commercial Plazas',
    shortLabel: 'Commercial',
    subtitle: 'High-ROI retail showrooms, corporate offices & plazas',
    description:
      'Strategic acquisition and corporate leasing of commercial buildings in Kohinoor City, Susan Road, D-Ground, and Boulevard corridors with verified rental yields.',
    metrics: '9%–12% Annual Rental ROI · FDA & FBR Cleared',
    image: kohinoorCommercialPlazaImg,
  },
  {
    id: 'serviced-suites',
    index: '03',
    title: 'Overseas Executive Suites & Farmhouse Stays',
    shortLabel: 'Luxury Suites',
    subtitle: 'Turnkey furnished suites & heated spa pools from $599/night',
    description:
      'Hospitality-grade furnished suites, indoor heated mineral pools, and fine atrium dining for overseas investors and corporate guests visiting Faisalabad.',
    metrics: 'Heated Spa Pool · 24/7 Concierge & Security',
    image: deluxeOceanSuiteImg,
    video: UPLOADED_ASSETS.videoRoomShowcase,
  },
  {
    id: 'club-facilities',
    index: '04',
    title: 'Executive Club Facilities & Property Management',
    shortLabel: 'Club & Mgmt',
    subtitle: 'Skyline gym, thermal pool & white-glove reception',
    description:
      'Complete property management for overseas Pakistanis alongside access to our indoor heated pool, skyline fitness center, and marble reception desk.',
    metrics: 'C4C9+H4 Faisalabad · Direct Line +92 300 6670160',
    image: faisalabadHeroEstateImg,
    video: UPLOADED_ASSETS.videoFacilities,
  },
];

const GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: 'gal-fsd-1',
    title: '1-Kanal Modern Designer House · Madina Town',
    location: 'Block Z, Madina Town, Faisalabad',
    category: 'faisalabad_homes',
    type: 'image',
    src: madinaTown1KanalImg,
    priceTag: 'PKR 7.25 Crore',
  },
  {
    id: 'gal-fsd-2',
    title: 'Canal Road Corner Travertine Residence',
    location: 'Main Canal Expressway, Faisalabad',
    category: 'faisalabad_homes',
    type: 'image',
    src: faisalabadHeroEstateImg,
    priceTag: 'PKR 8.50 Crore',
  },
  {
    id: 'gal-fsd-3',
    title: 'Kohinoor Corporate & Commercial Plaza',
    location: 'Kohinoor City / Susan Road, Faisalabad',
    category: 'commercial',
    type: 'image',
    src: kohinoorCommercialPlazaImg,
    priceTag: 'PKR 18.50 Crore',
  },
  {
    id: 'gal-fsd-4',
    title: '10-Marla Spanish-Modern Villa · Citi Housing',
    location: 'Citi Housing, Faisalabad',
    category: 'faisalabad_homes',
    type: 'image',
    src: citiHousing10MarlaImg,
    priceTag: 'PKR 3.95 Crore',
  },
  {
    id: 'gal-fsd-5',
    title: 'Block Z Timber & Brick Guesthouse Annex',
    location: 'Block Z, Madina Town, Faisalabad',
    category: 'faisalabad_homes',
    type: 'image',
    src: UPLOADED_ASSETS.woodlandChaletImg,
    priceTag: 'PKR 4.20 Crore',
  },
  {
    id: 'gal-fsd-6',
    title: 'Deluxe Furnished Executive Master Suite',
    location: 'Overseas Executive Enclave',
    category: 'suites_interiors',
    type: 'image',
    src: deluxeOceanSuiteImg,
    priceTag: 'From $599/night',
  },
  {
    id: 'gal-fsd-7',
    title: 'Calacatta Gold Marble Master Bathroom',
    location: '1-Kanal Designer House Interior',
    category: 'suites_interiors',
    type: 'image',
    src: marbleSpaSanctuaryImg,
    priceTag: 'Italian Fittings',
  },
  {
    id: 'gal-fsd-8',
    title: 'Indoor Spa Pool, Skyline Gym & Reception Film',
    location: 'Executive Club Facilities Tour',
    category: 'videos',
    type: 'video',
    src: UPLOADED_ASSETS.videoFacilities,
    poster: marbleSpaSanctuaryImg,
    priceTag: 'HD Video Tour',
  },
  {
    id: 'gal-fsd-9',
    title: 'Luxury Suite & Grand Atrium Showcase Film',
    location: 'Interior & Hospitality Reel',
    category: 'videos',
    type: 'video',
    src: UPLOADED_ASSETS.videoRoomShowcase,
    poster: deluxeOceanSuiteImg,
    priceTag: 'Interior Film',
  },
  {
    id: 'gal-fsd-10',
    title: 'Natural Slate Courtyard Waterfall Feature',
    location: '1-Kanal Patio Feature Wall',
    category: 'suites_interiors',
    type: 'image',
    src: UPLOADED_ASSETS.waterfallGrottoOneImg,
    priceTag: 'Custom Landscape',
  },
  {
    id: 'gal-fsd-11',
    title: 'Farmhouse Horizon Infinity Pool',
    location: 'Canal Road Farmhouse Enclave',
    category: 'suites_interiors',
    type: 'image',
    src: heroInfinityPoolImg,
    priceTag: 'PKR 12.80 Crore',
  },
  {
    id: 'gal-fsd-12',
    title: 'Digital Portfolio & Suite Overview Film',
    location: 'Portfolio Showcase',
    category: 'videos',
    type: 'video',
    src: UPLOADED_ASSETS.videoGalleryTour,
    poster: faisalabadHeroEstateImg,
    priceTag: 'Overview Reel',
  },
];

const NEARBY_AGENCIES = [
  {
    name: 'Punjab Estate Agency (Official Headquarters)',
    area: 'Block Z, Madina Town, Faisalabad',
    rating: '5.0',
    reviewsCount: 1,
    category: 'Real estate agency · Verified Luxury & Commercial Desk',
    isCurrent: true,
  },
  {
    name: 'Sheikh & Awan Estate Agency',
    area: 'Madina Town, Faisalabad',
    rating: '5.0',
    reviewsCount: 1,
    category: 'Real estate agency',
    isCurrent: false,
  },
  {
    name: 'Ashraf Estate',
    area: 'Madina Town, Faisalabad',
    rating: '5.0',
    reviewsCount: 2,
    category: 'Real estate agency',
    isCurrent: false,
  },
  {
    name: 'Qasim Estate Agency',
    area: 'Madina Town, Faisalabad',
    rating: '3.5',
    reviewsCount: 2,
    category: 'Real estate agency',
    isCurrent: false,
  },
  {
    name: 'Javed Estate Agency',
    area: 'Madina Town, Faisalabad',
    rating: 'New',
    reviewsCount: 0,
    category: 'Real estate agency',
    isCurrent: false,
  },
  {
    name: 'Jazza Estate Agency',
    area: 'Madina Town, Faisalabad',
    rating: 'New',
    reviewsCount: 0,
    category: 'Real estate agency',
    isCurrent: false,
  },
];

function ResilientImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#231F1C] via-[#342E29] to-[#181512] text-[#E6DFD5] p-6 text-center ${className}`}
      >
        <Sparkles className="w-6 h-6 text-[#C5A059] mb-2 opacity-80" />
        <span className="font-serif-display text-sm tracking-wide">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function App() {
  const [activeHeroTab, setActiveHeroTab] = useState<'overview' | 'rooms' | 'services' | 'gallery'>('overview');
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'residential' | 'commercial' | 'suites'>('all');
  const [selectedFeaturedProperty, setSelectedFeaturedProperty] = useState<PropertyListing>(PROPERTIES_DATA[0]);
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_DATA[0].id);
  const [galleryFilter, setGalleryFilter] = useState<
    'all' | 'faisalabad_homes' | 'commercial' | 'suites_interiors' | 'videos'
  >('all');

  // Google Business Profile Interactive States
  const [profileTab, setProfileTab] = useState<'overview' | 'reviews' | 'directions' | 'nearby'>('overview');
  const [isSavedBusiness, setIsSavedBusiness] = useState<boolean>(false);
  const [statusBanner, setStatusBanner] = useState<string>('');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [isSendToPhoneOpen, setIsSendToPhoneOpen] = useState<boolean>(false);
  const [phoneTargetInput, setPhoneTargetInput] = useState<string>('+92 300 ');
  const [phoneSentSuccess, setPhoneSentSuccess] = useState<boolean>(false);

  // Verified Reviews State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    {
      id: 'rev-qamar',
      author: 'Qamar hussain',
      badge: 'Local Guide · 4 reviews · 27 photos',
      rating: 5,
      dateLabel: '4 years ago',
      comment:
        'Highly professional real estate agency in Block Z, Madina Town, Faisalabad. Transparent documentation, reliable property valuation, and excellent client dealing.',
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');

  // Video Cinema State
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [isMutedVideo, setIsMutedVideo] = useState<boolean>(true);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  // Lightbox State
  const [lightboxItem, setLightboxItem] = useState<GalleryMediaItem | null>(null);

  // Booking / Viewing Appointment Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPropertyId, setBookingPropertyId] = useState<string>(PROPERTIES_DATA[0].id);
  const [inquiryMode, setInquiryMode] = useState<'viewing' | 'suite_stay'>('viewing');
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-12');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-15');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [includeFineDining, setIncludeFineDining] = useState<boolean>(true);
  const [includeSpaRitual, setIncludeSpaRitual] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+92 ');
  const [bookingError, setBookingError] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<{
    referenceCode: string;
    propertyName: string;
    mode: 'viewing' | 'suite_stay';
    nights: number;
    totalPrice: number;
    clientName: string;
    checkIn: string;
    checkOut: string;
  } | null>(null);

  const showcaseVideos = [
    {
      id: 'facilities-reel',
      title: 'Premium Club Facilities & Services',
      subtitle: 'Heated Indoor Infinity Pool · Skyline Fitness Studio · Marble Concierge Reception',
      src: UPLOADED_ASSETS.videoFacilities,
      poster: marbleSpaSanctuaryImg,
      duration: '0:08',
    },
    {
      id: 'rooms-reel',
      title: 'Luxury Suites & Grand Atrium Showcase',
      subtitle: 'Deluxe Furnished Suite ($599/night) · Grand Atrium Dining · Guesthouses',
      src: UPLOADED_ASSETS.videoRoomShowcase,
      poster: deluxeOceanSuiteImg,
      duration: '0:08',
    },
    {
      id: 'gallery-reel',
      title: 'Punjab Estate & Luxury Portfolio Tour',
      subtitle: 'Interactive Property Photography · Infinity Pool · Interior Architecture',
      src: UPLOADED_ASSETS.videoGalleryTour,
      poster: faisalabadHeroEstateImg,
      duration: '0:08',
    },
  ];

  const filteredProperties = useMemo(() => {
    if (propertyFilter === 'all') return PROPERTIES_DATA;
    return PROPERTIES_DATA.filter((p) => p.category === propertyFilter);
  }, [propertyFilter]);

  const activeService = useMemo(
    () => SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0],
    [activeServiceId]
  );

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === galleryFilter);
  }, [galleryFilter]);

  const selectedBookingProperty = useMemo(
    () => PROPERTIES_DATA.find((p) => p.id === bookingPropertyId) || PROPERTIES_DATA[0],
    [bookingPropertyId]
  );

  const nightsCount = useMemo(() => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkInDate, checkOutDate]);

  const totalBookingCost = useMemo(() => {
    const roomBase = selectedBookingProperty.pricePerNightUsd * nightsCount;
    const diningCost = includeFineDining ? 95 * nightsCount : 0;
    const spaCost = includeSpaRitual ? 180 : 0;
    return roomBase + diningCost + spaCost;
  }, [selectedBookingProperty, nightsCount, includeFineDining, includeSpaRitual]);

  const averageRating = useMemo(() => {
    const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviewsList.length).toFixed(1);
  }, [reviewsList]);

  const showTemporaryFeedback = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => {
      setStatusBanner('');
    }, 4000);
  };

  const handleHeroTabClick = (tab: 'overview' | 'rooms' | 'services' | 'gallery') => {
    setActiveHeroTab(tab);
    const sectionMap: Record<typeof tab, string> = {
      overview: 'faisalabad-hub',
      rooms: 'rooms-section',
      services: 'services-section',
      gallery: 'gallery-section',
    };
    const targetEl = document.getElementById(sectionMap[tab]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openReservationForProperty = (propertyId: string, mode: 'viewing' | 'suite_stay' = 'viewing') => {
    setBookingPropertyId(propertyId);
    setInquiryMode(mode);
    setConfirmedReservation(null);
    setBookingError('');
    setIsBookingModalOpen(true);
  };

  const toggleMainVideoPlayback = () => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.paused) {
      mainVideoRef.current.play();
      setIsPlayingVideo(true);
    } else {
      mainVideoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleMainVideoMute = () => {
    if (!mainVideoRef.current) return;
    mainVideoRef.current.muted = !mainVideoRef.current.muted;
    setIsMutedVideo(mainVideoRef.current.muted);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim()) return;
    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      badge: 'Verified Client · Faisalabad',
      rating: newReviewRating,
      dateLabel: 'Just now',
      comment:
        newReviewText.trim() ||
        'Excellent experience with Punjab Estate Agency in Block Z, Madina Town, Faisalabad.',
    };
    setReviewsList([created, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setIsWriteReviewOpen(false);
    setProfileTab('reviews');
    showTemporaryFeedback('Thank you! Your review has been added to Punjab Estate Agency.');
  };

  const handleSendToPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneTargetInput.trim()) return;
    setPhoneSentSuccess(true);
    setTimeout(() => {
      setPhoneSentSuccess(false);
      setIsSendToPhoneOpen(false);
      showTemporaryFeedback(
        `Address (Block Z Madina Town, C4C9+H4) & Phone (+92 300 6670160) dispatched to ${phoneTargetInput}.`
      );
    }, 1200);
  };

  const handleShareBusiness = async () => {
    const shareText =
      'Punjab Estate Agency — 5.0 ★ Real Estate Agency | Block Z Madina Town, Faisalabad, Pakistan (C4C9+H4) | Tel: +92 300 6670160';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
    }
    showTemporaryFeedback('Copied business details & Plus Code (C4C9+H4 Faisalabad) to clipboard.');
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientName.trim().length < 2) {
      setBookingError('Please enter your full name.');
      return;
    }
    if (!clientEmail.includes('@') || !clientEmail.includes('.')) {
      setBookingError('Please provide a valid email address.');
      return;
    }
    setBookingError('');
    const randomRef = `PEA-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedReservation({
      referenceCode: randomRef,
      propertyName: selectedBookingProperty.name,
      mode: inquiryMode,
      nights: nightsCount,
      totalPrice: totalBookingCost,
      clientName: clientName.trim(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181615] flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6]">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top-hero"
          className="font-serif-display text-xl lg:text-2xl font-semibold tracking-tight text-[#181615] whitespace-nowrap shrink-0"
        >
          Punjab Estate Agency
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57524C]">
          <a
            href="#faisalabad-hub"
            className="hover:text-[#181615] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Madina Town Desk
          </a>
          <a
            href="#rooms-section"
            className="hover:text-[#181615] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Faisalabad Properties
          </a>
          <a
            href="#services-section"
            className="hover:text-[#181615] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#facilities-cinema"
            className="hover:text-[#181615] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Video Tours
          </a>
          <a
            href="#gallery-section"
            className="hover:text-[#181615] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => openReservationForProperty(selectedFeaturedProperty.id, 'viewing')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#181615] hover:bg-[#302C28] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule Site Visit
          </button>
        </div>
      </header>

      {/* SCREEN 1: HERO SECTION FEATURING FAISALABAD 1-KANAL MODERN DESIGNER REAL ESTATE */}
      <section id="top-hero" className="relative w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-8">
          <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[660px] rounded-xl overflow-hidden border border-[#E6E0D6]">
            <ResilientImage
              src={faisalabadHeroEstateImg}
              alt="Punjab Estate Agency Faisalabad 1-Kanal Designer House Boulevard"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

            {/* Top subtle trust bar inside Hero */}
            <div className="absolute top-6 inset-x-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/90 border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <span>Block Z, Madina Town, Faisalabad</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Plus Code: C4C9+H4</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums font-semibold">5.0 ★ Verified Agency</span>
                <span aria-hidden="true">·</span>
                <a href="tel:+923006670160" className="underline hover:text-white tabular-nums">
                  +92 300 6670160
                </a>
              </div>
            </div>

            {/* Central Hero Statement */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#E8DFD1] mb-3 font-medium">
                Punjab Estate Agency · Block Z, Madina Town, Faisalabad
              </p>
              <h1
                className="font-serif-display text-white font-normal tracking-tight max-w-4xl text-balance drop-shadow-sm"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.1rem)', lineHeight: 1.08 }}
              >
                Faisalabad’s Premier Designer Houses, Plazas &amp; Luxury Suites
              </h1>
              <p className="mt-5 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
                Trusted buying, selling, and investment advisory across Madina Town, Canal Road,
                Kohinoor City, and Citi Housing Faisalabad — with 100% verified titles.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleHeroTabClick('rooms')}
                  className="px-6 py-3 bg-white text-[#181615] text-sm font-semibold rounded-md hover:bg-[#F3EFEA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Browse Faisalabad Listings
                </button>
                <a
                  href="tel:+923006670160"
                  className="px-6 py-3 bg-black/55 text-white border border-white/35 backdrop-blur-sm text-sm font-medium rounded-md hover:bg-black/75 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span className="tabular-nums">Call +92 300 6670160</span>
                </a>
              </div>
            </div>

            {/* Bottom Interactive Sub-Nav Bar inside Hero */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E6E0D6] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => handleHeroTabClick('overview')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeHeroTab === 'overview'
                      ? 'bg-[#D8E8EE] text-[#123542]'
                      : 'text-[#181615] hover:bg-[#EFECE6]'
                  }`}
                >
                  Madina Town Office (5.0 ★)
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroTabClick('rooms')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeHeroTab === 'rooms'
                      ? 'bg-[#D8E8EE] text-[#123542]'
                      : 'text-[#181615] hover:bg-[#EFECE6]'
                  }`}
                >
                  Houses &amp; Plazas
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroTabClick('gallery')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeHeroTab === 'gallery'
                      ? 'bg-[#D8E8EE] text-[#123542]'
                      : 'text-[#181615] hover:bg-[#EFECE6]'
                  }`}
                >
                  Faisalabad Gallery (12)
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroTabClick('services')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeHeroTab === 'services'
                      ? 'bg-[#D8E8EE] text-[#123542]'
                      : 'text-[#181615] hover:bg-[#EFECE6]'
                  }`}
                >
                  Services &amp; Suites
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-6 text-xs text-[#57524C]">
                <div className="flex items-center gap-2">
                  <span>Block Z, Madina Town</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#181615] tabular-nums">+92 300 6670160</span>
                </div>
                <button
                  type="button"
                  onClick={() => openReservationForProperty('madina-town-z-1kanal-kothi', 'viewing')}
                  className="px-4 py-2 bg-[#181615] text-white text-xs font-semibold rounded hover:bg-[#332E2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book Site Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 2: PUNJAB ESTATE AGENCY — VERIFIED GOOGLE MAPS PROFILE, REVIEWS & FAISALABAD DIRECTORY */}
      <section id="faisalabad-hub" className="py-14 lg:py-20 border-b border-[#E6E0D6] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {statusBanner && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-[#181615] text-white text-xs sm:text-sm flex items-center justify-between">
              <span>{statusBanner}</span>
              <button
                type="button"
                onClick={() => setStatusBanner('')}
                className="text-white/75 hover:text-white ml-4 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Official Business Identity & Actions */}
            <div className="lg:col-span-7 bg-[#FAF8F5] rounded-xl border border-[#E6E0D6] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E6E0D6]">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7A7267] mb-1">
                    <span>Real estate agency</span>
                    <span aria-hidden="true">·</span>
                    <span>Madina Town, Faisalabad</span>
                  </div>
                  <h2 className="font-serif-display text-3xl sm:text-4xl text-[#181615] tracking-tight">
                    Punjab Estate Agency
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="font-bold text-[#181615] tabular-nums">{averageRating}</span>
                    <div className="flex items-center text-[#C58F2B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C58F2B]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#57524C] tabular-nums">
                      ({reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>

                {/* Action Bar: Directions, Save, Nearby, Send to phone, Share */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileTab('directions')}
                    className="px-3.5 py-2 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSavedBusiness(!isSavedBusiness);
                      showTemporaryFeedback(
                        !isSavedBusiness
                          ? 'Saved Punjab Estate Agency to your shortlist.'
                          : 'Removed from saved list.'
                      );
                    }}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSavedBusiness
                        ? 'bg-[#8C6D46] text-white border-[#8C6D46]'
                        : 'bg-white text-[#181615] border-[#D8D0C5] hover:border-[#181615]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isSavedBusiness ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileTab('nearby')}
                    className="px-3.5 py-2 bg-white text-[#181615] border border-[#D8D0C5] hover:border-[#181615] text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Nearby
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSendToPhoneOpen(true)}
                    className="px-3.5 py-2 bg-white text-[#181615] border border-[#D8D0C5] hover:border-[#181615] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Send to phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShareBusiness}
                    className="px-3.5 py-2 bg-white text-[#181615] border border-[#D8D0C5] hover:border-[#181615] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Sub-Navigation Tabs: Overview | Reviews | Directions | Nearby */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg my-6 w-fit">
                <button
                  type="button"
                  onClick={() => setProfileTab('overview')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    profileTab === 'overview'
                      ? 'bg-white text-[#181615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#181615]'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setProfileTab('reviews')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    profileTab === 'reviews'
                      ? 'bg-white text-[#181615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#181615]'
                  }`}
                >
                  Reviews ({reviewsList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProfileTab('directions')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    profileTab === 'directions'
                      ? 'bg-white text-[#181615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#181615]'
                  }`}
                >
                  Location &amp; Plus Code
                </button>
                <button
                  type="button"
                  onClick={() => setProfileTab('nearby')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    profileTab === 'nearby'
                      ? 'bg-white text-[#181615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#181615]'
                  }`}
                >
                  People Also Search For
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {profileTab === 'overview' && (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-[#E6E0D6] flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-[#7A7267] block">Headquarters Address</span>
                        <strong className="text-[#181615] font-semibold block mt-0.5">
                          Block Z Madina Town, Faisalabad, Pakistan
                        </strong>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#E6E0D6] flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#8C6D46] shrink-0 mt-1" />
                      <div className="flex-1">
                        <span className="text-xs text-[#7A7267] block">Direct Contact Number</span>
                        <a
                          href="tel:+923006670160"
                          className="text-[#181615] font-semibold hover:underline block mt-0.5 tabular-nums"
                        >
                          +92 300 6670160
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#E6E0D6] flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-[#8C6D46] shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-[#7A7267] block">Google Maps Plus Code</span>
                        <strong className="text-[#181615] font-semibold block mt-0.5 tabular-nums">
                          C4C9+H4 Faisalabad, Pakistan
                        </strong>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#E6E0D6] flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#8C6D46] shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-[#7A7267] block">Office &amp; Viewing Hours</span>
                        <strong className="text-[#181615] font-semibold block mt-0.5 tabular-nums">
                          Mon–Sun · 9:00 AM – 9:00 PM PKT
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REVIEWS */}
              {profileTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="p-5 bg-white rounded-lg border border-[#E6E0D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="text-center">
                        <span className="font-serif-display text-4xl font-bold text-[#181615] tabular-nums block">
                          {averageRating}
                        </span>
                        <div className="flex items-center justify-center text-[#C58F2B] my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#C58F2B]" />
                          ))}
                        </div>
                        <span className="text-xs text-[#7A7267] tabular-nums">
                          {reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs w-44 sm:w-56">
                        {[5, 4, 3, 2, 1].map((starNum) => {
                          const count = reviewsList.filter((r) => r.rating === starNum).length;
                          const pct = Math.round((count / reviewsList.length) * 100);
                          return (
                            <div key={starNum} className="flex items-center gap-2">
                              <span className="w-3 tabular-nums text-[#57524C]">{starNum}</span>
                              <div className="flex-1 h-2 bg-[#EFECE6] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#C58F2B]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsWriteReviewOpen(true)}
                      className="px-4 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Write a review</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 bg-white rounded-lg border border-[#E6E0D6] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-[#181615]">{rev.author}</h4>
                            <p className="text-xs text-[#7A7267]">{rev.badge}</p>
                          </div>
                          <span className="text-xs text-[#7A7267]">{rev.dateLabel}</span>
                        </div>
                        <div className="flex items-center text-[#C58F2B]">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-[#C58F2B]" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-[#302C28] leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DIRECTIONS */}
              {profileTab === 'directions' && (
                <div className="p-5 bg-white rounded-lg border border-[#E6E0D6] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
                        Faisalabad Office Coordinates
                      </span>
                      <h3 className="font-serif-display text-xl text-[#181615] mt-0.5">
                        Block Z Madina Town, Faisalabad, Pakistan
                      </h3>
                      <p className="text-xs text-[#57524C] mt-1 tabular-nums">
                        Plus Code: C4C9+H4 Faisalabad, Pakistan · Direct Line: +92 300 6670160
                      </p>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Punjab+Estate+Agency+Block+Z+Madina+Town+Faisalabad+Pakistan"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] transition-colors whitespace-nowrap shrink-0 self-start"
                    >
                      Open in Google Maps →
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#EFECE6] text-xs">
                    <div>
                      <span className="text-[#7A7267] block">From Susan Road Markaz</span>
                      <strong className="text-[#181615] tabular-nums">3 mins drive (1.2 km)</strong>
                    </div>
                    <div>
                      <span className="text-[#7A7267] block">From Kohinoor City</span>
                      <strong className="text-[#181615] tabular-nums">6 mins drive (2.8 km)</strong>
                    </div>
                    <div>
                      <span className="text-[#7A7267] block">From Canal Expressway</span>
                      <strong className="text-[#181615] tabular-nums">5 mins drive (2.4 km)</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PEOPLE ALSO SEARCH FOR */}
              {profileTab === 'nearby' && (
                <div className="bg-white rounded-lg border border-[#E6E0D6] overflow-hidden">
                  <div className="px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E6E0D6] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#181615]">
                      Madina Town Real Estate Agencies Directory
                    </span>
                    <span className="text-xs text-[#7A7267]">Faisalabad Market</span>
                  </div>
                  <div className="divide-y divide-[#EFECE6]">
                    {NEARBY_AGENCIES.map((agency) => (
                      <div
                        key={agency.name}
                        className={`px-5 py-3.5 flex items-center justify-between gap-4 text-xs ${
                          agency.isCurrent ? 'bg-[#FAF8F5] font-semibold' : ''
                        }`}
                      >
                        <div>
                          <span className="text-[#181615] block">{agency.name}</span>
                          <span className="text-[#7A7267] font-normal">{agency.category}</span>
                        </div>
                        <div className="text-right tabular-nums shrink-0">
                          {agency.reviewsCount > 0 ? (
                            <span className="text-[#181615] font-semibold">
                              {agency.rating} ★ ({agency.reviewsCount})
                            </span>
                          ) : (
                            <span className="text-[#7A7267]">No reviews</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Authentic Block Z Madina Town 1-Kanal House Card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-xl border border-[#E6E0D6] overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181615]">
                <ResilientImage
                  src={madinaTown1KanalImg}
                  alt="1-Kanal Modern Designer House in Block Z Madina Town Faisalabad"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs text-[#E8DFD1] uppercase tracking-wider mb-1">
                    Featured Block Z Madina Town Listing
                  </p>
                  <h3 className="font-serif-display text-2xl font-normal">
                    1-Kanal Modern Designer Kothi · Madina Town
                  </h3>
                  <p className="text-xs text-white/85 mt-1 tabular-nums">
                    PKR 7.25 Crore · Direct Keys with Punjab Estate (+92 300 6670160)
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#57524C] border-b border-[#E6E0D6] pb-3">
                  <span>Reviewed by Qamar hussain (Local Guide)</span>
                  <span className="font-semibold text-[#181615] tabular-nums">5.0 ★ Rating</span>
                </div>
                <p className="text-xs text-[#57524C] leading-relaxed">
                  Visit our headquarters in Block Z, Madina Town, Faisalabad for direct owner
                  meetings, FDA-verified residential houses, and high-yield commercial plazas.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => openReservationForProperty('madina-town-z-1kanal-kothi', 'viewing')}
                    className="flex-1 py-2.5 px-4 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] transition-colors text-center cursor-pointer"
                  >
                    Book House Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="py-2.5 px-4 bg-white text-[#181615] border border-[#D8D0C5] hover:border-[#181615] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 3: FAISALABAD PROPERTIES, PLAZAS & SUITES SHOWCASE */}
      <section id="rooms-section" className="py-16 lg:py-24 border-b border-[#E6E0D6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A7267] mb-2">
                Verified Faisalabad Inventory
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#181615] tracking-tight">
                Faisalabad Designer Houses, Plazas &amp; Luxury Suites
              </h2>
            </div>

            {/* Interactive Segmented Filter Bar */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg self-start">
              <button
                type="button"
                onClick={() => setPropertyFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  propertyFilter === 'all'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                All Listings ({PROPERTIES_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setPropertyFilter('residential')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  propertyFilter === 'residential'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                1-Kanal &amp; 10-Marla Houses
              </button>
              <button
                type="button"
                onClick={() => setPropertyFilter('commercial')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  propertyFilter === 'commercial'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Kohinoor &amp; Susan Plazas
              </button>
              <button
                type="button"
                onClick={() => setPropertyFilter('suites')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  propertyFilter === 'suites'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Executive Suites &amp; Farmhouses
              </button>
            </div>
          </div>

          {/* FLAGSHIP EDITORIAL SPLIT SHOWCASE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-stretch">
            <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] rounded-xl overflow-hidden border border-[#E6E0D6]">
              <ResilientImage
                src={selectedFeaturedProperty.image}
                alt={selectedFeaturedProperty.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-center sm:text-left">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#E6DFD5] mb-2">
                    {selectedFeaturedProperty.categoryLabel} · {selectedFeaturedProperty.areaSpec}
                  </p>
                  <h3 className="font-serif-display text-2xl sm:text-4xl text-white font-normal mb-2">
                    {selectedFeaturedProperty.name}
                  </h3>
                  <p className="text-base sm:text-xl text-white font-semibold tabular-nums mb-1">
                    {selectedFeaturedProperty.priceDisplay}
                  </p>
                  <p className="text-xs sm:text-sm text-white/85 mb-5">
                    {selectedFeaturedProperty.highlight} · {selectedFeaturedProperty.locationTag}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <button
                      type="button"
                      onClick={() => openReservationForProperty(selectedFeaturedProperty.id, 'viewing')}
                      className="px-5 py-2.5 bg-white text-[#181615] text-xs sm:text-sm font-semibold rounded-md hover:bg-[#F3EFEA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Schedule Viewing / Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Specification & Valuation Card */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-[#E6E0D6] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7A7267] pb-4 border-b border-[#EFECE6]">
                  <span>Verified Listing</span>
                  <span className="tabular-nums">{selectedFeaturedProperty.areaSpec}</span>
                </div>

                <h4 className="font-serif-display text-2xl text-[#181615] mt-5">
                  {selectedFeaturedProperty.name}
                </h4>
                <p className="text-xs text-[#8C6D46] mt-1 font-medium">
                  {selectedFeaturedProperty.locationTag}
                </p>
                <p className="text-xs text-[#57524C] mt-3 leading-relaxed">
                  {selectedFeaturedProperty.description}
                </p>

                <div className="mt-6 py-4 px-5 bg-[#FAF8F5] rounded-lg border border-[#EFECE6]">
                  <span className="text-xs text-[#7A7267] block">Asking Price / Rate</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-serif-display text-2xl font-semibold text-[#181615] tabular-nums">
                      {selectedFeaturedProperty.priceDisplay.split('·')[0]}
                    </span>
                  </div>
                  <span className="text-xs text-[#57524C] block mt-1 tabular-nums">
                    Executive Short Stay Rate: ${selectedFeaturedProperty.pricePerNightUsd}/night
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs text-[#3D3833]">
                  {selectedFeaturedProperty.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#8C6D46] shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EFECE6] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => openReservationForProperty(selectedFeaturedProperty.id, 'viewing')}
                  className="w-full py-3 bg-[#181615] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#302C28] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Private Inspection
                </button>
              </div>
            </div>
          </div>

          {/* 3-Column Faisalabad Real Estate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => {
              const isSelected = prop.id === selectedFeaturedProperty.id;
              return (
                <article
                  key={prop.id}
                  onClick={() => setSelectedFeaturedProperty(prop)}
                  className={`group bg-white rounded-xl overflow-hidden border transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-[#181615] shadow-sm'
                      : 'border-[#E6E0D6] hover:border-[#B8AFA3]'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181615]">
                      <ResilientImage
                        src={prop.image}
                        alt={prop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                        <span className="text-xs font-medium text-white/90">{prop.highlight}</span>
                        <span className="text-xs font-semibold tabular-nums">
                          {prop.areaSpec.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#7A7267] mb-2">
                        <span>{prop.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{prop.areaSpec}</span>
                      </div>

                      <h3 className="font-serif-display text-xl text-[#181615] font-normal">
                        {prop.name}
                      </h3>
                      <p className="text-xs text-[#8C6D46] mt-1 font-medium">{prop.locationTag}</p>
                      <p className="text-xs text-[#57524C] mt-2 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-[#7A7267] block">Demand / Valuation</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#181615] tabular-nums">
                        {prop.priceDisplay.split('·')[0]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReservationForProperty(prop.id, 'viewing');
                      }}
                      className="px-4 py-2 bg-[#181615] text-white text-xs font-semibold rounded hover:bg-[#332E2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Book Visit
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCREEN 4: SERVICES & ESTATE ADVISORY */}
      <section id="services-section" className="py-16 lg:py-24 border-b border-[#E6E0D6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A7267] mb-2">
                Advisory &amp; Hospitality
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#181615] tracking-tight text-balance">
                Faisalabad Real Estate &amp; Hospitality Services
              </h2>
            </div>
            <p className="text-sm text-[#57524C] max-w-md">
              From 1-Kanal designer houses in Madina Town to commercial plazas in Kohinoor City
              and executive serviced suites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-xl border border-[#E6E0D6] p-4 sm:p-6">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden bg-[#181615]">
                {activeService.video ? (
                  <video
                    key={activeService.video}
                    src={activeService.video}
                    poster={activeService.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ResilientImage
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/80 mb-1">{activeService.metrics}</p>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-normal">
                      {activeService.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => openReservationForProperty(selectedFeaturedProperty.id, 'viewing')}
                    className="px-4 py-2 bg-white text-[#181615] text-xs font-semibold rounded hover:bg-[#F3EFEA] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    Consult Advisor
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#EFECE6]">
                {SERVICES_DATA.map((service) => {
                  const isActive = service.id === activeServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className={`flex flex-col items-center text-center p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#181615] text-white border-[#181615]'
                          : 'bg-[#FAF8F5] text-[#181615] border-[#E6E0D6] hover:border-[#B8AFA3]'
                      }`}
                    >
                      {service.id === 'sales-acquisition' && <Home className="w-5 h-5 mb-2 opacity-85" />}
                      {service.id === 'commercial-plazas' && <Building2 className="w-5 h-5 mb-2 opacity-85" />}
                      {service.id === 'serviced-suites' && <Utensils className="w-5 h-5 mb-2 opacity-85" />}
                      {service.id === 'club-facilities' && (
                        <ConciergeBell className="w-5 h-5 mb-2 opacity-85" />
                      )}
                      <span className="text-xs font-semibold whitespace-nowrap">
                        {service.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-[#E6E0D6] p-6 sm:p-8">
              <div>
                <h3 className="font-serif-display text-2xl text-[#181615] mb-2">
                  Core Divisions
                </h3>
                <p className="text-xs text-[#7A7267] mb-6">
                  Click any division below to preview our Faisalabad portfolio.
                </p>

                <div className="divide-y divide-[#EFECE6]">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = service.id === activeServiceId;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setActiveServiceId(service.id)}
                        className={`py-4 cursor-pointer transition-colors ${
                          isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="text-sm sm:text-base font-semibold text-[#181615]">
                            <span className="font-mono text-xs text-[#8C6D46] mr-2 tabular-nums">
                              {service.index}.
                            </span>
                            {service.title}
                          </h4>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isSelected ? 'translate-x-1 text-[#8C6D46]' : 'text-[#9E9589]'
                            }`}
                          />
                        </div>
                        <p className="text-xs text-[#57524C] mt-1.5 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EFECE6] flex items-center justify-between text-xs text-[#57524C]">
                <span>Direct Line: +92 300 6670160</span>
                <a
                  href="#facilities-cinema"
                  className="font-semibold text-[#181615] hover:underline whitespace-nowrap"
                >
                  Watch Video Tours →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 5: PREMIUM FACILITIES & VIDEO SHOWCASE */}
      <section id="facilities-cinema" className="py-16 lg:py-24 bg-[#141311] text-[#F5F2EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                Motion &amp; Architecture
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-white tracking-tight">
                Executive Club Facilities &amp; Suite Video Tours
              </h2>
            </div>
            <p className="text-sm text-[#B8B0A4] max-w-md">
              Explore our heated indoor infinity pool, panoramic Technogym fitness studio,
              marble concierge reception, and furnished suite tours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 relative rounded-xl overflow-hidden bg-black border border-white/15 flex flex-col justify-between min-h-[380px] sm:min-h-[480px]">
              <video
                ref={mainVideoRef}
                key={showcaseVideos[activeVideoIndex].src}
                src={showcaseVideos[activeVideoIndex].src}
                poster={showcaseVideos[activeVideoIndex].poster}
                autoPlay
                loop
                muted={isMutedVideo}
                playsInline
                onPlay={() => setIsPlayingVideo(true)}
                onPause={() => setIsPlayingVideo(false)}
                className="w-full h-full object-cover max-h-[540px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-1">
                    <span>Film 0{activeVideoIndex + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{showcaseVideos[activeVideoIndex].duration}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                    {showcaseVideos[activeVideoIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {showcaseVideos[activeVideoIndex].subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleMainVideoPlayback}
                    className="px-4 py-2.5 bg-white text-[#181615] text-xs font-semibold rounded-md hover:bg-[#E6DFD5] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingVideo ? 'Pause Film' : 'Play Film'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleMainVideoMute}
                    aria-label={isMutedVideo ? 'Unmute video' : 'Mute video'}
                    className="p-2.5 bg-black/60 text-white border border-white/25 rounded-md hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    {isMutedVideo ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                {showcaseVideos.map((vid, idx) => {
                  const isCurrent = idx === activeVideoIndex;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setActiveVideoIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isCurrent
                          ? 'bg-[#221F1C] border-[#C5A059]'
                          : 'bg-[#1A1816] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                        <ResilientImage
                          src={vid.poster}
                          alt={vid.title}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between text-[11px] text-[#C5A059] mb-0.5">
                          <span>Chapter 0{idx + 1}</span>
                          <span className="tabular-nums">{vid.duration}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate">{vid.title}</h4>
                        <p className="text-xs text-[#ABA398] line-clamp-2 mt-1">{vid.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 rounded-xl bg-[#1A1816] border border-white/10 space-y-4">
                <h4 className="font-serif-display text-lg text-white">
                  Highlighted Club &amp; Estate Amenities
                </h4>
                <div className="space-y-3 text-xs text-[#D0C9BE]">
                  <div className="flex items-start gap-3">
                    <Waves className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">
                        Heated Indoor Infinity Spa Pool
                      </span>
                      <span>Poolside lounge service &amp; panoramic glass sanctuary.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Dumbbell className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">
                        Skyline Performance Gym
                      </span>
                      <span>Floor-to-ceiling cardio deck with personal wellness trainers.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ConciergeBell className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">
                        Calacatta Gold Marble Reception
                      </span>
                      <span>24-hour executive check-in &amp; property advisory desk.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 6: FAISALABAD REAL ESTATE & SUITE GALLERY (12 ITEMS) */}
      <section id="gallery-section" className="py-16 lg:py-24 border-b border-[#E6E0D6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A7267] mb-2">
                Faisalabad Real Estate Portfolio
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#181615] tracking-tight">
                Faisalabad Houses, Plazas &amp; Interior Gallery
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg self-start">
              <button
                type="button"
                onClick={() => setGalleryFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  galleryFilter === 'all'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                All Media ({GALLERY_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => setGalleryFilter('faisalabad_homes')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  galleryFilter === 'faisalabad_homes'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Faisalabad Houses
              </button>
              <button
                type="button"
                onClick={() => setGalleryFilter('commercial')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  galleryFilter === 'commercial'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Commercial Plazas
              </button>
              <button
                type="button"
                onClick={() => setGalleryFilter('suites_interiors')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  galleryFilter === 'suites_interiors'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Luxury Interiors &amp; Pools
              </button>
              <button
                type="button"
                onClick={() => setGalleryFilter('videos')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  galleryFilter === 'videos'
                    ? 'bg-white text-[#181615] shadow-xs'
                    : 'text-[#57524C] hover:text-[#181615]'
                }`}
              >
                Video Reels
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E6E0D6] bg-[#181615] cursor-pointer"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <ResilientImage
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.type === 'video' ? (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-white/75">{item.location}</p>
                    <h3 className="font-serif-display text-lg font-normal leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  {item.priceTag && (
                    <span className="text-xs font-semibold text-[#E8DFD1] tabular-nums shrink-0">
                      {item.priceTag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN 7: DIRECT CONSULTATION & SUITE RESERVATION DESK */}
      <section id="reserve-section" className="py-16 lg:py-24 bg-[#F3EFE8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7A7267]">
                Block Z, Madina Town · C4C9+H4 Faisalabad
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#181615] tracking-tight text-balance">
                Schedule a Property Viewing or Reserve an Executive Suite
              </h2>
              <p className="text-sm text-[#57524C] leading-relaxed">
                Connect directly with Punjab Estate Agency at{' '}
                <strong className="text-[#181615] tabular-nums">+92 300 6670160</strong> for
                private site inspections in Madina Town, Canal Road, and Kohinoor City.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#DFD8CE]">
                <div>
                  <span className="font-serif-display text-3xl text-[#181615] tabular-nums block">
                    5.0 ★
                  </span>
                  <span className="text-xs text-[#57524C] mt-1 block">
                    Verified Google Rating in Block Z, Madina Town, Faisalabad
                  </span>
                </div>
                <div>
                  <span className="font-serif-display text-3xl text-[#181615] tabular-nums block">
                    100%
                  </span>
                  <span className="text-xs text-[#57524C] mt-1 block">
                    Title-Verified Residential, Commercial &amp; Suite Listings
                  </span>
                </div>
              </div>

              <blockquote className="p-6 bg-white rounded-xl border border-[#E6E0D6]">
                <p className="text-xs sm:text-sm text-[#302C28] italic leading-relaxed">
                  &ldquo;Punjab Estate Agency in Block Z, Madina Town handled our 1-Kanal residence
                  acquisition and executive guest suite bookings with complete transparency and
                  immediate documentation.&rdquo;
                </p>
                <footer className="mt-3 text-xs text-[#7A7267]">
                  <strong className="text-[#181615] font-semibold">Qamar hussain</strong> · Local
                  Guide · 4 reviews · 27 photos · Faisalabad
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-7 bg-white rounded-xl border border-[#E6E0D6] p-6 sm:p-10">
              {confirmedReservation ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#8C6D46] font-semibold">
                        Confirmed via Punjab Estate Agency
                      </span>
                      <h3 className="font-serif-display text-2xl text-[#181615] mt-1">
                        Thank You, {confirmedReservation.clientName}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#181615] bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#E6E0D6] tabular-nums">
                      Ref: {confirmedReservation.referenceCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F5] rounded-lg border border-[#EFECE6] text-xs">
                    <div>
                      <span className="text-[#7A7267] block">Selected Property / Suite</span>
                      <strong className="text-[#181615] font-semibold mt-0.5 block">
                        {confirmedReservation.propertyName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#7A7267] block">Dates</span>
                      <strong className="text-[#181615] font-semibold mt-0.5 block tabular-nums">
                        {confirmedReservation.checkIn} → {confirmedReservation.checkOut}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#7A7267] block">
                        {confirmedReservation.mode === 'viewing'
                          ? 'Appointment Type'
                          : 'Guaranteed Stay Total'}
                      </span>
                      <strong className="text-[#181615] font-semibold mt-0.5 block tabular-nums">
                        {confirmedReservation.mode === 'viewing'
                          ? 'Private Site Inspection (Complimentary)'
                          : `$${confirmedReservation.totalPrice.toLocaleString()} USD`}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#57524C]">
                    Our senior advisor at Block Z, Madina Town, Faisalabad (+92 300 6670160) will
                    contact you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() => setConfirmedReservation(null)}
                    className="px-5 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCompleteBooking} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFECE6]">
                    <h3 className="font-serif-display text-2xl text-[#181615]">
                      Property Viewing &amp; Suite Booking
                    </h3>
                    <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setInquiryMode('viewing')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                          inquiryMode === 'viewing'
                            ? 'bg-white text-[#181615] shadow-xs'
                            : 'text-[#57524C]'
                        }`}
                      >
                        Site Viewing
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquiryMode('suite_stay')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                          inquiryMode === 'suite_stay'
                            ? 'bg-white text-[#181615] shadow-xs'
                            : 'text-[#57524C]'
                        }`}
                      >
                        Executive Stay
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#302C28] mb-2">
                      Select Faisalabad Property or Luxury Suite
                    </label>
                    <select
                      value={bookingPropertyId}
                      onChange={(e) => setBookingPropertyId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md text-[#181615]"
                    >
                      {PROPERTIES_DATA.map((prop) => (
                        <option key={prop.id} value={prop.id}>
                          {prop.name} — {prop.priceDisplay}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Preferred Date / Check-In
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Follow-Up / Check-Out
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Visitors / Guests
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 Persons</option>
                        <option value={3}>3 Persons</option>
                        <option value={4}>4+ Family / Investor Group</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                      />
                    </div>
                  </div>

                  {bookingError && (
                    <p className="text-xs text-red-700 bg-red-50 border border-red-200 px-3.5 py-2 rounded">
                      {bookingError}
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#7A7267] block tabular-nums">
                        {inquiryMode === 'viewing'
                          ? 'Block Z, Madina Town Office · Direct Line +92 300 6670160'
                          : `${nightsCount} Nights · $${selectedBookingProperty.pricePerNightUsd}/night`}
                      </span>
                      <span className="font-serif-display text-xl font-semibold text-[#181615] tabular-nums">
                        {inquiryMode === 'viewing'
                          ? selectedBookingProperty.priceDisplay.split('·')[0]
                          : `Total Stay: $${totalBookingCost.toLocaleString()} USD`}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#181615] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#302C28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {inquiryMode === 'viewing'
                        ? 'Confirm Site Viewing'
                        : 'Confirm Suite Reservation'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-[#181615] text-[#B8B0A4] py-12 border-t border-white/10 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="font-serif-display text-xl text-white tracking-tight block">
              Punjab Estate Agency
            </span>
            <p className="text-xs text-[#8E867B] mt-1 tabular-nums">
              Block Z Madina Town, Faisalabad, Pakistan · Plus Code: C4C9+H4 · Tel: +92 300 6670160
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#faisalabad-hub" className="hover:text-white transition-colors">
              Madina Town Office
            </a>
            <a href="#rooms-section" className="hover:text-white transition-colors">
              Faisalabad Houses &amp; Plazas
            </a>
            <a href="#services-section" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#facilities-cinema" className="hover:text-white transition-colors">
              Video Tours
            </a>
            <a href="#gallery-section" className="hover:text-white transition-colors">
              Gallery
            </a>
          </div>

          <p className="text-xs text-[#8E867B] tabular-nums">
            © 2026 Punjab Estate Agency, Faisalabad. All rights reserved.
          </p>
        </div>
      </footer>

      {/* MODAL: WRITE A REVIEW */}
      {isWriteReviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsWriteReviewOpen(false)}
        >
          <div
            className="bg-white text-[#181615] rounded-xl max-w-md w-full p-6 sm:p-8 border border-[#E6E0D6] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <h3 className="font-serif-display text-2xl">Write a Review</h3>
                <p className="text-xs text-[#7A7267]">
                  Punjab Estate Agency · Block Z Madina Town, Faisalabad
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="p-1 text-[#7A7267] hover:text-[#181615] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Tariq"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewReviewRating(num)}
                      className={`p-2 rounded border cursor-pointer ${
                        newReviewRating >= num
                          ? 'bg-[#FAF8F5] border-[#C58F2B] text-[#C58F2B]'
                          : 'border-[#E6E0D6] text-[#B8B0A4]'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${newReviewRating >= num ? 'fill-[#C58F2B]' : ''}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                  Your Experience
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your experience buying, selling, or investing with Punjab Estate Agency..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#57524C] hover:text-[#181615] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SEND TO PHONE */}
      {isSendToPhoneOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsSendToPhoneOpen(false)}
        >
          <div
            className="bg-white text-[#181615] rounded-xl max-w-md w-full p-6 sm:p-8 border border-[#E6E0D6] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <h3 className="font-serif-display text-2xl">Send to Phone</h3>
                <p className="text-xs text-[#7A7267]">
                  Receive Block Z Madina Town address &amp; +92 300 6670160 via SMS
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSendToPhoneOpen(false)}
                className="p-1 text-[#7A7267] hover:text-[#181615] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {phoneSentSuccess ? (
              <div className="py-6 text-center space-y-2">
                <Check className="w-8 h-8 text-[#8C6D46] mx-auto" />
                <p className="text-sm font-semibold">Dispatched to {phoneTargetInput}</p>
              </div>
            ) : (
              <form onSubmit={handleSendToPhone} className="mt-5 space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#EFECE6] text-xs space-y-1">
                  <strong className="block text-[#181615]">Punjab Estate Agency (5.0 ★)</strong>
                  <span className="block text-[#57524C]">
                    Block Z Madina Town, Faisalabad, Pakistan (C4C9+H4)
                  </span>
                  <span className="block text-[#181615] font-semibold tabular-nums">
                    Tel: +92 300 6670160
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#302C28] mb-1.5">
                    Enter Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneTargetInput}
                    onChange={(e) => setPhoneTargetInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSendToPhoneOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#57524C] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md hover:bg-[#302C28] cursor-pointer"
                  >
                    Send Details
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR GALLERY PHOTOS & VIDEOS */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#181615] rounded-xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div>
                <h3 className="font-serif-display text-xl">{lightboxItem.title}</h3>
                <p className="text-xs text-white/70">{lightboxItem.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-2 text-white/80 hover:text-white rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-black max-h-[75vh] flex items-center justify-center overflow-hidden">
              {lightboxItem.type === 'video' ? (
                <video
                  src={lightboxItem.src}
                  poster={lightboxItem.poster}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <ResilientImage
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            <div className="px-6 py-4 bg-[#181615] flex items-center justify-between text-xs text-white">
              <span className="tabular-nums">{lightboxItem.priceTag || 'Punjab Estate Agency Portfolio'}</span>
              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  openReservationForProperty(selectedFeaturedProperty.id, 'viewing');
                }}
                className="px-4 py-2 bg-white text-[#181615] font-semibold rounded hover:bg-[#E6DFD5] transition-colors cursor-pointer"
              >
                Inquire About This Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK RESERVATION & VIEWING MODAL */}
      {isBookingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsBookingModalOpen(false)}
        >
          <div
            className="bg-white text-[#181615] rounded-xl max-w-xl w-full p-6 sm:p-8 border border-[#E6E0D6] shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EFECE6]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8C6D46] font-semibold">
                  Punjab Estate Agency · +92 300 6670160
                </p>
                <h3 className="font-serif-display text-2xl mt-1">
                  {selectedBookingProperty.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1.5 text-[#7A7267] hover:text-[#181615] rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 p-3 bg-[#FAF8F5] rounded-lg border border-[#EFECE6]">
              <ResilientImage
                src={selectedBookingProperty.image}
                alt={selectedBookingProperty.name}
                className="w-20 h-16 object-cover rounded shrink-0"
              />
              <div className="text-xs">
                <span className="font-semibold text-[#181615] block tabular-nums">
                  {selectedBookingProperty.priceDisplay}
                </span>
                <span className="text-[#57524C] block mt-0.5">
                  {selectedBookingProperty.locationTag} · {selectedBookingProperty.areaSpec}
                </span>
              </div>
            </div>

            {confirmedReservation ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-[#FAF8F5] border border-[#8C6D46]/40 rounded-lg text-xs space-y-1.5">
                  <p className="font-semibold text-[#181615] text-sm">
                    Confirmation #{confirmedReservation.referenceCode}
                  </p>
                  <p className="text-[#57524C]">
                    Scheduled for <strong>{confirmedReservation.clientName}</strong> ({confirmedReservation.checkIn} to {confirmedReservation.checkOut})
                  </p>
                  <p className="font-semibold text-[#181615] tabular-nums">
                    Block Z, Madina Town Desk: +92 300 6670160
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-full py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteBooking} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#302C28] mb-1">
                    Select Property or Suite
                  </label>
                  <select
                    value={bookingPropertyId}
                    onChange={(e) => setBookingPropertyId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                  >
                    {PROPERTIES_DATA.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.priceDisplay.split('·')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#302C28] mb-1">
                      Preferred Date / Check-In
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#302C28] mb-1">
                      Follow-Up / Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8D0C5] rounded-md tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#302C28] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#302C28] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D0C5] rounded-md"
                    />
                  </div>
                </div>

                {bookingError && (
                  <p className="text-xs text-red-700 bg-red-50 p-2.5 rounded border border-red-200">
                    {bookingError}
                  </p>
                )}

                <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#7A7267] block tabular-nums">
                      Block Z, Madina Town, Faisalabad
                    </span>
                    <span className="font-serif-display text-lg font-semibold text-[#181615] tabular-nums">
                      {selectedBookingProperty.priceDisplay.split('·')[0]}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#181615] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#302C28] transition-colors cursor-pointer"
                  >
                    Confirm Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
