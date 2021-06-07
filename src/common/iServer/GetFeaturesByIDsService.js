import { Ekmap } from '../Ekmap';
import { GetFeaturesServiceBase } from './GetFeaturesServiceBase';
import { GetFeaturesByIDsParameters } from './GetFeaturesByIDsParameters';

/**
 * @class Ekmap.GetFeaturesByIDsService
 * @category iServer Data FeatureResults
 * @classdesc 数据集ID查询服务类。在数据集集合中查找指定 ID 号对应的空间地物要素。
 * @param {string} url - 数据查询结果资源地址。请求数据服务中数据集查询服务。
 *                       URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
 *                       例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。 
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.GetFeaturesServiceBase}
 * @example
 * var myGetFeaturesByIDsService = new Ekmap.GetFeaturesByIDsService(url, {
 *     eventListeners: {
 *         "processCompleted": getFeatureCompleted,
 *         "processFailed": getFeatureError
 *            }
 *     });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 */
export class GetFeaturesByIDsService extends GetFeaturesServiceBase {


    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "Ekmap.GetFeaturesByIDsService";
    }

    /**
     * @function Ekmap.GetFeaturesByIDsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.GetFeaturesByIDsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @param {Ekmap.GetFeaturesByIDsParameters} params - ID查询参数类。
     * @returns {string} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesByIDsParameters.toJsonParameters(params);
    }

}

Ekmap.GetFeaturesByIDsService = GetFeaturesByIDsService;