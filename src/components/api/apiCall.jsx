import axios from "axios";
import { BASE_URL } from "../../config";

export default axios.create({
  /// below has to be uncommented for testing
  //  baseURL: 'https://e1b9-39-62-56-179.ap.ngrok.io'
  baseURL: BASE_URL,
  // baseURL: 'http://127.0.0.1:5000'
  // baseURL: 'http://0.0.0.0:5000'
  /// below is the aws server it needs to be uncommented
  // baseURL: ' https://cors-everywhere.herokuapp.com/http://ec2-3-12-73-173.us-east-2.compute.amazonaws.com:5000'
});
