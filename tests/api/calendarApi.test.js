
import calendarApi from '../../src/api/calendarApi'
import axios from 'axios';
jest.mock('axios');
// jest.mock('axios', () => {
//     return {
//       create: jest.fn(() => ({
//         get: jest.fn(),
//         interceptors: {
//           request: { use: jest.fn(), eject: jest.fn() },
//           response: { use: jest.fn(), eject: jest.fn() }
//         }
//       }))
//     }
//   })

// jest.mock('axios', () => {
//     return {
//       create: jest.fn(),
//       get: jest.fn(),
//       interceptors: {
//         request: { use: jest.fn(), eject: jest.fn() },
//         response: { use: jest.fn(), eject: jest.fn() },
//       },
//     };
//   });
describe("Pruebas en el calendario API" , () => {

    // test('Debe tener la configuración por defecto ', () => { 
    //     expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    //  });

    test('Debe tener x-token en todas las peticiones', async() => {
        const requestHandler = axios.interceptors.request.use.mock.calls[0][0];

        // Mock localStorage.getItem
        const token = 'test-token';
        Storage.prototype.getItem = jest.fn(() => token);
    
        const config = {
          headers: {},
        };

        const modifiedConfig = requestHandler(config);    
        expect(modifiedConfig.headers['x-token']).toBe(token);
      });
});