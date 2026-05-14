export interface Project {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Building' | 'Renovation' | 'Estate';
  status: 'Completed' | 'Ongoing';
  image: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  timeline?: {
    foundation: number;
    structural: number;
    roofing: number;
    finishing: number;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export const COMPANY_INFO = {
  name: 'Sampris Nigeria Limited',
  tagline: 'Engineering Excellence. Innovative Solutions.',
  description: 'Sampris Nigeria Limited is an indigenous construction company engaged principally in construction and civil engineering works, with experienced professionals capable of handling diverse construction opportunities. The company maintains a high standard of excellence and quality performance, focused on infrastructure and environmental development through general construction and civil engineering.',
  history: 'Founded in December 2002, Sampris Nigeria Limited was established to deliver innovative solutions in building construction, infrastructure engineering, and project development with strong commitment to quality, cost efficiency, and client satisfaction.',
  mission: 'To deliver high-quality construction and engineering solutions that exceed client expectations while maintaining cost efficiency and sustainability.',
  vision: 'To be the leading indigenous construction firm in Nigeria, recognized for structural integrity, innovation, and unwavering commitment to quality.',
  values: [
    { title: 'Quality', description: 'Uncompromising standards in every project delivery.' },
    { title: 'Integrity', description: 'Honesty and transparency in all our dealings.' },
    { title: 'Innovation', description: 'Utilizing modern techniques and engineering solutions.' },
    { title: 'Trust', description: 'Building lasting relationships through reliable performance.' }
  ],
  phone: '08037031090',
  whatsapp: '08037031090',
  phoneSecondary: '08098031090',
  socials: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
  },
  email: 'oluwafemiakinjobi206@gmail.com',
  address: 'Suite C06 Peace Plaza, Utako, Abuja, Nigeria',
  branchAddress: 'Plot 287, Ext,II, Kubwa, Abuja, Nigeria'
};

export const SERVICES: Service[] = [
  {
    id: 'building',
    title: 'Building Construction',
    description: 'Expertise in residential, commercial, and industrial building construction with focus on structural integrity.',
    icon: 'Building2'
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    description: 'Infrastructure development including specialized drainage systems and sewage networks.',
    icon: 'HardHat'
  },
  {
    id: 'renovation',
    title: 'Renovation & Remodeling',
    description: 'Breathe new life into existing structures with our professional remodeling and renovation services.',
    icon: 'Hammer'
  },
  {
    id: 'property',
    title: 'Property Management',
    description: 'Comprehensive property and estate management services to maximize asset value and efficiency.',
    icon: 'Home'
  },
  {
    id: 'consultancy',
    title: 'Consultancy Services',
    description: 'Expert engineering consultancy to guide your projects from conception to successful completion.',
    icon: 'ClipboardList'
  },
  {
    id: 'general',
    title: 'General Construction',
    description: 'Handling diverse construction opportunities with a high standard of excellence and quality.',
    icon: 'Wrench'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern High-Rise Development',
    category: 'Building',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    description: 'A 15-story premium residential complex featuring modern amenities and sustainable design.',
    timeline: { foundation: 100, structural: 100, roofing: 100, finishing: 100 }
  },
  {
    id: '2',
    title: 'Urban Bridge Infrastructure',
    category: 'Infrastructure',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77?q=80&w=1200&auto=format&fit=crop',
    description: 'Construction of a major urban flyover to alleviate traffic congestion in the city center.',
    timeline: { foundation: 100, structural: 100, roofing: 100, finishing: 100 }
  },
  {
    id: '3',
    title: 'Estate Management Plaza',
    category: 'Estate',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    description: 'Currently managing and expanding a multi-purpose estate plaza with 50+ units.',
    timeline: { foundation: 100, structural: 85, roofing: 20, finishing: 5 }
  },
  {
    id: '4',
    title: 'Heritage Building Renovation',
    category: 'Renovation',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c190?q=80&w=1200&auto=format&fit=crop',
    description: 'Complete restoration of a historical landmark, preserving heritage while adding modern tech.',
    beforeImage: 'https://images.unsplash.com/photo-1473042904451-00171c6d2717?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    timeline: { foundation: 100, structural: 100, roofing: 100, finishing: 100 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Chief Obinna K.',
    role: 'CEO, Heritage Properties',
    content: 'Sampris Nigeria Limited delivered our project ahead of schedule with remarkable quality. Their attention to detail in structural works is unmatched.',
    rating: 5
  },
  {
    id: '2',
    name: 'Engr. Sarah Adams',
    role: 'District Urban Developer',
    content: 'Professionalism at its peak. The civil engineering work done on the drainage systems was executed with world-class standard.',
    rating: 5
  }
];
