import axios from 'axios'

interface ApiTypes {
  environment: 'local' | 'online'
  method: 'get' | 'post'
  endpoint: string
  params?: Record<string, string>
}

const api = async ({environment, method, endpoint, params}: ApiTypes) => {
  const baseUrl = {
    online: process.env.NEXT_PUBLIC_API_POKEMON_ONLINE,
    local: process.env.NEXT_PUBLIC_API_POKEMON_LOCAL
  }

  const apiConfig = axios.create({
    baseURL: baseUrl[environment],
    headers: {
      "Content-Type": "application/json"
    }
  })

  try {
    const request = await apiConfig[method](endpoint, params)
    return request.data
  } catch(e) {
    console.error(e)
  }
}

export default api