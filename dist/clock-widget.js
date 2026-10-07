'use client';
import './clock-widget.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Heading as n } from "./heading.js";
import { t as r } from "./_shared/alert.js";
import { a as i, i as a, n as o, o as s, r as c, s as l, t as u } from "./_shared/table.js";
import { forwardRef as d, useEffect as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/stories/molecules/ClockWidget/clockDuration.ts
function _(e, t) {
	let n = e.end ?? t;
	return Math.max(0, Math.round((n.getTime() - e.start.getTime()) / 6e4));
}
function v(e, t) {
	return e.reduce((e, n) => e + _(n, t), 0);
}
function y(e) {
	return e.some((e) => e.end === null || e.end === void 0);
}
//#endregion
//#region src/stories/messages/es/clockWidget.ts
var b = {
	title: "Fichaje",
	clockIn: "Fichar entrada",
	clockOut: "Fichar salida",
	pending: "Fichando…",
	elapsed: "Trabajado hoy",
	entries: "Fichajes de hoy",
	in: "Entrada",
	out: "Salida",
	duration: "Duración",
	running: "en curso",
	total: "Total",
	nonWorking: "Día no laborable",
	vacation: "Día de vacaciones",
	absence: "Día de ausencia",
	durationValue: (e, t) => e === 0 ? `${t} min` : t === 0 ? `${e} h` : `${e} h ${t} min`
}, x = d(function({ entries: d, date: x, dayState: S = "working", onClockIn: C, onClockOut: w, pending: T = !1, disabled: E = !1, error: D, now: O, locale: ee = "es-ES", timeZone: k, headingLevel: A = 2, showEntries: j = !0, footer: M, titleLabel: N, clockInLabel: P, clockOutLabel: F, pendingLabel: I, elapsedLabel: L, dayStateLabel: R, formatDuration: z, className: B, ...V }, H) {
	let U = e("clockWidget", b), W = y(d), G = W && O === void 0, [K, q] = p(() => Date.now());
	f(() => {
		if (!G) return;
		let e = setInterval(() => q(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [G]);
	let J = O ?? new Date(K), Y = new Intl.DateTimeFormat(ee, {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: k
	}), X = (e) => (z ?? U("durationValue"))(Math.floor(e / 60), e % 60), Z = v(d, J), Q = S === "working", $ = R ?? (Q ? null : U(S === "vacation" ? "vacation" : S === "absence" ? "absence" : "nonWorking"));
	return /* @__PURE__ */ g("section", {
		ref: H,
		className: ["clock-widget", B].filter(Boolean).join(" "),
		...V,
		children: [
			/* @__PURE__ */ g("div", {
				className: "clock-widget__header",
				children: [
					/* @__PURE__ */ h(n, {
						level: A,
						children: U("title", N)
					}),
					x ? /* @__PURE__ */ h("p", {
						className: "clock-widget__date",
						children: x
					}) : null,
					$ ? /* @__PURE__ */ g("p", {
						className: "clock-widget__status",
						children: [/* @__PURE__ */ h("span", {
							className: ["clock-widget__dot", W ? "clock-widget__dot--open" : ""].filter(Boolean).join(" "),
							"aria-hidden": "true"
						}), $]
					}) : null
				]
			}),
			D ? /* @__PURE__ */ h(r, {
				variant: "error",
				children: D
			}) : null,
			Q ? /* @__PURE__ */ g(m, { children: [
				/* @__PURE__ */ g("p", {
					className: "clock-widget__elapsed",
					children: [/* @__PURE__ */ h("span", {
						className: "clock-widget__elapsed-value",
						role: "timer",
						children: X(Z)
					}), /* @__PURE__ */ h("span", {
						className: "clock-widget__elapsed-label",
						children: U("elapsed", L)
					})]
				}),
				W && w ? /* @__PURE__ */ h("p", {
					className: "clock-widget__actions",
					children: /* @__PURE__ */ h(t, {
						type: "button",
						variant: "outline",
						destructive: !0,
						disabled: T || E,
						onClick: w,
						children: T ? U("pending", I) : U("clockOut", F)
					})
				}) : null,
				!W && C ? /* @__PURE__ */ h("p", {
					className: "clock-widget__actions",
					children: /* @__PURE__ */ h(t, {
						type: "button",
						variant: "primary",
						disabled: T || E,
						onClick: C,
						children: T ? U("pending", I) : U("clockIn", P)
					})
				}) : null,
				j && d.length > 0 ? /* @__PURE__ */ g(u, {
					caption: U("entries"),
					size: "sm",
					children: [
						/* @__PURE__ */ h(i, { children: /* @__PURE__ */ g(l, { children: [
							/* @__PURE__ */ h(s, { children: U("in") }),
							/* @__PURE__ */ h(s, { children: U("out") }),
							/* @__PURE__ */ h(s, { children: U("duration") })
						] }) }),
						/* @__PURE__ */ h(o, { children: d.map((e) => /* @__PURE__ */ g(l, { children: [
							/* @__PURE__ */ h(c, { children: Y.format(e.start) }),
							/* @__PURE__ */ h(c, { children: e.end ? Y.format(e.end) : U("running") }),
							/* @__PURE__ */ h(c, { children: X(_(e, J)) })
						] }, e.id)) }),
						d.length > 1 ? /* @__PURE__ */ h(a, { children: /* @__PURE__ */ g(l, { children: [/* @__PURE__ */ h(c, {
							colSpan: 2,
							children: U("total")
						}), /* @__PURE__ */ h(c, { children: X(Z) })] }) }) : null
					]
				}) : null
			] }) : null,
			M ? /* @__PURE__ */ h("div", {
				className: "clock-widget__footer",
				children: M
			}) : null
		]
	});
});
//#endregion
export { x as ClockWidget };
