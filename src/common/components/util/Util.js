import { FileTypes } from '../CommonTypes';

export let ComponentsUtil = {
    /**
     * 获取上传文件类型
     * @param fileName
     */
    getFileType(fileName) {
        let regCSV = /^.*\.(?:csv)$/i;
        let regExcel = /^.*\.(?:xls|xlsx)$/i;
        let regGeojson = /^.*\.(?:geojson|json)$/i;
        if (regExcel.test(fileName)) {
            return FileTypes.EXCEL;
        } else if (regCSV.test(fileName)) {
            return FileTypes.CSV;
        } else if (regGeojson.test(fileName)) {
            return FileTypes.GEOJSON;
        }
        return null;
    }

};