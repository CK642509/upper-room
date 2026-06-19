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

export function useRooms() {
  return { rooms }
}

