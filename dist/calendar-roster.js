'use client';
import './calendar-roster.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import { PrevNextNav as n } from "./prev-next-nav.js";
import { c as r, i } from "./_shared/calendargrid.js";
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
function f({ rows: f, month: p, onMonthChange: m, hrefBuilder: h, linkComponent: g, renderCell: _, nameLabel: v = "Empleado", birthdayPrefix: y = "🎂 ", showLegend: b = !0, locale: x = "es-ES", legendItems: S = d, legendLabel: C = "Leyenda", previousMonthLabel: w, nextMonthLabel: T, className: E }) {
	let D = e("calendar"), O = /* @__PURE__ */ new Date(), k = l(p), A = r(p, -1), j = r(p, 1), M = new Intl.DateTimeFormat(x, {
		month: "long",
		year: "numeric"
	}).format(p), N = new Intl.DateTimeFormat(x, { weekday: "narrow" }), P = new Intl.DateTimeFormat(x, { weekday: "long" }), F = m ? (e) => (t) => {
		h && t.preventDefault(), m(e);
	} : void 0, I = `roster-title-${p.getFullYear()}-${p.getMonth()}`;
	return /* @__PURE__ */ s("div", {
		className: ["calendar-roster", E].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("div", {
				className: "calendar-roster__nav",
				children: /* @__PURE__ */ o(n, {
					label: M,
					labelId: I,
					prevHref: h?.(A),
					nextHref: h?.(j),
					prevOnClick: F?.(A),
					nextOnClick: F?.(j),
					prevLabel: D("previousMonth", w),
					nextLabel: D("nextMonth", T),
					linkComponent: g
				})
			}),
			/* @__PURE__ */ o("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ s("table", {
					className: "calendar-roster__table",
					"aria-labelledby": I,
					children: [/* @__PURE__ */ o("thead", { children: /* @__PURE__ */ s("tr", { children: [/* @__PURE__ */ o("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: v
					}), k.map((e) => {
						let t = i(e, O), n = [
							"calendar-roster__th-day",
							c(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), r = String(e.getDate()).padStart(2, "0"), a = N.format(e), l = P.format(e);
						return /* @__PURE__ */ s("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ o("div", {
								className: "calendar-roster__th-day-number",
								children: r
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
					}), k.map((n) => {
						let r = n.getDate(), l = e.cells[r] ?? null, d = c(n), f = i(n, O), p = l?.type === "holiday", m = l?.type === "non-working";
						return /* @__PURE__ */ o("td", {
							className: [
								"calendar-roster__cell",
								d && "calendar-roster__cell--weekend",
								p && "calendar-roster__cell--holiday",
								m && "calendar-roster__cell--non-working",
								f && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: _ ? _(r, n, l) : /* @__PURE__ */ s(a, { children: [l?.type === "schedule" && /* @__PURE__ */ o("span", {
								className: "calendar-roster__schedule",
								children: l.label
							}), l && l.type !== "schedule" && l.type !== "non-working" && /* @__PURE__ */ o(t, {
								variant: u[l.type],
								children: l.type === "birthday" ? `${y}${l.label}` : l.label
							})] })
						}, r);
					})] }, e.id)) })]
				})
			}),
			b && /* @__PURE__ */ o("div", {
				className: "calendar-roster__legend",
				role: "group",
				"aria-label": C,
				children: S.map(({ type: e, label: n }) => /* @__PURE__ */ o("span", {
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
