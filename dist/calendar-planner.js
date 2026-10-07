'use client';
import './calendar-planner.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { Toggle as r } from "./toggle.js";
import { ToggleGroup as i } from "./toggle-group.js";
import { t as a } from "./_shared/modal.js";
import { a as o, c as ee, d as s, f as c, h as te, i as l, l as ne, m as re, n as ie, o as u, p as ae, r as oe, s as se, t as ce, u as d } from "./_shared/calendar.js";
import { useCallback as f, useId as le, useState as p } from "react";
import { Fragment as ue, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/messages/es/calendarPlanner.ts
var de = {
	more: (e) => `+${e} más`,
	previousWeek: "Semana anterior",
	nextWeek: "Semana siguiente",
	monthView: "Mes",
	weekView: "Semana",
	viewSwitcher: "Vista del calendario"
};
//#endregion
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function g(e) {
	return e.allDay === void 0 ? e.date.getHours() !== 0 || e.date.getMinutes() !== 0 : !e.allDay;
}
function fe(e) {
	return [...e].sort((e, t) => {
		let n = Number(g(e)) - Number(g(t));
		return n === 0 ? e.date.getTime() - t.date.getTime() : n;
	});
}
function _({ events: _ = [], renderDay: v, maxItemsPerDay: pe = 3, onMoreClick: y, showMoreDialog: me, onDayClick: b, month: x, defaultMonth: S, onMonthChange: C, view: w, defaultView: he, onViewChange: T, viewSwitcher: ge = !1, week: E, defaultWeek: _e, onWeekChange: D, navigable: O = !0, locale: k = "es-ES", previousMonthLabel: ve, nextMonthLabel: ye, previousWeekLabel: be, nextWeekLabel: xe, monthViewLabel: Se, weekViewLabel: A, viewSwitcherLabel: j, gridLabel: M, moreLabel: Ce, today: we, size: N = "md", className: Te }) {
	let P = te(we), [Ee, De] = p(() => x ?? S ?? P), [Oe, ke] = p(() => c(E ?? _e ?? x ?? S ?? P)), [Ae, je] = p(() => w ?? he ?? "month"), [F, I] = p(null), Me = me ?? !y, Ne = f(() => I(null), []), L = x ?? Ee, R = c(E ?? Oe), z = w ?? Ae, B = z === "week", V = f((e) => {
		De(e), C?.(e);
	}, [C]), H = f((e) => {
		let t = c(e);
		ke(t), D?.(t);
	}, [D]), Pe = f((e) => {
		let t = l(R).some(({ date: e }) => se(e, L));
		!t && e === "week" && H(new Date(L.getFullYear(), L.getMonth(), 1)), !t && e === "month" && V(new Date(R.getFullYear(), R.getMonth(), 1)), je(e), T?.(e);
	}, [
		L,
		R,
		V,
		H,
		T
	]), U = e("calendar", ce), W = e("calendarPlanner", de), Fe = N === "lg" ? "md" : "sm", Ie = new Intl.DateTimeFormat(k, {
		month: "long",
		year: "numeric"
	}), Le = new Intl.DateTimeFormat(k, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), Re = new Date(R.getFullYear(), R.getMonth(), R.getDate() + 6), ze = Le.formatRange(R, Re), Be = B ? ze : Ie.format(L), G = new Intl.DateTimeFormat(k, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), Ve = new Intl.DateTimeFormat(k, {
		hour: "2-digit",
		minute: "2-digit"
	}), K = new Intl.DateTimeFormat(k, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), q = o(k, "short"), He = ie(oe(L)), J = l(R), Ue = d(L, -1), We = d(L, 1), Y = (e) => _.filter((t) => u(t.date, e)), Ge = ae({
		month: L,
		onMonthChange: V,
		today: P,
		onActivate: b ? (e) => b(e, Y(e)) : void 0
	}), Ke = re({
		weekStart: R,
		onWeekChange: H,
		today: P,
		onActivate: b ? (e) => b(e, Y(e)) : void 0
	}), X = B ? Ke : Ge, Z = le(), Q = B ? `${Z}-planner-title-week-${R.getFullYear()}-${R.getMonth()}-${R.getDate()}` : `${Z}-planner-title-${L.getFullYear()}-${L.getMonth()}`, qe = [
		"calendar-planner",
		`calendar-planner--${N}`,
		B ? "calendar-planner--week" : "",
		Te
	].filter(Boolean).join(" "), Je = (e, t) => {
		if (v) return v(e, t);
		let r = B ? fe(t) : t, i = B ? r : r.slice(0, pe), a = r.length - i.length;
		return /* @__PURE__ */ h(ue, { children: [i.map((e) => B ? /* @__PURE__ */ h("div", {
			className: "calendar-planner__event",
			children: [g(e) && /* @__PURE__ */ m("span", {
				className: "calendar-planner__event-time",
				children: Ve.format(e.date)
			}), /* @__PURE__ */ m(n, {
				variant: e.variant ?? "neutral",
				children: e.label
			})]
		}, e.id) : /* @__PURE__ */ m(n, {
			variant: e.variant ?? "neutral",
			children: e.label
		}, e.id)), a > 0 && /* @__PURE__ */ m("button", {
			type: "button",
			className: "calendar-planner__more",
			onClick: (n) => {
				n.stopPropagation(), Me && I({
					date: e,
					events: t
				}), y?.(e, t);
			},
			children: W("more", Ce)(a)
		})] });
	}, $ = ({ date: e, outside: n }) => {
		let r = u(e, P), i = Y(e), a = [
			"calendar-planner__cell",
			B ? "calendar-planner__cell--week" : "",
			n && "calendar-planner__cell--outside",
			r && "calendar-planner__cell--today",
			b ? "calendar-planner__cell--clickable" : ""
		].filter(Boolean).join(" "), o = [
			"calendar-planner__day-number",
			r && "calendar-planner__day-number--today",
			n && "calendar-planner__day-number--outside"
		].filter(Boolean).join(" ");
		return /* @__PURE__ */ h("div", {
			ref: b ? X.cellRef(e) : void 0,
			role: "gridcell",
			className: a,
			"aria-current": r ? "date" : void 0,
			tabIndex: b ? X.isTabbable(e) ? 0 : -1 : void 0,
			onFocus: b ? () => X.onCellFocus(e) : void 0,
			onClick: b ? () => b(e, i) : void 0,
			children: [!B && /* @__PURE__ */ h("span", {
				className: o,
				children: [/* @__PURE__ */ m(t, { children: G.format(e) }), /* @__PURE__ */ m("span", {
					"aria-hidden": "true",
					children: e.getDate()
				})]
			}), /* @__PURE__ */ m("div", {
				className: "calendar-planner__cell-body",
				children: Je(e, i)
			})]
		}, e.toISOString());
	};
	return /* @__PURE__ */ h("div", {
		className: qe,
		children: [
			ee({
				block: "calendar-planner",
				title: Be,
				titleId: Q,
				navigable: O,
				previousLabel: O ? B ? W("previousWeek", be) : U("previousMonth", ve) : void 0,
				nextLabel: O ? B ? W("nextWeek", xe) : U("nextMonth", ye) : void 0,
				onPrev: () => B ? H(s(R, -1)) : V(Ue),
				onNext: () => B ? H(s(R, 1)) : V(We),
				chevronSize: Fe,
				children: ge ? /* @__PURE__ */ h(i, {
					className: "calendar-planner__views",
					"aria-label": W("viewSwitcher", j),
					size: N,
					value: [z],
					onValueChange: (e) => {
						let t = e[0];
						t && Pe(t);
					},
					children: [/* @__PURE__ */ m(r, {
						value: "month",
						children: W("monthView", Se)
					}), /* @__PURE__ */ m(r, {
						value: "week",
						children: W("weekView", A)
					})]
				}) : void 0
			}),
			/* @__PURE__ */ h("div", {
				className: ["calendar-planner__grid", B ? "calendar-planner__grid--week" : ""].filter(Boolean).join(" "),
				role: "grid",
				"aria-label": M,
				"aria-labelledby": M ? void 0 : Q,
				onKeyDown: b ? X.onKeyDown : void 0,
				children: [B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: J.map(({ date: e }, n) => {
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
								/* @__PURE__ */ m(t, { children: G.format(e) }),
								/* @__PURE__ */ m("abbr", {
									"aria-hidden": "true",
									title: q[n].long,
									children: q[n].short
								}),
								/* @__PURE__ */ m("span", {
									"aria-hidden": "true",
									className: ["calendar-planner__day-number", r && "calendar-planner__day-number--today"].filter(Boolean).join(" "),
									children: e.getDate()
								})
							]
						}, e.toISOString());
					})
				}) : ne({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: q
				}), B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: J.map((e) => $(e))
				}) : He.map((e, t) => /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map((e) => $(e))
				}, t))]
			}),
			/* @__PURE__ */ m(a, {
				open: F !== null,
				onOpenChange: (e) => {
					e || Ne();
				},
				title: F ? K.format(F.date) : void 0,
				children: /* @__PURE__ */ m("div", {
					className: "calendar-planner__modal-events",
					children: F?.events.map((e) => /* @__PURE__ */ m(n, {
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
