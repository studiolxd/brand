'use client';
import './calendar-roster.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import { t as n } from "./_shared/prevnextnav.js";
import { t as r } from "./_shared/overflow-focusable.js";
import { h as i, o as a, t as o, u as s } from "./_shared/calendar.js";
import { useId as c, useRef as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/messages/es/calendarRoster.ts
var p = {
	name: "Empleado",
	legend: "Leyenda",
	holiday: "Festivo",
	vacation: "Vacaciones",
	absence: "Ausencia",
	recovery: "Recuperación",
	birthday: "Cumpleaños",
	nonWorking: "No laborable"
};
//#endregion
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function m(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function h(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var g = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, _ = [
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
function v({ rows: v, month: y, onMonthChange: b, hrefBuilder: x, linkComponent: S, renderCell: C, nameLabel: w, birthdayPrefix: T = "🎂 ", showLegend: E = !0, locale: D = "es-ES", legendItems: O, legendLabel: k, previousMonthLabel: A, nextMonthLabel: j, today: M, className: N }) {
	let P = e("calendar", o), F = e("calendarRoster", p), I = O ?? (E ? _.map(({ type: e, key: t }) => ({
		type: e,
		label: F(t)
	})) : []), L = i(M), R = h(y), z = s(y, -1), B = s(y, 1), V = new Intl.DateTimeFormat(D, {
		month: "long",
		year: "numeric"
	}).format(y), H = new Intl.DateTimeFormat(D, { weekday: "narrow" }), U = new Intl.DateTimeFormat(D, { weekday: "long" }), W = b ? (e) => (t) => {
		x && t.preventDefault(), b(e);
	} : void 0, G = c(), K = l(null), q = r(K);
	return /* @__PURE__ */ f("div", {
		className: ["calendar-roster", N].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ d(n, {
					label: V,
					labelId: G,
					prevHref: x?.(z),
					nextHref: x?.(B),
					prevOnClick: W?.(z),
					nextOnClick: W?.(B),
					prevLabel: P("previousMonth", A),
					nextLabel: P("nextMonth", j),
					linkComponent: S
				})
			}),
			/* @__PURE__ */ d("div", {
				ref: K,
				className: "calendar-roster__wrap",
				...q && {
					tabIndex: 0,
					role: "region",
					"aria-labelledby": G
				},
				children: /* @__PURE__ */ f("table", {
					className: "calendar-roster__table",
					"aria-labelledby": G,
					children: [/* @__PURE__ */ d("thead", { children: /* @__PURE__ */ f("tr", { children: [/* @__PURE__ */ d("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: F("name", w)
					}), R.map((e) => {
						let t = a(e, L), n = [
							"calendar-roster__th-day",
							m(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), r = String(e.getDate()).padStart(2, "0"), i = H.format(e), o = U.format(e);
						return /* @__PURE__ */ f("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ d("div", {
								className: "calendar-roster__th-day-number",
								children: r
							}), /* @__PURE__ */ d("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ d("abbr", {
									title: o,
									children: i
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ d("tbody", { children: v.map((e) => /* @__PURE__ */ f("tr", { children: [/* @__PURE__ */ d("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: e.name,
						children: e.name
					}), R.map((n) => {
						let r = n.getDate(), i = e.cells[r] ?? null, o = m(n), s = a(n, L), c = i?.type === "holiday", l = i?.type === "non-working";
						return /* @__PURE__ */ d("td", {
							className: [
								"calendar-roster__cell",
								o && "calendar-roster__cell--weekend",
								c && "calendar-roster__cell--holiday",
								l && "calendar-roster__cell--non-working",
								s && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: C ? C(r, n, i) : /* @__PURE__ */ f(u, { children: [i?.type === "schedule" && /* @__PURE__ */ d("span", {
								className: "calendar-roster__schedule",
								children: i.label
							}), i && i.type !== "schedule" && i.type !== "non-working" && /* @__PURE__ */ d(t, {
								variant: g[i.type],
								children: i.type === "birthday" ? `${T}${i.label}` : i.label
							})] })
						}, r);
					})] }, e.id)) })]
				})
			}),
			E && /* @__PURE__ */ d("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": F("legend", k),
				children: I.map(({ type: e, label: n }) => /* @__PURE__ */ d("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), n] }) : /* @__PURE__ */ d(t, {
						variant: g[e],
						children: n
					})
				}, e))
			})
		]
	});
}
//#endregion
export { v as CalendarRoster };
