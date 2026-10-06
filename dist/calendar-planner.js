'use client';
import './calendar-planner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { Toggle as r } from "./toggle.js";
import { ToggleGroup as i } from "./toggle-group.js";
import { Modal as a } from "./modal.js";
import { a as o, c as s, d as c, f as ee, i as te, l, m as ne, n as re, o as ie, p as ae, r as u, s as oe, t as se, u as d } from "./_shared/calendargrid.js";
import { useCallback as f, useId as ce, useState as p } from "react";
import { Fragment as le, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function g(e) {
	return e.allDay === void 0 ? e.date.getHours() !== 0 || e.date.getMinutes() !== 0 : !e.allDay;
}
function ue(e) {
	return [...e].sort((e, t) => {
		let n = Number(g(e)) - Number(g(t));
		return n === 0 ? e.date.getTime() - t.date.getTime() : n;
	});
}
function _({ events: _ = [], renderDay: v, maxItemsPerDay: y = 3, onMoreClick: b, showMoreDialog: de, onDayClick: x, month: S, defaultMonth: C, onMonthChange: w, view: T, defaultView: fe, onViewChange: E, viewSwitcher: pe = !1, week: D, defaultWeek: me, onWeekChange: O, navigable: k = !0, locale: A = "es-ES", previousMonthLabel: he, nextMonthLabel: ge, previousWeekLabel: _e, nextWeekLabel: ve, monthViewLabel: ye, weekViewLabel: be, viewSwitcherLabel: xe, gridLabel: j, moreLabel: M, today: Se, size: N = "md", className: Ce }) {
	let P = ne(Se), [we, Te] = p(() => S ?? C ?? P), [Ee, De] = p(() => c(D ?? me ?? S ?? C ?? P)), [Oe, ke] = p(() => T ?? fe ?? "month"), [F, I] = p(null), Ae = de ?? !b, je = f(() => I(null), []), L = S ?? we, R = c(D ?? Ee), z = T ?? Oe, B = z === "week", V = f((e) => {
		Te(e), w?.(e);
	}, [w]), H = f((e) => {
		let t = c(e);
		De(t), O?.(t);
	}, [O]), Me = f((e) => {
		let t = u(R).some(({ date: e }) => ie(e, L));
		!t && e === "week" && H(new Date(L.getFullYear(), L.getMonth(), 1)), !t && e === "month" && V(new Date(R.getFullYear(), R.getMonth(), 1)), ke(e), E?.(e);
	}, [
		L,
		R,
		V,
		H,
		E
	]), U = e("calendar"), W = e("calendarPlanner"), Ne = N === "lg" ? "md" : "sm", Pe = new Intl.DateTimeFormat(A, {
		month: "long",
		year: "numeric"
	}), Fe = new Intl.DateTimeFormat(A, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), Ie = new Date(R.getFullYear(), R.getMonth(), R.getDate() + 6), Le = Fe.formatRange(R, Ie), Re = B ? Le : Pe.format(L), G = new Intl.DateTimeFormat(A, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ze = new Intl.DateTimeFormat(A, {
		hour: "2-digit",
		minute: "2-digit"
	}), Be = new Intl.DateTimeFormat(A, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = te(A, "short"), Ve = se(re(L)), q = u(R), He = l(L, -1), J = l(L, 1), Y = (e) => _.filter((t) => o(t.date, e)), Ue = ee({
		month: L,
		onMonthChange: V,
		today: P,
		onActivate: x ? (e) => x(e, Y(e)) : void 0
	}), We = ae({
		weekStart: R,
		onWeekChange: H,
		today: P,
		onActivate: x ? (e) => x(e, Y(e)) : void 0
	}), X = B ? We : Ue, Z = ce(), Q = B ? `${Z}-planner-title-week-${R.getFullYear()}-${R.getMonth()}-${R.getDate()}` : `${Z}-planner-title-${L.getFullYear()}-${L.getMonth()}`, Ge = [
		"calendar-planner",
		`calendar-planner--${N}`,
		B ? "calendar-planner--week" : "",
		Ce
	].filter(Boolean).join(" "), Ke = (e, t) => {
		if (v) return v(e, t);
		let r = B ? ue(t) : t, i = B ? r : r.slice(0, y), a = r.length - i.length;
		return /* @__PURE__ */ h(le, { children: [i.map((e) => B ? /* @__PURE__ */ h("div", {
			className: "calendar-planner__event",
			children: [g(e) && /* @__PURE__ */ m("span", {
				className: "calendar-planner__event-time",
				children: ze.format(e.date)
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
				n.stopPropagation(), Ae && I({
					date: e,
					events: t
				}), b?.(e, t);
			},
			children: W("more", M)(a)
		})] });
	}, $ = ({ date: e, outside: n }) => {
		let r = o(e, P), i = Y(e), a = [
			"calendar-planner__cell",
			B ? "calendar-planner__cell--week" : "",
			n && "calendar-planner__cell--outside",
			r && "calendar-planner__cell--today",
			x ? "calendar-planner__cell--clickable" : ""
		].filter(Boolean).join(" "), s = [
			"calendar-planner__day-number",
			r && "calendar-planner__day-number--today",
			n && "calendar-planner__day-number--outside"
		].filter(Boolean).join(" ");
		return /* @__PURE__ */ h("div", {
			ref: x ? X.cellRef(e) : void 0,
			role: "gridcell",
			className: a,
			"aria-current": r ? "date" : void 0,
			tabIndex: x ? X.isTabbable(e) ? 0 : -1 : void 0,
			onFocus: x ? () => X.onCellFocus(e) : void 0,
			onClick: x ? () => x(e, i) : void 0,
			children: [!B && /* @__PURE__ */ h("span", {
				className: s,
				children: [/* @__PURE__ */ m(t, { children: G.format(e) }), /* @__PURE__ */ m("span", {
					"aria-hidden": "true",
					children: e.getDate()
				})]
			}), /* @__PURE__ */ m("div", {
				className: "calendar-planner__cell-body",
				children: Ke(e, i)
			})]
		}, e.toISOString());
	};
	return /* @__PURE__ */ h("div", {
		className: Ge,
		children: [
			oe({
				block: "calendar-planner",
				title: Re,
				titleId: Q,
				navigable: k,
				previousLabel: k ? B ? W("previousWeek", _e) : U("previousMonth", he) : void 0,
				nextLabel: k ? B ? W("nextWeek", ve) : U("nextMonth", ge) : void 0,
				onPrev: () => B ? H(d(R, -1)) : V(He),
				onNext: () => B ? H(d(R, 1)) : V(J),
				chevronSize: Ne,
				children: pe ? /* @__PURE__ */ h(i, {
					className: "calendar-planner__views",
					"aria-label": W("viewSwitcher", xe),
					size: N,
					value: [z],
					onValueChange: (e) => {
						let t = e[0];
						t && Me(t);
					},
					children: [/* @__PURE__ */ m(r, {
						value: "month",
						children: W("monthView", ye)
					}), /* @__PURE__ */ m(r, {
						value: "week",
						children: W("weekView", be)
					})]
				}) : void 0
			}),
			/* @__PURE__ */ h("div", {
				className: ["calendar-planner__grid", B ? "calendar-planner__grid--week" : ""].filter(Boolean).join(" "),
				role: "grid",
				"aria-label": j,
				"aria-labelledby": j ? void 0 : Q,
				onKeyDown: x ? X.onKeyDown : void 0,
				children: [B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: q.map(({ date: e }, n) => {
						let r = o(e, P);
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
									title: K[n].long,
									children: K[n].short
								}),
								/* @__PURE__ */ m("span", {
									"aria-hidden": "true",
									className: ["calendar-planner__day-number", r && "calendar-planner__day-number--today"].filter(Boolean).join(" "),
									children: e.getDate()
								})
							]
						}, e.toISOString());
					})
				}) : s({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: K
				}), B ? /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: q.map((e) => $(e))
				}) : Ve.map((e, t) => /* @__PURE__ */ m("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map((e) => $(e))
				}, t))]
			}),
			/* @__PURE__ */ m(a, {
				open: F !== null,
				onClose: je,
				title: F ? Be.format(F.date) : void 0,
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
