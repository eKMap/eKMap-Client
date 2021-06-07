import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { FieldParameters } from './FieldParameters';

/**
 * @class Ekmap.FieldStatisticsParameters
 * @category iServer Data Field
 * @classdesc 字段统计信息查询参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasource - 数据源名称。 
 * @param {string} options.dataset - 数据集名称。 
 * @param {string} options.fieldName - 字段名。 
 * @param {(string.<Ekmap.StatisticMode>|Array.<string.<Ekmap.StatisticMode>>)} statisticMode - 字段统计方法类型。
 * @extends {Ekmap.FieldParameters}
 */
export class FieldStatisticsParameters extends FieldParameters {


    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.FieldStatisticsParameters.prototype.fieldName
         * @description 字段名
         */
        this.fieldName = null;

        /**
         * @member {(string.<Ekmap.StatisticMode>|Array.<string.<Ekmap.StatisticMode>>)} Ekmap.FieldStatisticsParameters.prototype.statisticMode
         * @description 字段统计方法类型
         */
        this.statisticMode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.FieldStatisticsParameters";
    }

    /**
     * @function Ekmap.FieldStatisticsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    }

}

Ekmap.FieldStatisticsParameters = FieldStatisticsParameters;