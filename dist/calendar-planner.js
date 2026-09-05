'use client';
import './calendar-planner.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Tag as t } from "./tag.js";
import { Modal as n } from "./modal.js";
import { c as r, i, l as a, n as o, o as s, r as c, s as l, t as u } from "./_shared/calendarGrid.js";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
import { useCallback as m, useId as h, useState as g } from "react";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function _({ events: _ = [], renderDay: v, maxItemsPerDay: y = 3, onMoreClick: b, showMoreDialog: x, onDayClick: S, month: C, defaultMonth: w, onMonthChange: T, navigable: E = !0, locale: D = "es-ES", previousMonthLabel: O = "Mes anterior", nextMonthLabel: k = "Mes siguiente", gridLabel: A, moreLabel: j = (e) => `+${e} más`, size: M = "md", className: N }) {
	let [P, F] = g(() => C ?? w ?? /* @__PURE__ */ new Date()), [I, L] = g(null), R = x ?? !b, z = m(() => L(null), []), B = C ?? P, V = m((e) => {
		F(e), T?.(e);
	}, [T]), H = /* @__PURE__ */ new Date(), U = M === "sm" ? "xs" : M === "lg" ? "md" : "sm", W = new Intl.DateTimeFormat(D, {
		month: "long",
		year: "numeric"
	}).format(B), G = new Intl.DateTimeFormat(D, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = new Intl.DateTimeFormat(D, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), q = c(D, "short"), J = u(o(B)), Y = r(B, -1), X = r(B, 1), Z = (e) => _.filter((t) => i(t.date, e)), Q = a({
		month: B,
		onMonthChange: V,
		onActivate: S ? (e) => S(e, Z(e)) : void 0
	}), $ = `${h()}-planner-title-${B.getFullYear()}-${B.getMonth()}`;
	return /* @__PURE__ */ p("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${M}`,
			N
		].filter(Boolean).join(" "),
		children: [
			s({
				block: "calendar-planner",
				title: W,
				titleId: $,
				navigable: E,
				previousLabel: O,
				nextLabel: k,
				onPrev: () => V(Y),
				onNext: () => V(X),
				chevronSize: U
			}),
			/* @__PURE__ */ p("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-label": A,
				"aria-labelledby": A ? void 0 : $,
				onKeyDown: S ? Q.onKeyDown : void 0,
				children: [l({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: q
				}), J.map((n, r) => /* @__PURE__ */ f("div", {
					role: "row",
					className: "calendar-planner__row",
					children: n.map(({ date: n, outside: r }) => {
						let a = i(n, H), o = Z(n), s = o.slice(0, y), c = o.length - s.length, l = [
							"calendar-planner__cell",
							r && "calendar-planner__cell--outside",
							a && "calendar-planner__cell--today"
						].filter(Boolean).join(" "), u = [
							"calendar-planner__day-number",
							a && "calendar-planner__day-number--today",
							r && "calendar-planner__day-number--outside"
						].filter(Boolean).join(" ");
						return /* @__PURE__ */ p("div", {
							ref: S ? Q.cellRef(n) : void 0,
							role: "gridcell",
							className: [l, S ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
							"aria-current": a ? "date" : void 0,
							tabIndex: S ? Q.isTabbable(n) ? 0 : -1 : void 0,
							onFocus: S ? () => Q.onCellFocus(n) : void 0,
							onClick: S ? () => S(n, o) : void 0,
							children: [/* @__PURE__ */ p("span", {
								className: u,
								children: [/* @__PURE__ */ f(e, { children: G.format(n) }), /* @__PURE__ */ f("span", {
									"aria-hidden": "true",
									children: n.getDate()
								})]
							}), /* @__PURE__ */ f("div", {
								className: "calendar-planner__cell-body",
								children: v ? v(n, o) : /* @__PURE__ */ p(d, { children: [s.map((e) => /* @__PURE__ */ f(t, {
									variant: e.variant ?? "neutral",
									children: e.label
								}, e.id)), c > 0 && /* @__PURE__ */ f("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (e) => {
										e.stopPropagation(), R && L({
											date: n,
											events: o
										}), b?.(n, o);
									},
									children: j(c)
								})] })
							})]
						}, n.toISOString());
					})
				}, r))]
			}),
			/* @__PURE__ */ f(n, {
				open: I !== null,
				onClose: z,
				title: I ? K.format(I.date) : void 0,
				children: /* @__PURE__ */ f("div", {
					className: "calendar-planner__modal-events",
					children: I?.events.map((e) => /* @__PURE__ */ f(t, {
						variant: e.variant ?? "neutral",
						children: e.label
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { _ as CalendarPlanner };
