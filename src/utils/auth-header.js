export default function authHeader() {
  const token = localStorage.getItem('authToken');

    //const token = JSON.parse(localStorage.getItem('authToken'));
    if (token) {
      return { authtoken: token };
    } else {
      return {};
    }
  }