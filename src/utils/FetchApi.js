/* eslint-disable require-yield */

import merge from "lodash/merge";

import AuthStorage from "./AuthStorage";

const API_URL = process.env.REACT_APP_URL_API;

// Rough implementation. Untested.
function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

export const fetching = (url, option) =>
  timeout(60000, fetch(url, option))
    .then((response) => {
      // if (response.status === 401) {
      //   response.detail = "Invalid token.";
      //   return response;
      // }
      return response.status === 204 ? {} : response.json();
    })
    .then((json) => {
      if (json.error) {
        throw json.error;
      } else {
        return json;
      }
    })
    .catch((error) => {
      return {
        error:
          "Request has been timeout. Please wait a few minutes and refresh the page.",
      };
    });

export default function ({ uri, params = {}, opt = {} }) {
  const defaultOption = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (!uri) {
    return;
  }
  const options = merge(defaultOption, opt);
  //set Token
  if (AuthStorage.loggedIn) {
    options.headers.Authorization = `Bearer ${AuthStorage.tokenCommon}`;
  }
  let url = `${API_URL}${uri}`;

  if (params && Object.keys(params).length > 0) {
    if (options && options.method === "GET") {
    } else {
      options.body = JSON.stringify(params);
    }
  }
  let response;
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("==========> call " + url, ", options= ", options);
    }
    response = fetching(url, options);
  } catch (error) {
    response = { error };
  }
  return response;
}
