'use client';
import './calendar-planner.css';
import { n as e } from "./_shared/env.js";
import { r as t } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Tag as r } from "./tag.js";
import { Toggle as i } from "./toggle.js";
import { ToggleGroup as a } from "./toggle-group.js";
import { t as o } from "./_shared/modal.js";
import { a as ee, c as te, d as s, f as c, h as ne, i as l, l as re, m as ie, n as ae, o as u, p as oe, r as se, s as ce, t as le, u as d } from "./_shared/calendar.js";
import { useCallback as f, useId as ue, useState as p } from "react";
import { Fragment as de, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/messages/es/calendarPlanner.ts
var fe = {
	more: (e) => `+${e} más`,
	previousWeek: "Semana anterior",
	nextWeek: "Semana siguiente",
	monthView: "Mes",
	weekView: "Semana",
	viewSwitcher: "Vista del calendario"
};
//#endregion
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function g(t) {
	t.variant !== void 0 && e("CalendarPlanner", "events[].variant", "`events[].tone`");
	let n = t.tone ?? t.variant ?? "neutral";
	return n === "danger" ? "error" : n;
}
function _(e) {
	return e.allDay === void 0 ? e.date.getHours() !== 0 || e.date.getMinutes() !== 0 : !e.allDay;
}
function pe(e) {
	return [...e].sort((e, t) => {
		let n = Number(_(e)) - Number(_(t));
		return n === 0 ? e.date.getTime() - t.date.getTime() : n;
	});
}
function v({ events: e = [], renderDay: v, maxItemsPerDay: me = 3, onMoreClick: y, showMoreDialog: he, onDayClick: b, month: x, defaultMonth: S, onMonthChange: C, view: w, defaultView: ge, onViewChange: T, viewSwitcher: _e = !1, week: E, defaultWeek: ve, onWeekChange: D, navigable: O = !0, locale: k = "es-ES", previousMonthLabel: ye, nextMonthLabel: be, previousWeekLabel: xe, nextWeekLabel: Se, monthViewLabel: A, weekViewLabel: j, viewSwitcherLabel: Ce, gridLabel: M, moreLabel: we, today: Te, size: N = "md", className: Ee }) {
	let P = ne(Te), [De, Oe] = p(() => x ?? S ?? P), [ke, Ae] = p(() => c(E ?? ve ?? x ?? S ?? P)), [je, Me] = p(() => w ?? ge ?? "month"), [F, I] = p(null), Ne = he ?? !y, Pe = f(() => I(null), []), L = x ?? De, R = c(E ?? ke), z = w ?? je, B = z === "week", V = f((e) => {
		Oe(e), C?.(e);
	}, [C]), H = f((e) => {
		let t = c(e);
		Ae(t), D?.(t);
	}, [D]), Fe = f((e) => {
		let t = l(R).some(({ date: e }) => ce(e, L));
		!t && e === "week" && H(new Date(L.getFullYear(), L.getMonth(), 1)), !t && e === "month" && V(new Date(R.getFullYear(), R.getMonth(), 1)), Me(e), T?.(e);
	}, [
		L,
		R,
		V,
		H,
		T
	]), U = t("calendar", le), W = t("calendarPlanner", fe), Ie = N === "lg" ? "md" : "sm", Le = new Intl.DateTimeFormat(k, {
		month: "long",
		year: "numeric"
	}), Re = new Intl.DateTimeFormat(k, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ze = new Date(R.getFullYear(), R.getMonth(), R.getDate() + 6), Be = Re.formatRange(R, ze), Ve = B ? Be : Le.format(L), G = new Intl.DateTimeFormat(k, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), He = new Intl.DateTimeFormat(k, {
		hour: "2-digit",
		minute: "2-digit"
	}), Ue = new Intl.DateTimeFormat(k, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = ee(k, "short"), We = ae(se(L)), q = l(R), Ge = d(L, -1), Ke = d(L, 1), J = (t) => e.filter((e) => u(e.date, t)), qe = oe({
		month: L,
		onMonthChange: V,
		today: P,
		onActivate: b ? (e) => b(e, J(e)) : void 0
	}), Je = ie({
		weekStart: R,
		onWeekChange: H,
		today: P,
		onActivate: b ? (e) => b(e, J(e)) : void 0
	}), Y = B ? Je : qe, X = ue(), Z = B ? `${X}-planner-title-week-${R.getFullYear()}-${R.getMonth()}-${R.getDate()}` : `${X}-planner-title-${L.getFullYear()}-${L.getMonth()}`, Ye = [
		"calendar-planner",
		`calendar-planner--${N}`,
		B ? "calendar-planner--week" : "",
		Ee
	].filter(Boolean).join(" "), Q = (e, t) => {
		if (v) return v(e, t);
		let n = B ? pe(t) : t, i = B ? n : n.slice(0, me), a = n.length - i.length;
		return /* @__PURE__ */ h(de, { children: [i.map((e) => B ? /* @__PURE__ */ h("div", {
			className: "calendar-planner__event",
			children: [_(e) && /* @__PURE__ */ m("span", {
				className: "calendar-planner__event-time",
				children: He.format(e.date)
			}), /* @__PURE__ */ m(r, {
				tone: g(e),
				children: e.label
			})]
		}, e.id) : /* @__PURE__ */ m(r, {
			tone: g(e),
			children: e.label
		}, e.id)), a > 0 && /* @__PURE__ */ m("button", {
			type: "button",
			className: "calendar-planner__more",
			onClick: (n) => {
				n.stopPropagation(), Ne && I({
					date: e,
					events: t
				}), y?.(e, t);
			},
			children: W("more", we)(a)
		})] });
	}, $ = ({ date: e, outside: t }) => {
		let r = u(e, P), i = J(e), a = [
			"calendar-planner__cell",
			B ? "calendar-planner__cell--week" : "",
			t && "calendar-planner__cell--outside",
			r && "calendar-planner__cell--today",
			b ? "calendar-planner__cell--clickable" : ""
		].filter(Boolean).join(" "), o = [
			"calendar-planner__day-number",
			r && "calendar-planner__day-number--today",
			t && "calendar-planner__day-number--outside"
		].filter(Boolean).join(" ");
		return /* @__PURE__ */ h("div", {
			ref: b ? Y.cellRef(e) : void 0,
			role: "gridcell",
			className: a,
			"aria-current": r ? "date" : void 0,
			tabIndex: b ? Y.isTabbable(e) ? 0 : -1 : void 0,
			onFocus: b ? () => Y.onCellFocus(e) : void 0,
			onClick: b ? () => b(e, i) : void 0,
			children: [!B && /* @__PURE__ */ h("span", {
				className: o,
				children: [/* @__PURE__ */ m(n, { children: G.format(e) }), /* @__PURE__ */ m("span", {
					"aria-hidden": "true",
					children: e.getDate()
				})]
			}), /* @__PURE__ */ m("div", {
				className: "calendar-planner__cell-body",
				children: Q(e, i)
			})]
		}, e.toISOString());
	};
	return /* @__PURE__ */ h("div", {
		className: Ye,
		children: [
			te({
				block: "calendar-planner",
				title: Ve,
				titleId: Z,
				navigable: O,
				previousLabel: O ? B ? W("previousWeek", xe) : U("previousMonth", ye) : void 0,
				nextLabel: O ? B ? W("nextWeek", Se) : U("nextMonth", be) : void 0,
				onPrev: () => B ? H(s(R, -1)) : V(Ge),
				onNext: () => B ? H(s(R, 1)) : V(Ke),
				chevronSize: Ie,
				children: _e ? /* @__PURE__ */ h(a, {
					className: "calendar-planner__views",
					"aria-label": W("viewSwitcher", Ce),
					size: N,
					value: [z],
					onValueChange: (e) => {
						let t = e[0];
						t && Fe(t);
					},
					children: [/* @__PURE__ */ m(i, {
						value: "month",
						children: W("monthView", A)
					}), /* @__PURE__ */ m(i, {
						value: "week",
						children: W("weekView", j)
					})]
				}) : void 0
			}),
			/* @__PURE__ */ h("div", {
				className: ["calendar-planner__grid", B ? "calendar-planner__grid--week" : ""].filter(Boolean).join(" "),
				role: "grid",
				"aria-label": M,
				"aria-labelledby": M ? void 0 : Z,
				onKeyDown: b ? Y.onKeyDown : void 0,
				children: [B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: q.map(({ date: e }, t) => {
						let r = u(e, P);
						return /* @__PURE__ */ h("div", {
							role: "columnheader",
							className: [
								"calendar-planner__weekday",
								"calendar-planner__weekday--dated",
								r && "calendar-planner__weekday--today"
							].filter(Boolean).join(" "),
							"aria-current": r ? "date" : void 0,
							children: [
								/* @__PURE__ */ m(n, { children: G.format(e) }),
								/* @__PURE__ */ m("abbr", {
									"aria-hidden": "true",
									title: K[t].long,
									children: K[t].short
								}),
								/* @__PURE__ */ m("span", {
									"aria-hidden": "true",
									className: ["calendar-planner__day-number", r && "calendar-planner__day-number--today"].filter(Boolean).join(" "),
									children: e.getDate()
								})
							]
						}, e.toISOString());
					})
				}) : re({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: K
				}), B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: q.map((e) => $(e))
				}) : We.map((e, t) => /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map((e) => $(e))
				}, t))]
			}),
			/* @__PURE__ */ m(o, {
				open: F !== null,
				onOpenChange: (e) => {
					e || Pe();
				},
				title: F ? Ue.format(F.date) : void 0,
				children: /* @__PURE__ */ m("div", {
					className: "calendar-planner__modal-events",
					children: F?.events.map((e) => /* @__PURE__ */ m(r, {
						tone: g(e),
						children: e.label
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { v as CalendarPlanner };
