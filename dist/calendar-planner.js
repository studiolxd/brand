'use client';
import './calendar-planner.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { Modal as n } from "./modal.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { useCallback as o, useState as s } from "react";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function c(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function l(e) {
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
function u(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function d({ events: d = [], renderDay: f, maxItemsPerDay: p = 3, onMoreClick: m, onDayClick: h, month: g, defaultMonth: _, onMonthChange: v, navigable: y = !0, locale: b = "es-ES", size: x = "md", className: S }) {
	let [C, w] = s(() => g ?? _ ?? /* @__PURE__ */ new Date()), [T, E] = s(null), D = o(() => E(null), []), O = g ?? C, k = o((e) => {
		w(e), v?.(e);
	}, [v]), A = /* @__PURE__ */ new Date(), j = x === "sm" ? "xs" : x === "lg" ? "md" : "sm", M = new Intl.DateTimeFormat(b, {
		month: "long",
		year: "numeric"
	}).format(O), N = new Intl.DateTimeFormat(b, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), P = new Intl.DateTimeFormat(b, { weekday: "short" }), F = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return P.format(n);
	}), I = new Intl.DateTimeFormat(b, { day: "numeric" }), L = u(l(O)), R = new Date(O.getFullYear(), O.getMonth() - 1, 1), z = new Date(O.getFullYear(), O.getMonth() + 1, 1), B = (e) => d.filter((t) => c(t.date, e)), V = `planner-title-${O.getFullYear()}-${O.getMonth()}`;
	return /* @__PURE__ */ a("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${x}`,
			S
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("div", {
				className: "calendar-planner__header",
				children: [
					y && /* @__PURE__ */ i("button", {
						type: "button",
						className: "calendar-planner__nav",
						"aria-label": "Mes anterior",
						onClick: () => k(R),
						children: /* @__PURE__ */ i(e, {
							name: "chevron",
							size: j,
							className: "calendar-planner__chevron--prev"
						})
					}),
					/* @__PURE__ */ i("h2", {
						id: V,
						className: "calendar-planner__title",
						"aria-live": "polite",
						children: M
					}),
					y && /* @__PURE__ */ i("button", {
						type: "button",
						className: "calendar-planner__nav",
						"aria-label": "Mes siguiente",
						onClick: () => k(z),
						children: /* @__PURE__ */ i(e, {
							name: "chevron",
							size: j
						})
					})
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-labelledby": V,
				children: [/* @__PURE__ */ i("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: F.map((e) => /* @__PURE__ */ i("div", {
						role: "columnheader",
						className: "calendar-planner__weekday",
						children: e
					}, e))
				}), L.map((e, n) => /* @__PURE__ */ i("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map(({ date: e, outside: n }) => {
						let o = c(e, A), s = B(e), l = s.slice(0, p), u = s.length - l.length, d = [
							"calendar-planner__cell",
							n && "calendar-planner__cell--outside",
							o && "calendar-planner__cell--today"
						].filter(Boolean).join(" "), g = [
							"calendar-planner__day-number",
							o && "calendar-planner__day-number--today",
							n && "calendar-planner__day-number--outside"
						].filter(Boolean).join(" ");
						return /* @__PURE__ */ a("div", {
							role: "gridcell",
							className: [d, h ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
							"aria-current": o ? "date" : void 0,
							onClick: h ? () => h(e, s) : void 0,
							children: [/* @__PURE__ */ i("span", {
								className: g,
								"aria-label": I.format(e),
								children: e.getDate()
							}), /* @__PURE__ */ i("div", {
								className: "calendar-planner__cell-body",
								children: f ? f(e, s) : /* @__PURE__ */ a(r, { children: [l.map((e) => /* @__PURE__ */ i(t, {
									variant: e.variant ?? "default",
									children: e.label
								}, e.id)), u > 0 && /* @__PURE__ */ a("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (t) => {
										t.stopPropagation(), E({
											date: e,
											events: s
										}), m?.(e, s);
									},
									children: [
										"+",
										u,
										" más"
									]
								})] })
							})]
						}, e.toISOString());
					})
				}, n))]
			}),
			/* @__PURE__ */ i(n, {
				open: T !== null,
				onClose: D,
				title: T ? N.format(T.date) : void 0,
				children: /* @__PURE__ */ i("div", {
					className: "calendar-planner__modal-events",
					children: T?.events.map((e) => /* @__PURE__ */ i(t, {
						variant: e.variant ?? "default",
						children: e.label
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { d as CalendarPlanner };
