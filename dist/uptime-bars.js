'use client';
import './uptime-bars.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tooltip as t } from "./tooltip.js";
import { forwardRef as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/UptimeBars/uptimeStatus.ts
var s = {
	ok: 99.65,
	degraded: 95.83
};
function c(e, t) {
	return e === null || !Number.isFinite(e) ? "empty" : e >= t.ok ? "ok" : e >= t.degraded ? "degraded" : "down";
}
//#endregion
//#region src/stories/molecules/UptimeBars/UptimeBars.tsx
var l = n(function({ points: n, summary: l, label: u, startLabel: d, endLabel: f, thresholds: p, locale: m = "es-ES", maximumFractionDigits: h = 2, pointLabel: g, noDataLabel: _, tooltips: v = !0, className: y, ...b }, x) {
	let S = e("uptimeBars"), C = {
		...s,
		...p
	}, w = r([]), [T, E] = i(0), D = new Intl.NumberFormat(m, {
		style: "percent",
		maximumFractionDigits: h
	}), O = (e) => e === null || !Number.isFinite(e) ? null : D.format(e / 100), k = (e, t) => {
		if (g) return g(e, t);
		let n = `${e.label}: ${t ?? S("noData", _)}`;
		return e.detail ? `${n}. ${e.detail}` : n;
	}, A = (e) => {
		let t = Math.max(0, Math.min(n.length - 1, e));
		E(t), w.current[t]?.focus();
	}, j = (e, t) => {
		let r = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[e.key];
		if (r) {
			e.preventDefault(), A(t + r);
			return;
		}
		e.key === "Home" ? (e.preventDefault(), A(0)) : e.key === "End" && (e.preventDefault(), A(n.length - 1));
	}, M = Math.max(0, Math.min(T, n.length - 1));
	return /* @__PURE__ */ o("div", {
		ref: x,
		className: ["uptime-bars", y].filter(Boolean).join(" "),
		...b,
		children: [/* @__PURE__ */ a("ol", {
			className: "uptime-bars__list",
			"aria-label": S("label", u),
			children: n.map((e, n) => {
				let r = O(e.value), i = /* @__PURE__ */ a("span", {
					className: `uptime-bars__bar uptime-bars__bar--${c(e.value, C)}`,
					role: "img",
					"aria-label": k(e, r),
					tabIndex: v ? n === M ? 0 : -1 : void 0,
					onKeyDown: v ? (e) => j(e, n) : void 0,
					onFocus: v ? () => E(n) : void 0
				});
				return /* @__PURE__ */ a("li", {
					className: "uptime-bars__item",
					children: v ? /* @__PURE__ */ a(t, {
						ref: (e) => {
							w.current[n] = e;
						},
						label: /* @__PURE__ */ o("span", {
							className: "uptime-bars__tooltip",
							children: [
								/* @__PURE__ */ a("span", {
									className: "uptime-bars__tooltip-label",
									children: e.label
								}),
								/* @__PURE__ */ a("span", { children: r ?? S("noData", _) }),
								e.detail ? /* @__PURE__ */ a("span", { children: e.detail }) : null
							]
						}),
						children: i
					}) : i
				}, `${e.label}-${n}`);
			})
		}), /* @__PURE__ */ o("p", {
			className: "uptime-bars__footer",
			children: [
				/* @__PURE__ */ a("span", {
					className: "uptime-bars__edge",
					children: d
				}),
				/* @__PURE__ */ a("span", {
					className: "uptime-bars__summary",
					children: l
				}),
				/* @__PURE__ */ a("span", {
					className: "uptime-bars__edge uptime-bars__edge--end",
					children: f
				})
			]
		})]
	});
});
//#endregion
export { l as UptimeBars };
