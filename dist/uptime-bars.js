'use client';
import './uptime-bars.css';
import { Tooltip as e } from "./tooltip.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useRef as i, useState as a } from "react";
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
var c = r(function({ points: r, summary: c, label: l = "Disponibilidad", startLabel: u, endLabel: d, thresholds: f, locale: p = "es-ES", maximumFractionDigits: m = 2, pointLabel: h, noDataLabel: g = "sin datos", tooltips: _ = !0, className: v, ...y }, b) {
	let x = {
		...o,
		...f
	}, S = i([]), [C, w] = a(0), T = new Intl.NumberFormat(p, {
		style: "percent",
		maximumFractionDigits: m
	}), E = (e) => e === null || !Number.isFinite(e) ? null : T.format(e / 100), D = (e, t) => {
		if (h) return h(e, t);
		let n = `${e.label}: ${t ?? g}`;
		return e.detail ? `${n}. ${e.detail}` : n;
	}, O = (e) => {
		let t = Math.max(0, Math.min(r.length - 1, e));
		w(t), S.current[t]?.focus();
	}, k = (e, t) => {
		let n = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[e.key];
		if (n) {
			e.preventDefault(), O(t + n);
			return;
		}
		e.key === "Home" ? (e.preventDefault(), O(0)) : e.key === "End" && (e.preventDefault(), O(r.length - 1));
	}, A = Math.max(0, Math.min(C, r.length - 1));
	return /* @__PURE__ */ n("div", {
		ref: b,
		className: ["uptime-bars", v].filter(Boolean).join(" "),
		...y,
		children: [/* @__PURE__ */ t("ol", {
			className: "uptime-bars__list",
			"aria-label": l,
			children: r.map((r, i) => {
				let a = E(r.value), o = /* @__PURE__ */ t("span", {
					className: `uptime-bars__bar uptime-bars__bar--${s(r.value, x)}`,
					role: "img",
					"aria-label": D(r, a),
					tabIndex: _ ? i === A ? 0 : -1 : void 0,
					onKeyDown: _ ? (e) => k(e, i) : void 0,
					onFocus: _ ? () => w(i) : void 0
				});
				return /* @__PURE__ */ t("li", {
					className: "uptime-bars__item",
					children: _ ? /* @__PURE__ */ t(e, {
						ref: (e) => {
							S.current[i] = e;
						},
						label: /* @__PURE__ */ n("span", {
							className: "uptime-bars__tooltip",
							children: [
								/* @__PURE__ */ t("span", {
									className: "uptime-bars__tooltip-label",
									children: r.label
								}),
								/* @__PURE__ */ t("span", { children: a ?? g }),
								r.detail ? /* @__PURE__ */ t("span", { children: r.detail }) : null
							]
						}),
						children: o
					}) : o
				}, `${r.label}-${i}`);
			})
		}), /* @__PURE__ */ n("p", {
			className: "uptime-bars__footer",
			children: [
				/* @__PURE__ */ t("span", {
					className: "uptime-bars__edge",
					children: u
				}),
				/* @__PURE__ */ t("span", {
					className: "uptime-bars__summary",
					children: c
				}),
				/* @__PURE__ */ t("span", {
					className: "uptime-bars__edge uptime-bars__edge--end",
					children: d
				})
			]
		})]
	});
});
//#endregion
export { c as UptimeBars };
