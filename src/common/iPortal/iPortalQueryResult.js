import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalQueryResult
 * @classdesc iPortal 资源结果集封装类。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} queryResult - 资源参数。
 * @param {Array} [queryResult.content] - 页面内容。
 * @param {number} [queryResult.total] - 总记录数。
 * @param {number} [queryResult.currentPage] - 当前第几页。
 * @param {number} [queryResult.pageSize] - 每页大小。
 * @param {Object} [queryResult.aggregations] - 聚合查询的结果。
 */
export class IPortalQueryResult {
    constructor(queryResult) {
        queryResult = queryResult || {};
        this.content = [];
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = 12;
        this.aggregations = null;
        Util.extend(this, queryResult);
    }

}

Ekmap.iPortalQueryResult = IPortalQueryResult;