export type Tool = {
  id: string;
  label: string;
  photoUrl: string;
  route: string;
  type: 'category' | 'tool';
  active?: boolean;
  subcategories?: Tool[];
};

export const TOOLS_REGISTRY_MOCK: Record<string, Tool> = {
  RELATIONSHIPS: {
    id: 'tool-1',
    label: 'Relationships',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'relationships',
    type: 'category',
    subcategories: [
      {
        id: '1',
        label: 'Relationships',
        photoUrl: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=150&h=150&fit=crop',
        route: 'relationships/relationships',
        type: 'tool',
      },
      {
        id: '2',
        label: 'Positive Communication',
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: 'relationships/positive-communication',
        type: 'tool',
      },
      {
        id: '3',
        label: 'I Messages',
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: 'relationships/iMessages',
        type: 'tool',
      },
    ],
  },
  POSITIVE_COMMUNICATION: {
    id: 'tool-2',
    label: 'Positive Communication',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'relationships/positive-communication',
    type: 'tool',
  },
  AMBIENT_SOUNDS: {
    id: 'tool-3',
    label: 'Ambient Sounds',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'ambient-sounds',
    type: 'tool',
  },
  MINDFULNESS: {
    id: 'tool-4',
    label: 'Mindfulness',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: 'mindfulness',
    type: 'category',
    subcategories: [
      {
        id: '1',
        label: 'Respiratie Constienta',
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: 'mindfulness/conscious-breathing',
        type: 'tool',
      },
      {
        id: '2',
        label: 'Plimbare constienta',
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: 'mindfulness/mindful-walking',
        type: 'tool',
      },
      {
        id: '3',
        label: 'Disconfort Emotional',
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: 'mindfulness/emotional-discomfort',
        type: 'tool',
      },
      {
        id: '4',
        label: 'Constientizarea simturilor',
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: 'mindfulness/sense-awareness',
        type: 'tool',
      },
      {
        id: '5',
        label: 'Bunavointa iubitoare',
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: 'mindfulness/loving-kindness',
        type: 'tool',
      },
    ],
  },
};
