import axios from "axios"
import {API_ENDPOINT, APP_ID} from "../constants";

export default class ApiService {
  constructor() {
    this.http = axios.create()

    this.http.interceptors.response.use(response => response.data, (error) => {
      alert(error)
      window.location.reload()
    })
  }

  async login() {
    // TODO need refresh token strategy
    return await this.http.get(`${API_ENDPOINT}/login/${APP_ID}`)
  }

  async getSearchConfig(state) {
    // TODO need cache strategy
    return await this.http.get(`${API_ENDPOINT}/air/search/config`, this._makeOptions(state))
  }

  async search(state) {
    const request = {
      "directions": [
        {
          "departure_code": state.searchForm.departureCode,
          "arrival_code": state.searchForm.arrivalCode,
          "date": state.searchForm.date,
        }
      ],
      "adult_qnt": 1,
      "class": state.searchForm.class,
      "fare_types": state.searchConfig.fare_types
    }

    const response = await this.http.post(`${API_ENDPOINT}/air/search`, request, this._makeOptions(state))

    return response.request_id
  }

  async checkOffer(state, requestId) {
    return new Promise((resolve, reject) => {
      this._runTimeoutQueue(resolve, reject, state, requestId)
    })
  }

  _runTimeoutQueue(resolve, reject, state, requestId) {

    setTimeout(async () => {
      const result = await this.http.get(`${API_ENDPOINT}/air/offers?request_id=${requestId}`, this._makeOptions(state))

      if (result.status === 'InProcess') {
        return this._runTimeoutQueue(resolve, reject, state, requestId)
      }

      if (result.status === 'Ready') {
        resolve(result)
      } else {
        reject(result)
      }
    }, 200)
  }

  _makeOptions(state) {
    return {
      headers: {
        'etm-auth-key': state.login.etm_auth_key
      }
    }
  }
}