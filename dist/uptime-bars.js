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
//#region src/stories/messages/es/uptimeBars.ts
var l = {
	label: "Disponibilidad",
	noData: "sin datos"
}, u = n(function({ points: n, summary: u, label: d, startLabel: f, endLabel: p, thresholds: m, locale: h = "es-ES", maximumFractionDigits: g = 2, pointLabel: _, noDataLabel: v, tooltips: y = !0, className: b, ...x }, S) {
	let C = e("uptimeBars", l), w = {
		...s,
		...m
	}, T = r([]), [E, D] = i(0), O = new Intl.NumberFormat(h, {
		style: "percent",
		maximumFractionDigits: g
	}), k = (e) => e === null || !Number.isFinite(e) ? null : O.format(e / 100), A = (e, t) => {
		if (_) return _(e, t);
		let n = `${e.label}: ${t ?? C("noData", v)}`;
		return e.detail ? `${n}. ${e.detail}` : n;
	}, j = (e) => {
		let t = Math.max(0, Math.min(n.length - 1, e));
		D(t), T.current[t]?.focus();
	}, M = (e, t) => {
		let r = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[e.key];
		if (r) {
			e.preventDefault(), j(t + r);
			return;
		}
		e.key === "Home" ? (e.preventDefault(), j(0)) : e.key === "End" && (e.preventDefault(), j(n.length - 1));
	}, N = Math.max(0, Math.min(E, n.length - 1));
	return /* @__PURE__ */ o("div", {
		ref: S,
		className: ["uptime-bars", b].filter(Boolean).join(" "),
		...x,
		children: [/* @__PURE__ */ a("ol", {
			className: "uptime-bars__list",
			"aria-label": C("label", d),
			children: n.map((e, n) => {
				let r = k(e.value), i = /* @__PURE__ */ a("span", {
					className: `uptime-bars__bar uptime-bars__bar--${c(e.value, w)}`,
					role: "img",
					"aria-label": A(e, r),
					tabIndex: y ? n === N ? 0 : -1 : void 0,
					onKeyDown: y ? (e) => M(e, n) : void 0,
					onFocus: y ? () => D(n) : void 0
				});
				return /* @__PURE__ */ a("li", {
					className: "uptime-bars__item",
					children: y ? /* @__PURE__ */ a(t, {
						ref: (e) => {
							T.current[n] = e;
						},
						label: /* @__PURE__ */ o("span", {
							className: "uptime-bars__tooltip",
							children: [
								/* @__PURE__ */ a("span", {
									className: "uptime-bars__tooltip-label",
									children: e.label
								}),
								/* @__PURE__ */ a("span", { children: r ?? C("noData", v) }),
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
					children: f
				}),
				/* @__PURE__ */ a("span", {
					className: "uptime-bars__summary",
					children: u
				}),
				/* @__PURE__ */ a("span", {
					className: "uptime-bars__edge uptime-bars__edge--end",
					children: p
				})
			]
		})]
	});
});
//#endregion
export { u as UptimeBars };
