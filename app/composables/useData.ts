export interface Room {
  id: string
  name: string
  type: string
  location: string
  locationShort: string
  price: string
  priceDisplay: string
  status: 'available' | 'rented'
  description: string
  fullDescription: string
  previewImage: string
  listImage: string
  detailImage: string
  thumbs: string[]
  availability: string
}

export interface Event {
  id: string
  name: string
  day: string
  month: string
  fullDate: string
  type: string
  description: string
  upcoming: boolean
  image: string
  heroImage?: string
  tagline?: string
  fullAbout?: string
  details?: {
    date: string
    time: string
    venue: string
    organizer: string
    attendees: string
  }
  gallery?: string[]
}

export const rooms: Room[] = [
  {
    id: 'studio-a',
    name: 'Studio A',
    type: 'STUDIO APARTMENT',
    location: 'Zhongzheng District, Taipei',
    locationShort: 'Zhongzheng, Taipei',
    price: 'NT$22,000',
    priceDisplay: 'NT$22,000 / mo',
    status: 'available',
    description: 'Private studio with en-suite bath, natural light, rooftop access.',
    fullDescription: "A bright, private studio perfect for solo expats. The room features a private en-suite bathroom, built-in storage, and high-speed WiFi. You'll have access to the shared kitchen, living room, and rooftop terrace.\n\nAll utilities included. Bi-weekly cleaning. Community events every week.",
    previewImage: 'https://images.unsplash.com/photo-1765274993134-0cd145a53485?w=400&q=80',
    listImage: 'https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1662454419736-de132ff75638?w=1440&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1761810948919-d506ab743b94?w=300&q=80',
      'https://images.unsplash.com/photo-1604011237296-117b9066e9e4?w=300&q=80',
      'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?w=300&q=80',
    ],
    availability: 'Immediately',
  },
  {
    id: 'double-room-b',
    name: 'Double Room B',
    type: 'DOUBLE ROOM',
    location: "Da'an District, Taipei",
    locationShort: "Da'an, Taipei",
    price: 'NT$18,000',
    priceDisplay: 'NT$18,000 / mo',
    status: 'rented',
    description: 'Spacious double for couples or solo. Near MRT. Garden view.',
    fullDescription: "A spacious double room perfect for couples or solo residents who enjoy more space. Features garden views and direct MRT access.\n\nAll utilities included. Weekly community events.",
    previewImage: 'https://images.unsplash.com/photo-1773101883552-1ea68c7b471b?w=400&q=80',
    listImage: 'https://images.unsplash.com/photo-1612320743558-020669ff20e8?w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1612320743558-020669ff20e8?w=1440&q=80',
    thumbs: [],
    availability: 'Currently Rented',
  },
  {
    id: 'single-room-c',
    name: 'Single Room C',
    type: 'SINGLE ROOM',
    location: 'Xinyi District, Taipei',
    locationShort: 'Xinyi, Taipei',
    price: 'NT$15,000',
    priceDisplay: 'NT$15,000 / mo',
    status: 'available',
    description: 'Compact and cozy. Perfect for minimalists. City views.',
    fullDescription: "A compact and cozy single room perfect for minimalists. Enjoy stunning city views from your window.\n\nAll utilities included. Community events every week.",
    previewImage: 'https://images.unsplash.com/photo-1773072525900-e29326544c12?w=400&q=80',
    listImage: 'https://images.unsplash.com/photo-1773072525900-e29326544c12?w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1773072525900-e29326544c12?w=1440&q=80',
    thumbs: [],
    availability: 'Immediately',
  },
]

export const events: Event[] = [
  {
    id: 'night-market-tour',
    name: 'Night Market Walking Tour',
    day: '14',
    month: 'JUN',
    fullDate: 'June 14, 2026',
    type: 'Social',
    description: 'Explore Shilin Night Market with fellow residents — the best street food and hidden local gems.',
    upcoming: true,
    image: 'https://images.unsplash.com/photo-1676134944524-debf8e23a958?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1676134944524-debf8e23a958?w=1440&q=80',
    tagline: 'Street food, hidden stalls, and local secrets — all in one night.',
    fullAbout: "Join us for a guided walk through Shilin Night Market, one of Taipei's most vibrant. We'll discover the best street food stalls, hidden gems, and local favorites together.\n\nPerfect for newcomers and longtime residents alike — come hungry!",
    details: {
      date: 'June 14, 2026',
      time: '7:00 PM - 10:00 PM',
      venue: 'Shilin Night Market, Taipei',
      organizer: 'Upper Room Community',
      attendees: 'Open to all',
    },
    gallery: [],
  },
  {
    id: 'language-exchange',
    name: 'Mandarin Language Exchange',
    day: '28',
    month: 'JUN',
    fullDate: 'June 28, 2026',
    type: 'Cultural',
    description: 'Practice Mandarin with locals in a friendly café setting. All levels welcome.',
    upcoming: true,
    image: 'https://images.unsplash.com/photo-1753351055117-f24d8baa682e?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1753351055117-f24d8baa682e?w=1440&q=80',
    tagline: 'Share your language, pick up some Mandarin.',
    fullAbout: "Practice Mandarin with local language partners in a relaxed café setting. All levels are welcome — bring curiosity and openness.\n\nLocals will help you with tones, vocabulary, and the slang nobody teaches in textbooks.",
    details: {
      date: 'June 28, 2026',
      time: '3:00 PM - 5:30 PM',
      venue: 'Café de Gear, Da\'an District',
      organizer: 'Upper Room Community',
      attendees: 'Open to all',
    },
    gallery: [],
  },
  {
    id: 'mountain-day-hike',
    name: 'Mountain Day Hike',
    day: '05',
    month: 'JUL',
    fullDate: 'July 5, 2026',
    type: 'Outdoor',
    description: 'Half-day hike up Elephant Mountain. Stunning city views, good vibes, and photo ops.',
    upcoming: true,
    image: 'https://images.unsplash.com/photo-1656081133397-4289ba7b89a8?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1656081133397-4289ba7b89a8?w=1440&q=80',
    tagline: 'Stunning Taipei skyline views from above.',
    fullAbout: "A half-day hike up Elephant Mountain — one of Taipei's most iconic trails. We'll catch the sunrise over the city skyline before it gets too hot.\n\nBring water, sunscreen, and good vibes. All fitness levels welcome.",
    details: {
      date: 'July 5, 2026',
      time: '6:30 AM - 12:00 PM',
      venue: 'Elephant Mountain, Xinyi District',
      organizer: 'Upper Room Community',
      attendees: 'Open to all',
    },
    gallery: [],
  },
  {
    id: 'tea-ceremony',
    name: 'Taiwanese Tea Ceremony',
    day: '03',
    month: 'MAY',
    fullDate: 'May 3, 2026',
    type: 'Cultural',
    description: 'An afternoon of tradition, warmth, and unforgettable conversations.',
    upcoming: false,
    image: 'https://images.unsplash.com/photo-1584406445076-88e095f28f4c?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1663439970270-f43307d07448?w=1440&q=80',
    tagline: 'An afternoon of tradition, warmth, and unforgettable conversations.',
    fullAbout: "We gathered at Wistaria Tea House for an afternoon guided by a certified tea master — learning the art of Gongfu ceremony, from leaf selection to the precise Oolong pour.\n\nGuests shared stories across three rounds of tea, with local snacks and effortless conversation. This was one of our most-loved events, and we plan to host it again soon.",
    details: {
      date: 'May 3, 2026',
      time: '2:00 PM - 5:00 PM',
      venue: 'Wistaria Tea House, Taipei',
      organizer: 'Upper Room Community',
      attendees: '32 residents',
    },
    gallery: [
      'https://images.unsplash.com/photo-1615362612733-765414880d36?w=400&q=80',
      'https://images.unsplash.com/photo-1765153045889-295a4ba2619c?w=400&q=80',
      'https://images.unsplash.com/photo-1656685689838-e218fc09f72d?w=400&q=80',
      'https://images.unsplash.com/photo-1771588330602-bc8ef027b03e?w=400&q=80',
      'https://images.unsplash.com/photo-1567072386645-5f4fd0d8dc11?w=400&q=80',
    ],
  },
  {
    id: 'cycling-daan-park',
    name: 'Cycling Daan Park',
    day: '19',
    month: 'APR',
    fullDate: 'Apr 19, 2026',
    type: 'Outdoor',
    description: "A leisurely afternoon cycling through one of Taipei's most beautiful parks.",
    upcoming: false,
    image: 'https://images.unsplash.com/photo-1771543492075-d078a3a23638?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1771543492075-d078a3a23638?w=1440&q=80',
    tagline: "A leisurely afternoon cycling through one of Taipei's most beautiful parks.",
    fullAbout: "We explored Da'an Park on bikes, enjoying the green spaces and fresh air of Taipei. A perfect Saturday activity.\n\nAll residents brought their bikes and we finished with bubble tea at a nearby café.",
    details: {
      date: 'Apr 19, 2026',
      time: '10:00 AM - 1:00 PM',
      venue: "Da'an Forest Park, Taipei",
      organizer: 'Upper Room Community',
      attendees: '18 residents',
    },
    gallery: [],
  },
  {
    id: 'hot-pot-dinner',
    name: 'Hot Pot Dinner Night',
    day: '08',
    month: 'MAR',
    fullDate: 'Mar 8, 2026',
    type: 'Social',
    description: 'A communal hot pot dinner with residents from all our locations.',
    upcoming: false,
    image: 'https://images.unsplash.com/photo-1700402871735-8a67fa40d4ed?w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1700402871735-8a67fa40d4ed?w=1440&q=80',
    tagline: 'A communal hot pot dinner with residents from all our locations.',
    fullAbout: "A warm gathering over steaming hot pot. Residents from all three Upper Room locations came together for an evening of great food and better conversation.\n\nWe cooked, laughed, and made memories. One of the most popular dinners we've hosted.",
    details: {
      date: 'Mar 8, 2026',
      time: '6:00 PM - 9:00 PM',
      venue: 'Upper Room Common Area, Taipei',
      organizer: 'Upper Room Community',
      attendees: '40 residents',
    },
    gallery: [],
  },
]

export function useRooms() {
  return { rooms }
}

export function useEvents() {
  const upcoming = events.filter(e => e.upcoming)
  const past = events.filter(e => !e.upcoming)
  return { events, upcoming, past }
}
