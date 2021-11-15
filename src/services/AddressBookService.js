import config from "../config/config";
import AxiosService from "./AxiosService";

export default class AddressBookService {
  baseUrl = config.baseUrl;
  addContact(data) {
    console.log("inside service " + data.firstName);
    return AxiosService.postService(
      `${this.baseUrl}addressbookservice/create`,
      data
    );
  }

  getAllContact() {
    console.log(AxiosService.getService(`${this.baseUrl}addressbookservice`));
    return AxiosService.getService(`${this.baseUrl}addressbookservice`);
  }

  getContact(id) {
    return AxiosService.getService(
      `${this.baseUrl}addressbookservice/get/${id}`
    );
  }

  updateContact(data) {
    return AxiosService.putService(
      `${this.baseUrl}addressbookservice/update/${data.contactId}`,
      data
    );
  }

  deleteContact(id) {
    return AxiosService.deleteService(
      `${this.baseUrl}addressbookservice/delete/${id}`
    );
  }
}
