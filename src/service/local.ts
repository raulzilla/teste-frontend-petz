import api from "./api"

type FetchDateTypes = () => Promise<string[]>
type FetchTimeTypes = (currentDate: string) => Promise<string[]>

const fetchDate: FetchDateTypes = async () => {
  try {
    const responseDate = await api({
      environment: 'local',
      method: 'get',
      endpoint: '/api/scheduling/date'
    })

    return responseDate
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}

const fetchTime: FetchTimeTypes = async (currentDate: string) => {
  try {
    const responseTime = await api({
      environment: 'local',
      method: 'post',
      endpoint: '/api/scheduling/time',
      params: {
        date: currentDate
      }
    })

    return responseTime
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}

export const local = {
  fetchDate,
  fetchTime
}