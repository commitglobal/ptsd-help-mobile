export type Tool = {
  id: string;
  slug: string;
  label: string;
  photoUrl: string;
  route: string;
  type: 'category' | 'tool';
  subcategories?: {
    id: string;
    label: string;
    slug: string;
    photoUrl: string;
    route: string;
    type: 'tool';
  }[];
};

export const TOOLS_REGISTRY_MOCK: Record<string, Tool> = {
  RELATIONSHIPS: {
    id: 'tool-1',
    slug: 'RELATIONSHIPS',
    label: 'Relationships',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'relationships',
    type: 'category',
    subcategories: [
      {
        id: '1',
        label: 'Relationships',
        slug: 'relationships',
        photoUrl:
          'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=150&h=150&fit=crop',
        route: 'relationships/relationships',
        type: 'tool',
      },
      {
        id: '2',
        label: 'Positive Communication',
        slug: 'positive-communication',
        photoUrl:
          'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: 'relationships/positive-communication',
        type: 'tool',
      },
      {
        id: '3',
        label: 'Support',
        slug: 'support',
        photoUrl:
          'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=150&h=150&fit=crop',
        route: 'relationships/support',
        type: 'tool',
      },
    ],
  },
  POSITIVE_COMMUNICATION: {
    id: 'tool-2',
    slug: 'POSITIVE_COMMUNICATION',
    label: 'Positive Communication',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'relationships/positive-communication',
    type: 'tool',
  },
};
