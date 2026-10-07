'use client';
import './calendar-roster.css';
import { n as e } from "./_shared/env.js";
import { n as t } from "./_shared/brandmessagescontext.js";
import { Tag as n } from "./tag.js";
import { n as r } from "./_shared/default-render-link.js";
import { t as i } from "./_shared/prevnextnav.js";
import { t as a } from "./_shared/overflow-focusable.js";
import { h as o, o as s, t as c, u as l } from "./_shared/calendar.js";
import { useId as u, useRef as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/messages/es/calendarRoster.ts
var h = {
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
function g(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function _(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var v = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, y = [
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
function b({ rows: b, month: x, onMonthChange: S, hrefBuilder: C, renderLink: w, linkComponent: T, renderCell: E, nameLabel: D, birthdayPrefix: O = "🎂 ", showLegend: k = !0, locale: A = "es-ES", legendItems: j, legendLabel: M, previousMonthLabel: N, nextMonthLabel: P, today: F, className: I }) {
	T !== void 0 && e("CalendarRoster", "linkComponent", "`renderLink`");
	let L = t("calendar", c), R = t("calendarRoster", h), z = j ?? (k ? y.map(({ type: e, key: t }) => ({
		type: e,
		label: R(t)
	})) : []), B = o(F), V = _(x), H = l(x, -1), U = l(x, 1), W = new Intl.DateTimeFormat(A, {
		month: "long",
		year: "numeric"
	}).format(x), G = new Intl.DateTimeFormat(A, { weekday: "narrow" }), K = new Intl.DateTimeFormat(A, { weekday: "long" }), q = S ? (e) => (t) => {
		C && t.preventDefault(), S(e);
	} : void 0, J = u(), Y = d(null), X = a(Y);
	return /* @__PURE__ */ m("div", {
		className: ["calendar-roster", I].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ p("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ p(i, {
					label: W,
					labelId: J,
					prevHref: C?.(H),
					nextHref: C?.(U),
					prevOnClick: q?.(H),
					nextOnClick: q?.(U),
					prevLabel: L("previousMonth", N),
					nextLabel: L("nextMonth", P),
					renderLink: w ?? (T ? r(T) : void 0)
				})
			}),
			/* @__PURE__ */ p("div", {
				ref: Y,
				className: "calendar-roster__wrap",
				...X && {
					tabIndex: 0,
					role: "region",
					"aria-labelledby": J
				},
				children: /* @__PURE__ */ m("table", {
					className: "calendar-roster__table",
					"aria-labelledby": J,
					children: [/* @__PURE__ */ p("thead", { children: /* @__PURE__ */ m("tr", { children: [/* @__PURE__ */ p("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: R("name", D)
					}), V.map((e) => {
						let t = s(e, B), n = [
							"calendar-roster__th-day",
							g(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), r = String(e.getDate()).padStart(2, "0"), i = G.format(e), a = K.format(e);
						return /* @__PURE__ */ m("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ p("div", {
								className: "calendar-roster__th-day-number",
								children: r
							}), /* @__PURE__ */ p("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ p("abbr", {
									title: a,
									children: i
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ p("tbody", { children: b.map((e) => /* @__PURE__ */ m("tr", { children: [/* @__PURE__ */ p("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: e.name,
						children: e.name
					}), V.map((t) => {
						let r = t.getDate(), i = e.cells[r] ?? null, a = g(t), o = s(t, B), c = i?.type === "holiday", l = i?.type === "non-working";
						return /* @__PURE__ */ p("td", {
							className: [
								"calendar-roster__cell",
								a && "calendar-roster__cell--weekend",
								c && "calendar-roster__cell--holiday",
								l && "calendar-roster__cell--non-working",
								o && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: E ? E(r, t, i) : /* @__PURE__ */ m(f, { children: [i?.type === "schedule" && /* @__PURE__ */ p("span", {
								className: "calendar-roster__schedule",
								children: i.label
							}), i && i.type !== "schedule" && i.type !== "non-working" && /* @__PURE__ */ p(n, {
								variant: v[i.type],
								children: i.type === "birthday" ? `${O}${i.label}` : i.label
							})] })
						}, r);
					})] }, e.id)) })]
				})
			}),
			k && /* @__PURE__ */ p("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": R("legend", M),
				children: z.map(({ type: e, label: t }) => /* @__PURE__ */ p("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), t] }) : /* @__PURE__ */ p(n, {
						variant: v[e],
						children: t
					})
				}, e))
			})
		]
	});
}
//#endregion
export { b as CalendarRoster };
