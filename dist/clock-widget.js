'use client';
import './clock-widget.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Heading as n } from "./heading.js";
import { Alert as r } from "./alert.js";
import { Table as i, TableBody as a, TableCell as o, TableFooter as s, TableHead as c, TableHeader as l, TableRow as u } from "./table.js";
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
//#region src/stories/molecules/ClockWidget/ClockWidget.tsx
var b = d(function({ entries: d, date: b, dayState: x = "working", onClockIn: S, onClockOut: C, pending: w = !1, disabled: T = !1, error: E, now: D, locale: O = "es-ES", timeZone: k, headingLevel: A = 2, showEntries: j = !0, footer: M, titleLabel: N, clockInLabel: P, clockOutLabel: F, pendingLabel: I, elapsedLabel: L, dayStateLabel: R, formatDuration: z, className: B, ...V }, H) {
	let U = e("clockWidget"), W = y(d), G = W && D === void 0, [K, q] = p(() => Date.now());
	f(() => {
		if (!G) return;
		let e = setInterval(() => q(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [G]);
	let J = D ?? new Date(K), Y = new Intl.DateTimeFormat(O, {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: k
	}), X = (e) => (z ?? U("durationValue"))(Math.floor(e / 60), e % 60), Z = v(d, J), Q = x === "working", $ = R ?? (Q ? null : U(x === "vacation" ? "vacation" : x === "absence" ? "absence" : "nonWorking"));
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
					b ? /* @__PURE__ */ h("p", {
						className: "clock-widget__date",
						children: b
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
			E ? /* @__PURE__ */ h(r, {
				variant: "error",
				children: E
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
				W && C ? /* @__PURE__ */ h("p", {
					className: "clock-widget__actions",
					children: /* @__PURE__ */ h(t, {
						type: "button",
						variant: "outline",
						destructive: !0,
						disabled: w || T,
						onClick: C,
						children: w ? U("pending", I) : U("clockOut", F)
					})
				}) : null,
				!W && S ? /* @__PURE__ */ h("p", {
					className: "clock-widget__actions",
					children: /* @__PURE__ */ h(t, {
						type: "button",
						variant: "primary",
						disabled: w || T,
						onClick: S,
						children: w ? U("pending", I) : U("clockIn", P)
					})
				}) : null,
				j && d.length > 0 ? /* @__PURE__ */ g(i, {
					caption: U("entries"),
					size: "sm",
					children: [
						/* @__PURE__ */ h(c, { children: /* @__PURE__ */ g(u, { children: [
							/* @__PURE__ */ h(l, { children: U("in") }),
							/* @__PURE__ */ h(l, { children: U("out") }),
							/* @__PURE__ */ h(l, { children: U("duration") })
						] }) }),
						/* @__PURE__ */ h(a, { children: d.map((e) => /* @__PURE__ */ g(u, { children: [
							/* @__PURE__ */ h(o, { children: Y.format(e.start) }),
							/* @__PURE__ */ h(o, { children: e.end ? Y.format(e.end) : U("running") }),
							/* @__PURE__ */ h(o, { children: X(_(e, J)) })
						] }, e.id)) }),
						d.length > 1 ? /* @__PURE__ */ h(s, { children: /* @__PURE__ */ g(u, { children: [/* @__PURE__ */ h(o, {
							colSpan: 2,
							children: U("total")
						}), /* @__PURE__ */ h(o, { children: X(Z) })] }) }) : null
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
export { b as ClockWidget };
