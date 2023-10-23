import axios from 'axios';
import api from '../../service/api';

jest.mock('next/router');

describe('api function', () => {
  it('should make a successful API call', async () => {
    const mockData = { };
    const axiosCreateSpy = jest.spyOn(axios, 'create') as any;
    axiosCreateSpy.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData })
    });

    const result = await api({
      environment: 'local',
      method: 'get',
      endpoint: '/example-endpoint',
      params: { key: 'value' }
    });

    expect(result).toEqual(mockData);

    axiosCreateSpy.mockRestore();
  });
});
