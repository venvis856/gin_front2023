import { ajaxGet, ajaxPost } from "../utils/request";
import { localStorageGet } from "../localStorage/localStorage";
import { getSiteId } from "../localStorage/siteinfo";

let baseUrl = process?.env?.REACT_APP_BASE_URL;

export function getPermissionByUser() {
    return ajaxPost(baseUrl + "/v1/admin/select/set", {}).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
        return []
    });
}

export function siteListAllInfoApi() {
    return ajaxPost(baseUrl + "/v1/admin/select/site", {}).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
        return []
    });
}


export function siteListApi() {
    return ajaxPost(baseUrl + "/v1/admin/select/site", {}).then(res => {
        let newData = []
        if (res.data.length > 0) {
            res.data.forEach(item => {
                newData.push({
                    id: item.id,
                    name: item.site_name,
                })
            })
        }
        return newData
    }).catch(err => {
        console.log(err)
        return []
    });
}
