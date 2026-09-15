'use client';
import './calendar-planner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { Modal as r } from "./modal.js";
import { c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./_shared/calendargrid.js";
import { useCallback as f, useId as ee, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function _({ events: _ = [], renderDay: v, maxItemsPerDay: y = 3, onMoreClick: b, showMoreDialog: x, onDayClick: S, month: C, defaultMonth: w, onMonthChange: T, navigable: E = !0, locale: D = "es-ES", previousMonthLabel: O, nextMonthLabel: k, gridLabel: A, moreLabel: te = (e) => `+${e} más`, size: j = "md", className: M }) {
	let [N, P] = p(() => C ?? w ?? /* @__PURE__ */ new Date()), [F, I] = p(null), L = x ?? !b, R = f(() => I(null), []), z = C ?? N, B = f((e) => {
		P(e), T?.(e);
	}, [T]), V = e("calendar"), H = /* @__PURE__ */ new Date(), U = j === "sm" ? "xs" : j === "lg" ? "md" : "sm", W = new Intl.DateTimeFormat(D, {
		month: "long",
		year: "numeric"
	}).format(z), G = new Intl.DateTimeFormat(D, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = new Intl.DateTimeFormat(D, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), q = l(D, "short"), J = d(s(z)), Y = i(z, -1), X = i(z, 1), Z = (e) => _.filter((t) => a(t.date, e)), Q = o({
		month: z,
		onMonthChange: B,
		onActivate: S ? (e) => S(e, Z(e)) : void 0
	}), $ = `${ee()}-planner-title-${z.getFullYear()}-${z.getMonth()}`;
	return /* @__PURE__ */ g("div", {
		className: [
			"calendar-planner",
			`calendar-planner--${j}`,
			M
		].filter(Boolean).join(" "),
		children: [
			c({
				block: "calendar-planner",
				title: W,
				titleId: $,
				navigable: E,
				previousLabel: E ? V("previousMonth", O) : void 0,
				nextLabel: E ? V("nextMonth", k) : void 0,
				onPrev: () => B(Y),
				onNext: () => B(X),
				chevronSize: U
			}),
			/* @__PURE__ */ g("div", {
				className: "calendar-planner__grid",
				role: "grid",
				"aria-label": A,
				"aria-labelledby": A ? void 0 : $,
				onKeyDown: S ? Q.onKeyDown : void 0,
				children: [u({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: q
				}), J.map((e, r) => /* @__PURE__ */ h("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map(({ date: e, outside: r }) => {
						let i = a(e, H), o = Z(e), s = o.slice(0, y), c = o.length - s.length, l = [
							"calendar-planner__cell",
							r && "calendar-planner__cell--outside",
							i && "calendar-planner__cell--today"
						].filter(Boolean).join(" "), u = [
							"calendar-planner__day-number",
							i && "calendar-planner__day-number--today",
							r && "calendar-planner__day-number--outside"
						].filter(Boolean).join(" ");
						return /* @__PURE__ */ g("div", {
							ref: S ? Q.cellRef(e) : void 0,
							role: "gridcell",
							className: [l, S ? "calendar-planner__cell--clickable" : ""].filter(Boolean).join(" "),
							"aria-current": i ? "date" : void 0,
							tabIndex: S ? Q.isTabbable(e) ? 0 : -1 : void 0,
							onFocus: S ? () => Q.onCellFocus(e) : void 0,
							onClick: S ? () => S(e, o) : void 0,
							children: [/* @__PURE__ */ g("span", {
								className: u,
								children: [/* @__PURE__ */ h(t, { children: G.format(e) }), /* @__PURE__ */ h("span", {
									"aria-hidden": "true",
									children: e.getDate()
								})]
							}), /* @__PURE__ */ h("div", {
								className: "calendar-planner__cell-body",
								children: v ? v(e, o) : /* @__PURE__ */ g(m, { children: [s.map((e) => /* @__PURE__ */ h(n, {
									variant: e.variant ?? "neutral",
									children: e.label
								}, e.id)), c > 0 && /* @__PURE__ */ h("button", {
									type: "button",
									className: "calendar-planner__more",
									onClick: (t) => {
										t.stopPropagation(), L && I({
											date: e,
											events: o
										}), b?.(e, o);
									},
									children: te(c)
								})] })
							})]
						}, e.toISOString());
					})
				}, r))]
			}),
			/* @__PURE__ */ h(r, {
				open: F !== null,
				onClose: R,
				title: F ? K.format(F.date) : void 0,
				children: /* @__PURE__ */ h("div", {
					className: "calendar-planner__modal-events",
					children: F?.events.map((e) => /* @__PURE__ */ h(n, {
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
