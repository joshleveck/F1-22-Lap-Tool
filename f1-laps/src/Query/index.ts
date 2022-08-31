import axios from "axios";
import useRecordingQuery from "./recording";
import useSavedQuery from "./saved";
import useCompareQuery from "./compare";

export { useRecordingQuery, useSavedQuery, useCompareQuery };

const urlPrefix = "http://127.0.0.1:5000";

export const apiPost = (url: string, data: any) => {
  return axios.post(urlPrefix + url, data);
};

export const apiDelete = (url: string, data: any) => {
  return axios.delete(urlPrefix + url, { data: data });
};

export const apiGet = (url: string, data?: any) => {
  return axios.get(urlPrefix + url, { params: data ? data : null });
};
