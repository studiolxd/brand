'use client';
import './calendar-roster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import { PrevNextNav as n } from "./prev-next-nav.js";
import { a as r, l as i } from "./_shared/calendargrid.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function c(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function l(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var u = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, d = [
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
function f({ rows: f, month: p, onMonthChange: m, hrefBuilder: h, linkComponent: g, renderCell: _, nameLabel: v, birthdayPrefix: y = "🎂 ", showLegend: b = !0, locale: x = "es-ES", legendItems: S, legendLabel: C, previousMonthLabel: w, nextMonthLabel: T, className: E }) {
	let D = e("calendar"), O = e("calendarRoster"), k = S ?? (b ? d.map(({ type: e, key: t }) => ({
		type: e,
		label: O(t)
	})) : []), A = /* @__PURE__ */ new Date(), j = l(p), M = i(p, -1), N = i(p, 1), P = new Intl.DateTimeFormat(x, {
		month: "long",
		year: "numeric"
	}).format(p), F = new Intl.DateTimeFormat(x, { weekday: "narrow" }), I = new Intl.DateTimeFormat(x, { weekday: "long" }), L = m ? (e) => (t) => {
		h && t.preventDefault(), m(e);
	} : void 0, R = `roster-title-${p.getFullYear()}-${p.getMonth()}`;
	return /* @__PURE__ */ s("div", {
		className: ["calendar-roster", E].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ o(n, {
					label: P,
					labelId: R,
					prevHref: h?.(M),
					nextHref: h?.(N),
					prevOnClick: L?.(M),
					nextOnClick: L?.(N),
					prevLabel: D("previousMonth", w),
					nextLabel: D("nextMonth", T),
					linkComponent: g
				})
			}),
			/* @__PURE__ */ o("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ s("table", {
					className: "calendar-roster__table",
					"aria-labelledby": R,
					children: [/* @__PURE__ */ o("thead", { children: /* @__PURE__ */ s("tr", { children: [/* @__PURE__ */ o("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: O("name", v)
					}), j.map((e) => {
						let t = r(e, A), n = [
							"calendar-roster__th-day",
							c(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), i = String(e.getDate()).padStart(2, "0"), a = F.format(e), l = I.format(e);
						return /* @__PURE__ */ s("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ o("div", {
								className: "calendar-roster__th-day-number",
								children: i
							}), /* @__PURE__ */ o("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ o("abbr", {
									title: l,
									children: a
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ o("tbody", { children: f.map((e) => /* @__PURE__ */ s("tr", { children: [/* @__PURE__ */ o("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: e.name,
						children: e.name
					}), j.map((n) => {
						let i = n.getDate(), l = e.cells[i] ?? null, d = c(n), f = r(n, A), p = l?.type === "holiday", m = l?.type === "non-working";
						return /* @__PURE__ */ o("td", {
							className: [
								"calendar-roster__cell",
								d && "calendar-roster__cell--weekend",
								p && "calendar-roster__cell--holiday",
								m && "calendar-roster__cell--non-working",
								f && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: _ ? _(i, n, l) : /* @__PURE__ */ s(a, { children: [l?.type === "schedule" && /* @__PURE__ */ o("span", {
								className: "calendar-roster__schedule",
								children: l.label
							}), l && l.type !== "schedule" && l.type !== "non-working" && /* @__PURE__ */ o(t, {
								variant: u[l.type],
								children: l.type === "birthday" ? `${y}${l.label}` : l.label
							})] })
						}, i);
					})] }, e.id)) })]
				})
			}),
			b && /* @__PURE__ */ o("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": O("legend", C),
				children: k.map(({ type: e, label: n }) => /* @__PURE__ */ o("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), n] }) : /* @__PURE__ */ o(t, {
						variant: u[e],
						children: n
					})
				}, e))
			})
		]
	});
}
//#endregion
export { f as CalendarRoster };
