import { ajaxGet, ajaxPost } from "../utils/request";

let baseUrl = process?.env?.REACT_APP_BASE_URL;

export function listApi(data) {
    return ajaxGet(baseUrl + "/v1/admin/permission/items", data);
}

export function addApi(data) {
    return ajaxPost(baseUrl + "/v1/admin/permission/create", data);
}

export function updateApi(data) {
    return ajaxPost(baseUrl + "/v1/admin/permission/update", data);
}

export function deleteApi(data) {
    return ajaxPost(baseUrl + '/v1/admin/permission/delete', data);
}

export function get_menu_by_user(data) {
    return ajaxPost(baseUrl + "/v1/admin/permission/get_menu_by_user", data);
}

export function get_all_permission_by_role(data) {
    return ajaxPost(baseUrl + "/v1/admin/permission/get_all_permission_by_role", data);
}

export function role_add_permission(data) {
    return ajaxPost(baseUrl + "/v1/admin/permission/role_add_permission", data);
}
