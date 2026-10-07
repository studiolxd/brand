'use client';
import './planning-grid.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Spinner as n } from "./spinner.js";
import { Input as r } from "./input.js";
import { forwardRef as i, useId as a, useMemo as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/organisms/PlanningGrid/planningHours.ts
function d(e) {
	let t = e.trim().replace(",", ".");
	if (t === "") return 0;
	if (!/^\d*\.?\d*$/.test(t)) return null;
	let n = Number(t);
	return Number.isFinite(n) && n >= 0 ? n : null;
}
//#endregion
//#region src/stories/messages/es/planningGrid.ts
var f = {
	label: "Planificación",
	cellLabel: (e, t) => `Horas de ${e} en ${t}`,
	rowTotal: "Total",
	columnTotal: "Total",
	capacity: "Disponible",
	remaining: "Sin asignar",
	over: "sobreasignado",
	saving: "Guardando…"
}, p = (e, t) => `${e}\u0000${t}`, m = i(function({ rows: r, columns: i, cells: a, onCellChange: s, readOnly: c = !1, rowHeader: d, showRowTotals: m = !0, showColumnTotals: g = !0, showCapacity: _ = !1, showRemaining: v = !0, max: y = 999, locale: b = "es-ES", formatHours: x, size: S = "sm", label: C, cellLabel: w, savingLabel: T, className: E, ...D }, O) {
	let k = e("planningGrid", f), A = o(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of a) e.set(p(t.rowId, t.columnKey), t);
		return e;
	}, [a]), j = o(() => new Intl.NumberFormat(b, { maximumFractionDigits: 2 }), [b]), M = x ?? ((e) => `${j.format(e)} h`), N = (e, t) => A.get(p(e, t))?.value ?? 0, P = (e) => i.reduce((t, n) => t + N(e, n.key), 0), F = (e) => r.reduce((t, n) => t + N(n.id, e), 0), I = i.some((e) => e.capacity !== void 0), L = !c && s !== void 0, R = w ?? k("cellLabel");
	return /* @__PURE__ */ l("div", {
		ref: O,
		className: ["planning-grid", E].filter(Boolean).join(" "),
		...D,
		children: /* @__PURE__ */ l("div", {
			className: "planning-grid__wrap",
			children: /* @__PURE__ */ u("table", {
				className: "planning-grid__table",
				children: [
					/* @__PURE__ */ l("caption", {
						className: "visually-hidden",
						children: k("label", C)
					}),
					/* @__PURE__ */ l("thead", { children: /* @__PURE__ */ u("tr", { children: [
						/* @__PURE__ */ l("th", {
							className: "planning-grid__corner",
							scope: "col",
							children: d
						}),
						i.map((e) => /* @__PURE__ */ u("th", {
							scope: "col",
							className: ["planning-grid__column-header", e.current ? "planning-grid__column-header--current" : ""].filter(Boolean).join(" "),
							children: [e.label ?? e.name, e.sublabel ? /* @__PURE__ */ l("span", {
								className: "planning-grid__column-sub",
								children: e.sublabel
							}) : null]
						}, e.key)),
						m ? /* @__PURE__ */ l("th", {
							className: "planning-grid__column-header",
							scope: "col",
							children: k("rowTotal")
						}) : null
					] }) }),
					/* @__PURE__ */ l("tbody", { children: r.map((e) => /* @__PURE__ */ u("tr", { children: [
						/* @__PURE__ */ l("th", {
							className: "planning-grid__row-header",
							scope: "row",
							children: e.label ?? e.name
						}),
						i.map((t) => {
							let r = A.get(p(e.id, t.key)), i = c || e.readOnly || t.readOnly || r?.readOnly || !L, a = r?.value ?? null;
							return /* @__PURE__ */ u("td", {
								className: [
									"planning-grid__cell",
									i ? "planning-grid__cell--readonly" : "",
									r?.pending ? "planning-grid__cell--pending" : ""
								].filter(Boolean).join(" "),
								children: [i ? a ? M(a) : null : /* @__PURE__ */ l(h, {
									value: a,
									max: y,
									size: S,
									locale: b,
									error: r?.error,
									label: R(e.name, t.name),
									onCommit: (n) => s?.(e.id, t.key, n)
								}, `${e.id}-${t.key}-${a ?? ""}`), r?.pending ? /* @__PURE__ */ l(n, {
									size: "sm",
									label: k("saving", T),
									className: "planning-grid__saving"
								}) : null]
							}, t.key);
						}),
						m ? /* @__PURE__ */ l("td", {
							className: "planning-grid__footer-cell",
							children: M(P(e.id))
						}) : null
					] }, e.id)) }),
					g || (v || _) && I ? /* @__PURE__ */ u("tfoot", { children: [
						g ? /* @__PURE__ */ u("tr", { children: [
							/* @__PURE__ */ l("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: k("columnTotal")
							}),
							i.map((e) => /* @__PURE__ */ l("td", {
								className: "planning-grid__footer-cell",
								children: M(F(e.key))
							}, e.key)),
							m ? /* @__PURE__ */ l("td", {
								className: "planning-grid__footer-cell",
								children: M(r.reduce((e, t) => e + P(t.id), 0))
							}) : null
						] }) : null,
						_ && I ? /* @__PURE__ */ u("tr", { children: [
							/* @__PURE__ */ l("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: k("capacity")
							}),
							i.map((e) => /* @__PURE__ */ l("td", {
								className: "planning-grid__footer-cell",
								children: e.capacity === void 0 ? null : M(e.capacity)
							}, e.key)),
							m ? /* @__PURE__ */ l("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null,
						v && I ? /* @__PURE__ */ u("tr", { children: [
							/* @__PURE__ */ l("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: k("remaining")
							}),
							i.map((e) => {
								if (e.capacity === void 0) return /* @__PURE__ */ l("td", { className: "planning-grid__footer-cell" }, e.key);
								let n = e.capacity - F(e.key), r = n < 0;
								return /* @__PURE__ */ u("td", {
									className: ["planning-grid__footer-cell", r ? "planning-grid__footer-cell--over" : ""].filter(Boolean).join(" "),
									children: [M(n), r ? /* @__PURE__ */ l(t, { children: ` (${k("over")})` }) : null]
								}, e.key);
							}),
							m ? /* @__PURE__ */ l("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null
					] }) : null
				]
			})
		})
	});
});
function h({ value: e, max: n, size: i, locale: o, error: f, label: p, onCommit: m }) {
	let h = e === null ? "" : new Intl.NumberFormat(o, { maximumFractionDigits: 2 }).format(e), [g, _] = s(h), v = a(), y = () => {
		let t = d(g);
		if (t === null) {
			_(h);
			return;
		}
		let r = Math.min(n, t);
		r !== (e ?? 0) && m(r);
	};
	return /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(r, {
		className: "planning-grid__input",
		size: i,
		inputMode: "decimal",
		"aria-label": p,
		"aria-describedby": f ? v : void 0,
		error: !!f,
		value: g,
		onChange: (e) => _(e.target.value),
		onBlur: y,
		onKeyDown: (e) => {
			e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur());
		}
	}), f ? /* @__PURE__ */ l(t, {
		id: v,
		role: "alert",
		children: f
	}) : null] });
}
//#endregion
export { m as PlanningGrid };
