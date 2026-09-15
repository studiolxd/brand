'use client';
import './uptime-bars.css';
import { Tooltip as e } from "./tooltip.js";
import { forwardRef as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/UptimeBars/uptimeStatus.ts
var o = {
	ok: 99.65,
	degraded: 95.83
};
function s(e, t) {
	return e === null || !Number.isFinite(e) ? "empty" : e >= t.ok ? "ok" : e >= t.degraded ? "degraded" : "down";
}
//#endregion
//#region src/stories/molecules/UptimeBars/UptimeBars.tsx
var c = t(function({ points: t, summary: c, label: l = "Disponibilidad", startLabel: u, endLabel: d, thresholds: f, locale: p = "es-ES", maximumFractionDigits: m = 2, pointLabel: h, noDataLabel: g = "sin datos", tooltips: _ = !0, className: v, ...y }, b) {
	let x = {
		...o,
		...f
	}, S = n([]), [C, w] = r(0), T = new Intl.NumberFormat(p, {
		style: "percent",
		maximumFractionDigits: m
	}), E = (e) => e === null || !Number.isFinite(e) ? null : T.format(e / 100), D = (e, t) => {
		if (h) return h(e, t);
		let n = `${e.label}: ${t ?? g}`;
		return e.detail ? `${n}. ${e.detail}` : n;
	}, O = (e) => {
		let n = Math.max(0, Math.min(t.length - 1, e));
		w(n), S.current[n]?.focus();
	}, k = (e, n) => {
		let r = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[e.key];
		if (r) {
			e.preventDefault(), O(n + r);
			return;
		}
		e.key === "Home" ? (e.preventDefault(), O(0)) : e.key === "End" && (e.preventDefault(), O(t.length - 1));
	}, A = Math.max(0, Math.min(C, t.length - 1));
	return /* @__PURE__ */ a("div", {
		ref: b,
		className: ["uptime-bars", v].filter(Boolean).join(" "),
		...y,
		children: [/* @__PURE__ */ i("ol", {
			className: "uptime-bars__list",
			"aria-label": l,
			children: t.map((t, n) => {
				let r = E(t.value), o = /* @__PURE__ */ i("span", {
					className: `uptime-bars__bar uptime-bars__bar--${s(t.value, x)}`,
					role: "img",
					"aria-label": D(t, r),
					tabIndex: _ ? n === A ? 0 : -1 : void 0,
					onKeyDown: _ ? (e) => k(e, n) : void 0,
					onFocus: _ ? () => w(n) : void 0
				});
				return /* @__PURE__ */ i("li", {
					className: "uptime-bars__item",
					children: _ ? /* @__PURE__ */ i(e, {
						ref: (e) => {
							S.current[n] = e;
						},
						label: /* @__PURE__ */ a("span", {
							className: "uptime-bars__tooltip",
							children: [
								/* @__PURE__ */ i("span", {
									className: "uptime-bars__tooltip-label",
									children: t.label
								}),
								/* @__PURE__ */ i("span", { children: r ?? g }),
								t.detail ? /* @__PURE__ */ i("span", { children: t.detail }) : null
							]
						}),
						children: o
					}) : o
				}, `${t.label}-${n}`);
			})
		}), /* @__PURE__ */ a("p", {
			className: "uptime-bars__footer",
			children: [
				/* @__PURE__ */ i("span", {
					className: "uptime-bars__edge",
					children: u
				}),
				/* @__PURE__ */ i("span", {
					className: "uptime-bars__summary",
					children: c
				}),
				/* @__PURE__ */ i("span", {
					className: "uptime-bars__edge uptime-bars__edge--end",
					children: d
				})
			]
		})]
	});
});
//#endregion
export { c as UptimeBars };
