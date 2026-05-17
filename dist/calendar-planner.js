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
function u({ events: u = [], renderDay: d, maxItemsPerDay: f = 3, onMoreClick: p, onDayClick: m, month: h, defaultMonth: g, onMonthChange: _, navigable: v = !0, locale: y = "es-ES", size: b = "md", className: x }) {
	let [S, C] = o(() => h ?? g ?? /* @__PURE__ */ new Date()), w = h ?? S, T = a((e) => {
		C(e), _?.(e);
	}, [_]), E = /* @__PURE__ */ new Date(), D = b === "sm" ? "xs" : b === "lg" ? "md" : "sm", O = new Intl.DateTimeFormat(y, {
		month: "long",
		year: "numeric"
	}).format(w), k = new Intl.DateTimeFormat(y, { weekday: "short" }), A = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return k.format(n);
	}), j = new Intl.DateTimeFormat(y, { day: "numeric" }), M = l(c(w)), N = new Date(w.getFullYear(), w.getMonth() - 1, 1), P = new Date(w.getFullYear(), w.getMonth() + 1, 1), F = (e) => u.filter((t) => s(t.date, e)), I = `planner-title-${w.getFullYear()}-${w.getMonth()}`;
	return /* @__PURE__ */ i("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${b}`,
			x
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ i("div", {
			className: "calendar-planner__header",
			children: [
				v && /* @__PURE__ */ r("button", {
					type: "button",
					className: "calendar-planner__nav",
					"aria-label": "Mes anterior",
					onClick: () => T(N),
					children: /* @__PURE__ */ r(e, {
						size: D,
						className: "calendar-planner__chevron--prev"
					})
				}),
				/* @__PURE__ */ r("h2", {
					id: I,
					className: "calendar-planner__title",
					"aria-live": "polite",
					children: O
				}),
				v && /* @__PURE__ */ r("button", {
					type: "button",
					className: "calendar-planner__nav",
					"aria-label": "Mes siguiente",
					onClick: () => T(P),
					children: /* @__PURE__ */ r(e, { size: D })
				})
			]
		}), /* @__PURE__ */ i("div", {
			className: "calendar-planner__grid",
			role: "grid",
			"aria-labelledby": I,
			children: [/* @__PURE__ */ r("div", {
				role: "row",
				className: "calendar-planner__row calendar-planner__row--header",
				children: A.map((e) => /* @__PURE__ */ r("div", {
					role: "columnheader",
					className: "calendar-planner__weekday",
					children: e
				}, e))
			}), M.map((e, a) => /* @__PURE__ */ r("div", {
				role: "row",
				className: "calendar-planner__row",
				children: e.map(({ date: e, outside: a }) => {
					let o = s(e, E), c = F(e), l = c.slice(0, f), u = c.length - l.length, h = [
						"calendar-planner__cell",
						a && "calendar-planner__cell--outside",
						o && "calendar-planner__cell--today"
					].filter(Boolean).join(" "), g = [
						"calendar-planner__day-number",
						o && "calendar-planner__day-number--today",
						a && "calendar-planner__day-number--outside"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ i("div", {
						role: "gridcell",
						className: [h, m ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
						"aria-current": o ? "date" : void 0,
						onClick: m ? () => m(e, c) : void 0,
						children: [/* @__PURE__ */ r("span", {
							className: g,
							"aria-label": j.format(e),
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
