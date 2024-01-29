import axios from "axios";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}



export function loginUser(loginInfo) {
  console.log(loginInfo)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  });
}



export function checkAuth(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/check", data)

      if (response.statusText == 'OK') {
        const data = response.data
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  });
}

export function Forgetpassword(email) {
  const emaill = { email }
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.post("http://localhost:5000/auth/forgetpassword", emaill);
      if (+data.status === 200) {
        resolve({ data });
      } else {
        resolve(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function ConfirmOtp(otp) {

  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.post("http://localhost:5000/auth/confirmotp", otp)
      if (data.data.verified == true) {
        resolve({ data });
      } else {
        resolve({ data });
      }
    } catch (error) {
      reject(error);
    }
  });
}






export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout');
      if (response.ok) {
        resolve({ data: 'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:5000/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  });
}



export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:5000/auth/resetpassword', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      if (response.status == 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }

  });
}
