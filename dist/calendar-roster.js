'use client';
import './calendar-roster.css';
import { Chevron as e } from "./chevron.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function i(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function a(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function o(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var s = [
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
function c({ rows: c, month: l, onMonthChange: u, hrefBuilder: d, linkComponent: f, renderCell: p, nameLabel: m = "Empleado", showLegend: h = !0, locale: g = "es-ES", className: _ }) {
	let v = f ?? "a", y = /* @__PURE__ */ new Date(), b = o(l), x = new Date(l.getFullYear(), l.getMonth() - 1, 1), S = new Date(l.getFullYear(), l.getMonth() + 1, 1), C = new Intl.DateTimeFormat(g, {
		month: "long",
		year: "numeric"
	}).format(l), w = new Intl.DateTimeFormat(g, { weekday: "narrow" });
	function T(t, r) {
		let i = r === "prev" ? "Mes anterior" : "Mes siguiente", a = r === "prev" ? "calendar-roster__chevron--prev" : void 0;
		return d ? /* @__PURE__ */ n(v, {
			href: d(t),
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: u ? (e) => {
				e.preventDefault(), u(t);
			} : void 0,
			children: /* @__PURE__ */ n(e, {
				size: "sm",
				className: a
			})
		}) : /* @__PURE__ */ n("button", {
			type: "button",
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: () => u?.(t),
			children: /* @__PURE__ */ n(e, {
				size: "sm",
				className: a
			})
		});
	}
	let E = `roster-title-${l.getFullYear()}-${l.getMonth()}`;
	return /* @__PURE__ */ r("div", {
		className: ["calendar-roster", _].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r("div", {
				className: "calendar-roster__nav",
				children: [
					T(x, "prev"),
					/* @__PURE__ */ n("strong", {
						id: E,
						className: "calendar-roster__title",
						children: C
					}),
					T(S, "next")
				]
			}),
			/* @__PURE__ */ n("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ r("table", {
					className: "calendar-roster__table",
					"aria-labelledby": E,
					children: [/* @__PURE__ */ n("thead", { children: /* @__PURE__ */ r("tr", { children: [/* @__PURE__ */ n("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: m
					}), b.map((e) => {
						let t = i(e, y), o = [
							"calendar-roster__th-day",
							a(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), s = String(e.getDate()).padStart(2, "0"), c = w.format(e);
						return /* @__PURE__ */ r("th", {
							className: o,
							scope: "col",
							children: [/* @__PURE__ */ n("div", {
								className: "calendar-roster__th-day-number",
								children: s
							}), /* @__PURE__ */ n("div", {
								className: "calendar-roster__th-day-sub",
								children: c
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ n("tbody", { children: c.map((e) => /* @__PURE__ */ r("tr", { children: [/* @__PURE__ */ n("td", {
						className: "calendar-roster__td-name",
						title: e.name,
						children: e.name
					}), b.map((o) => {
						let s = o.getDate(), c = e.cells[s] ?? null, l = a(o), u = i(o, y), d = c?.type === "holiday", f = c?.type === "non-working";
						return /* @__PURE__ */ n("td", {
							className: [
								"calendar-roster__cell",
								l && "calendar-roster__cell--weekend",
								d && "calendar-roster__cell--holiday",
								f && "calendar-roster__cell--non-working",
								u && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: p ? p(s, o, c) : /* @__PURE__ */ r(t, { children: [c?.type === "schedule" && /* @__PURE__ */ n("span", {
								className: "calendar-roster__schedule",
								children: c.label
							}), c && c.type !== "schedule" && c.type !== "non-working" && /* @__PURE__ */ n("span", {
								className: `calendar-roster__chip calendar-roster__chip--${c.type}`,
								title: c.label,
								children: c.type === "birthday" ? `🎂 ${c.label}` : c.label
							})] })
						}, s);
					})] }, e.id)) })]
				})
			}),
			h && /* @__PURE__ */ n("div", {
				className: "calendar-roster__legend",
				"aria-label": "Leyenda",
				children: s.map(({ type: e, label: t }) => /* @__PURE__ */ r("span", {
					className: "calendar-roster__legend-item",
					children: [/* @__PURE__ */ n("span", { className: `calendar-roster__legend-swatch calendar-roster__legend-swatch--${e}` }), t]
				}, e))
			})
		]
	});
}
//#endregion
export { c as CalendarRoster };
