'use client';
import './calendar-roster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import { PrevNextNav as n } from "./prev-next-nav.js";
import { t as r } from "./_shared/overflow-focusable.js";
import { a as i, l as a, m as o } from "./_shared/calendargrid.js";
import { useId as s, useRef as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function f(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function p(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var m = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, h = [
	{
		type: "holiday",
		key: "holiday"
	},
	{
		type: "vacation",
		key: "vacation"
	},
	{
		type: "absence",
		key: "absence"
	},
	{
		type: "recovery",
		key: "recovery"
	},
	{
		type: "birthday",
		key: "birthday"
	},
	{
		type: "non-working",
		key: "nonWorking"
	}
];
function g({ rows: g, month: _, onMonthChange: v, hrefBuilder: y, linkComponent: b, renderCell: x, nameLabel: S, birthdayPrefix: C = "🎂 ", showLegend: w = !0, locale: T = "es-ES", legendItems: E, legendLabel: D, previousMonthLabel: O, nextMonthLabel: k, today: A, className: j }) {
	let M = e("calendar"), N = e("calendarRoster"), P = E ?? (w ? h.map(({ type: e, key: t }) => ({
		type: e,
		label: N(t)
	})) : []), F = o(A), I = p(_), L = a(_, -1), R = a(_, 1), z = new Intl.DateTimeFormat(T, {
		month: "long",
		year: "numeric"
	}).format(_), B = new Intl.DateTimeFormat(T, { weekday: "narrow" }), V = new Intl.DateTimeFormat(T, { weekday: "long" }), H = v ? (e) => (t) => {
		y && t.preventDefault(), v(e);
	} : void 0, U = s(), W = c(null), G = r(W);
	return /* @__PURE__ */ d("div", {
		className: ["calendar-roster", j].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ u("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ u(n, {
					label: z,
					labelId: U,
					prevHref: y?.(L),
					nextHref: y?.(R),
					prevOnClick: H?.(L),
					nextOnClick: H?.(R),
					prevLabel: M("previousMonth", O),
					nextLabel: M("nextMonth", k),
					linkComponent: b
				})
			}),
			/* @__PURE__ */ u("div", {
				ref: W,
				className: "calendar-roster__wrap",
				...G && {
					tabIndex: 0,
					role: "region",
					"aria-labelledby": U
				},
				children: /* @__PURE__ */ d("table", {
					className: "calendar-roster__table",
					"aria-labelledby": U,
					children: [/* @__PURE__ */ u("thead", { children: /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: N("name", S)
					}), I.map((e) => {
						let t = i(e, F), n = [
							"calendar-roster__th-day",
							f(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), r = String(e.getDate()).padStart(2, "0"), a = B.format(e), o = V.format(e);
						return /* @__PURE__ */ d("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ u("div", {
								className: "calendar-roster__th-day-number",
								children: r
							}), /* @__PURE__ */ u("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ u("abbr", {
									title: o,
									children: a
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ u("tbody", { children: g.map((e) => /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: e.name,
						children: e.name
					}), I.map((n) => {
						let r = n.getDate(), a = e.cells[r] ?? null, o = f(n), s = i(n, F), c = a?.type === "holiday", p = a?.type === "non-working";
						return /* @__PURE__ */ u("td", {
							className: [
								"calendar-roster__cell",
								o && "calendar-roster__cell--weekend",
								c && "calendar-roster__cell--holiday",
								p && "calendar-roster__cell--non-working",
								s && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: x ? x(r, n, a) : /* @__PURE__ */ d(l, { children: [a?.type === "schedule" && /* @__PURE__ */ u("span", {
								className: "calendar-roster__schedule",
								children: a.label
							}), a && a.type !== "schedule" && a.type !== "non-working" && /* @__PURE__ */ u(t, {
								variant: m[a.type],
								children: a.type === "birthday" ? `${C}${a.label}` : a.label
							})] })
						}, r);
					})] }, e.id)) })]
				})
			}),
			w && /* @__PURE__ */ u("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": N("legend", D),
				children: P.map(({ type: e, label: n }) => /* @__PURE__ */ u("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), n] }) : /* @__PURE__ */ u(t, {
						variant: m[e],
						children: n
					})
				}, e))
			})
		]
	});
}
//#endregion
export { g as CalendarRoster };
