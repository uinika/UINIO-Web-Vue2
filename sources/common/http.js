import Encrypt from "./encrypt";
import Axios from "axios";

export const url = window.url;

export const Http = Axios.create({
  timeout: 1000,

});

export const verify = (data, status) => {
  if (data && data.head &&
    data.head.status === status &&
    data.hasOwnProperty("body"))
    return true;
  else
    return false;
};

