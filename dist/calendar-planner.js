'use client';
import './calendar-planner.css';
import { Tag as e } from "./tag.js";
import { Modal as t } from "./modal.js";
import { c as n, i as r, l as i, n as a, o, r as s, s as c, t as l } from "./_shared/calendarGrid.js";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import { useCallback as p, useState as m } from "react";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function h({ events: h = [], renderDay: g, maxItemsPerDay: _ = 3, onMoreClick: v, onDayClick: y, month: b, defaultMonth: x, onMonthChange: S, navigable: C = !0, locale: w = "es-ES", previousMonthLabel: T = "Mes anterior", nextMonthLabel: E = "Mes siguiente", gridLabel: D, size: O = "md", className: k }) {
	let [A, j] = m(() => b ?? x ?? /* @__PURE__ */ new Date()), [M, N] = m(null), P = p(() => N(null), []), F = b ?? A, I = p((e) => {
		j(e), S?.(e);
	}, [S]), L = /* @__PURE__ */ new Date(), R = O === "sm" ? "xs" : O === "lg" ? "md" : "sm", z = new Intl.DateTimeFormat(w, {
		month: "long",
		year: "numeric"
	}).format(F), B = new Intl.DateTimeFormat(w, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), V = s(w, "short"), H = new Intl.DateTimeFormat(w, { day: "numeric" }), U = l(a(F)), W = n(F, -1), G = n(F, 1), K = (e) => h.filter((t) => r(t.date, e)), q = i({
		month: F,
		onMonthChange: I,
		onActivate: y ? (e) => y(e, K(e)) : void 0
	}), J = `planner-title-${F.getFullYear()}-${F.getMonth()}`;
	return /* @__PURE__ */ f("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${O}`,
			k
		].filter(Boolean).join(" "),
		children: [
			o({
				block: "calendar-planner",
				title: z,
				titleId: J,
				navigable: C,
				previousMonthLabel: T,
				nextMonthLabel: E,
				onPrev: () => I(W),
				onNext: () => I(G),
				chevronSize: R
			}),
			/* @__PURE__ */ f("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-label": D,
				"aria-labelledby": D ? void 0 : J,
				onKeyDown: y ? q.onKeyDown : void 0,
				children: [c({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: V
				}), U.map((t, n) => /* @__PURE__ */ d("div", {
					role: "row",
					className: "calendar-planner__row",
					children: t.map(({ date: t, outside: n }) => {
						let i = r(t, L), a = K(t), o = a.slice(0, _), s = a.length - o.length, c = [
							"calendar-planner__cell",
							n && "calendar-planner__cell--outside",
							i && "calendar-planner__cell--today"
						].filter(Boolean).join(" "), l = [
							"calendar-planner__day-number",
							i && "calendar-planner__day-number--today",
							n && "calendar-planner__day-number--outside"
						].filter(Boolean).join(" ");
						return /* @__PURE__ */ f("div", {
							ref: y ? q.cellRef(t) : void 0,
							role: "gridcell",
							className: [c, y ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
							"aria-current": i ? "date" : void 0,
							tabIndex: y ? q.isTabbable(t) ? 0 : -1 : void 0,
							onFocus: y ? () => q.onCellFocus(t) : void 0,
							onClick: y ? () => y(t, a) : void 0,
							children: [/* @__PURE__ */ d("span", {
								className: l,
								"aria-label": H.format(t),
								children: t.getDate()
							}), /* @__PURE__ */ d("div", {
								className: "calendar-planner__cell-body",
								children: g ? g(t, a) : /* @__PURE__ */ f(u, { children: [o.map((t) => /* @__PURE__ */ d(e, {
									variant: t.variant ?? "neutral",
									children: t.label
								}, t.id)), s > 0 && /* @__PURE__ */ f("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (e) => {
										e.stopPropagation(), N({
											date: t,
											events: a
										}), v?.(t, a);
									},
									children: [
										"+",
										s,
										" más"
									]
								})] })
							})]
						}, t.toISOString());
					})
				}, n))]
			}),
			/* @__PURE__ */ d(t, {
				open: M !== null,
				onClose: P,
				title: M ? B.format(M.date) : void 0,
				children: /* @__PURE__ */ d("div", {
					className: "calendar-planner__modal-events",
					children: M?.events.map((t) => /* @__PURE__ */ d(e, {
						variant: t.variant ?? "neutral",
						children: t.label
					}, t.id))
				})
			})
		]
	});
}
//#endregion
export { h as CalendarPlanner };
