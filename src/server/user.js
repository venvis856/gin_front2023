import { ajaxGet, ajaxPost } from "../utils/request";
import { getSiteId } from "../localStorage/siteinfo";

let baseUrl = process?.env?.REACT_APP_BASE_URL;

export function listApi(data) {
    return ajaxGet(baseUrl + "/v1/admin/user/items", data);
}

export function updateApi(data) {
    data["site_id"] = getSiteId()
    return ajaxPost(baseUrl + "/v1/admin/user/update", data);
}

export function addApi(data) {
    data["site_id"] = getSiteId()
    return ajaxPost(baseUrl + "/v1/admin/user/create", data);
}

export function deleteApi(data) {
    return ajaxPost(baseUrl + '/v1/admin/user/delete', data);
}

export function loginApi(data) {
    return ajaxPost(baseUrl + "/v1/admin/login", data);
}
