import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';
import { FacilityAnalystUpstream3DParameters } from './FacilityAnalystUpstream3DParameters';

/**
 * @class Ekmap.FacilityAnalystUpstream3DService
 * @category  iServer FacilityAnalyst3D UpstreamCriticalFacilities
 * @classdesc 上游关键设施查找资源服务类
 * @extends {Ekmap.CommonServiceBase}
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class FacilityAnalystUpstream3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.FacilityAnalystUpstream3DService";
    }

    /**
     * @function Ekmap.FacilityAnalystUpstream3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.FacilityAnalystUpstream3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.FacilityAnalystUpstream3DParameters} params - 上游关键设施查找资源参数类
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystUpstream3DParameters)) {
            return;
        }
        var me = this,
            jsonObject;
        me.url = Util.urlPathAppend(me.url, 'upstreamcirticalfaclilities');
        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            edgeID: params.edgeID,
            nodeID: params.nodeID,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

Ekmap.FacilityAnalystUpstream3DService = FacilityAnalystUpstream3DService;