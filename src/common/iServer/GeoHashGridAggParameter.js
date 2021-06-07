import { Ekmap } from "../Ekmap";
import { AggregationType } from '../REST';
import { Util } from '../commontypes/Util';
import { AggregationParameter } from "./AggregationParameter";

/**
 * @class Ekmap.GeoHashGridAggParameter
 * @classdesc 格网聚合查询参数类，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} option - 初始化参数。
 * @param {number} [option.precision=5] - 网格中数字的精度。
 * @param {Ekmap.AggregationType} [option.aggType=Ekmap.AggregationType.GEOHASH_GRID] - 格网聚合类型。
 */
export class GeoHashGridAggParameter extends AggregationParameter {
    constructor(option) {
        super(option);
        /**
         * @member {number} [Ekmap.GeoHashGridAggParameter.prototype.precision=5]
         * @description 网格中数字的精度。
         */
        this.precision = 5;
        /**
         * @member {Ekmap.AggregationType} [Ekmap.GeoHashGridAggParameter.prototype.aggType=Ekmap.AggregationType.GEOHASH_GRID]
         * @description 格网聚合类型。
         */
        this.aggType = AggregationType.GEOHASH_GRID;

        Util.extend(this, option);

        this.CLASS_NAME = "Ekmap.GeoHashGridAggParameter";
    }

    destroy() {
        super.destroy();
        this.aggType = null;
    }

    /**
     * @function Ekmap.GeoHashGridAggParameter.toJsonParameters
     * @description 将对象转为 JSON 格式。
     * @param param 转换对象。
     * @returns {string|object}
     */
    static toJsonParameters(param) {
        var parameters = {
            aggName: param.aggName,
            aggFieldName: param.aggFieldName,
            aggType: param.aggType,
            precision: param.precision
        };
        if (param.subAgg) {
            parameters.subAgg = param.subAgg;
        }
        return Util.toJson(parameters);
    }
}

Ekmap.GeoHashGridAggParameter = GeoHashGridAggParameter;