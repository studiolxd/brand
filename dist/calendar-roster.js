'use client';
import './calendar-roster.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/CalendarRoster/CalendarRoster.tsx
function a(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function o(e) {
	let t = e.getDay();
	return t === 0 || t === 6;
}
function s(e) {
	let t = e.getFullYear(), n = e.getMonth(), r = new Date(t, n + 1, 0).getDate();
	return Array.from({ length: r }, (e, r) => new Date(t, n, r + 1));
}
var c = {
	holiday: "neutral",
	vacation: "info",
	absence: "danger",
	recovery: "success",
	birthday: "info"
}, l = [
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
function u({ rows: u, month: d, onMonthChange: f, hrefBuilder: p, linkComponent: m, renderCell: h, nameLabel: g = "Empleado", showLegend: _ = !0, locale: v = "es-ES", legendItems: y = l, legendLabel: b = "Leyenda", previousMonthLabel: x = "Mes anterior", nextMonthLabel: S = "Mes siguiente", className: C }) {
	let w = m ?? "a", T = /* @__PURE__ */ new Date(), E = s(d), D = new Date(d.getFullYear(), d.getMonth() - 1, 1), O = new Date(d.getFullYear(), d.getMonth() + 1, 1), k = new Intl.DateTimeFormat(v, {
		month: "long",
		year: "numeric"
	}).format(d), A = new Intl.DateTimeFormat(v, { weekday: "narrow" });
	function j(t, n) {
		let i = n === "prev" ? x : S, a = n === "prev" ? "calendar-roster__chevron--prev" : void 0;
		return p ? /* @__PURE__ */ r(w, {
			href: p(t),
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: f ? (e) => {
				e.preventDefault(), f(t);
			} : void 0,
			children: /* @__PURE__ */ r(e, {
				name: "chevron",
				size: "sm",
				className: a
			})
		}) : /* @__PURE__ */ r("button", {
			type: "button",
			className: "calendar-roster__nav-btn",
			"aria-label": i,
			onClick: () => f?.(t),
			children: /* @__PURE__ */ r(e, {
				name: "chevron",
				size: "sm",
				className: a
			})
		});
	}
	let M = `roster-title-${d.getFullYear()}-${d.getMonth()}`;
	return /* @__PURE__ */ i("div", {
		className: ["calendar-roster", C].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("div", {
				className: "calendar-roster__nav",
				children: [
					j(D, "prev"),
					/* @__PURE__ */ r("strong", {
						id: M,
						className: "calendar-roster__title",
						children: k
					}),
					j(O, "next")
				]
			}),
			/* @__PURE__ */ r("div", {
				className: "calendar-roster__wrap",
				children: /* @__PURE__ */ i("table", {
					className: "calendar-roster__table",
					"aria-labelledby": M,
					children: [/* @__PURE__ */ r("thead", { children: /* @__PURE__ */ i("tr", { children: [/* @__PURE__ */ r("th", {
						className: "calendar-roster__th-name",
						scope: "col",
						children: g
					}), E.map((e) => {
						let t = a(e, T), n = [
							"calendar-roster__th-day",
							o(e) && "calendar-roster__th-day--weekend",
							t && "calendar-roster__th-day--today"
						].filter(Boolean).join(" "), s = String(e.getDate()).padStart(2, "0"), c = A.format(e);
						return /* @__PURE__ */ i("th", {
							className: n,
							scope: "col",
							children: [/* @__PURE__ */ r("div", {
								className: "calendar-roster__th-day-number",
								children: s
							}), /* @__PURE__ */ r("div", {
								className: "calendar-roster__th-day-sub",
								children: c
							})]
						}, e.getDate());
					})] }) }), /* @__PURE__ */ r("tbody", { children: u.map((e) => /* @__PURE__ */ i("tr", { children: [/* @__PURE__ */ r("td", {
						className: "calendar-roster__td-name",
						title: e.name,
						children: e.name
					}), E.map((s) => {
						let l = s.getDate(), u = e.cells[l] ?? null, d = o(s), f = a(s, T), p = u?.type === "holiday", m = u?.type === "non-working";
						return /* @__PURE__ */ r("td", {
							className: [
								"calendar-roster__cell",
								d && "calendar-roster__cell--weekend",
								p && "calendar-roster__cell--holiday",
								m && "calendar-roster__cell--non-working",
								f && "calendar-roster__cell--today"
							].filter(Boolean).join(" "),
							children: h ? h(l, s, u) : /* @__PURE__ */ i(n, { children: [u?.type === "schedule" && /* @__PURE__ */ r("span", {
								className: "calendar-roster__schedule",
								children: u.label
							}), u && u.type !== "schedule" && u.type !== "non-working" && /* @__PURE__ */ r(t, {
								variant: c[u.type],
								children: u.type === "birthday" ? `🎂 ${u.label}` : u.label
							})] })
						}, l);
					})] }, e.id)) })]
				})
			}),
			_ && /* @__PURE__ */ r("div", {
				className: "calendar-roster__legend",
				"aria-label": b,
				children: y.map(({ type: e, label: a }) => /* @__PURE__ */ r("span", {
					className: "calendar-roster__legend-item",
					children: e === "non-working" ? /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r("span", { className: "calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" }), a] }) : /* @__PURE__ */ r(t, {
						variant: c[e],
						children: a
					})
				}, e))
			})
		]
	});
}
//#endregion
export { u as CalendarRoster };
