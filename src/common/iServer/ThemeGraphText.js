/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ServerTextStyle } from './ServerTextStyle';
import { ThemeGraphTextFormat } from '../REST';

/**
 * @class Ekmap.ThemeGraphText
 * @category  iServer Map Theme
 * @classdesc 统计图文字标注风格类。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.graphTextDisplayed=false] - 是否显示统计图上的文字标注。
 * @param {Ekmap.ThemeGraphTextFormat} [options.graphTextFormat=Ekmap.ThemeGraphTextFormat.CAPTION] - 统计专题图文本显示格式。
 * @param {Ekmap.ServerTextStyle} [options.graphTextStyle] - 统计图上的文字标注风格。
 */
export class ThemeGraphText {

    constructor(options) {

        /**
         * @member {boolean} [Ekmap.ThemeGraphText.prototype.graphTextDisplayed=false]
         * @description 是否显示统计图上的文字标注。
         */
        this.graphTextDisplayed = false;

        /**
         * @member {Ekmap.ThemeGraphTextFormat} [Ekmap.ThemeGraphText.prototype.graphTextFormat=Ekmap.ThemeGraphTextFormat.CAPTION]
         * @description 统计专题图文本显示格式。
         *              文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。
         */
        this.graphTextFormat = ThemeGraphTextFormat.CAPTION;

        /**
         * @member {Ekmap.ServerTextStyle} Ekmap.ThemeGraphText.prototype.graphTextStyle
         * @description 统计图上的文字标注风格。
         */
        this.graphTextStyle = new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.ThemeGraphText";
    }

    /**
     * @function Ekmap.ThemeGraphText.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    }

    /**
     * @function Ekmap.ThemeGraphText.fromObj
     * @description 从传入对象获取统计图文字标注风格类。
     * @param {Object} obj - 传入对象。
     * @returns {Ekmap.ThemeGraphText} ThemeGraphText 对象。
     */
    static fromObj(obj) {
        var res = new ThemeGraphText();
        Util.copy(res, obj);
        res.graphTextStyle = ServerTextStyle.fromObj(obj.graphTextStyle);
        return res;

    }

}

Ekmap.ThemeGraphText = ThemeGraphText;