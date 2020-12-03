import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/register";

class AuthService {
  register(user_name, email, password) {
    return axios
      .post(API_URL, {
        user_name,
        email,
        password
      })
      .then(response => {
        // if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        return { 'success': { ...response.data } }
      }).catch(err => {
        if (err.response) {
          return { 'error': err.response.data.msg[0] }
        }
        else if (err.request) {
          return { 'error': 'Backend Server Not Found' }
        } else {
          return { 'error': 'Error' }
        }

      });
  }

  //   async register(user_name, email, password) {
  //     try {
  //       let response = await axios.post(API_URL, { user_name, email, password })
  //       alert('done')
  //     } catch (err) {
  //       alert('error')
  //       if (err.response) {
  //         console.log('err response----------------', err.response.data.msg[0])
  //         return err.response.data.msg[0]
  //       }
  //       else if (err.request) {
  //         console.log('err request----------------', err.request)
  //       } else {
  //         console.log('err----------------', err)
  //       }
  //     }
  //   }
  // }

  // class AuthService {
  //   async register(username, password) {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         let response = axios.post(API_URL, { username, password })
  //         console.log('response--------', response)
  //       } catch (error) {
  //         alert('netork error')
  //       }
  //     });
  //   }
  // }

}
export default new AuthService();