'use client';
import './calendar-roster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import { PrevNextNav as n } from "./prev-next-nav.js";
import { a as r, l as i, m as a } from "./_shared/calendargrid.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function l(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function u(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var d = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, f = [
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
function p({ rows: p, month: m, onMonthChange: h, hrefBuilder: g, linkComponent: _, renderCell: v, nameLabel: y, birthdayPrefix: b = "🎂 ", showLegend: x = !0, locale: S = "es-ES", legendItems: C, legendLabel: w, previousMonthLabel: T, nextMonthLabel: E, today: D, className: O }) {
	let k = e("calendar"), A = e("calendarRoster"), j = C ?? (x ? f.map(({ type: e, key: t }) => ({
		type: e,
		label: A(t)
	})) : []), M = a(D), N = u(m), P = i(m, -1), F = i(m, 1), I = new Intl.DateTimeFormat(S, {
		month: "long",
		year: "numeric"
	}).format(m), L = new Intl.DateTimeFormat(S, { weekday: "narrow" }), R = new Intl.DateTimeFormat(S, { weekday: "long" }), z = h ? (e) => (t) => {
		g && t.preventDefault(), h(e);
	} : void 0, B = `roster-title-${m.getFullYear()}-${m.getMonth()}`;
	return /* @__PURE__ */ c("div", {
		className: ["calendar-roster", O].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ s(n, {
					label: I,
					labelId: B,
					prevHref: g?.(P),
					nextHref: g?.(F),
					prevOnClick: z?.(P),
					nextOnClick: z?.(F),
					prevLabel: k("previousMonth", T),
					nextLabel: k("nextMonth", E),
					linkComponent: _
				})
			}),
			/* @__PURE__ */ s("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ c("table", {
					className: "calendar-roster__table",
					"aria-labelledby": B,
					children: [/* @__PURE__ */ s("thead", { children: /* @__PURE__ */ c("tr", { children: [/* @__PURE__ */ s("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: A("name", y)
					}), N.map((e) => {
						let t = r(e, M), n = [
							"calendar-roster__th-day",
							l(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), i = String(e.getDate()).padStart(2, "0"), a = L.format(e), o = R.format(e);
						return /* @__PURE__ */ c("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ s("div", {
								className: "calendar-roster__th-day-number",
								children: i
							}), /* @__PURE__ */ s("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ s("abbr", {
									title: o,
									children: a
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ s("tbody", { children: p.map((e) => /* @__PURE__ */ c("tr", { children: [/* @__PURE__ */ s("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: e.name,
						children: e.name
					}), N.map((n) => {
						let i = n.getDate(), a = e.cells[i] ?? null, u = l(n), f = r(n, M), p = a?.type === "holiday", m = a?.type === "non-working";
						return /* @__PURE__ */ s("td", {
							className: [
								"calendar-roster__cell",
								u && "calendar-roster__cell--weekend",
								p && "calendar-roster__cell--holiday",
								m && "calendar-roster__cell--non-working",
								f && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: v ? v(i, n, a) : /* @__PURE__ */ c(o, { children: [a?.type === "schedule" && /* @__PURE__ */ s("span", {
								className: "calendar-roster__schedule",
								children: a.label
							}), a && a.type !== "schedule" && a.type !== "non-working" && /* @__PURE__ */ s(t, {
								variant: d[a.type],
								children: a.type === "birthday" ? `${b}${a.label}` : a.label
							})] })
						}, i);
					})] }, e.id)) })]
				})
			}),
			x && /* @__PURE__ */ s("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": A("legend", w),
				children: j.map(({ type: e, label: n }) => /* @__PURE__ */ s("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), n] }) : /* @__PURE__ */ s(t, {
						variant: d[e],
						children: n
					})
				}, e))
			})
		]
	});
}
//#endregion
export { p as CalendarRoster };
