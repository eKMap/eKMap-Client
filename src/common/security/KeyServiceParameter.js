import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ClientType } from '../REST';

/**
 * @class Ekmap.KeyServiceParameter
 * @classdesc key申请参数
 * @category Security
 * @param {Object} options - 参数。
 * @param {string} options.name - 申请服务名称。
 * @param {number} options.serviceIds - 服务 ID。
 * @param {Ekmap.ClientType} [options.clientType=Ekmap.ClientType.SERVER] - 服务端类型。
 * @param {number} options.limitation - 有效期
 */
export class KeyServiceParameter {

    constructor(options) {
        this.name = null;
        this.serviceIds = null;
        this.clientType = ClientType.SERVER;
        this.limitation = null;
        Util.extend(this, options);
        this.CLASS_NAME = "Ekmap.KeyServiceParameter";
    }

    /**
     * @function Ekmap.KeyServiceParameter.prototype.toJSON
     * @description 转换成 JSON 对象
     * @returns {Object} 参数的 JSON 对象
     */
    toJSON() {
        return {
            name: this.name,
            serviceIds: this.serviceIds,
            clientType: this.clientType,
            limitation: this.limitation
        }
    }

}

Ekmap.KeyServiceParameter = KeyServiceParameter;