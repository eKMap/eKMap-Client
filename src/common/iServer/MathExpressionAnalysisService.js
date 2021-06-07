import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { SpatialAnalystBase } from './SpatialAnalystBase';
import { MathExpressionAnalysisParameters } from './MathExpressionAnalysisParameters';

/**
 * @class Ekmap.MathExpressionAnalysisService
 * @category  iServer SpatialAnalyst GridMathAnalyst
 * @classdesc 栅格代数运算服务类。
 * @param {string} url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myMathExpressionAnalysisService = new Ekmap.MathExpressionAnalysisService(url);
 * myMathExpressionAnalysisService.on({
 *     "processCompleted": processCompleted,
 *     "processFailed": processFailed
 *     }
 * );
 * (end)
 *
 */
export class MathExpressionAnalysisService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "Ekmap.MathExpressionAnalysisService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.MathExpressionAnalysisService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.MathExpressionAnalysisParameters} parameter - 栅格代数运算参数类。
     */
    processAsync(parameter) {
        var me = this;
        var parameterObject = {};

        if (parameter instanceof MathExpressionAnalysisParameters) {
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/mathanalyst');
        }

        MathExpressionAnalysisParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

Ekmap.MathExpressionAnalysisService = MathExpressionAnalysisService;