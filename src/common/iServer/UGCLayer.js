/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { Bounds } from '../commontypes/Bounds';
import '../REST';

/**
 * @class Ekmap.UGCLayer
 * @category  iServer Map Layer
 * @classdesc UGC 图层类。
 * @param {Object} options - 参数。 
 * @param {Ekmap.Bounds} options.bounds - 图层范围。 
 * @param {string} options.name - 图层的名称。 
 * @param {Ekmap.UGCLayerType} options.type  - 图层类型 
 * @param {string} [options.caption] - 图层的标题。 
 * @param {string} [options.description] - 图层的描述信息。 
 * @param {boolean} [options.queryable] - 图层中的对象是否可以查询。
 * @param {boolean} [options.subUGCLayers] - 是否允许图层的符号大小随图缩放。 
 * @param {boolean} [options.visible=false] - 地图对象在同一范围内时，是否重叠显示。
 */
export class UGCLayer {

    constructor(options) {
        options = options || {};
        /**
         * @member {Ekmap.Bounds} Ekmap.UGCLayer.prototype.bounds
         * @description 图层范围。
         */
        this.bounds = null;

        /**
         * @member {string} [Ekmap.UGCLayer.prototype.caption]
         * @description 图层的标题。默认情况下图层的标题与图层的名称一致。在图例、图层控制列表中显示的图层名称就是该图层的标题值。
         */
        this.caption = null;

        /**
         * @member {string} Ekmap.UGCLayer.prototype.description
         * @description 图层的描述信息。
         */
        this.description = null;

        /**
         * @member {string} Ekmap.UGCLayer.prototype.name
         * @description 图层的名称。图层的名称在图层所在的地图中唯一标识此图层。该属性区分大小写。
         */
        this.name = null;

        /**
         * @member {boolean} Ekmap.UGCLayer.prototype.queryable
         * @description 图层中的对象是否可以查询。
         */
        this.queryable = null;

        /**
         * @member {Array} Ekmap.UGCLayer.prototype.subLayers
         * @description 子图层集。
         */
        this.subLayers = null;

        /**
         * @member {Ekmap.UGCLayerType} Ekmap.UGCLayer.prototype.type
         * @description 图层类型。
         */
        this.type = null;

        /**
         * @member {boolean} Ekmap.UGCLayer.prototype.visible
         * @description 地图对象在同一范围内时，是否重叠显示。
         */
        this.visible = null;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.UGCLayer";
    }

    /**
     * @function Ekmap.UGCLayer.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        Util.reset(me);
    }

    /**
     * @function Ekmap.UGCLayer.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        jsonObject = jsonObject ? jsonObject : {};
        Util.extend(this, jsonObject);
        var b = this.bounds;
        if (b) {
            this.bounds = new Bounds(b.leftBottom.x, b.leftBottom.y, b.rightTop.x, b.rightTop.y);
        }
    }


    /**
     * @function Ekmap.UGCLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = {};
        jsonObject = Util.copyAttributes(jsonObject, this);
        if (jsonObject.bounds) {
            if (jsonObject.bounds.toServerJSONObject) {
                jsonObject.bounds = jsonObject.bounds.toServerJSONObject();
            }
        }
        return jsonObject;
    }

}

Ekmap.UGCLayer = UGCLayer;