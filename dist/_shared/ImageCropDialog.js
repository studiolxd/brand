import '../ImageCropDialog.css';
import { Spinner as e } from "../spinner.js";
import { Button as t } from "../button.js";
import { Alert as n } from "../alert.js";
import { Modal as r } from "../modal.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import s, { PureComponent as c, createRef as l, useRef as u, useState as d } from "react";
//#region node_modules/.pnpm/react-image-crop@11.1.2_react@19.2.4/node_modules/react-image-crop/dist/index.js
var f = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	unit: "px"
}, p = (e, t, n) => Math.min(Math.max(e, t), n), m = (...e) => e.filter((e) => e && typeof e == "string").join(" "), h = (e, t) => e === t || e.width === t.width && e.height === t.height && e.x === t.x && e.y === t.y && e.unit === t.unit;
function g(e, t, n, r) {
	let i = y(e, n, r);
	return e.width && (i.height = i.width / t), e.height && (i.width = i.height * t), i.y + i.height > r && (i.height = r - i.y, i.width = i.height * t), i.x + i.width > n && (i.width = n - i.x, i.height = i.width / t), e.unit === "%" ? v(i, n, r) : i;
}
function _(e, t, n) {
	let r = y(e, t, n);
	return r.x = (t - r.width) / 2, r.y = (n - r.height) / 2, e.unit === "%" ? v(r, t, n) : r;
}
function v(e, t, n) {
	return e.unit === "%" ? {
		...f,
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
function y(e, t, n) {
	return !e.unit || e.unit === "px" ? {
		...f,
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
function b(e, t, n, r, i, a = 0, o = 0, s = r, c = i) {
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
function x(e, t, n, r) {
	let i = { ...e };
	return t === "ArrowLeft" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "w" ? (i.x -= n, i.width += n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "e" ? i.width -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowRight" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "w" ? (i.x += n, i.width -= n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "e" ? i.width += n : r === "se" && (i.width += n, i.height += n)), t === "ArrowUp" ? r === "nw" ? (i.x -= n, i.y -= n, i.width += n, i.height += n) : r === "n" ? (i.y -= n, i.height += n) : r === "ne" ? (i.y -= n, i.width += n, i.height += n) : r === "sw" ? (i.x += n, i.width -= n, i.height -= n) : r === "s" ? i.height -= n : r === "se" && (i.width -= n, i.height -= n) : t === "ArrowDown" && (r === "nw" ? (i.x += n, i.y += n, i.width -= n, i.height -= n) : r === "n" ? (i.y += n, i.height -= n) : r === "ne" ? (i.y += n, i.width -= n, i.height -= n) : r === "sw" ? (i.x -= n, i.width += n, i.height += n) : r === "s" ? i.height += n : r === "se" && (i.width += n, i.height += n)), i;
}
var S = {
	capture: !0,
	passive: !1
}, C = 0, w = class e extends c {
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
	componentRef = l();
	mediaRef = l();
	resizeObserver;
	initChangeCalled = !1;
	instanceId = `rc-${C++}`;
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
			e && r && n(y(t, e, r), v(t, e, r));
		}
	}
	componentWillUnmount() {
		this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
	}
	bindDocMove() {
		this.docMoveBound ||= (this.document.addEventListener("pointermove", this.onDocPointerMove, S), this.document.addEventListener("pointerup", this.onDocPointerDone, S), this.document.addEventListener("pointercancel", this.onDocPointerDone, S), !0);
	}
	unbindDocMove() {
		this.docMoveBound &&= (this.document.removeEventListener("pointermove", this.onDocPointerMove, S), this.document.removeEventListener("pointerup", this.onDocPointerDone, S), this.document.removeEventListener("pointercancel", this.onDocPointerDone, S), !1);
	}
	onCropPointerDown = (e) => {
		let { crop: t, disabled: n } = this.props, r = this.getBox();
		if (!t) return;
		let i = y(t, r.width, r.height);
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
		}, this.mouseDownOnCrop = !0, a(y(l, o.width, o.height), v(l, o.width, o.height)), this.setState({
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
		s = o.isResize ? this.resizeCrop() : this.dragCrop(), h(t, s) || r(y(s, a.width, a.height), v(s, a.width, a.height));
	};
	onComponentKeyDown = (t) => {
		let { crop: n, disabled: r, onChange: i, onComplete: a } = this.props;
		if (r) return;
		let o = t.key, s = !1;
		if (!n) return;
		let c = this.getBox(), l = this.makePixelCrop(c), u = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep;
		if (o === "ArrowLeft" ? (l.x -= u, s = !0) : o === "ArrowRight" ? (l.x += u, s = !0) : o === "ArrowUp" ? (l.y -= u, s = !0) : o === "ArrowDown" && (l.y += u, s = !0), s) {
			t.cancelable && t.preventDefault(), l.x = p(l.x, 0, c.width - l.width), l.y = p(l.y, 0, c.height - l.height);
			let e = y(l, c.width, c.height), n = v(l, c.width, c.height);
			i(e, n), a && a(e, n);
		}
	};
	onHandlerKeyDown = (t, n) => {
		let { aspect: r = 0, crop: i, disabled: a, minWidth: o = 0, minHeight: s = 0, maxWidth: c, maxHeight: l, onChange: u, onComplete: d } = this.props, f = this.getBox();
		if (a || !i) return;
		if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight") t.stopPropagation(), t.preventDefault();
		else return;
		let p = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? e.nudgeStepLarge : t.shiftKey ? e.nudgeStepMedium : e.nudgeStep, m = b(x(y(i, f.width, f.height), t.key, p, n), r, n, f.width, f.height, o, s, c, l);
		if (!h(i, m)) {
			let e = v(m, f.width, f.height);
			u(m, e), d && d(m, e);
		}
	};
	onDocPointerDone = (e) => {
		let { crop: t, disabled: n, onComplete: r, onDragEnd: i } = this.props, a = this.getBox();
		this.unbindDocMove(), !(n || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, i && i(e), r && r(y(t, a.width, a.height), v(t, a.width, a.height)), this.setState({
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
		return n.x = p(e.startCropX + r, 0, t.width - n.width), n.y = p(e.startCropY + i, 0, t.height - n.height), n;
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
		let m = {
			unit: "px",
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		l === "ne" ? (m.x = t.startCropX, m.width = d, n ? (m.height = m.width / n, m.y = t.startCropY - m.height) : (m.height = Math.abs(f), m.y = t.startCropY - m.height)) : l === "se" ? (m.x = t.startCropX, m.y = t.startCropY, m.width = d, n ? m.height = m.width / n : m.height = f) : l === "sw" ? (m.x = t.startCropX + d, m.y = t.startCropY, m.width = Math.abs(d), n ? m.height = m.width / n : m.height = f) : l === "nw" && (m.x = t.startCropX + d, m.width = Math.abs(d), n ? (m.height = m.width / n, m.y = t.startCropY - m.height) : (m.height = Math.abs(f), m.y = t.startCropY + f));
		let h = b(m, n, l, a.width, a.height, o, s, r, i);
		return n || e.xyOrds.indexOf(u) > -1 ? c = h : e.xOrds.indexOf(u) > -1 ? (c.x = h.x, c.width = h.width) : e.yOrds.indexOf(u) > -1 && (c.y = h.y, c.height = h.height), c.x = p(c.x, 0, a.width - c.width), c.y = p(c.y, 0, a.height - c.height), c;
	}
	renderCropSelection() {
		let { ariaLabels: t = e.defaultProps.ariaLabels, disabled: n, locked: r, renderSelectionAddon: i, ruleOfThirds: a, crop: o } = this.props, c = this.getCropStyle();
		if (o) return /* @__PURE__ */ s.createElement("div", {
			style: c,
			className: "ReactCrop__crop-selection",
			onPointerDown: this.onCropPointerDown,
			"aria-label": t.cropArea,
			tabIndex: 0,
			onKeyDown: this.onComponentKeyDown,
			role: "group"
		}, !n && !r && /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-elements",
			onFocus: this.onDragFocus
		}, /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-bar ord-n",
			"data-ord": "n"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-bar ord-e",
			"data-ord": "e"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-bar ord-s",
			"data-ord": "s"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-bar ord-w",
			"data-ord": "w"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-nw",
			"data-ord": "nw",
			tabIndex: 0,
			"aria-label": t.nwDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "nw"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-n",
			"data-ord": "n",
			tabIndex: 0,
			"aria-label": t.nDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "n"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-ne",
			"data-ord": "ne",
			tabIndex: 0,
			"aria-label": t.neDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "ne"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-e",
			"data-ord": "e",
			tabIndex: 0,
			"aria-label": t.eDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "e"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-se",
			"data-ord": "se",
			tabIndex: 0,
			"aria-label": t.seDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "se"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-s",
			"data-ord": "s",
			tabIndex: 0,
			"aria-label": t.sDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "s"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-sw",
			"data-ord": "sw",
			tabIndex: 0,
			"aria-label": t.swDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "sw"),
			role: "button"
		}), /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__drag-handle ord-w",
			"data-ord": "w",
			tabIndex: 0,
			"aria-label": t.wDragHandle,
			onKeyDown: (e) => this.onHandlerKeyDown(e, "w"),
			role: "button"
		})), i && /* @__PURE__ */ s.createElement("div", {
			className: "ReactCrop__selection-addon",
			onPointerDown: (e) => e.stopPropagation()
		}, i(this.state)), a && /* @__PURE__ */ s.createElement(s.Fragment, null, /* @__PURE__ */ s.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ s.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" })));
	}
	makePixelCrop(e) {
		return y({
			...f,
			...this.props.crop || {}
		}, e.width, e.height);
	}
	render() {
		let { aspect: e, children: t, circularCrop: n, className: r, crop: i, disabled: a, locked: o, style: c, ruleOfThirds: l } = this.props, { cropIsActive: u, newCropIsBeingDrawn: d } = this.state, f = i ? this.renderCropSelection() : null, p = m("ReactCrop", r, u && "ReactCrop--active", a && "ReactCrop--disabled", o && "ReactCrop--locked", d && "ReactCrop--new-crop", i && e && "ReactCrop--fixed-aspect", i && n && "ReactCrop--circular-crop", i && l && "ReactCrop--rule-of-thirds", !this.dragStarted && i && !i.width && !i.height && "ReactCrop--invisible-crop", n && "ReactCrop--no-animate");
		return /* @__PURE__ */ s.createElement("div", {
			ref: this.componentRef,
			className: p,
			style: c
		}, /* @__PURE__ */ s.createElement("div", {
			ref: this.mediaRef,
			className: "ReactCrop__child-wrapper",
			onPointerDown: this.onComponentPointerDown
		}, t), i ? /* @__PURE__ */ s.createElement("svg", {
			className: "ReactCrop__crop-mask",
			width: "100%",
			height: "100%"
		}, /* @__PURE__ */ s.createElement("defs", null, /* @__PURE__ */ s.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ s.createElement("rect", {
			width: "100%",
			height: "100%",
			fill: "white"
		}), n ? /* @__PURE__ */ s.createElement("ellipse", {
			cx: `${i.x + i.width / 2}${i.unit}`,
			cy: `${i.y + i.height / 2}${i.unit}`,
			rx: `${i.width / 2}${i.unit}`,
			ry: `${i.height / 2}${i.unit}`,
			fill: "black"
		}) : /* @__PURE__ */ s.createElement("rect", {
			x: `${i.x}${i.unit}`,
			y: `${i.y}${i.unit}`,
			width: `${i.width}${i.unit}`,
			height: `${i.height}${i.unit}`,
			fill: "black"
		}))), /* @__PURE__ */ s.createElement("rect", {
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
async function T(e, t, n = {}) {
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
function E({ sourceUrl: s, title: c, description: l, circularCrop: f = !1, aspect: p = 1, outputSize: m = 512, outputMimeType: h, busy: v = !1, cancelLabel: y, confirmLabel: b, closeLabel: x, loadingLabel: S = "Cargando imagen…", errorMessage: C = "No hemos podido cargar la imagen. Prueba con otro archivo.", onConfirm: E, onClose: D, className: O }) {
	let k = u(null), [A, j] = d(), [M, N] = d(), [P, F] = d("loading"), [I, L] = d(s);
	s !== I && (L(s), F("loading"), j(void 0), N(void 0));
	let R = () => {
		j(void 0), N(void 0), D();
	}, z = async () => {
		let e = k.current;
		!e || !M || M.width === 0 || (await E(await T(e, M, {
			mimeType: h,
			outputSize: m
		})), j(void 0), N(void 0));
	};
	return /* @__PURE__ */ a(r, {
		open: s !== null,
		onClose: () => {
			v || R();
		},
		title: c,
		...x ? { closeLabel: x } : {},
		...l == null ? {} : { description: l },
		footerClassName: "image-crop-dialog__actions",
		footer: /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(t, {
			variant: "outline",
			disabled: v,
			onClick: R,
			children: y
		}), /* @__PURE__ */ a(t, {
			disabled: v || !M?.width,
			onClick: z,
			children: b
		})] }),
		children: /* @__PURE__ */ a("div", {
			className: ["image-crop-dialog", O].filter(Boolean).join(" "),
			children: /* @__PURE__ */ o("div", {
				className: "image-crop-dialog__area",
				children: [
					P === "loading" && /* @__PURE__ */ a(e, {
						size: "lg",
						label: S
					}),
					P === "error" && /* @__PURE__ */ a(n, {
						variant: "error",
						description: C,
						className: "image-crop-dialog__error"
					}),
					s && P !== "error" && /* @__PURE__ */ a(w, {
						crop: A,
						onChange: (e, t) => j(t),
						onComplete: (e) => N(e),
						aspect: p,
						circularCrop: f,
						minWidth: 64,
						keepSelection: !0,
						children: /* @__PURE__ */ a("img", {
							ref: k,
							src: s,
							alt: "",
							onLoad: (e) => {
								let { width: t, height: n } = e.currentTarget;
								F("ready"), j(_(g({
									unit: "%",
									width: 80
								}, p, t, n), t, n));
							},
							onError: () => F("error")
						})
					})
				]
			})
		})
	});
}
//#endregion
export { E as t };
