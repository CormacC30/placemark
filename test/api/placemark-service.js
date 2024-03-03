import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createPlacemark(placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks`, placemark);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res;
  },

  async getAllSites() {
    const res = await axios.get(`${this.placemarkUrl}/api/sites`);
    return res.data;
  },

  async createSite(id) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks/${id}/sites`);
    return res.data;
  },

  async getSite(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/sites/${id}`);
    return res.data;
  },

  async deleteSite(id){
    const res = await axios.delete(`${this.placemarkUrl}/api/sites/${id}`);
    return res;
  },

  async deleteAllSites() {
    const res = await axios.delete(`${this.placemarkUrl}/api/sites`);
    return res.data;
  }
};