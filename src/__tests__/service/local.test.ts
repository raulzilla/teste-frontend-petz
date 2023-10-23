import api from './../../service';

describe('local', () => {
 it('fetchDate', async () => {
    const mockDateResponse = ['2022-03-01', '2022-03-02', '2022-03-03'];

    api.local.fetchDate().then(res => {
      expect(res).toEqual(mockDateResponse);
    });
 });

 it('fetchTime', async () => {
    const mockTimeResponse = ['10:00', '11:00', '12:00'];

    api.local.fetchTime('2022-03-01').then(res => {
      expect(res).toEqual(mockTimeResponse);
    });
 });
});