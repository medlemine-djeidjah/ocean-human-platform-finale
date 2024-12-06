import { ComparisonPoint } from '../types/comparison';

export const comparisonPoints: ComparisonPoint[] = [
  {
    id: 'heart',
    humanSystem: {
      title: 'Circulatory System',
      description: 'Distributes essential resources throughout the body',
      facts: [
        'Pumps blood continuously',
        'Delivers oxygen and nutrients',
        'Removes waste products'
      ],
      image: '/assets/images/heart.jpg'
    },
    oceanSystem: {
      title: 'Ocean Currents',
      description: 'Distribute essential resources throughout the ocean',
      facts: [
        'Moves water globally',
        'Transports nutrients and heat',
        'Affects climate patterns'
      ],
      image: '/assets/images/currents.jpg'
    },
    connections: [
      'Both systems distribute vital resources',
      'Both maintain temperature balance',
      'Both are essential for life'
    ]
  },
  {
    id: 'lungs',
    humanSystem: {
      title: 'Respiratory System',
      description: 'Enables vital gas exchange',
      facts: [
        'Processes oxygen intake',
        'Removes carbon dioxide',
        'Maintains gas balance'
      ],
      image: '/assets/images/lungs.jpg'
    },
    oceanSystem: {
      title: 'Phytoplankton System',
      description: 'Ocean\'s oxygen producers',
      facts: [
        'Produces oxygen',
        'Absorbs carbon dioxide',
        'Supports marine life'
      ],
      image: '/assets/images/phytoplankton.jpg'
    },
    connections: [
      'Both process vital gases',
      'Both maintain atmospheric balance',
      'Both are crucial for life support'
    ]
  },
  {
    id: 'skin',
    humanSystem: {
      title: 'Integumentary System',
      description: 'Protective barrier and temperature regulation',
      facts: [
        'Regulates temperature',
        'Protects internal systems',
        'Senses environment'
      ],
      image: '/assets/images/skin.jpg'
    },
    oceanSystem: {
      title: 'Ocean Surface',
      description: 'Interface between atmosphere and deep ocean',
      facts: [
        'Regulates heat exchange',
        'Protects deeper waters',
        'Interacts with atmosphere'
      ],
      image: '/assets/images/surface.jpg'
    },
    connections: [
      'Both regulate temperature',
      'Both protect internal systems',
      'Both interface with environment'
    ]
  }
];
