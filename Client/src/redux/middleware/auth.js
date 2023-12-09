import Utils from "../utils";

const UserLogin = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = payload;
      const apiOptions = {
        endpoint: `/v1/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email,
          password,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      if (apiResponse.status === 200) {
        resolve(apiResponse.data);
      } else {
        resolve(apiResponse.response.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const UserSignup = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { firstName, lastName, email, password, cPassword } = payload;
      const apiOptions = {
        endpoint: `/v1/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          firstName,
          lastName,
          email,
          password,
          cPassword,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      console.log(apiResponse, "apiResponse");
      if (apiResponse?.response) {
        resolve(apiResponse.response.data);
      } else {
        resolve(apiResponse.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const UserWithGoogle = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, firstName, img } = payload;
      const apiOptions = {
        endpoint: `/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email,
          firstName,
          img,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      console.log(apiResponse, "apiResponse");
      if (apiResponse?.status === 200) {
        resolve(apiResponse?.data);
      } else {
        resolve(apiResponse?.response?.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const UserLogout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiOptions = {
        endpoint: `/v1/auth/logout`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      if (apiResponse.status === 200) {
        resolve(apiResponse.data);
      } else {
        resolve(apiResponse.response.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};


const ForgotPassword = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email } = payload;
      const apiOptions = {
        endpoint: `/v1/auth/forgotpassword`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      if (apiResponse.status === 200) {
        resolve(apiResponse.data);
      } else {
        resolve(apiResponse.response.data);
      }
    } catch (error) {
      reject(error);
    }
  });
}


const ChangePassword = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { password } = payload;
      const apiOptions = {
        endpoint: `/v1/auth/resetpassword/:id/:token`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          password,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      if (apiResponse.status === 200) {
        resolve(apiResponse.data);
      } else {
        resolve(apiResponse.response.data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

const AuthActions = {
  UserSignup,
  UserLogin,
  UserWithGoogle,
  UserLogout,
  ForgotPassword,
  ChangePassword,
};

export default AuthActions;
