import { Ekmap } from '../Ekmap';

/**
 * @name Lang
 * @memberOf Ekmap
 * @namespace
 * @category BaseTypes
 * @description 国际化的命名空间，包含多种语言和方法库来设置和获取当前的语言。
 */
let Lang = {

    /**
     * @member {string} Ekmap.Lang.code
     * @description 当前所使用的语言类型。
     */
    code: null,

    /**
     * @member {string} [Ekmap.Lang.defaultCode='en-US']
     * @description 默认使用的语言类型。
     */
    defaultCode: "en-US",

    /**
     * @function Ekmap.Lang.getCode
     * @description 获取当前的语言代码。
     * @returns {string} 当前的语言代码。
     */
    getCode: function() {
        if (!Ekmap.Lang.code) {
            Ekmap.Lang.setCode();
        }
        return Ekmap.Lang.code;
    },

    /**
     * @function Ekmap.Lang.setCode
     * @description 设置语言代码。
     * @param {string} code - 此参数遵循IETF规范。
     */
    setCode: function() {
        var lang = this.getLanguageFromCookie();
        if (lang) {
            Ekmap.Lang.code = lang;
            return;
        }
        lang = Ekmap.Lang.defaultCode;
        if (navigator.appName === 'Netscape') {
            lang = navigator.language;
        } else {
            lang = navigator.browserLanguage;
        }
        if (lang.indexOf('zh') === 0) {
            lang = 'zh-CN';
        }
        if (lang.indexOf('en') === 0) {
            lang = 'en-US';
        }

        Ekmap.Lang.code = lang;
    },
    /**
     * @function Ekmap.Lang.getLanguageFromCookie
     * @description 从 cookie 中获取语言类型。
     */
    getLanguageFromCookie() {
        var name = 'language=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length)
            }
        }
        return "";
    },

    /**
     * @function Ekmap.Lang.i18n
     * @description 从当前语言字符串的字典查找 key。
     * @param {string} key - 字典中 i18n 字符串值的关键字。
     * @returns {string} 国际化的字符串。
     */
    i18n: function(key) {
        var dictionary = Ekmap.Lang[Ekmap.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if (!message) {
            // Message not found, fall back to message key
            message = key;
        }
        return message;
    }

};
export { Lang };
Ekmap.Lang = Lang;
Ekmap.i18n = Ekmap.Lang.i18n;