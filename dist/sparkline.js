import './sparkline.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/Sparkline/Sparkline.tsx
var r = {
	width: 80,
	height: 24,
	markerSize: 8
}, i = n(function({ values: n, type: i = "line", width: a = r.width, height: o = r.height, marker: s = !0, baseline: c = !0, series: l, ariaLabel: u, className: d, ...f }, p) {
	let m = [
		"sparkline",
		`sparkline--${i}`,
		d
	].filter(Boolean).join(" "), h = n.filter((e) => Number.isFinite(e)), g = r.markerSize / 2, _ = h.length ? Math.min(...h) : 0, v = h.length ? Math.max(...h) : 1, y = v - _ || 1, b = h.map((e, t) => ({
		x: g + (h.length > 1 ? t * (a - g * 2) / (h.length - 1) : (a - g * 2) / 2),
		y: o - g - (e - _) / y * (o - g * 2)
	})), x = b.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), S = b[b.length - 1], C = _ < 0 && v > 0, w = o - g - (0 - _) / y * (o - g * 2);
	return b.length === 0 ? null : /* @__PURE__ */ t("svg", {
		ref: p,
		className: m,
		"data-series": l,
		viewBox: `0 0 ${a} ${o}`,
		width: a,
		height: o,
		role: u ? "img" : void 0,
		"aria-label": u,
		"aria-hidden": u ? void 0 : !0,
		...f,
		children: [
			c && C ? /* @__PURE__ */ e("line", {
				className: "sparkline__baseline",
				x1: 0,
				y1: w,
				x2: a,
				y2: w
			}) : null,
			i === "area" && S ? /* @__PURE__ */ e("path", {
				className: "sparkline__area",
				d: `${x} L ${S.x} ${o} L ${b[0]?.x ?? 0} ${o} Z`
			}) : null,
			/* @__PURE__ */ e("path", {
				className: "sparkline__line",
				d: x
			}),
			s && S ? /* @__PURE__ */ e("circle", {
				className: "sparkline__marker",
				cx: S.x,
				cy: S.y,
				r: r.markerSize / 2
			}) : null
		]
	});
});
//#endregion
export { i as Sparkline };
