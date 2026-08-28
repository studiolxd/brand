import './sparkline.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/Sparkline/Sparkline.tsx
var r = {
	width: 80,
	height: 24,
	markerSize: 8
}, i = e(function({ values: e, type: i = "line", width: a = r.width, height: o = r.height, marker: s = !0, baseline: c = !0, color: l, ariaLabel: u, className: d, ...f }, p) {
	let m = [
		"sparkline",
		`sparkline--${i}`,
		d
	].filter(Boolean).join(" "), h = e.filter((e) => Number.isFinite(e)), g = r.markerSize / 2, _ = h.length ? Math.min(...h) : 0, v = h.length ? Math.max(...h) : 1, y = v - _ || 1, b = l ? { "--sparkline-mark-color": l } : void 0, x = h.map((e, t) => ({
		x: g + (h.length > 1 ? t * (a - g * 2) / (h.length - 1) : (a - g * 2) / 2),
		y: o - g - (e - _) / y * (o - g * 2)
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), C = x[x.length - 1], w = _ < 0 && v > 0, T = o - g - (0 - _) / y * (o - g * 2);
	return x.length === 0 ? null : /* @__PURE__ */ n("svg", {
		ref: p,
		className: m,
		style: b,
		viewBox: `0 0 ${a} ${o}`,
		width: a,
		height: o,
		role: u ? "img" : void 0,
		"aria-label": u,
		"aria-hidden": u ? void 0 : !0,
		...f,
		children: [
			c && w ? /* @__PURE__ */ t("line", {
				className: "sparkline__baseline",
				x1: 0,
				y1: T,
				x2: a,
				y2: T
			}) : null,
			i === "area" && C ? /* @__PURE__ */ t("path", {
				className: "sparkline__area",
				d: `${S} L ${C.x} ${o} L ${x[0]?.x ?? 0} ${o} Z`
			}) : null,
			/* @__PURE__ */ t("path", {
				className: "sparkline__line",
				d: S
			}),
			s && C ? /* @__PURE__ */ t("circle", {
				className: "sparkline__marker",
				cx: C.x,
				cy: C.y,
				r: r.markerSize / 2
			}) : null
		]
	});
});
//#endregion
export { i as Sparkline };
