// __mocks__/axios.js
const mockAxios = jest.genMockFromModule('axios');

// Mockear axios.create para devolver el mock de axios
mockAxios.create = jest.fn(() => mockAxios);

// Mockear los interceptores
mockAxios.interceptors = {
  request: {
    use: jest.fn(),
  },
  response: {
    use: jest.fn(),
  },
};

module.exports = mockAxios;