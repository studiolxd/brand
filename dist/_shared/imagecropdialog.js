import '../imagecropdialog.css';
import { n as e } from "./brandmessagescontext.js";
import { Spinner as t } from "../spinner.js";
import { Button as n } from "../button.js";
import { Alert as r } from "../alert.js";
import { Modal as i } from "../modal.js";
import a, { PureComponent as o, createRef as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region node_modules/.pnpm/react-image-crop@11.1.2_react@19.2.4/node_modules/react-image-crop/dist/index.js
var p = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	unit: "px"
}, m = (e, t, n) => Math.min(Math.max(e, t), n), h = (...e) => e.filter((e) => e && typeof e == "string").join(" "), g = (e, t) => e === t || e.width === t.width && e.height === t.height && e.x === t.x && e.y === t.y && e.unit === t.unit;
function _(e, t, n, r) {
	let i = b(e, n, r);
	return e.width && (i.height = i.width / t), e.height && (i.width = i.height * t), i.y + i.height > r && (i.height = r - i.y, i.width = i.height * t), i.x + i.width > n && (i.width = n - i.x, i.height = i.width / t), e.unit === "%" ? y(i, n, r) : i;
}
function v(e, t, n) {
	let r = b(e, t, n);
	return r.x = (t - r.width) / 2, r.y = (n - r.height) / 2, e.unit === "%" ? y(r, t, n) : r;
}
function y(e, t, n) {
	return e.unit === "%" ? {
		...p,
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
function b(e, t, n) {
	return !e.unit || e.unit === "px" ? {
		...p,
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
function x(e, t, n, r, i, a = 0, o = 0, s = r, c = i) {
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
function S(e, t, n, r) {
	let i = { ...e };
	return t === "ArrowLeft" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "w" ? (i.x -= n, i.width += n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "e" ? i.width -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowRight" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "w" ? (i.x += n, i.width -= n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "e" ? i.width += n : r === "se" && (i.width += n, i.height += n)), t === "ArrowUp" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "n" ? (i.y -= n, i.height += n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "s" ? i.height -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowDown" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "n" ? (i.y += n, i.height -= n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "s" ? i.height += n : r === "se" && (i.width += n, i.height += n)), i;
}
var C = {
	capture: !0,
	passive: !1
}, w = 0, T = class e extends o {
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
	componentRef = s();
	mediaRef = s();
	resizeObserver;
	initChangeCalled = !1;
	instanceId = `rc-${w++}`;
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
			e && r && n(b(t, e, r), y(t, e, r));
		}
	}
	componentWillUnmount() {
		this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
	}
	bindDocMove() {
		this.docMoveBound ||= (this.document.addEventListener("pointermove", this.onDocPointerMove, C), this.document.addEventListener("pointerup", this.onDocPointerDone, C), this.document.addEventListener("pointercancel", this.onDocPointerDone, C), !0);
	}
	unbindDocMove() {
		this.docMoveBound &&= (this.document.removeEventListener("pointermove", this.onDocPointerMove, C), this.document.removeEventListener("pointerup", this.onDocPointerDone, C), this.document.removeEventListener("pointercancel", this.onDocPointerDone, C), !1);
	}
	onCropPointerDown = (e) => {
		let { crop: t, disabled: n } = this.props, r = this.getBox();
		if (!t) return;
		let i = b(t, r.width, r.height);
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
		}, this.mouseDownOnCrop = !0, a(b(l, o.width, o.height), y(l, o.width, o.height)), this.setState({
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
		s = o.isResize ? this.resizeCrop() : this.dragCrop(), g(t, s) || r(b(s, a.width, a.height), y(s, a.width, a.height));
	};
	onComponentKeyDown = (t) => {
		let { crop: n, disabled: r, onChange: i, onComplete: a } = this.props;
		if (r) return;
		let o = t.key, s = !1;
		if (!n) return;
		let c = this.getBox(), l = this.makePixelCrop(c), u = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep;
		if (o === "ArrowLeft" ? (l.x -= u, s = !0) : o === "ArrowRight" ? (l.x += u, s = !0) : o === "ArrowUp" ? (l.y -= u, s = !0) : o === "ArrowDown" && (l.y += u, s = !0), s) {
			t.cancelable && t.preventDefault(), l.x = m(l.x, 0, c.width - l.width), l.y = m(l.y, 0, c.height - l.height);
			let e = b(l, c.width, c.height), n = y(l, c.width, c.height);
			i(e, n), a && a(e, n);
		}
	};
	onHandlerKeyDown = (t, n) => {
		let { aspect: r = 0, crop: i, disabled: a, minWidth: o = 0, minHeight: s = 0, maxWidth: c, maxHeight: l, onChange: u, onComplete: d } = this.props, f = this.getBox();
		if (a || !i) return;
		if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight") t.stopPropagation(), t.preventDefault();
		else return;
		let p = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep, m = x(S(b(i, f.width, f.height), t.key, p, n), r, n, f.width, f.height, o, s, c, l);
		if (!g(i, m)) {
			let e = y(m, f.width, f.height);
			u(m, e), d && d(m, e);
		}
	};
	onDocPointerDone = (e) => {
		let { crop: t, disabled: n, onComplete: r, onDragEnd: i } = this.props, a = this.getBox();
		this.unbindDocMove(), !(n || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, i && i(e), r && r(b(t, a.width, a.height), y(t, a.width, a.height)), this.setState({
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
		return n.x = m(e.startCropX + r, 0, t.width - n.width), n.y = m(e.startCropY + i, 0, t.height - n.height), n;
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
		let { evData: t } = this, { aspect: n = 0, maxWidth: r, maxHeight: i } = this.props, a = this.getBox(), [o, s] = this.resolveMinDimensions(a, n, this.props.minWidth, this.props.minHeight), c = this.makePixelCrop(a), l = this.getPointRegion(a, t.ord, o, s), u = t.ord || l, d = t.clientX - t.startClientX, f = t.clientY - t.startClientY;
		(o && u === "nw" || u === "w" || u === "sw") && (d = Math.min(d, -o)), (s && u === "nw" || u === "n" || u === "ne") && (f = Math.min(f, -s));
		let p = {
			unit: "px",
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		l === "ne" ? (p.x = t.startCropX, p.width = d, n ? (p.height = p.width / n, p.y = t.startCropY - p.height) : (p.height = Math.abs(f), p.y = t.startCropY - p.height)) : l === "se" ? (p.x = t.startCropX, p.y = t.startCropY, p.width = d, n ? p.height = p.width / n : p.height = f) : l === "sw" ? (p.x = t.startCropX + d, p.y = t.startCropY, p.width = Math.abs(d), n ? p.height = p.width / n : p.height = f) : l === "nw" && (p.x = t.startCropX + d, p.width = Math.abs(d), n ? (p.height = p.width / n, p.y = t.startCropY - p.height) : (p.height = Math.abs(f), p.y = t.startCropY + f));
		let h = x(p, n, l, a.width, a.height, o, s, r, i);
		return n || e.xyOrds.indexOf(u) > -1 ? c = h : e.xOrds.indexOf(u) > -1 ? (c.x = h.x, c.width = h.width) : e.yOrds.indexOf(u) > -1 && (c.y = h.y, c.height = h.height), c.x = m(c.x, 0, a.width - c.width), c.y = m(c.y, 0, a.height - c.height), c;
	}
	renderCropSelection() {
		let { ariaLabels: t = e.defaultProps.ariaLabels, disabled: n, locked: r, renderSelectionAddon: i, ruleOfThirds: o, crop: s } = this.props, c = this.getCropStyle();
		if (s) return /* @__PURE__ */ a.createElement("div", {
			style: c,
			className: "ReactCrop__crop-selection",
			onPointerDown: this.onCropPointerDown,
			"aria-label": t.cropArea,
			tabIndex: 0,
			onKeyDown: this.onComponentKeyDown,
			role: "group"
		}, !n && !r && /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-elements",
			onFocus: this.onDragFocus
		}, /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-bar ord-n",
			"data-ord": "n"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-bar ord-e",
			"data-ord": "e"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-bar ord-s",
			"data-ord": "s"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-bar ord-w",
			"data-ord": "w"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-nw",
			"data-ord": "nw",
			tabIndex: 0,
			"aria-label": t.nwDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "nw"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-n",
			"data-ord": "n",
			tabIndex: 0,
			"aria-label": t.nDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "n"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-ne",
			"data-ord": "ne",
			tabIndex: 0,
			"aria-label": t.neDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "ne"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-e",
			"data-ord": "e",
			tabIndex: 0,
			"aria-label": t.eDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "e"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-se",
			"data-ord": "se",
			tabIndex: 0,
			"aria-label": t.seDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "se"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-s",
			"data-ord": "s",
			tabIndex: 0,
			"aria-label": t.sDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "s"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-sw",
			"data-ord": "sw",
			tabIndex: 0,
			"aria-label": t.swDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "sw"),
			role: "button"
		}), /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__drag-handle ord-w",
			"data-ord": "w",
			tabIndex: 0,
			"aria-label": t.wDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "w"),
			role: "button"
		})), i && /* @__PURE__ */ a.createElement("div", {
			className: "ReactCrop__selection-addon",
			onPointerDown: (e) => e.stopPropagation()
		}, i(this.state)), o && /* @__PURE__ */ a.createElement(a.Fragment, null, /* @__PURE__ */ a.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ a.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" })));
	}
	makePixelCrop(e) {
		return b({
			...p,
			...this.props.crop || {}
		}, e.width, e.height);
	}
	render() {
		let { aspect: e, children: t, circularCrop: n, className: r, crop: i, disabled: o, locked: s, style: c, ruleOfThirds: l } = this.props, { cropIsActive: u, newCropIsBeingDrawn: d } = this.state, f = i ? this.renderCropSelection() : null, p = h("ReactCrop", r, u && "ReactCrop--active", o && "ReactCrop--disabled", s && "ReactCrop--locked", d && "ReactCrop--new-crop", i && e && "ReactCrop--fixed-aspect", i && n && "ReactCrop--circular-crop", i && l && "ReactCrop--rule-of-thirds", !this.dragStarted && i && !i.width && !i.height && "ReactCrop--invisible-crop", n && "ReactCrop--no-animate");
		return /* @__PURE__ */ a.createElement("div", {
			ref: this.componentRef,
			className: p,
			style: c
		}, /* @__PURE__ */ a.createElement("div", {
			ref: this.mediaRef,
			className: "ReactCrop__child-wrapper",
			onPointerDown: this.onComponentPointerDown
		}, t), i ? /* @__PURE__ */ a.createElement("svg", {
			className: "ReactCrop__crop-mask",
			width: "100%",
			height: "100%"
		}, /* @__PURE__ */ a.createElement("defs", null, /* @__PURE__ */ a.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ a.createElement("rect", {
			width: "100%",
			height: "100%",
			fill: "white"
		}), n ? /* @__PURE__ */ a.createElement("ellipse", {
			cx: `${i.x + i.width / 2}${i.unit}`,
			cy: `${i.y + i.height / 2}${i.unit}`,
			rx: `${i.width / 2}${i.unit}`,
			ry: `${i.height / 2}${i.unit}`,
			fill: "black"
		}) : /* @__PURE__ */ a.createElement("rect", {
			x: `${i.x}${i.unit}`,
			y: `${i.y}${i.unit}`,
			width: `${i.width}${i.unit}`,
			height: `${i.height}${i.unit}`,
			fill: "black"
		}))), /* @__PURE__ */ a.createElement("rect", {
			fill: "black",
			fillOpacity: .5,
			width: "100%",
			height: "100%",
			mask: `url(#hole-${this.instanceId})`
		})) : void 0, f);
	}
};
Math.PI / 180;
//#endregion
//#region src/stories/molecules/ImageCropDialog/crop.ts
async function E(e, t, n = {}) {
	let r = n.outputSize ?? 512, i = n.mimeType ?? "image/jpeg", a = n.quality ?? .9, o = document.createElement("canvas");
	o.width = r, o.height = r;
	let s = o.getContext("2d");
	if (!s) throw Error("Failed to acquire 2D canvas context");
	let c = e.naturalWidth / e.width, l = e.naturalHeight / e.height;
	return s.drawImage(e, t.x * c, t.y * l, t.width * c, t.height * l, 0, 0, r, r), new Promise((e, t) => {
		o.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Canvas toBlob returned null")), i, a);
	});
}
function D(e, t, n) {
	return v(_(t / n >= e ? {
		unit: "%",
		height: 100
	} : {
		unit: "%",
		width: 100
	}, e, t, n), t, n);
}
//#endregion
//#region src/stories/molecules/ImageCropDialog/ImageCropDialog.tsx
function O({ sourceUrl: a, title: o, description: s, circularCrop: p = !1, aspect: m = 1, outputSize: h = 512, outputMimeType: g, busy: _ = !1, cancelLabel: v, confirmLabel: y, closeLabel: b, loadingLabel: x, errorMessage: S, onConfirm: C, onClose: w, className: O }) {
	let k = e("imageCropDialog"), A = c(null), [j, M] = l(), [N, P] = l(), [F, I] = l("loading"), [L, R] = l(a);
	a !== L && (R(a), I("loading"), M(void 0), P(void 0));
	let z = () => {
		M(void 0), P(void 0), w();
	}, B = async () => {
		let e = A.current;
		!e || !N || N.width === 0 || (await C(await E(e, N, {
			mimeType: g,
			outputSize: h
		})), z());
	};
	return /* @__PURE__ */ d(i, {
		open: a !== null,
		onClose: () => {
			_ || z();
		},
		title: o,
		...b ? { closeLabel: b } : {},
		...s == null ? {} : { description: s },
		footerClassName: "image-crop-dialog__actions",
		footer: /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(n, {
			variant: "outline",
			disabled: _,
			onClick: z,
			children: v
		}), /* @__PURE__ */ d(n, {
			disabled: _ || !N?.width,
			onClick: B,
			children: y
		})] }),
		children: /* @__PURE__ */ d("div", {
			className: ["image-crop-dialog", O].filter(Boolean).join(" "),
			children: /* @__PURE__ */ f("div", {
				className: "image-crop-dialog__area",
				children: [
					F === "loading" && /* @__PURE__ */ d(t, {
						size: "lg",
						label: k("loading", x)
					}),
					F === "error" && /* @__PURE__ */ d(r, {
						variant: "error",
						description: k("error", S),
						className: "image-crop-dialog__error"
					}),
					a && F !== "error" && /* @__PURE__ */ d(T, {
						crop: j,
						onChange: (e, t) => M(t),
						onComplete: (e) => P(e),
						aspect: m,
						circularCrop: p,
						minWidth: 64,
						keepSelection: !0,
						children: /* @__PURE__ */ d("img", {
							ref: A,
							src: a,
							alt: "",
							onLoad: (e) => {
								let { width: t, height: n } = e.currentTarget;
								I("ready"), M(D(m, t, n));
							},
							onError: () => I("error")
						})
					})
				]
			})
		})
	});
}
//#endregion
export { O as t };
