'use client';
import './calendar-roster.css';
import { Tag as e } from "./tag.js";
import { PrevNextNav as t } from "./prev-next-nav.js";
import { c as n, i as r } from "./_shared/calendarGrid.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function s(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function c(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var l = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, u = [
	{
		type: "holiday",
		label: "Festivo"
	},
	{
		type: "vacation",
		label: "Vacaciones"
	},
	{
		type: "absence",
		label: "Ausencia"
	},
	{
		type: "recovery",
		label: "Recuperación"
	},
	{
		type: "birthday",
		label: "Cumpleaños"
	},
	{
		type: "non-working",
		label: "No laborable"
	}
];
function d({ rows: d, month: f, onMonthChange: p, hrefBuilder: m, linkComponent: h, renderCell: g, nameLabel: _ = "Empleado", birthdayPrefix: v = "🎂 ", showLegend: y = !0, locale: b = "es-ES", legendItems: x = u, legendLabel: S = "Leyenda", previousMonthLabel: C = "Mes anterior", nextMonthLabel: w = "Mes siguiente", className: T }) {
	let E = /* @__PURE__ */ new Date(), D = c(f), O = n(f, -1), k = n(f, 1), A = new Intl.DateTimeFormat(b, {
		month: "long",
		year: "numeric"
	}).format(f), j = new Intl.DateTimeFormat(b, { weekday: "narrow" }), M = new Intl.DateTimeFormat(b, { weekday: "long" }), N = p ? (e) => (t) => {
		m && t.preventDefault(), p(e);
	} : void 0, P = `roster-title-${f.getFullYear()}-${f.getMonth()}`;
	return /* @__PURE__ */ o("div", {
		className: ["calendar-roster", T].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ a(t, {
					label: A,
					labelId: P,
					prevHref: m?.(O),
					nextHref: m?.(k),
					prevOnClick: N?.(O),
					nextOnClick: N?.(k),
					prevLabel: C,
					nextLabel: w,
					linkComponent: h
				})
			}),
			/* @__PURE__ */ a("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ o("table", {
					className: "calendar-roster__table",
					"aria-labelledby": P,
					children: [/* @__PURE__ */ a("thead", { children: /* @__PURE__ */ o("tr", { children: [/* @__PURE__ */ a("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: _
					}), D.map((e) => {
						let t = r(e, E), n = [
							"calendar-roster__th-day",
							s(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), i = String(e.getDate()).padStart(2, "0"), c = j.format(e), l = M.format(e);
						return /* @__PURE__ */ o("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ a("div", {
								className: "calendar-roster__th-day-number",
								children: i
							}), /* @__PURE__ */ a("div", {
								className: "calendar-roster__th-day-sub",
								children: /* @__PURE__ */ a("abbr", {
									title: l,
									children: c
								})
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ a("tbody", { children: d.map((t) => /* @__PURE__ */ o("tr", { children: [/* @__PURE__ */ a("th", {
						scope: "row",
						className: "calendar-roster__th-name-row",
						title: t.name,
						children: t.name
					}), D.map((n) => {
						let c = n.getDate(), u = t.cells[c] ?? null, d = s(n), f = r(n, E), p = u?.type === "holiday", m = u?.type === "non-working";
						return /* @__PURE__ */ a("td", {
							className: [
								"calendar-roster__cell",
								d && "calendar-roster__cell--weekend",
								p && "calendar-roster__cell--holiday",
								m && "calendar-roster__cell--non-working",
								f && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: g ? g(c, n, u) : /* @__PURE__ */ o(i, { children: [u?.type === "schedule" && /* @__PURE__ */ a("span", {
								className: "calendar-roster__schedule",
								children: u.label
							}), u && u.type !== "schedule" && u.type !== "non-working" && /* @__PURE__ */ a(e, {
								variant: l[u.type],
								children: u.type === "birthday" ? `${v}${u.label}` : u.label
							})] })
						}, c);
					})] }, t.id)) })]
				})
			}),
			y && /* @__PURE__ */ a("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": S,
				children: x.map(({ type: t, label: n }) => /* @__PURE__ */ a("span", {
					className: "calendar-roster__legend-item",
					children: t === "non-working" ? /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), n] }) : /* @__PURE__ */ a(e, {
						variant: l[t],
						children: n
					})
				}, t))
			})
		]
	});
}
//#endregion
export { d as CalendarRoster };
