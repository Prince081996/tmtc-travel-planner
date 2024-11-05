import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axiosInstance from '../utils/apiHandle';
import Toaster from '../utils/Toaster/toaster';
import CityInfo from '../components/CityInfo';
import { addCities } from '../Redux/Slices/CitySlice';

// Mock the dependencies
jest.mock('../utils/apiHandle');
jest.mock('../utils/Toaster/toaster');

// Mock Next.js useRouter
jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
      };
    },
    usePathname() {
      return '';
    },
  }));

// Mock environment variables
// process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY = 'test-key';
// process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'test-key';

// Create a mock store
const createMockStore = () => configureStore({
  reducer: {
    cities: addCities
  }
});

describe('CityInfo Component', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    // Clear localStorage before each test
    localStorage.clear();
    // Clear all mocks
    jest.clearAllMocks();
  });

  const mockWeatherData = {
    data: {
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 20 },
      weather: [{ main: 'Clear' }]
    },
    status: 200
  };

  const mockCountryData = {
    data: [{
      name: { common: 'United Kingdom' },
      capital: ['London'],
      population: 67000000
    }],
    status: 200
  };

  const mockPlacesData = {
    data: {
      results: [
        { name: 'Big Ben', categories: [{ name: 'Landmark' }] },
        { name: 'Tower Bridge', categories: [{ name: 'Bridge' }] }
      ]
    },
    status: 200
  };

  test('renders initial state correctly', () => {
    render(
      <Provider store={store}>
        <CityInfo/>
      </Provider>
    );

    expect(screen.getByText('City Weather & Places Guide')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter City name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Enter City name/i);
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input.value).toBe('London');
  });

  test('handles clear button correctly', () => {
    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter City name');
    fireEvent.change(input, { target: { value: 'London' } });
    const clearButton = screen.getByRole('button', { name: 'clear' }); // SVG button
    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });

  test('handles search with API calls correctly', async () => {
    // Mock API responses
    axiosInstance.get
      .mockImplementationOnce(() => Promise.resolve(mockWeatherData))
      .mockImplementationOnce(() => Promise.resolve(mockCountryData))
      .mockImplementationOnce(() => Promise.resolve(mockPlacesData));

    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter City name');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledTimes(3);
    });
  });

  test('handles save city functionality correctly', async () => {
    // Mock API responses
    axiosInstance.get
      .mockImplementationOnce(() => Promise.resolve(mockWeatherData))
      .mockImplementationOnce(() => Promise.resolve(mockCountryData))
      .mockImplementationOnce(() => Promise.resolve(mockPlacesData));

    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    // Search for a city
    const input = screen.getByPlaceholderText('Enter City name');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    // Wait for the save button to appear
    await waitFor(() => {
      const saveButton = screen.getByText('Save to Dashboard');
      fireEvent.click(saveButton);
    });

    // Verify localStorage was updated
    const savedCities = JSON.parse(localStorage.getItem('cities'));
    expect(savedCities).toBeDefined();
    expect(savedCities[0].london).toBeDefined();
    expect(Toaster).toHaveBeenCalledWith('success', 'City Save To Dashboard Successfully!');
  });

  test('handles API error correctly', async () => {
    // Mock API error
    axiosInstance.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Enter City name/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'InvalidCity' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText('Save to Dashboard')).not.toBeInTheDocument();
    });
  });

  test('handles Enter key press correctly', async () => {
    axiosInstance.get
      .mockImplementationOnce(() => Promise.resolve(mockWeatherData))
      .mockImplementationOnce(() => Promise.resolve(mockCountryData))
      .mockImplementationOnce(() => Promise.resolve(mockPlacesData));

    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter City name');
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalled();
    });
  });

  test('handles cached city data correctly', async () => {
    // Setup localStorage with cached city data
    const cachedCity = {
      london: {
        weather: mockWeatherData.data,
        country: mockCountryData.data[0],
        places: mockPlacesData.data.results
      }
    };
    localStorage.setItem('cities', JSON.stringify([cachedCity]));

    render(
      <Provider store={store}>
        <CityInfo />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter City name');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      // Verify that API wasn't called since we used cached data
      expect(axiosInstance.get).not.toHaveBeenCalled();
      expect(screen.getByText('Save to Dashboard')).toBeDisabled();
    });
  });
});