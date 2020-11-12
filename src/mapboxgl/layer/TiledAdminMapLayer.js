import mapboxgl from 'mapbox-gl';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.TiledAdminMapLayer
 * @classdesc Provide map layer with XYZ Administrative Tile form built by eKGIS.
 * @category  Layer
 * @param {Object} options  Construction parameters.
 * @param {string} options.token  Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var adminMap = new mapboxgl.ekmap.TiledAdminMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledAdminMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://g1.cloudgis.vn/gservices/rest/maps/adminmap/tile/{z}/{x}/{y}.png",
            "https://g2.cloudgis.vn/gservices/rest/maps/adminmap/tile/{z}/{x}/{y}.png",
            "https://g3.cloudgis.vn/gservices/rest/maps/adminmap/tile/{z}/{x}/{y}.png",
            "https://g4.cloudgis.vn/gservices/rest/maps/adminmap/tile/{z}/{x}/{y}.png"
        ];
        this.urlsToken = [];
        if (options)
            this.urls.forEach(url => {
                url += "?apikey=" + options.token;
                this.urlsToken.push(url);
            })
        if (this.urlsToken.length > 0) {
            this.TileLayer = new mapboxgl.ekmap.TileLayer({
                urls: this.urlsToken
            })
        }
        else {
            this.TileLayer = new mapboxgl.ekmap.TileLayer({
                urls: this.urls
            })
        }
    }

    /**
     * @function mapboxgl.ekmap.TiledAdminMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledAdminMapLayer = TiledAdminMapLayer;
