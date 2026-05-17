'use client';
import './calendar-planner.css';
import { Chevron as e } from "./chevron.js";
import { Tag as t } from "./tag.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { useCallback as a, useState as o } from "react";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function s(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function c(e) {
	let t = new Date(e.getFullYear(), e.getMonth(), 1), n = t.getDay() - 1;
	n < 0 && (n = 6);
	let r = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate(), i = Math.ceil((n + r) / 7) * 7, a = [];
	for (let e = n; e > 0; e--) {
		let n = new Date(t);
		n.setDate(n.getDate() - e), a.push({
			date: n,
			outside: !0
		});
	}
	for (let t = 1; t <= r; t++) a.push({
		date: new Date(e.getFullYear(), e.getMonth(), t),
		outside: !1
	});
	let o = i - a.length, s = a[a.length - 1].date;
	for (let e = 1; e <= o; e++) {
		let t = new Date(s);
		t.setDate(t.getDate() + e), a.push({
			date: t,
			outside: !0
		});
	}
	return a;
}
function l(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function u({ events: u = [], renderDay: d, maxItemsPerDay: f = 3, onMoreClick: p, month: m, defaultMonth: h, onMonthChange: g, navigable: _ = !0, locale: v = "es-ES", size: y = "md", className: b }) {
	let [x, S] = o(() => m ?? h ?? /* @__PURE__ */ new Date()), C = m ?? x, w = a((e) => {
		S(e), g?.(e);
	}, [g]), T = /* @__PURE__ */ new Date(), E = y === "sm" ? "xs" : y === "lg" ? "md" : "sm", D = new Intl.DateTimeFormat(v, {
		month: "long",
		year: "numeric"
	}).format(C), O = new Intl.DateTimeFormat(v, { weekday: "short" }), k = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return O.format(n);
	}), A = new Intl.DateTimeFormat(v, { day: "numeric" }), j = l(c(C)), M = new Date(C.getFullYear(), C.getMonth() - 1, 1), N = new Date(C.getFullYear(), C.getMonth() + 1, 1), P = (e) => u.filter((t) => s(t.date, e)), F = `planner-title-${C.getFullYear()}-${C.getMonth()}`;
	return /* @__PURE__ */ i("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${y}`,
			b
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ i("div", {
			className: "calendar-planner__header",
			children: [
				_ && /* @__PURE__ */ r("button", {
					type: "button",
					className: "calendar-planner__nav",
					"aria-label": "Mes anterior",
					onClick: () => w(M),
					children: /* @__PURE__ */ r(e, {
						size: E,
						className: "calendar-planner__chevron--prev"
					})
				}),
				/* @__PURE__ */ r("h2", {
					id: F,
					className: "calendar-planner__title",
					"aria-live": "polite",
					children: D
				}),
				_ && /* @__PURE__ */ r("button", {
					type: "button",
					className: "calendar-planner__nav",
					"aria-label": "Mes siguiente",
					onClick: () => w(N),
					children: /* @__PURE__ */ r(e, { size: E })
				})
			]
		}), /* @__PURE__ */ i("div", {
			className: "calendar-planner__grid",
			role: "grid",
			"aria-labelledby": F,
			children: [/* @__PURE__ */ r("div", {
				role: "row",
				className: "calendar-planner__row calendar-planner__row--header",
				children: k.map((e) => /* @__PURE__ */ r("div", {
					role: "columnheader",
					className: "calendar-planner__weekday",
					children: e
				}, e))
			}), j.map((e, a) => /* @__PURE__ */ r("div", {
				role: "row",
				className: "calendar-planner__row",
				children: e.map(({ date: e, outside: a }) => {
					let o = s(e, T), c = P(e), l = c.slice(0, f), u = c.length - l.length, m = [
						"calendar-planner__cell",
						a && "calendar-planner__cell--outside",
						o && "calendar-planner__cell--today"
					].filter(Boolean).join(" "), h = [
						"calendar-planner__day-number",
						o && "calendar-planner__day-number--today",
						a && "calendar-planner__day-number--outside"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ i("div", {
						role: "gridcell",
						className: m,
						"aria-current": o ? "date" : void 0,
						children: [/* @__PURE__ */ r("span", {
							className: h,
							"aria-label": A.format(e),
							children: e.getDate()
						}), /* @__PURE__ */ r("div", {
							className: "calendar-planner__cell-body",
							children: d ? d(e, c) : /* @__PURE__ */ i(n, { children: [l.map((e) => /* @__PURE__ */ r(t, {
								variant: e.variant ?? "default",
								children: e.label
							}, e.id)), u > 0 && /* @__PURE__ */ i("button", {
								type: "button",
								className: "calendar-planner__more",
								onClick: () => p?.(e, c),
								children: [
									"+",
									u,
									" más"
								]
							})] })
						})]
					}, e.toISOString());
				})
			}, a))]
		})]
	});
}
//#endregion
export { u as CalendarPlanner };
