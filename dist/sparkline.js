import './sparkline.css';
import { n as e } from "./_shared/env.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/Sparkline/Sparkline.tsx
var i = {
	width: 80,
	height: 24,
	markerSize: 8
}, a = t(function({ values: t, type: a = "line", width: o = i.width, height: s = i.height, marker: c = !0, baseline: l = !0, series: u, "aria-label": d, ariaLabel: f, className: p, ...m }, h) {
	f !== void 0 && e("Sparkline", "ariaLabel", "`aria-label`");
	let g = d ?? f, _ = [
		"sparkline",
		`sparkline--${a}`,
		p
	].filter(Boolean).join(" "), v = t.filter((e) => Number.isFinite(e)), y = i.markerSize / 2, b = v.length ? Math.min(...v) : 0, x = v.length ? Math.max(...v) : 1, S = x - b || 1, C = v.map((e, t) => ({
		x: y + (v.length > 1 ? t * (o - y * 2) / (v.length - 1) : (o - y * 2) / 2),
		y: s - y - (e - b) / S * (s - y * 2)
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), T = C[C.length - 1], E = b < 0 && x > 0, D = s - y - (0 - b) / S * (s - y * 2);
	return C.length === 0 ? null : /* @__PURE__ */ r("svg", {
		ref: h,
		className: _,
		"data-series": u,
		viewBox: `0 0 ${o} ${s}`,
		width: o,
		height: s,
		role: g ? "img" : void 0,
		"aria-label": g,
		"aria-hidden": g ? void 0 : !0,
		...m,
		children: [
			l && E ? /* @__PURE__ */ n("line", {
				className: "sparkline__baseline",
				x1: 0,
				y1: D,
				x2: o,
				y2: D
			}) : null,
			a === "area" && T ? /* @__PURE__ */ n("path", {
				className: "sparkline__area",
				d: `${w} L ${T.x} ${s} L ${C[0]?.x ?? 0} ${s} Z`
			}) : null,
			/* @__PURE__ */ n("path", {
				className: "sparkline__line",
				d: w
			}),
			c && T ? /* @__PURE__ */ n("circle", {
				className: "sparkline__marker",
				cx: T.x,
				cy: T.y,
				r: i.markerSize / 2
			}) : null
		]
	});
});
//#endregion
export { a as Sparkline };
