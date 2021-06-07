import { Ekmap } from '../Ekmap';
import { IManagerServiceBase } from './iManagerServiceBase';
import { IManagerCreateNodeParam } from './iManagerCreateNodeParam';

/**
 * @class Ekmap.iManager
 * @classdesc iManager 服务类。
 * @category iManager
 * @param {string} serviceUrl - iManager 首页地址。
 *
 */
export class IManager extends IManagerServiceBase {

    constructor(iManagerUrl) {
        super(iManagerUrl);
    }

    /**
     * @function Ekmap.iManager.prototype.load
     * @description 获取所有服务接口，验证是否已登录授权。
     * @returns {Promise} Promise 对象。
     */
    load() {
        return this.request("GET", this.serviceUrl + '/web/api/service.json');
    }

    /**
     * @function Ekmap.iManager.prototype.createIServer
     * @param {Ekmap.iManagerCreateNodeParam} createParam - 创建参数。
     * @description 创建 iServer。
     * @returns {Promise} Promise 对象。
     */
    createIServer(createParam) {
        return this.request("POST", this.serviceUrl + '/icloud/web/nodes/server.json', new IManagerCreateNodeParam(createParam));
    }

    /**
     * @function Ekmap.iManager.prototype.createIPortal
     * @param {Ekmap.iManagerCreateNodeParam} createParam - 创建参数。
     * @description 创建 iPortal。
     * @returns {Promise} Promise 对象。
     */
    createIPortal(createParam) {
        return this.request("POST", this.serviceUrl + '/icloud/web/nodes/portal.json', new IManagerCreateNodeParam(createParam));
    }

    /**
     * @function Ekmap.iManager.prototype.iServerList
     * @description 获取所有创建的 iServer。
     * @returns {Promise} Promise 对象。
     */
    iServerList() {
        return this.request("GET", this.serviceUrl + '/icloud/web/nodes/server.json');
    }

    /**
     * @function Ekmap.iManager.prototype.iPortalList
     * @description 获取所有创建的 iPortal。
     * @returns {Promise} Promise 对象。
     */
    iPortalList() {
        return this.request("GET", this.serviceUrl + '/icloud/web/nodes/portal.json');
    }

    /**
     * @function Ekmap.iManager.prototype.startNodes
     * @param {Array} ids - 需要启动节点的 ID 数组。e.g:['1']。
     * @description 启动节点。
     * @returns {Promise} Promise 对象。
     */
    startNodes(ids) {
        return this.request("POST", this.serviceUrl + '/icloud/web/nodes/started.json', ids);
    }

    /**
     * @function Ekmap.iManager.prototype.stopNodes
     * @param {Array} ids - 需要停止节点的 ID 数组。e.g:['1']。
     * @description 停止节点。
     * @returns {Promise} Promise 对象。
     */
    stopNodes(ids) {
        return this.request("POST", this.serviceUrl + '/icloud/web/nodes/stopped.json', ids);
    }
}

Ekmap.iManager = IManager;