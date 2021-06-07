import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { FacilityAnalystStreamParameters } from './FacilityAnalystStreamParameters';

/**
 * @class Ekmap.FacilityAnalystStreamService
 * @category iServer NetworkAnalyst UpstreamCriticalFacilities
 * @classdesc 上游/下游 关键设施查找资源服务类；即查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
 * @extends Ekmap.NetworkAnalystServiceBase
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class FacilityAnalystStreamService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.FacilityAnalystStreamService";
    }


    /**
     * @function Ekmap.FacilityAnalystStreamService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function Ekmap.FacilityAnalystStreamService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.FacilityAnalystStreamParameters} params - 上游/下游关键设施查找资源参数类。
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystStreamParameters)) {
            return;
        }
        var me = this,
            jsonObject;
        //URL 通过参数类型来判断是 上游 还是下游 查询
        if (params.queryType === 0) {
            me.url = Util.urlPathAppend(me.url, 'upstreamcirticalfaclilities');
        } else if (params.queryType === 1) {
            me.url = Util.urlPathAppend(me.url, 'downstreamcirticalfaclilities');
        } else {
            return;
        }

        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        if (params.edgeID !== null && params.nodeID !== null) {
            return;
        }
        if (params.edgeID === null && params.nodeID === null) {
            return;
        }
        if (params.edgeID !== null) {
            jsonObject.edgeID = params.edgeID;
        } else {
            jsonObject.nodeID = params.nodeID;
        }

        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

Ekmap.FacilityAnalystStreamService = FacilityAnalystStreamService;