import * as THREE from "three";
import {Transform} from "./Transform";

const projection = Transform.projection;
const {
    Color,
    Scene,
    WebGLRenderer,
    CanvasRenderer,
    PerspectiveCamera
} = THREE;

const RADIAN = Math.PI / 180;


const frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

const cancel = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame;

/**
 * @private
 * @class ThreeLayerRenderer
 * @category  Visualization Three
 * @classdesc Three
 * @param {mapboxgl.ekmap.ThreeLayer} layer ThreeJs
 * @param {string} renderer="gl" The rendering mode of the layer (canvas or WebGL). Value: "gl", "canvas".
 * @param {Object} options The parameter object initialized by the threejs renderer. For details of the parameters, see:
 *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
 *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
 *
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.ThreeLayer#initialized
 * @fires mapboxgl.ekmap.ThreeLayer#draw
 * @fires mapboxgl.ekmap.ThreeLayer#rendererinitialized
 */
export class ThreeLayerRenderer {

    constructor(layer, renderer, options) {
        this._layer = layer;
        this.renderer = renderer || "gl";
        this.options = options;
    }

    setMap(map) {
        this.map = map;
    }

    render() {
        if (!this._layer) {
            return;
        }
        this.prepare();
        /**
         * @private
         * @event mapboxgl.ekmap.ThreeLayer#initialized
         * @description three 
         */
        this._layer.fire("initialized");
        this._layer && this._layer.draw(this.context, this.scene, this.camera);
        /**
         * @event mapboxgl.ekmap.ThreeLayer#draw
         * @description draw event, trigger after calling the interface provided for external drawing.
         */
        this._layer.fire("draw");
        this.renderScene();
    }

    update() {
        this.remove();
        this.render();
    }

    renderScene() {
        this.locationCamera();
        this.animationFrame = this.renderFrame((function () {
            this.animationFrame = null;
            this.context && this.context.render(this.scene, this.camera); 
        }).bind(this));
    }

    renderFrame(fn) {
        var render = function () {
            fn && typeof fn === "function" && fn();
        };
        return frame(render);
    }

    resize() {
        this._resetElementSize(this.container);
        this._resetElementSize(this.canvas);

        let width = this.canvas.width,
            height = this.canvas.height;

        let size = this.getMapSize();
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.context.setSize(size.width, size.height);
        this.renderScene();
    }

    prepare() {
        if (!this.map) {
            return new Error("map object is necessary");
        }
        if (!this.canvas) {
            this._initContainer();
            this._initThreeRenderer();
            /**
             * @event mapboxgl.ekmap.ThreeLayer#rendererinitialized
             * @description rendererinitialized event, trigger after renderer initializing.
             */
            this._layer.fire("rendererinitialized");
        } else {
            this.clear(this.context);
        }
    }

    getMapSize() {
        let container = this.map.getContainer();
        return {width: container.clientWidth, height: container.clientHeight};
    }

    cancelFrame() {
        if (this.animationFrame != null) {
            cancel(this.animationFrame);
        }
    }

    remove() {
        if (this.animationFrame != null) {
            cancel(this.animationFrame);
        }
        this.container.removeChild(this.canvas);
        this.container.parentNode.removeChild(this.container);

        this.context = null;
        this.canvas = null;
        this.container = null;
    }

    clear(context) {
        context && context.clear && context.clear();
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    getScale(zoom) {
        let map = this.map;
        let z = zoom == null ? map.getZoom() : zoom;
        let max = projection.getResolution(projection.nativeMaxZoom),
            res = projection.getResolution(z);
        return res / max;
    }

    getCanvasContainer() {
        return this.container;
    }

    getCanvas() {
        return this.canvas;
    }


    locationCamera() {
        let map = this.map;

        let size = this.getMapSize();
        let scale = map.transform.zoomScale(projection.nativeMaxZoom - map.getZoom() - 1);
        let fovRatio = Math.tan(map.transform.fov / 2 * RADIAN);

        let camera = this.camera;

        let pitch = map.getPitch() * RADIAN;
        let pZ = -scale * size.height / 2 / fovRatio;
        camera.position.z = pZ * Math.cos(pitch);

        let centerPoint = Transform.lngLatToPoint(map.getCenter(), projection.nativeMaxZoom);
        let distance = Math.sin(pitch) * pZ;
        let bearing = map.getBearing() * RADIAN;
        camera.position.x = centerPoint.x + distance * Math.sin(bearing);
        camera.position.y = centerPoint.y - distance * Math.cos(bearing);

        camera.up.set(Math.sin(bearing), -Math.cos(bearing), 0);
        camera.lookAt(new THREE.Vector3(centerPoint.x, centerPoint.y, 0));

        camera.updateProjectionMatrix();
    }

    _initContainer() {
        var canvas = this._createCanvas();

        var container = this.container = document.createElement("div");
        if (this._layer._layerId) {
            container.id = this._layer._layerId;
        }
        container.className = "threejs-wrapper";
        container.style.position = "absolute";
        container.style.left = "0px";
        container.style.top = "0px";
        container.style.overflow = "hidden";
        this._resetElementSize(container);
        container.appendChild(canvas);

        var mapContainer = this.map.getCanvasContainer();
        mapContainer.appendChild(container)
    }

    _createCanvas() {
        if (this.canvas) {
            return;
        }

        const canvas = this.canvas = document.createElement('canvas');
        canvas.className = "threejs-overlay";
        canvas.style.outline = "none";
        this._resetElementSize(canvas);
        return canvas;
    }

    _resetElementSize(element) {
        if (!element) {
            return;
        }
        const size = this.getMapSize();
        const dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
        const width = dpr * size.width;
        const height = dpr * size.height;

        element.width = width;
        element.height = height;
        element.style.width = size.width + 'px';
        element.style.height = size.height + 'px';
    }

    _initThreeRenderer() {
        let map = this.map;
        let size = this.getMapSize();

        let renderer = this.renderer || 'gl';
        let context;

        if (renderer === 'gl') {
            context = new WebGLRenderer({
                'canvas': this.canvas,
                'alpha': true,
                'antialias': true,
                'preserveDrawingBuffer': true
            }, this.options);
            context.autoClear = true;
            context.clear();
        } else {
            context = new CanvasRenderer(Util.extend({
                'canvas': this.canvas,
                'alpha': true
            }, this.options));
        }
        context.setClearColor(new Color(1, 1, 1), 0);
        context.canvas = this.canvas;
        this.context = context;

        let fov = map.transform.fov;
        let fovRatio = Math.tan(fov / 2 * RADIAN);
        let maxScale = this.getScale(projection.minZoom) / this.getScale(projection.nativeMaxZoom);
        let far = maxScale * size.height / 2 / fovRatio;

        this.camera = new PerspectiveCamera(fov, size.width / size.height, 1, far);
        this.scene = new Scene();
        this.scene.add(this.camera);
    }
}
