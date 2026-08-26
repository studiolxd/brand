'use client';
import './image-crop-dialog.css';
import { Button as e } from "./button.js";
import { Modal as t } from "./modal.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import i, { PureComponent as a, createRef as o, useRef as s, useState as c } from "react";
//#region node_modules/.pnpm/react-image-crop@11.1.2_react@19.2.4/node_modules/react-image-crop/dist/index.js
var l = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	unit: "px"
}, u = (e, t, n) => Math.min(Math.max(e, t), n), d = (...e) => e.filter((e) => e && typeof e == "string").join(" "), f = (e, t) => e === t || e.width === t.width && e.height === t.height && e.x === t.x && e.y === t.y && e.unit === t.unit;
function p(e, t, n, r) {
	let i = g(e, n, r);
	return e.width && (i.height = i.width / t), e.height && (i.width = i.height * t), i.y + i.height > r && (i.height = r - i.y, i.width = i.height * t), i.x + i.width > n && (i.width = n - i.x, i.height = i.width / t), e.unit === "%" ? h(i, n, r) : i;
}
function m(e, t, n) {
	let r = g(e, t, n);
	return r.x = (t - r.width) / 2, r.y = (n - r.height) / 2, e.unit === "%" ? h(r, t, n) : r;
}
function h(e, t, n) {
	return e.unit === "%" ? {
		...l,
		...e,
		unit: "%"
	} : {
		unit: "%",
		x: e.x ? e.x / t * 100 : 0,
		y: e.y ? e.y / n * 100 : 0,
		width: e.width ? e.width / t * 100 : 0,
		height: e.height ? e.height / n * 100 : 0
	};
}
function g(e, t, n) {
	return !e.unit || e.unit === "px" ? {
		...l,
		...e,
		unit: "px"
	} : {
		unit: "px",
		x: e.x ? e.x * t / 100 : 0,
		y: e.y ? e.y * n / 100 : 0,
		width: e.width ? e.width * t / 100 : 0,
		height: e.height ? e.height * n / 100 : 0
	};
}
function _(e, t, n, r, i, a = 0, o = 0, s = r, c = i) {
	let l = { ...e }, u = Math.min(a, r), d = Math.min(o, i), f = Math.min(s, r), p = Math.min(c, i);
	t && (t > 1 ? (u = o ? o * t : u, d = u / t, f = s * t) : (d = a ? a / t : d, u = d * t, p = c / t)), l.y < 0 && (l.height = Math.max(l.height + l.y, d), l.y = 0), l.x < 0 && (l.width = Math.max(l.width + l.x, u), l.x = 0);
	let m = r - (l.x + l.width);
	m < 0 && (l.x = Math.min(l.x, r - u), l.width += m);
	let h = i - (l.y + l.height);
	if (h < 0 && (l.y = Math.min(l.y, i - d), l.height += h), l.width < u && ((n === "sw" || n == "nw") && (l.x -= u - l.width), l.width = u), l.height < d && ((n === "nw" || n == "ne") && (l.y -= d - l.height), l.height = d), l.width > f && ((n === "sw" || n == "nw") && (l.x -= f - l.width), l.width = f), l.height > p && ((n === "nw" || n == "ne") && (l.y -= p - l.height), l.height = p), t) {
		let e = l.width / l.height;
		if (e < t) {
			let e = Math.max(l.width / t, d);
			(n === "nw" || n == "ne") && (l.y -= e - l.height), l.height = e;
		} else if (e > t) {
			let e = Math.max(l.height * t, u);
			(n === "sw" || n == "nw") && (l.x -= e - l.width), l.width = e;
		}
	}
	return l;
}
function v(e, t, n, r) {
	let i = { ...e };
	return t === "ArrowLeft" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "w" ? (i.x -= n, i.width += n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "e" ? i.width -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowRight" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "w" ? (i.x += n, i.width -= n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "e" ? i.width += n : r === "se" && (i.width += n, i.height += n)), t === "ArrowUp" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "n" ? (i.y -= n, i.height += n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "s" ? i.height -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowDown" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "n" ? (i.y += n, i.height -= n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "s" ? i.height += n : r === "se" && (i.width += n, i.height += n)), i;
}
var y = {
	capture: !0,
	passive: !1
}, b = 0, x = class e extends a {
	static xOrds = ["e", "w"];
	static yOrds = ["n", "s"];
	static xyOrds = [
		"nw",
		"ne",
		"se",
		"sw"
	];
	static nudgeStep = 1;
	static nudgeStepMedium = 10;
	static nudgeStepLarge = 100;
	static defaultProps = { ariaLabels: {
		cropArea: "Use the arrow keys to move the crop selection area",
		nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area",
		nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area",
		neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area",
		eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area",
		seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area",
		sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area",
		swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area",
		wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area"
	} };
	get document() {
		return document;
	}
	docMoveBound = !1;
	mouseDownOnCrop = !1;
	dragStarted = !1;
	evData = {
		startClientX: 0,
		startClientY: 0,
		startCropX: 0,
		startCropY: 0,
		clientX: 0,
		clientY: 0,
		isResize: !0
	};
	componentRef = o();
	mediaRef = o();
	resizeObserver;
	initChangeCalled = !1;
	instanceId = `rc-${b++}`;
	state = {
		cropIsActive: !1,
		newCropIsBeingDrawn: !1
	};
	getBox() {
		let e = this.mediaRef.current;
		if (!e) return {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		let { x: t, y: n, width: r, height: i } = e.getBoundingClientRect();
		return {
			x: t,
			y: n,
			width: r,
			height: i
		};
	}
	componentDidUpdate(e) {
		let { crop: t, onComplete: n } = this.props;
		if (n && !e.crop && t) {
			let { width: e, height: r } = this.getBox();
			e && r && n(g(t, e, r), h(t, e, r));
		}
	}
	componentWillUnmount() {
		this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
	}
	bindDocMove() {
		this.docMoveBound ||= (this.document.addEventListener("pointermove", this.onDocPointerMove, y), this.document.addEventListener("pointerup", this.onDocPointerDone, y), this.document.addEventListener("pointercancel", this.onDocPointerDone, y), !0);
	}
	unbindDocMove() {
		this.docMoveBound &&= (this.document.removeEventListener("pointermove", this.onDocPointerMove, y), this.document.removeEventListener("pointerup", this.onDocPointerDone, y), this.document.removeEventListener("pointercancel", this.onDocPointerDone, y), !1);
	}
	onCropPointerDown = (e) => {
		let { crop: t, disabled: n } = this.props, r = this.getBox();
		if (!t) return;
		let i = g(t, r.width, r.height);
		if (n) return;
		e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
		let a = e.target.dataset.ord, o = !!a, s = e.clientX, c = e.clientY, l = i.x, u = i.y;
		if (a) {
			let t = e.clientX - r.x, n = e.clientY - r.y, o = 0, d = 0;
			a === "ne" || a == "e" ? (o = t - (i.x + i.width), d = n - i.y, l = i.x, u = i.y + i.height) : a === "se" || a === "s" ? (o = t - (i.x + i.width), d = n - (i.y + i.height), l = i.x, u = i.y) : a === "sw" || a == "w" ? (o = t - i.x, d = n - (i.y + i.height), l = i.x + i.width, u = i.y) : (a === "nw" || a == "n") && (o = t - i.x, d = n - i.y, l = i.x + i.width, u = i.y + i.height), s = l + r.x + o, c = u + r.y + d;
		}
		this.evData = {
			startClientX: s,
			startClientY: c,
			startCropX: l,
			startCropY: u,
			clientX: e.clientX,
			clientY: e.clientY,
			isResize: o,
			ord: a
		}, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
	};
	onComponentPointerDown = (e) => {
		let { crop: t, disabled: n, locked: r, keepSelection: i, onChange: a } = this.props, o = this.getBox();
		if (n || r || i && t) return;
		e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
		let s = e.clientX - o.x, c = e.clientY - o.y, l = {
			unit: "px",
			x: s,
			y: c,
			width: 0,
			height: 0
		};
		this.evData = {
			startClientX: e.clientX,
			startClientY: e.clientY,
			startCropX: s,
			startCropY: c,
			clientX: e.clientX,
			clientY: e.clientY,
			isResize: !0
		}, this.mouseDownOnCrop = !0, a(g(l, o.width, o.height), h(l, o.width, o.height)), this.setState({
			cropIsActive: !0,
			newCropIsBeingDrawn: !0
		});
	};
	onDocPointerMove = (e) => {
		let { crop: t, disabled: n, onChange: r, onDragStart: i } = this.props, a = this.getBox();
		if (n || !t || !this.mouseDownOnCrop) return;
		e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, i && i(e));
		let { evData: o } = this;
		o.clientX = e.clientX, o.clientY = e.clientY;
		let s;
		s = o.isResize ? this.resizeCrop() : this.dragCrop(), f(t, s) || r(g(s, a.width, a.height), h(s, a.width, a.height));
	};
	onComponentKeyDown = (t) => {
		let { crop: n, disabled: r, onChange: i, onComplete: a } = this.props;
		if (r) return;
		let o = t.key, s = !1;
		if (!n) return;
		let c = this.getBox(), l = this.makePixelCrop(c), d = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep;
		if (o === "ArrowLeft" ? (l.x -= d, s = !0) : o === "ArrowRight" ? (l.x += d, s = !0) : o === "ArrowUp" ? (l.y -= d, s = !0) : o === "ArrowDown" && (l.y += d, s = !0), s) {
			t.cancelable && t.preventDefault(), l.x = u(l.x, 0, c.width - l.width), l.y = u(l.y, 0, c.height - l.height);
			let e = g(l, c.width, c.height), n = h(l, c.width, c.height);
			i(e, n), a && a(e, n);
		}
	};
	onHandlerKeyDown = (t, n) => {
		let { aspect: r = 0, crop: i, disabled: a, minWidth: o = 0, minHeight: s = 0, maxWidth: c, maxHeight: l, onChange: u, onComplete: d } = this.props, p = this.getBox();
		if (a || !i) return;
		if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight") t.stopPropagation(), t.preventDefault();
		else return;
		let m = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep, y = _(v(g(i, p.width, p.height), t.key, m, n), r, n, p.width, p.height, o, s, c, l);
		if (!f(i, y)) {
			let e = h(y, p.width, p.height);
			u(y, e), d && d(y, e);
		}
	};
	onDocPointerDone = (e) => {
		let { crop: t, disabled: n, onComplete: r, onDragEnd: i } = this.props, a = this.getBox();
		this.unbindDocMove(), !(n || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, i && i(e), r && r(g(t, a.width, a.height), h(t, a.width, a.height)), this.setState({
			cropIsActive: !1,
			newCropIsBeingDrawn: !1
		}));
	};
	onDragFocus = () => {
		this.componentRef.current?.scrollTo(0, 0);
	};
	getCropStyle() {
		let { crop: e } = this.props;
		if (e) return {
			top: `${e.y}${e.unit}`,
			left: `${e.x}${e.unit}`,
			width: `${e.width}${e.unit}`,
			height: `${e.height}${e.unit}`
		};
	}
	dragCrop() {
		let { evData: e } = this, t = this.getBox(), n = this.makePixelCrop(t), r = e.clientX - e.startClientX, i = e.clientY - e.startClientY;
		return n.x = u(e.startCropX + r, 0, t.width - n.width), n.y = u(e.startCropY + i, 0, t.height - n.height), n;
	}
	getPointRegion(e, t, n, r) {
		let { evData: i } = this, a = i.clientX - e.x, o = i.clientY - e.y, s;
		s = r && t ? t === "nw" || t === "n" || t === "ne" : o < i.startCropY;
		let c;
		return c = n && t ? t === "nw" || t === "w" || t === "sw" : a < i.startCropX, c ? s ? "nw" : "sw" : s ? "ne" : "se";
	}
	resolveMinDimensions(e, t, n = 0, r = 0) {
		let i = Math.min(n, e.width), a = Math.min(r, e.height);
		return !t || !i && !a ? [i, a] : t > 1 ? i ? [i, i / t] : [a * t, a] : a ? [a * t, a] : [i, i / t];
	}
	resizeCrop() {
		let { evData: t } = this, { aspect: n = 0, maxWidth: r, maxHeight: i } = this.props, a = this.getBox(), [o, s] = this.resolveMinDimensions(a, n, this.props.minWidth, this.props.minHeight), c = this.makePixelCrop(a), l = this.getPointRegion(a, t.ord, o, s), d = t.ord || l, f = t.clientX - t.startClientX, p = t.clientY - t.startClientY;
		(o && d === "nw" || d === "w" || d === "sw") && (f = Math.min(f, -o)), (s && d === "nw" || d === "n" || d === "ne") && (p = Math.min(p, -s));
		let m = {
			unit: "px",
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		l === "ne" ? (m.x = t.startCropX, m.width = f, n ? (m.height = m.width / n, m.y = t.startCropY - m.height) : (m.height = Math.abs(p), m.y = t.startCropY - m.height)) : l === "se" ? (m.x = t.startCropX, m.y = t.startCropY, m.width = f, n ? m.height = m.width / n : m.height = p) : l === "sw" ? (m.x = t.startCropX + f, m.y = t.startCropY, m.width = Math.abs(f), n ? m.height = m.width / n : m.height = p) : l === "nw" && (m.x = t.startCropX + f, m.width = Math.abs(f), n ? (m.height = m.width / n, m.y = t.startCropY - m.height) : (m.height = Math.abs(p), m.y = t.startCropY + p));
		let h = _(m, n, l, a.width, a.height, o, s, r, i);
		return n || e.xyOrds.indexOf(d) > -1 ? c = h : e.xOrds.indexOf(d) > -1 ? (c.x = h.x, c.width = h.width) : e.yOrds.indexOf(d) > -1 && (c.y = h.y, c.height = h.height), c.x = u(c.x, 0, a.width - c.width), c.y = u(c.y, 0, a.height - c.height), c;
	}
	renderCropSelection() {
		let { ariaLabels: t = e.defaultProps.ariaLabels, disabled: n, locked: r, renderSelectionAddon: a, ruleOfThirds: o, crop: s } = this.props, c = this.getCropStyle();
		if (s) return /* @__PURE__ */ i.createElement("div", {
			style: c,
			className: "ReactCrop__crop-selection",
			onPointerDown: this.onCropPointerDown,
			"aria-label": t.cropArea,
			tabIndex: 0,
			onKeyDown: this.onComponentKeyDown,
			role: "group"
		}, !n && !r && /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-elements",
			onFocus: this.onDragFocus
		}, /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-bar ord-n",
			"data-ord": "n"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-bar ord-e",
			"data-ord": "e"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-bar ord-s",
			"data-ord": "s"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-bar ord-w",
			"data-ord": "w"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-nw",
			"data-ord": "nw",
			tabIndex: 0,
			"aria-label": t.nwDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "nw"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-n",
			"data-ord": "n",
			tabIndex: 0,
			"aria-label": t.nDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "n"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-ne",
			"data-ord": "ne",
			tabIndex: 0,
			"aria-label": t.neDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "ne"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-e",
			"data-ord": "e",
			tabIndex: 0,
			"aria-label": t.eDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "e"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-se",
			"data-ord": "se",
			tabIndex: 0,
			"aria-label": t.seDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "se"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-s",
			"data-ord": "s",
			tabIndex: 0,
			"aria-label": t.sDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "s"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-sw",
			"data-ord": "sw",
			tabIndex: 0,
			"aria-label": t.swDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "sw"),
			role: "button"
		}), /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__drag-handle ord-w",
			"data-ord": "w",
			tabIndex: 0,
			"aria-label": t.wDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "w"),
			role: "button"
		})), a && /* @__PURE__ */ i.createElement("div", {
			className: "ReactCrop__selection-addon",
			onPointerDown: (e) => e.stopPropagation()
		}, a(this.state)), o && /* @__PURE__ */ i.createElement(i.Fragment, null, /* @__PURE__ */ i.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ i.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" })));
	}
	makePixelCrop(e) {
		return g({
			...l,
			...this.props.crop || {}
		}, e.width, e.height);
	}
	render() {
		let { aspect: e, children: t, circularCrop: n, className: r, crop: a, disabled: o, locked: s, style: c, ruleOfThirds: l } = this.props, { cropIsActive: u, newCropIsBeingDrawn: f } = this.state, p = a ? this.renderCropSelection() : null, m = d("ReactCrop", r, u && "ReactCrop--active", o && "ReactCrop--disabled", s && "ReactCrop--locked", f && "ReactCrop--new-crop", a && e && "ReactCrop--fixed-aspect", a && n && "ReactCrop--circular-crop", a && l && "ReactCrop--rule-of-thirds", !this.dragStarted && a && !a.width && !a.height && "ReactCrop--invisible-crop", n && "ReactCrop--no-animate");
		return /* @__PURE__ */ i.createElement("div", {
			ref: this.componentRef,
			className: m,
			style: c
		}, /* @__PURE__ */ i.createElement("div", {
			ref: this.mediaRef,
			className: "ReactCrop__child-wrapper",
			onPointerDown: this.onComponentPointerDown
		}, t), a ? /* @__PURE__ */ i.createElement("svg", {
			className: "ReactCrop__crop-mask",
			width: "100%",
			height: "100%"
		}, /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ i.createElement("rect", {
			width: "100%",
			height: "100%",
			fill: "white"
		}), n ? /* @__PURE__ */ i.createElement("ellipse", {
			cx: `${a.x + a.width / 2}${a.unit}`,
			cy: `${a.y + a.height / 2}${a.unit}`,
			rx: `${a.width / 2}${a.unit}`,
			ry: `${a.height / 2}${a.unit}`,
			fill: "black"
		}) : /* @__PURE__ */ i.createElement("rect", {
			x: `${a.x}${a.unit}`,
			y: `${a.y}${a.unit}`,
			width: `${a.width}${a.unit}`,
			height: `${a.height}${a.unit}`,
			fill: "black"
		}))), /* @__PURE__ */ i.createElement("rect", {
			fill: "black",
			fillOpacity: .5,
			width: "100%",
			height: "100%",
			mask: `url(#hole-${this.instanceId})`
		})) : void 0, p);
	}
};
Math.PI / 180;
//#endregion
//#region src/stories/molecules/ImageCropDialog/crop.ts
async function S(e, t, n = {}) {
	let r = n.outputSize ?? 512, i = n.mimeType ?? "image/jpeg", a = n.quality ?? .9, o = document.createElement("canvas");
	o.width = r, o.height = r;
	let s = o.getContext("2d");
	if (!s) throw Error("Failed to acquire 2D canvas context");
	let c = e.naturalWidth / e.width, l = e.naturalHeight / e.height;
	return s.drawImage(e, t.x * c, t.y * l, t.width * c, t.height * l, 0, 0, r, r), new Promise((e, t) => {
		o.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Canvas toBlob returned null")), i, a);
	});
}
//#endregion
//#region src/stories/molecules/ImageCropDialog/ImageCropDialog.tsx
function C({ sourceUrl: i, title: a, description: o, circularCrop: l = !1, aspect: u = 1, outputSize: d = 512, outputMimeType: f, busy: h = !1, cancelLabel: g, confirmLabel: _, closeLabel: v, onConfirm: y, onClose: b, className: C }) {
	let w = s(null), [T, E] = c(), [D, O] = c(), k = () => {
		E(void 0), O(void 0), b();
	}, A = async () => {
		let e = w.current;
		!e || !D || D.width === 0 || (await y(await S(e, D, {
			mimeType: f,
			outputSize: d
		})), E(void 0), O(void 0));
	};
	return /* @__PURE__ */ n(t, {
		open: i !== null,
		onClose: () => {
			h || k();
		},
		title: a,
		...v ? { closeLabel: v } : {},
		...o == null ? {} : { description: o },
		children: /* @__PURE__ */ r("div", {
			className: ["image-crop-dialog", C].filter(Boolean).join(" "),
			children: [i && /* @__PURE__ */ n("div", {
				className: "image-crop-dialog__area",
				children: /* @__PURE__ */ n(x, {
					crop: T,
					onChange: (e, t) => E(t),
					onComplete: (e) => O(e),
					aspect: u,
					circularCrop: l,
					minWidth: 64,
					keepSelection: !0,
					children: /* @__PURE__ */ n("img", {
						ref: w,
						src: i,
						alt: "",
						onLoad: (e) => {
							let { width: t, height: n } = e.currentTarget;
							E(m(p({
								unit: "%",
								width: 80
							}, u, t, n), t, n));
						}
					})
				})
			}), /* @__PURE__ */ r("div", {
				className: "image-crop-dialog__actions",
				children: [/* @__PURE__ */ n(e, {
					variant: "outline",
					disabled: h,
					onClick: k,
					children: g
				}), /* @__PURE__ */ n(e, {
					disabled: h || !D?.width,
					onClick: A,
					children: _
				})]
			})]
		})
	});
}
//#endregion
export { C as ImageCropDialog };
