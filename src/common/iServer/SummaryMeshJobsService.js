/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SummaryMeshJobParameter } from './SummaryMeshJobParameter';

/**
 * @class Ekmap.SummaryMeshJobsService
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务类。
 * @param {string} url -点聚合分析任务地址。
 * @param {Object} options - 参数。
 * @param {Ekmap.Events} options.events - 处理所有事件的对象。<br>
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {number} options.index - 服务访问地址在数组中的位置。<br>
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class SummaryMeshJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/aggregatepoints');
        this.CLASS_NAME = 'Ekmap.SummaryMeshJobsService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务
     */
    getSummaryMeshJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function Ekmap.SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析任务
     * @param {string} id - 指定要获取数据的id
     */
    getSummaryMeshJob(id) {
        super.getJobs(Util.urlPathAppend(this.url, id));
    }

    /**
     * @function Ekmap.SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务
     * @param {Ekmap.SummaryMeshJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob(params, seconds) {
        super.addJob(this.url, params, SummaryMeshJobParameter, seconds);
    }
}

Ekmap.SummaryMeshJobsService = SummaryMeshJobsService;