import { Ekmap } from "../Ekmap";
import { FetchRequest } from "../util/FetchRequest";
import { IPortalServiceBase } from "./iPortalServiceBase";
import { IPortalQueryParam } from "./iPortalQueryParam";
import { IPortalQueryResult } from "./iPortalQueryResult";
import { IPortalResource } from "./iPortalResource";
import { IPortalShareParam } from "./iPortalShareParam";

/**
 * @class Ekmap.iPortal
 * @classdesc 对接 Ekmap iPortal 基础服务。
 * @category iPortal/Online
 * @extends {Ekmap.iPortalServiceBase}
 * @param {string} iportalUrl - 地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.withCredentials] - 请求是否携带 cookie。
 */
export class IPortal extends IPortalServiceBase {
    constructor(iportalUrl, options) {
        super(iportalUrl, options);
        this.iportalUrl = iportalUrl;
        options = options || {};
        this.withCredentials = options.withCredentials || false;
    }

    /**
     * @function Ekmap.iPortal.prototype.load
     * @description 加载页面。
     * @returns {Promise} 返回包含 iportal web 资源信息的 Promise 对象。
     */
    load() {
        return FetchRequest.get(this.iportalUrl + "/web");
    }

    /**
     * @function Ekmap.iPortal.prototype.queryResources
     * @description 查询资源。
     * @version 10.0.1
     * @param {Ekmap.iPortalQueryParam} queryParams - 查询参数。
     * @returns {Promise} 返回包含所有资源结果的 Promise 对象。
     */
    queryResources(queryParams) {
        if (!(queryParams instanceof IPortalQueryParam)) {
            return new Promise(function(resolve) {
                resolve(
                    "queryParams is not instanceof iPortalQueryParam !"
                );
            });
        }
        var me = this;
        var resourceUrl = this.iportalUrl + "/gateway/catalog/resource/search.json";
        queryParams.t = new Date().getTime();
        return this.request("GET", resourceUrl, queryParams).then(function(result) {
            var content = [];
            result.content.forEach(function(item) {
                content.push(new IPortalResource(me.iportalUrl, item));
            });
            let queryResult = new IPortalQueryResult();
            queryResult.content = content;
            queryResult.total = result.total;
            queryResult.currentPage = result.currentPage;
            queryResult.pageSize = result.pageSize;
            queryResult.aggregations = result.aggregations;
            return queryResult;
        });
    }


    /**
     * @function Ekmap.iPortal.prototype.updateResourcesShareSetting
     * @description 更新共享设置。
     * @version 10.0.1
     * @param {Ekmap.iPortalShareParam} shareParams - 共享的参数。
     * @returns {Promise} 返回包含共享资源结果的 Promise 对象。
     */
    updateResourcesShareSetting(shareParams) {
        if (!(shareParams instanceof IPortalShareParam)) {
            return new Promise(function(resolve) {
                resolve(
                    "shareParams is not instanceof iPortalShareParam !"
                );
            });
        }
        var resourceUrlName = shareParams.resourceType.replace("_", "").toLowerCase() + "s";
        if (resourceUrlName === "datas") {
            resourceUrlName = "mycontent/" + resourceUrlName;
        }
        var cloneShareParams = {
            ids: shareParams.ids,
            entities: shareParams.entities
        }
        var shareUrl = this.iportalUrl + "/web/" + resourceUrlName + "/sharesetting.json";
        return this.request("PUT", shareUrl, JSON.stringify(cloneShareParams)).then(function(result) {
            return result;
        });
    }
}

Ekmap.iPortal = IPortal;