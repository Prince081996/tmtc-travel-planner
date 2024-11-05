import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import WeatherCard from '../components/WeatherCard';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

describe('WeatherCard Component', () => {
  // Mock data
  const mockWeather = {
    name: 'London',
    main: {
      temp: 20
    },
    weather: [
      {
        description: 'clear sky'
      }
    ]
  };

  const mockCountry = {
    name: {
      common: 'United Kingdom'
    },
    capital: ['London'],
    region: 'Europe',
    population: 67000000
  };

  const mockPlaces = [
    { fsq_id: '1', name: 'Big Ben' },
    { fsq_id: '2', name: 'Tower Bridge' },
    { fsq_id: '3', name: 'London Eye' },
    { fsq_id: '4', name: 'Buckingham Palace' },
    { fsq_id: '5', name: 'Westminster Abbey' },
    { fsq_id: '6', name: 'Tower of London' }
  ];

  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  test('renders basic weather information correctly', () => {
    usePathname.mockReturnValue('/');

    render(
      <WeatherCard
        weather={mockWeather}
        country={mockCountry}
        places={[]}
      />
    );

    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('20°C - clear sky')).toBeInTheDocument();
  });

  test('renders country information correctly', () => {
    usePathname.mockReturnValue('/');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={[]}
      />
    );

    expect(screen.getByText(`${mockWeather.name}, ${mockCountry.name.common}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeather.main.temp}°C - ${mockWeather.weather[0].description}`)).toBeInTheDocument();
  });

  test('renders only 5 places when isDetailed is false', () => {
    usePathname.mockReturnValue('/');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={mockPlaces}
        isDetailed={false}
      />
    );

    expect(screen.getByText('Places to Visit')).toBeInTheDocument();
    expect(screen.getByText('Big Ben')).toBeInTheDocument();
    expect(screen.getByText('Tower Bridge')).toBeInTheDocument();
    expect(screen.queryByText('Tower of London')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  test('renders all places when isDetailed is true', () => {
    usePathname.mockReturnValue('/');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={mockPlaces}
        isDetailed={true}
      />
    );

    expect(screen.getByText('Tower of London')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  test('does not render places section when places array is empty', () => {
    usePathname.mockReturnValue('/');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={[]}
      />
    );

    expect(screen.queryByText('Places to Visit')).not.toBeInTheDocument();
  });

  test('does not render country section when capital is empty', () => {
    usePathname.mockReturnValue('/');
    const countryWithoutCapital = { ...mockCountry, capital: [] };

    render(
      <WeatherCard 
        weather={mockWeather}
        country={countryWithoutCapital}
        places={mockPlaces}
      />
    );

    expect(screen.queryByText('Country Info')).not.toBeInTheDocument();
  });

  test('renders Discover More button only on dashboard path', () => {
    usePathname.mockReturnValue('/dashboard');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={mockPlaces}
      />
    );

    expect(screen.getByText('Discover More')).toBeInTheDocument();
  });

  test('does not render Discover More button on other paths', () => {
    usePathname.mockReturnValue('/other-path');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={mockPlaces}
      />
    );

    expect(screen.queryByText('Discover More')).not.toBeInTheDocument();
  });

  test('clicking Discover More button navigates to correct city page', () => {
    usePathname.mockReturnValue('/dashboard');

    render(
      <WeatherCard 
        weather={mockWeather}
        country={mockCountry}
        places={mockPlaces}
      />
    );

    const discoverMoreButton = screen.getByText('Discover More');
    fireEvent.click(discoverMoreButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/city/london');
  });
});