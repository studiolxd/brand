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
function d({ events: d = [], renderDay: f, maxItemsPerDay: p = 3, onMoreClick: m, onDayClick: h, month: g, defaultMonth: _, onMonthChange: v, navigable: y = !0, locale: b = "es-ES", previousMonthLabel: x = "Mes anterior", nextMonthLabel: S = "Mes siguiente", size: C = "md", className: w }) {
	let [T, E] = s(() => g ?? _ ?? /* @__PURE__ */ new Date()), [D, O] = s(null), k = o(() => O(null), []), A = g ?? T, j = o((e) => {
		E(e), v?.(e);
	}, [v]), M = /* @__PURE__ */ new Date(), N = C === "sm" ? "xs" : C === "lg" ? "md" : "sm", P = new Intl.DateTimeFormat(b, {
		month: "long",
		year: "numeric"
	}).format(A), F = new Intl.DateTimeFormat(b, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), I = new Intl.DateTimeFormat(b, { weekday: "short" }), L = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return I.format(n);
	}), R = new Intl.DateTimeFormat(b, { day: "numeric" }), z = u(l(A)), B = new Date(A.getFullYear(), A.getMonth() - 1, 1), V = new Date(A.getFullYear(), A.getMonth() + 1, 1), H = (e) => d.filter((t) => c(t.date, e)), U = `planner-title-${A.getFullYear()}-${A.getMonth()}`;
	return /* @__PURE__ */ a("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${C}`,
			w
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("div", {
				className: "calendar-planner__header",
				children: [
					y && /* @__PURE__ */ i("button", {
						type: "button",
						className: "calendar-planner__nav",
						"aria-label": x,
						onClick: () => j(B),
						children: /* @__PURE__ */ i(e, {
							name: "chevron",
							size: N,
							className: "calendar-planner__chevron--prev"
						})
					}),
					/* @__PURE__ */ i("h2", {
						id: U,
						className: "calendar-planner__title",
						"aria-live": "polite",
						children: P
					}),
					y && /* @__PURE__ */ i("button", {
						type: "button",
						className: "calendar-planner__nav",
						"aria-label": S,
						onClick: () => j(V),
						children: /* @__PURE__ */ i(e, {
							name: "chevron",
							size: N
						})
					})
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-labelledby": U,
				children: [/* @__PURE__ */ i("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: L.map((e) => /* @__PURE__ */ i("div", {
						role: "columnheader",
						className: "calendar-planner__weekday",
						children: e
					}, e))
				}), z.map((e, n) => /* @__PURE__ */ i("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map(({ date: e, outside: n }) => {
						let o = c(e, M), s = H(e), l = s.slice(0, p), u = s.length - l.length, d = [
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
								"aria-label": R.format(e),
								children: e.getDate()
							}), /* @__PURE__ */ i("div", {
								className: "calendar-planner__cell-body",
								children: f ? f(e, s) : /* @__PURE__ */ a(r, { children: [l.map((e) => /* @__PURE__ */ i(t, {
									variant: e.variant ?? "neutral",
									children: e.label
								}, e.id)), u > 0 && /* @__PURE__ */ a("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (t) => {
										t.stopPropagation(), O({
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
				open: D !== null,
				onClose: k,
				title: D ? F.format(D.date) : void 0,
				children: /* @__PURE__ */ i("div", {
					className: "calendar-planner__modal-events",
					children: D?.events.map((e) => /* @__PURE__ */ i(t, {
						variant: e.variant ?? "neutral",
						children: e.label
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { d as CalendarPlanner };
