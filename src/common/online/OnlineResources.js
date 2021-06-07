/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    Ekmap
} from '../Ekmap';

/**
 * @enum ServiceStatus
 * @memberOf Ekmap
 * @category iPortal/Online
 * @description 服务发布状态。
 */
var ServiceStatus = Ekmap.ServiceStatus = {
    /** 不涉及，不可发布。 */
    DOES_NOT_INVOLVE: "DOES_NOT_INVOLVE",
    /** 发布失败。 */
    PUBLISH_FAILED: "PUBLISH_FAILED",
    /** 已发布。 */
    PUBLISHED: "PUBLISHED",
    /** 正在发布。 */
    PUBLISHING: "PUBLISHING",
    /** 未发布。 */
    UNPUBLISHED: "UNPUBLISHED",
    /** 取消服务失败。 */
    UNPUBLISHED_FAILED: "UNPUBLISHED_FAILED"
};
export {
    ServiceStatus
}

/**
 * 
 * @enum DataItemType
 * @memberOf Ekmap
 * @category iPortal/Online
 * @description 数据项类型。
 */
var DataItemType = Ekmap.DataItemType = {
    /** AUDIO */
    AUDIO: "AUDIO",
    /** COLOR */
    COLOR: "COLOR",
    /** COLORSCHEME */
    COLORSCHEME: "COLORSCHEME",
    /** CSV */
    CSV: "CSV",
    /** EXCEL */
    EXCEL: "EXCEL",
    /** FILLSYMBOL */
    FILLSYMBOL: "FILLSYMBOL",
    /** IMAGE */
    IMAGE: "IMAGE",
    /** LAYERTEMPLATE */
    LAYERTEMPLATE: "LAYERTEMPLATE",
    /** LAYOUTTEMPLATE */
    LAYOUTTEMPLATE: "LAYOUTTEMPLATE",
    /** LINESYMBOL */
    LINESYMBOL: "LINESYMBOL",
    /** MAPTEMPLATE */
    MAPTEMPLATE: "MAPTEMPLATE",
    /** MARKERSYMBOL */
    MARKERSYMBOL: "MARKERSYMBOL",
    /** MBTILES */
    MBTILES: "MBTILES",
    /** PHOTOS */
    PHOTOS: "PHOTOS",
    /** SHP */
    SHP: "SHP",
    /** SMTILES */
    SMTILES: "SMTILES",
    /** SVTILES */
    SVTILES: "SVTILES",
    /** THEMETEMPLATE */
    THEMETEMPLATE: "THEMETEMPLATE",
    /** TPK */
    TPK: "TPK",
    /** UDB */
    UDB: "UDB",
    /** UGCV5 */
    UGCV5: "UGCV5",
    /** UNKNOWN */
    UNKNOWN: "UNKNOWN",
    /** VIDEO */
    VIDEO: "VIDEO",
    /** WORKENVIRONMENT */
    WORKENVIRONMENT: "WORKENVIRONMENT",
    /** WORKSPACE */
    WORKSPACE: "WORKSPACE"
};
export { DataItemType }
/**
 * @enum DataItemOrderBy
 * @memberOf Ekmap
 * @category iPortal/Online
 * @description 数据排序字段。
 */
var DataItemOrderBy = Ekmap.DataItemOrderBy = {
    /** FILENAME */
    FILENAME: "FILENAME",
    /** ID */
    ID: "ID",
    /** LASTMODIFIEDTIME */
    LASTMODIFIEDTIME: "LASTMODIFIEDTIME",
    /** NICKNAME */
    NICKNAME: "NICKNAME",
    /** SERVICESTATUS */
    SERVICESTATUS: "SERVICESTATUS",
    /** SIZE */
    SIZE: "SIZE",
    /** STATUS */
    STATUS: "STATUS",
    /** TYPE */
    TYPE: "TYPE",
    /** UPDATETIME */
    UPDATETIME: "UPDATETIME",
    /** USERNAME */
    USERNAME: "USERNAME"
};
export {
    DataItemOrderBy
}

/**
 * @enum FilterField
 * @memberOf Ekmap
 * @category iPortal/Online
 * @description 关键字查询时的过滤字段。
 */
var FilterField = Ekmap.FilterField = {
    /** LINKPAGE */
    LINKPAGE: "LINKPAGE",
    /** LINKPAGE */
    MAPTITLE: "MAPTITLE",
    /** LINKPAGE */
    NICKNAME: "NICKNAME",
    /** LINKPAGE */
    RESTITLE: "RESTITLE",
    /** LINKPAGE */
    USERNAME: "USERNAME"
};
export {
    FilterField
}