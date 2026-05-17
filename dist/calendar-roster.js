'use client';
import './calendar-roster.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function r(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function i(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function a(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var o = [
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
	}
];
function s({ rows: s, month: c, onMonthChange: l, hrefBuilder: u, linkComponent: d, nameLabel: f = "Empleado", showLegend: p = !0, locale: m = "es-ES", className: h }) {
	let g = d ?? "a", _ = /* @__PURE__ */ new Date(), v = a(c), y = new Date(c.getFullYear(), c.getMonth() - 1, 1), b = new Date(c.getFullYear(), c.getMonth() + 1, 1), x = new Intl.DateTimeFormat(m, {
		month: "long",
		year: "numeric"
	}).format(c), S = new Intl.DateTimeFormat(m, { weekday: "narrow" });
	function C(n, r) {
		let i = r === "prev" ? "Mes anterior" : "Mes siguiente", a = r === "prev" ? "calendar-roster__chevron--prev" : void 0;
		return u ? /* @__PURE__ */ t(g, {
			href: u(n),
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: l ? (e) => {
				e.preventDefault(), l(n);
			} : void 0,
			children: /* @__PURE__ */ t(e, {
				size: "sm",
				className: a
			})
		}) : /* @__PURE__ */ t("button", {
			type: "button",
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: () => l?.(n),
			children: /* @__PURE__ */ t(e, {
				size: "sm",
				className: a
			})
		});
	}
	let w = `roster-title-${c.getFullYear()}-${c.getMonth()}`;
	return /* @__PURE__ */ n("div", {
		className: ["calendar-roster", h].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n("div", {
				className: "calendar-roster__nav",
				children: [
					C(y, "prev"),
					/* @__PURE__ */ t("strong", {
						id: w,
						className: "calendar-roster__title",
						children: x
					}),
					C(b, "next")
				]
			}),
			/* @__PURE__ */ t("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ n("table", {
					className: "calendar-roster__table",
					"aria-labelledby": w,
					children: [/* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [/* @__PURE__ */ t("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: f
					}), v.map((e) => {
						let a = r(e, _), o = [
							"calendar-roster__th-day",
							i(e) && "calendar-roster__th-day--weekend",
							a && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), s = String(e.getDate()).padStart(2, "0"), c = S.format(e);
						return /* @__PURE__ */ n("th", {
							className: o,
							scope: "col",
							children: [/* @__PURE__ */ t("div", {
								className: "calendar-roster__th-day-number",
								children: s
							}), /* @__PURE__ */ t("div", {
								className: "calendar-roster__th-day-sub",
								children: c
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ t("tbody", { children: s.map((e) => /* @__PURE__ */ n("tr", { children: [/* @__PURE__ */ t("td", {
						className: "calendar-roster__td-name",
						title: e.name,
						children: e.name
					}), v.map((a) => {
						let o = a.getDate(), s = e.cells[o] ?? null, c = i(a), l = r(a, _), u = s?.type === "holiday";
						return /* @__PURE__ */ n("td", {
							className: [
								"calendar-roster__cell",
								c && "calendar-roster__cell--weekend",
								u && "calendar-roster__cell--holiday",
								l && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: [s?.type === "schedule" && /* @__PURE__ */ t("span", {
								className: "calendar-roster__schedule",
								children: s.label
							}), s && s.type !== "schedule" && /* @__PURE__ */ t("span", {
								className: `calendar-roster__chip calendar-roster__chip--${s.type}`,
								title: s.label,
								children: s.type === "birthday" ? `🎂 ${s.label}` : s.label
							})]
						}, o);
					})] }, e.id)) })]
				})
			}),
			p && /* @__PURE__ */ t("div", {
				className: "calendar-roster__legend",
				"aria-label": "Leyenda",
				children: o.map(({ type: e, label: r }) => /* @__PURE__ */ n("span", {
					className: "calendar-roster__legend-item",
					children: [/* @__PURE__ */ t("span", { className: `calendar-roster__legend-swatch calendar-roster__legend-swatch--${e}` }), r]
				}, e))
			})
		]
	});
}
//#endregion
export { s as CalendarRoster };
