import { ajaxGet, ajaxPost } from "../utils/request";

let baseUrl = process?.env?.REACT_APP_BASE_URL;

export function listApi(data) {
    return ajaxGet(baseUrl + "/v1/admin/role/items", data);
}

export function updateApi(data) {
    return ajaxPost(baseUrl + "/v1/admin/role/update", data);
}

export function addApi(data) {
    return ajaxPost(baseUrl + "/v1/admin/role/create", data);
}

export function deleteApi(data) {
    return ajaxPost(baseUrl + '/v1/admin/role/delete', data);
}

