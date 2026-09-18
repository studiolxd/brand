'use client';
import './calendar-planner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { Toggle as r } from "./toggle.js";
import { ToggleGroup as i } from "./toggle-group.js";
import { Modal as a } from "./modal.js";
import { a as o, c as s, d as c, f as ee, i as te, l, n as u, o as ne, p as re, r as d, s as ie, t as ae, u as f } from "./_shared/calendargrid.js";
import { useCallback as p, useId as oe, useState as m } from "react";
import { Fragment as se, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarPlanner/CalendarPlanner.tsx
function _(e) {
	return e.allDay === void 0 ? e.date.getHours() !== 0 || e.date.getMinutes() !== 0 : !e.allDay;
}
function ce(e) {
	return [...e].sort((e, t) => {
		let n = Number(_(e)) - Number(_(t));
		return n === 0 ? e.date.getTime() - t.date.getTime() : n;
	});
}
function v({ events: v = [], renderDay: y, maxItemsPerDay: le = 3, onMoreClick: b, showMoreDialog: x, onDayClick: S, month: C, defaultMonth: w, onMonthChange: T, view: E, defaultView: ue, onViewChange: D, viewSwitcher: de = !1, week: O, defaultWeek: fe, onWeekChange: k, navigable: A = !0, locale: j = "es-ES", previousMonthLabel: pe, nextMonthLabel: me, previousWeekLabel: he = "Semana anterior", nextWeekLabel: ge = "Semana siguiente", monthViewLabel: _e = "Mes", weekViewLabel: ve = "Semana", viewSwitcherLabel: ye = "Vista del calendario", gridLabel: M, moreLabel: N, size: P = "md", className: be }) {
	let [xe, Se] = m(() => C ?? w ?? /* @__PURE__ */ new Date()), [Ce, we] = m(() => c(O ?? fe ?? C ?? w ?? /* @__PURE__ */ new Date())), [Te, Ee] = m(() => E ?? ue ?? "month"), [F, I] = m(null), De = x ?? !b, Oe = p(() => I(null), []), L = C ?? xe, R = c(O ?? Ce), z = E ?? Te, B = z === "week", V = p((e) => {
		Se(e), T?.(e);
	}, [T]), H = p((e) => {
		let t = c(e);
		we(t), k?.(t);
	}, [k]), ke = p((e) => {
		let t = d(R).some(({ date: e }) => ne(e, L));
		!t && e === "week" && H(new Date(L.getFullYear(), L.getMonth(), 1)), !t && e === "month" && V(new Date(R.getFullYear(), R.getMonth(), 1)), Ee(e), D?.(e);
	}, [
		L,
		R,
		V,
		H,
		D
	]), U = e("calendar"), Ae = e("calendarPlanner"), W = /* @__PURE__ */ new Date(), je = P === "sm" ? "xs" : P === "lg" ? "md" : "sm", Me = new Intl.DateTimeFormat(j, {
		month: "long",
		year: "numeric"
	}), Ne = new Intl.DateTimeFormat(j, {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), Pe = new Date(R.getFullYear(), R.getMonth(), R.getDate() + 6), Fe = Ne.formatRange(R, Pe), Ie = B ? Fe : Me.format(L), G = new Intl.DateTimeFormat(j, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), Le = new Intl.DateTimeFormat(j, {
		hour: "2-digit",
		minute: "2-digit"
	}), Re = new Intl.DateTimeFormat(j, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), K = te(j, "short"), ze = ae(u(L)), q = d(R), J = l(L, -1), Be = l(L, 1), Y = (e) => v.filter((t) => o(t.date, e)), Ve = ee({
		month: L,
		onMonthChange: V,
		onActivate: S ? (e) => S(e, Y(e)) : void 0
	}), He = re({
		weekStart: R,
		onWeekChange: H,
		onActivate: S ? (e) => S(e, Y(e)) : void 0
	}), X = B ? He : Ve, Z = oe(), Q = B ? `${Z}-planner-title-week-${R.getFullYear()}-${R.getMonth()}-${R.getDate()}` : `${Z}-planner-title-${L.getFullYear()}-${L.getMonth()}`, Ue = [
		"calendar-planner",
		`calendar-planner--${P}`,
		B ? "calendar-planner--week" : "",
		be
	].filter(Boolean).join(" "), We = (e, t) => {
		if (y) return y(e, t);
		let r = B ? ce(t) : t, i = B ? r : r.slice(0, le), a = r.length - i.length;
		return /* @__PURE__ */ g(se, { children: [i.map((e) => B ? /* @__PURE__ */ g("div", {
			className: "calendar-planner__event",
			children: [_(e) && /* @__PURE__ */ h("span", {
				className: "calendar-planner__event-time",
				children: Le.format(e.date)
			}), /* @__PURE__ */ h(n, {
				variant: e.variant ?? "neutral",
				children: e.label
			})]
		}, e.id) : /* @__PURE__ */ h(n, {
			variant: e.variant ?? "neutral",
			children: e.label
		}, e.id)), a > 0 && /* @__PURE__ */ h("button", {
			type: "button",
			className: "calendar-planner__more",
			onClick: (n) => {
				n.stopPropagation(), De && I({
					date: e,
					events: t
				}), b?.(e, t);
			},
			children: Ae("more", N)(a)
		})] });
	}, $ = ({ date: e, outside: n }) => {
		let r = o(e, W), i = Y(e), a = [
			"calendar-planner__cell",
			B ? "calendar-planner__cell--week" : "",
			n && "calendar-planner__cell--outside",
			r && "calendar-planner__cell--today",
			S ? "calendar-planner__cell--clickable" : ""
		].filter(Boolean).join(" "), s = [
			"calendar-planner__day-number",
			r && "calendar-planner__day-number--today",
			n && "calendar-planner__day-number--outside"
		].filter(Boolean).join(" ");
		return /* @__PURE__ */ g("div", {
			ref: S ? X.cellRef(e) : void 0,
			role: "gridcell",
			className: a,
			"aria-current": r ? "date" : void 0,
			tabIndex: S ? X.isTabbable(e) ? 0 : -1 : void 0,
			onFocus: S ? () => X.onCellFocus(e) : void 0,
			onClick: S ? () => S(e, i) : void 0,
			children: [!B && /* @__PURE__ */ g("span", {
				className: s,
				children: [/* @__PURE__ */ h(t, { children: G.format(e) }), /* @__PURE__ */ h("span", {
					"aria-hidden": "true",
					children: e.getDate()
				})]
			}), /* @__PURE__ */ h("div", {
				className: "calendar-planner__cell-body",
				children: We(e, i)
			})]
		}, e.toISOString());
	};
	return /* @__PURE__ */ g("div", {
		className: Ue,
		children: [
			ie({
				block: "calendar-planner",
				title: Ie,
				titleId: Q,
				navigable: A,
				previousLabel: A ? B ? he : U("previousMonth", pe) : void 0,
				nextLabel: A ? B ? ge : U("nextMonth", me) : void 0,
				onPrev: () => B ? H(f(R, -1)) : V(J),
				onNext: () => B ? H(f(R, 1)) : V(Be),
				chevronSize: je,
				children: de ? /* @__PURE__ */ g(i, {
					className: "calendar-planner__views",
					"aria-label": ye,
					size: P,
					value: [z],
					onValueChange: (e) => {
						let t = e[0];
						t && ke(t);
					},
					children: [/* @__PURE__ */ h(r, {
						value: "month",
						children: _e
					}), /* @__PURE__ */ h(r, {
						value: "week",
						children: ve
					})]
				}) : void 0
			}),
			/* @__PURE__ */ g("div", {
				className: ["calendar-planner__grid", B ? "calendar-planner__grid--week" : ""].filter(Boolean).join(" "),
				role: "grid",
				"aria-label": M,
				"aria-labelledby": M ? void 0 : Q,
				onKeyDown: S ? X.onKeyDown : void 0,
				children: [B ? /* @__PURE__ */ h("div", {
					role: "row",
					className: "calendar-planner__row calendar-planner__row--header",
					children: q.map(({ date: e }, t) => {
						let n = o(e, W);
						return /* @__PURE__ */ g("div", {
							role: "columnheader",
							className: [
								"calendar-planner__weekday",
								"calendar-planner__weekday--dated",
								n && "calendar-planner__weekday--today"
							].filter(Boolean).join(" "),
							"aria-label": G.format(e),
							"aria-current": n ? "date" : void 0,
							children: [/* @__PURE__ */ h("abbr", {
								"aria-hidden": "true",
								title: K[t].long,
								children: K[t].short
							}), /* @__PURE__ */ h("span", {
								"aria-hidden": "true",
								className: ["calendar-planner__day-number", n && "calendar-planner__day-number--today"].filter(Boolean).join(" "),
								children: e.getDate()
							})]
						}, e.toISOString());
					})
				}) : s({
					block: "calendar-planner",
					rowModifier: "header",
					weekdays: K
				}), B ? /* @__PURE__ */ h("div", {
					role: "row",
					className: "calendar-planner__row",
					children: q.map((e) => $(e))
				}) : ze.map((e, t) => /* @__PURE__ */ h("div", {
					role: "row",
					className: "calendar-planner__row",
					children: e.map((e) => $(e))
				}, t))]
			}),
			/* @__PURE__ */ h(a, {
				open: F !== null,
				onClose: Oe,
				title: F ? Re.format(F.date) : void 0,
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
export { v as CalendarPlanner };
