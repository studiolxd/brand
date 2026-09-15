'use client';
import './calendar-planner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { Modal as r } from "./modal.js";
import { c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./_shared/calendargrid.js";
import { useCallback as f, useId as ee, useState as p } from "react";
import { Fragment as te, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function g({ events: g = [], renderDay: _, maxItemsPerDay: v = 3, onMoreClick: y, showMoreDialog: b, onDayClick: x, month: S, defaultMonth: C, onMonthChange: w, navigable: T = !0, locale: E = "es-ES", previousMonthLabel: D, nextMonthLabel: O, gridLabel: k, moreLabel: ne, size: A = "md", className: j }) {
	let [M, N] = p(() => S ?? C ?? /* @__PURE__ */ new Date()), [P, F] = p(null), I = b ?? !y, L = f(() => F(null), []), R = S ?? M, z = f((e) => {
		N(e), w?.(e);
	}, [w]), B = e("calendar"), V = e("calendarPlanner"), H = /* @__PURE__ */ new Date(), U = A === "sm" ? "xs" : A === "lg" ? "md" : "sm", W = new Intl.DateTimeFormat(E, {
		month: "long",
		year: "numeric"
	}).format(R), G = new Intl.DateTimeFormat(E, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = new Intl.DateTimeFormat(E, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), q = l(E, "short"), J = d(s(R)), Y = i(R, -1), X = i(R, 1), Z = (e) => g.filter((t) => a(t.date, e)), Q = o({
		month: R,
		onMonthChange: z,
		onActivate: x ? (e) => x(e, Z(e)) : void 0
	}), $ = `${ee()}-planner-title-${R.getFullYear()}-${R.getMonth()}`;
	return /* @__PURE__ */ h("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${A}`,
			j
		].filter(Boolean).join(" "),
		children: [
			c({
				block: "calendar-planner",
				title: W,
				titleId: $,
				navigable: T,
				previousLabel: T ? B("previousMonth", D) : void 0,
				nextLabel: T ? B("nextMonth", O) : void 0,
				onPrev: () => z(Y),
				onNext: () => z(X),
				chevronSize: U
			}),
			/* @__PURE__ */ h("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-label": k,
				"aria-labelledby": k ? void 0 : $,
				onKeyDown: x ? Q.onKeyDown : void 0,
				children: [u({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: q
				}), J.map((e, r) => /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map(({ date: e, outside: r }) => {
						let i = a(e, H), o = Z(e), s = o.slice(0, v), c = o.length - s.length, l = [
							"calendar-planner__cell",
							r && "calendar-planner__cell--outside",
							i && "calendar-planner__cell--today"
						].filter(Boolean).join(" "), u = [
							"calendar-planner__day-number",
							i && "calendar-planner__day-number--today",
							r && "calendar-planner__day-number--outside"
						].filter(Boolean).join(" ");
						return /* @__PURE__ */ h("div", {
							ref: x ? Q.cellRef(e) : void 0,
							role: "gridcell",
							className: [l, x ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
							"aria-current": i ? "date" : void 0,
							tabIndex: x ? Q.isTabbable(e) ? 0 : -1 : void 0,
							onFocus: x ? () => Q.onCellFocus(e) : void 0,
							onClick: x ? () => x(e, o) : void 0,
							children: [/* @__PURE__ */ h("span", {
								className: u,
								children: [/* @__PURE__ */ m(t, { children: G.format(e) }), /* @__PURE__ */ m("span", {
									"aria-hidden": "true",
									children: e.getDate()
								})]
							}), /* @__PURE__ */ m("div", {
								className: "calendar-planner__cell-body",
								children: _ ? _(e, o) : /* @__PURE__ */ h(te, { children: [s.map((e) => /* @__PURE__ */ m(n, {
									variant: e.variant ?? "neutral",
									children: e.label
								}, e.id)), c > 0 && /* @__PURE__ */ m("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (t) => {
										t.stopPropagation(), I && F({
											date: e,
											events: o
										}), y?.(e, o);
									},
									children: V("more", ne)(c)
								})] })
							})]
						}, e.toISOString());
					})
				}, r))]
			}),
			/* @__PURE__ */ m(r, {
				open: P !== null,
				onClose: L,
				title: P ? K.format(P.date) : void 0,
				children: /* @__PURE__ */ m("div", {
					className: "calendar-planner__modal-events",
					children: P?.events.map((e) => /* @__PURE__ */ m(n, {
						variant: e.variant ?? "neutral",
						children: e.label
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { g as CalendarPlanner };
