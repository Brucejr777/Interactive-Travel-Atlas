import type { Country } from '../lib/types'

export const countries: Country[] = [
  {
    id: 'fr-france',
    isoNumeric: '250',
    name: 'France',
    slug: 'france',
    region: 'Europe',
    subregion: 'Western Europe',
    capital: 'Paris',
    flag: '🇫🇷',
    population: 68042591,
    area: 551695,
    languages: ['French'],
    currency: 'Euro (€)',
    climate: 'Temperate oceanic; Mediterranean in the south',
    geography:
      'From the Atlantic coast and Alpine peaks to Mediterranean shores and the vineyards of Bordeaux.',
    culturalRegions: ['Île-de-France', 'Provence', 'Brittany', 'Alsace'],
    majorCities: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice'],
    description:
      'France blends centuries of art, cuisine, and philosophy with a strong regional identity.',
    editorialIntro:
      'France is a country where a village bakery, a cathedral, and a world-class museum might all sit within a short walk of each other. Its cultural reach — from Impressionism to haute cuisine — is felt across the globe.',
    themes: ['art', 'food', 'history', 'architecture', 'culture'],
    culture: {
      traditions: [
        {
          id: 'ct-fr-bastille',
          name: 'Bastille Day',
          countryId: 'fr-france',
          category: 'National holiday',
          description:
            'Celebrated on 14 July with parades, fireworks, and communal meals marking the 1789 storming of the Bastille.',
          themes: ['history', 'traditions'],
          relatedEvents: ['e-french-revolution'],
          relatedFoods: [],
          relatedLandmarks: ['l-eiffel-tower'],
          relatedPeople: [],
        },
      ],
      clothing:
        'Everyday style leans understated and tailored; berets and Breton stripes remain iconic regional markers.',
      music:
        'From chanson française to modern electronic music, France has a long tradition of lyrical songwriting.',
      art: 'Home of the Impressionists, Cubism, and the Louvre — one of the world’s great art museums.',
      festivals:
        'Film festivals, music days, and regional harvest celebrations punctuate the calendar year-round.',
      architecture:
        'Gothic cathedrals, Haussmann boulevards, and modernist landmarks coexist in every major city.',
      dailyLife:
        'Long lunches, market shopping, and café culture remain central to the rhythm of everyday life.',
    },
    foods: ['f-baguette', 'f-croissant'],
    landmarks: [
      'l-eiffel-tower',
      'l-louvre-mona-lisa',
      'l-curie-institute',
      'l-giverny-garden',
      'l-orangerie-monet',
    ],
    historicalEvents: [
      'e-french-revolution',
      'e-impressionist-movement',
      'e-radiation-discovery',
    ],
    historicalPeriods: [],
    people: ['p-marie-curie', 'p-pierre-curie', 'p-claude-monet'],
    relatedCountries: ['it-italy', 'us-united-states'],
    neighboringCountries: ['it-italy'],
    coordinates: { lat: 46.2276, lng: 2.2137 },
    color: '#3b82f6',
  },

  {
    id: 'it-italy',
    isoNumeric: '380',
    name: 'Italy',
    slug: 'italy',
    region: 'Europe',
    subregion: 'Southern Europe',
    capital: 'Rome',
    flag: '🇮🇹',
    population: 58940425,
    area: 301340,
    languages: ['Italian'],
    currency: 'Euro (€)',
    climate: 'Mediterranean; Alpine in the north',
    geography:
      'A boot-shaped peninsula stretching from the Alps to Sicily, ringed by islands and coastline.',
    culturalRegions: ['Tuscany', 'Lombardy', 'Campania', 'Sicily'],
    majorCities: ['Rome', 'Milan', 'Florence', 'Naples', 'Venice'],
    description:
      'Italy is a living museum of the Renaissance, Roman antiquity, and one of the world’s most loved cuisines.',
    editorialIntro:
      'Few countries have shaped Western art, architecture, and food as profoundly as Italy. Walk through Rome, Florence, or Milan and you move through layers of three thousand years of history.',
    themes: ['art', 'architecture', 'food', 'history', 'culture'],
    culture: {
      traditions: [
        {
          id: 'ct-it-palio',
          name: 'Palio di Siena',
          countryId: 'it-italy',
          category: 'Festival',
          description:
            'A historic horse race held twice each summer in Siena’s Piazza del Campo, with contrade rivalries dating to the Middle Ages.',
          themes: ['traditions', 'culture'],
          relatedEvents: [],
          relatedFoods: [],
          relatedLandmarks: [],
          relatedPeople: [],
        },
      ],
      clothing:
        'Renowned for tailoring and leatherwork; Milan remains one of the global capitals of fashion.',
      music:
        'Birthplace of opera, with composers like Verdi and Puccini still central to the repertoire.',
      art: 'The Renaissance began here — Giotto, Botticelli, Leonardo, and Michelangelo all worked in Italy.',
      festivals:
        'Regional festivals honour patron saints, harvests, and centuries-old rivalries.',
      architecture:
        'Roman ruins, Romanesque churches, Renaissance palazzi, and Baroque facades layer the landscape.',
      dailyLife:
        'The passeggiata, morning espresso, and long family meals anchor the day.',
    },
    foods: ['f-pizza', 'f-pasta'],
    landmarks: [
      'l-colosseum',
      'l-duomo-milan',
      'l-last-supper',
      'l-st-peters',
      'l-duomo-florence',
    ],
    historicalEvents: ['e-renaissance-italy', 'e-roman-empire'],
    historicalPeriods: [],
    people: ['p-leonardo-da-vinci', 'p-michelangelo'],
    relatedCountries: ['fr-france'],
    neighboringCountries: ['fr-france'],
    coordinates: { lat: 41.8719, lng: 12.5674 },
    color: '#10b981',
  },

  {
    id: 'jp-japan',
    isoNumeric: '392',
    name: 'Japan',
    slug: 'japan',
    region: 'Asia',
    subregion: 'East Asia',
    capital: 'Tokyo',
    flag: '🇯🇵',
    population: 125124989,
    area: 377975,
    languages: ['Japanese'],
    currency: 'Yen (¥)',
    climate: 'Temperate; humid summers, snowy winters in the north',
    geography:
      'An archipelago of over 6,800 islands stretching from subarctic Hokkaido to subtropical Okinawa.',
    culturalRegions: ['Kansai', 'Kantō', 'Tōhoku', 'Kyushu'],
    majorCities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo'],
    description:
      'Japan balances ancient shrines and tea ceremonies with futuristic cities and design.',
    editorialIntro:
      'Japan rewards slow travel. A single neighbourhood can hold a 1,200-year-old temple, a Michelin-starred counter, and a robotics lab — often within a few blocks.',
    themes: ['art', 'food', 'traditions', 'architecture', 'nature'],
    culture: {
      traditions: [
        {
          id: 'ct-jp-hanami',
          name: 'Hanami',
          countryId: 'jp-japan',
          category: 'Seasonal tradition',
          description:
            'The annual custom of viewing cherry blossoms with friends and family, marking the arrival of spring.',
          themes: ['traditions', 'nature'],
          relatedEvents: [],
          relatedFoods: [],
          relatedLandmarks: ['l-mount-fuji'],
          relatedPeople: [],
        },
      ],
      clothing:
        'Kimono and yukata remain visible at festivals and ceremonies; contemporary fashion is globally influential.',
      music: 'From gagaku court music to J-pop and city pop.',
      art: 'Ukiyo-e woodblock prints shaped global perceptions of Japanese aesthetics.',
      festivals:
        'Matsuri across the country feature portable shrines, fireworks, and street food.',
      architecture:
        'Wooden temples, tatami rooms, and post-war modernism share a strong sense of proportion.',
      dailyLife:
        'Convenience stores, punctual trains, and seasonal cuisine anchor everyday life.',
    },
    foods: ['f-sushi', 'f-ramen'],
    landmarks: ['l-mount-fuji', 'l-sensoji'],
    historicalEvents: ['e-edo-japan-opening'],
    historicalPeriods: [],
    people: ['p-yoko-ono', 'p-hokusai'],
    relatedCountries: [],
    neighboringCountries: [],
    coordinates: { lat: 36.2048, lng: 138.2529 },
    color: '#ef4444',
  },

  {
    id: 'mx-mexico',
    isoNumeric: '484',
    name: 'Mexico',
    slug: 'mexico',
    region: 'North America',
    subregion: 'Central America',
    capital: 'Mexico City',
    flag: '🇲🇽',
    population: 128455567,
    area: 1964375,
    languages: ['Spanish', '68 recognised national languages'],
    currency: 'Peso (MXN)',
    climate: 'Varies from tropical to arid; highlands are temperate year-round',
    geography:
      'Deserts in the north, tropical coasts, volcanic highlands, and the Yucatán peninsula.',
    culturalRegions: ['Yucatán', 'Oaxaca', 'Bajío', 'Norteño'],
    majorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Oaxaca', 'Puebla'],
    description:
      'Mexico is a country of ancient civilizations, vivid colour, and one of the world’s great cuisines.',
    editorialIntro:
      'Mexico layers Mesoamerican civilizations, colonial cities, and contemporary art into a single, vivid landscape. Its cuisine — recognised by UNESCO — is a daily expression of history.',
    themes: ['food', 'history', 'art', 'traditions', 'culture'],
    culture: {
      traditions: [
        {
          id: 'ct-mx-diademuertos',
          name: 'Día de Muertos',
          countryId: 'mx-mexico',
          category: 'Festival',
          description:
            'A multi-day remembrance honouring ancestors with ofrendas, marigolds, and shared meals.',
          themes: ['traditions', 'culture'],
          relatedEvents: [],
          relatedFoods: ['f-mole'],
          relatedLandmarks: ['l-casa-azul'],
          relatedPeople: ['p-frida-kahlo'],
        },
      ],
      clothing:
        'Regional textiles and embroidery — from Oaxaca to Chiapas — are prized worldwide.',
      music: 'Mariachi, son jarocho, and norteño are national musical traditions.',
      art: 'Diego Rivera, Frida Kahlo, and the muralist movement reshaped modern art.',
      festivals:
        'Día de Muertos, Guelaguetza, and countless local patron-saint festivals fill the calendar.',
      architecture:
        'Maya and Aztec ruins sit beside Spanish colonial churches and modernist landmarks.',
      dailyLife:
        'Markets, street food, and family gatherings structure the week.',
    },
    foods: ['f-tacos', 'f-mole'],
    landmarks: ['l-chichen-itza', 'l-casa-azul'],
    historicalEvents: ['e-mexican-revolution'],
    historicalPeriods: [],
    people: ['p-frida-kahlo'],
    relatedCountries: ['us-united-states'],
    neighboringCountries: ['us-united-states'],
    coordinates: { lat: 23.6345, lng: -102.5528 },
    color: '#f59e0b',
  },

  {
    id: 'us-united-states',
    isoNumeric: '840',
    name: 'United States',
    slug: 'united-states',
    region: 'North America',
    subregion: 'North America',
    capital: 'Washington, D.C.',
    flag: '🇺🇸',
    population: 333287557,
    area: 9833520,
    languages: ['English'],
    currency: 'US Dollar ($)',
    climate: 'Varies widely from arctic Alaska to subtropical Florida',
    geography:
      'Vast plains, mountain ranges, deserts, and both Atlantic and Pacific coastlines.',
    culturalRegions: ['New England', 'South', 'Midwest', 'West Coast'],
    majorCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Seattle'],
    description:
      'A vast, diverse country shaped by immigration, innovation, and a strong tradition of storytelling.',
    editorialIntro:
      'The United States resists a single description. Its cultural output — from jazz and Hollywood to the civil-rights movement — has reshaped the twentieth century worldwide.',
    themes: ['culture', 'history', 'art', 'nature'],
    culture: {
      traditions: [
        {
          id: 'ct-us-thanksgiving',
          name: 'Thanksgiving',
          countryId: 'us-united-states',
          category: 'National holiday',
          description:
            'A late-November holiday centred on a shared meal and gratitude, observed since the 19th century.',
          themes: ['traditions', 'food'],
          relatedEvents: [],
          relatedFoods: ['f-apple-pie'],
          relatedLandmarks: [],
          relatedPeople: [],
        },
      ],
      clothing: 'Casual by global standards, with strong regional variation.',
      music:
        'Jazz, blues, rock, hip-hop, and country were all born or transformed here.',
      art: 'Abstract Expressionism, pop art, and a thriving contemporary scene.',
      festivals:
        'From Mardi Gras in New Orleans to county fairs across the Midwest.',
      architecture:
        'Skyscrapers, brownstones, ranch houses, and mid-century modern landmarks.',
      dailyLife:
        'Car-centric in many regions, walkable in a few; local identity is strong.',
    },
    foods: ['f-burger', 'f-apple-pie'],
    landmarks: ['l-statue-liberty', 'l-grand-canyon', 'l-mlk-memorial'],
    historicalEvents: ['e-civil-rights-us'],
    historicalPeriods: [],
    people: ['p-maya-angelou'],
    relatedCountries: ['mx-mexico', 'fr-france'],
    neighboringCountries: ['mx-mexico'],
    coordinates: { lat: 37.0902, lng: -95.7129 },
    color: '#6366f1',
  },

  {
    id: 'pl-poland',
    isoNumeric: '616',
    name: 'Poland',
    slug: 'poland',
    region: 'Europe',
    subregion: 'Central Europe',
    capital: 'Warsaw',
    flag: '🇵🇱',
    population: 36821749,
    area: 312696,
    languages: ['Polish'],
    currency: 'Złoty (PLN)',
    climate: 'Temperate with cold winters and warm summers',
    geography:
      'Rolling plains in the centre, the Baltic coast to the north, and the Tatra mountains to the south.',
    culturalRegions: ['Masovia', 'Silesia', 'Pomerania', 'Lesser Poland'],
    majorCities: ['Warsaw', 'Kraków', 'Gdańsk', 'Wrocław', 'Łódź'],
    description:
      'Poland has preserved its language and identity through centuries of partition and rebuilding.',
    editorialIntro:
      'Poland’s story is one of resilience. Its medieval cities, Jewish heritage, and post-war reconstruction are woven into a confident modern culture.',
    themes: ['history', 'traditions', 'culture'],
    culture: {
      traditions: [
        {
          id: 'ct-pl-wigilia',
          name: 'Wigilia',
          countryId: 'pl-poland',
          category: 'Holiday',
          description:
            'The Christmas Eve supper, with twelve meatless dishes and an empty place set for an unexpected guest.',
          themes: ['traditions', 'food'],
          relatedEvents: [],
          relatedFoods: ['f-pierogi'],
          relatedLandmarks: [],
          relatedPeople: [],
        },
      ],
      clothing: 'Folk costumes remain visible at festivals, especially in the highlands.',
      music: 'Chopin is the country’s most famous composer; folk music thrives regionally.',
      art: 'From medieval altarpieces to the Polish Poster School.',
      festivals:
        'Name-day celebrations, harvest festivals, and the Kraków szopki competition.',
      architecture:
        'Gothic, Renaissance, Baroque — and meticulously reconstructed post-war centres.',
      dailyLife:
        'Family meals, weekend trips to the countryside, and strong coffee culture.',
    },
    foods: ['f-pierogi'],
    landmarks: ['l-wieliczka'],
    historicalEvents: ['e-radiation-discovery'],
    historicalPeriods: [],
    people: ['p-marie-curie'],
    relatedCountries: ['fr-france'],
    neighboringCountries: [],
    coordinates: { lat: 51.9194, lng: 19.1451 },
    color: '#dc2626',
  },

  {
    id: 'za-south-africa',
    isoNumeric: '710',
    name: 'South Africa',
    slug: 'south-africa',
    region: 'Africa',
    subregion: 'Southern Africa',
    capital: 'Pretoria (executive)',
    flag: '🇿🇦',
    population: 59893885,
    area: 1221037,
    languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English', 'and 7 more'],
    currency: 'Rand (R)',
    climate: 'Varied: Mediterranean in the Cape, subtropical in the east',
    geography:
      'Coastlines on two oceans, the Drakensberg range, and the semi-arid Karoo.',
    culturalRegions: ['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape'],
    majorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Gqeberha'],
    description:
      'The “Rainbow Nation” is a young democracy with deep cultural and natural diversity.',
    editorialIntro:
      'South Africa’s landscape and history are inseparable. From the Cape vineyards to the streets of Soweto, the country tells a story of struggle, reconciliation, and extraordinary biodiversity.',
    themes: ['history', 'culture', 'nature', 'traditions'],
    culture: {
      traditions: [
        {
          id: 'ct-za-heritage',
          name: 'Heritage Day',
          countryId: 'za-south-africa',
          category: 'National holiday',
          description:
            'On 24 September South Africans celebrate the diversity of their cultures, languages, and traditions.',
          themes: ['traditions', 'culture'],
          relatedEvents: ['e-apartheid-end'],
          relatedFoods: ['f-bobotie'],
          relatedLandmarks: [],
          relatedPeople: ['p-nelson-mandela'],
        },
      ],
      clothing:
        'From shweshwe prints to modern streetwear, dress reflects many traditions.',
      music: 'Jazz, kwaito, amapiano, and choral traditions are internationally admired.',
      art: 'A strong contemporary scene alongside rich craft traditions.',
      festivals:
        'Arts festivals in Grahamstown and Cape Town draw visitors from across the continent.',
      architecture:
        'Colonial, apartheid-era, and contemporary buildings coexist with traditional dwellings.',
      dailyLife:
        'Braais, long commutes, and multilingual neighbourhoods shape everyday life.',
    },
    foods: ['f-bobotie'],
    landmarks: ['l-table-mountain', 'l-robin-island', 'l-union-buildings'],
    historicalEvents: ['e-apartheid-end'],
    historicalPeriods: [],
    people: ['p-nelson-mandela'],
    relatedCountries: [],
    neighboringCountries: [],
    coordinates: { lat: -30.5595, lng: 22.9375 },
    color: '#0ea5e9',
  },
]