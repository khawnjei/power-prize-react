// import { RedNotify } from "../helper/utility";
import configureAppStore from "../redux/store";
import { DeviceUUID } from "device-uuid";
import { accessToken } from "../redux/userDataSlice";

const BASE_URL = "https://wnexcpnapk.ap-southeast-2.awsapprunner.com/";
export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const Status = {
  SUCCESS: 200,
  ERROR: 400,
  AUTHENTICATION_FAIL: 401,
  NOT_FOUND: 400,
};

var defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const callApi = async (
  method,
  Url,
  bodyParams,
  setloading,
  onSuccess,
  onError,
  count = 0,
  multipart
) => {
  // console.log(method, Url);
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    let id = new DeviceUUID().get();
    localStorage.setItem("deviceId", id);
    deviceId = id;
  }

  let token = configureAppStore.getState().userDataSlice.token ?? false;
  //   let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWJmZDdhMGQ4YzRjODhiMzc0MDQ3YyIsImlhdCI6MTY3OTU1NjEwNn0.2j-EGacy-8AKMS6ukSlwl_irW0h7PPNWha52TTWTM54";
  let refreshToken =
    configureAppStore.getState().userDataSlice.refreshToken ?? false;
  //console.log("token=>>  ", token);
  //console.log("refreshToken=>>  ", refreshToken);
  //console.log("Url ==>>   ", Url);
  //console.log("BodyParams ==>>   ", JSON.stringify(bodyParams));
  if (multipart) {
    defaultHeaders["Content-Type"] = "multipart/form-data";
  } else {
    defaultHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    defaultHeaders["authorization"] = token;
  }
  // console.log("token==>  ", token)
  //console.log('defaultHeaders==> ', defaultHeaders);
  let fetchObject = {
    method: method,
    headers: defaultHeaders,
    body:
      method == "GET"
        ? null
        : method == "DELETE"
        ? null
        : multipart
        ? bodyParams
        : JSON.stringify(bodyParams),
  };
  if (bodyParams == null) {
    delete fetchObject.body;
  }
  // console.log("fetchObject ==>>   ", fetchObject);
  try {
    setloading(true);
    let response = await fetch(Url, fetchObject);
    console.log("Response  ==>>   ", response);
    let responseJson = await response.json();
    console.log("Fetch Response ==>>   ", JSON.stringify(responseJson));
    if (responseJson?.message == "jwt expired" && count < 2 && refreshToken) {
      let fetchObject = {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify({
          device: {
            id: deviceId,
          },
        }),
      };

      await fetch(`${BASE_URL}user/refresh/${refreshToken}`, fetchObject)
        .then(async (res) => {
          let resJson = await res.json();
          //console.log("Fetch refreshResponse ==>  ", resJson);
          configureAppStore.dispatch(accessToken(resJson.data.accessToken));
          callApi(
            method,
            Url,
            bodyParams,
            setloading,
            onSuccess,
            onError,
            count + 1
          );
        })
        .catch((err) => console.log("error refresh token=> ", err));
    } else if (responseJson?.status < 600) {
      onSuccess(responseJson);
      //   if (responseJson?.errorType) {
      //     GreenSnackbar(responseJson?.errorType);
      //   } else if (responseJson?.message) GreenSnackbar(responseJson?.message);
      setloading(false);
    } else {
      onError(responseJson);
      //   if (responseJson?.errorType) {
      //     GreenSnackbar(responseJson?.errorType);
      //   } else if (responseJson?.message) GreenSnackbar(responseJson?.errorType);
      setloading(false);
    }
  } catch (error) {
    //console.log("eror==================", error);
    // RedNotify("Network request failed");
    setloading(false);
    //console.log('Api call try catch error:', error.message);
  }
};
