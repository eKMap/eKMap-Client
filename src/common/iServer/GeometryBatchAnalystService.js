import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { SpatialAnalystBase } from './SpatialAnalystBase';
import { GeometryBufferAnalystParameters } from './GeometryBufferAnalystParameters';
import { GeometryOverlayAnalystParameters } from './GeometryOverlayAnalystParameters';
import { GeometryThiessenAnalystParameters } from './GeometryThiessenAnalystParameters';
import { InterpolationAnalystParameters } from './InterpolationAnalystParameters';

/**
 * @class Ekmap.GeometryBatchAnalystService
 * @category iServer SpatialAnalyst BatchAnalyst
 * @classdesc 批量空间分析服务类
 * @description 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 *              叠加分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<Ekmap.REST.OverlayAnalystEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 *              其中，originResult 为服务端返回的用 JSON 对象表示的量算结果数据，result 为服务端返回的量算结果数据。
 * @extends {Ekmap.SpatialAnalystBase}
 * @param {string} url - 服务的访问地址。如：http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myOverlayAnalystService = new Ekmap.REST.GeometryBatchAnalystService(url, {
 *     eventListeners: {
 *	       "processCompleted": OverlayCompleted,
 *		   "processFailed": OverlayFailed
 *		   }
 * });
 */
export class GeometryBatchAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.GeometryBatchAnalystService";
    }

    /**
     * @function Ekmap.GeometryBatchAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.GeometryBatchOverlayAnalystParameters} parameter - 批量几何对象叠加分析参数类
     *
     */
    processAsync(parameters) {
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'geometry/batchanalyst');
        me.url = Util.urlAppend(me.url, 'returnContent=true&ignoreAnalystParam=true');
        var parameterObjects = me._processParams(parameters);
        var jsonParameters = Util.toJSON(parameterObjects);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    _processParams(parameters) {
        var me = this;
        if (!Util.isArray(parameters)) {
            return;
        }
        var processParams = [];
        parameters.map(function(item) {
            processParams.push(me._toJSON(item));
            return item;
        });

        return processParams;
    }

    _toJSON(parameter) {
        var tempObj = {};
        if (parameter.analystName === "buffer") {
            tempObj.analystName = "buffer";
            tempObj.param = {};
            //几何对象的批量空间分析，
            GeometryBufferAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "overlay") {
            tempObj.analystName = "overlay";
            tempObj.param = {};
            GeometryOverlayAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "interpolationDensity") {
            tempObj.analystName = "interpolationDensity";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "interpolationidw") {
            tempObj.analystName = "interpolationidw";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "interpolationRBF") {
            tempObj.analystName = "interpolationRBF";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "interpolationKriging") {
            tempObj.analystName = "interpolationKriging";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        } else if (parameter.analystName === "thiessenpolygon") {
            tempObj.analystName = "thiessenpolygon";
            tempObj.param = {};
            GeometryThiessenAnalystParameters.toObject(parameter.param, tempObj.param);

        } else {
            //isoline; isoregion; calculatemeasure; routelocator 四种分析不需要再处理参数
            return parameter;
        }
        return tempObj;
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }


}

Ekmap.GeometryBatchAnalystService = GeometryBatchAnalystService;