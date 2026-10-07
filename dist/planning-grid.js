'use client';
import './planning-grid.css';
import { n as e, t } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Spinner as r } from "./spinner.js";
import { Input as i } from "./input.js";
import { forwardRef as a, useContext as o, useId as s, useMemo as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/organisms/PlanningGrid/planningHours.ts
function p(e) {
	let t = e.trim().replace(",", ".");
	if (t === "") return 0;
	if (!/^\d*\.?\d*$/.test(t)) return null;
	let n = Number(t);
	return Number.isFinite(n) && n >= 0 ? n : null;
}
//#endregion
//#region src/stories/organisms/PlanningGrid/PlanningGrid.tsx
var m = (e, t) => `${e}\u0000${t}`, h = a(function({ rows: i, columns: a, cells: s, onCellChange: l, readOnly: u = !1, rowHeader: p, showRowTotals: h = !0, showColumnTotals: _ = !0, showCapacity: v = !1, showRemaining: y = !0, max: b = 999, locale: x = "es-ES", formatHours: S, size: C = "sm", label: w, cellLabel: T, savingLabel: E, className: D, ...O }, k) {
	let A = e("planningGrid"), j = o(t), M = () => E ?? j?.planningGrid?.saving ?? "Guardando…", N = c(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(m(t.rowId, t.columnKey), t);
		return e;
	}, [s]), P = c(() => new Intl.NumberFormat(x, { maximumFractionDigits: 2 }), [x]), F = S ?? ((e) => `${P.format(e)} h`), I = (e, t) => N.get(m(e, t))?.value ?? 0, L = (e) => a.reduce((t, n) => t + I(e, n.key), 0), R = (e) => i.reduce((t, n) => t + I(n.id, e), 0), z = a.some((e) => e.capacity !== void 0), B = !u && l !== void 0, V = T ?? A("cellLabel");
	return /* @__PURE__ */ d("div", {
		ref: k,
		className: ["planning-grid", D].filter(Boolean).join(" "),
		...O,
		children: /* @__PURE__ */ d("div", {
			className: "planning-grid__wrap",
			children: /* @__PURE__ */ f("table", {
				className: "planning-grid__table",
				children: [
					/* @__PURE__ */ d("caption", {
						className: "visually-hidden",
						children: A("label", w)
					}),
					/* @__PURE__ */ d("thead", { children: /* @__PURE__ */ f("tr", { children: [
						/* @__PURE__ */ d("th", {
							className: "planning-grid__corner",
							scope: "col",
							children: p
						}),
						a.map((e) => /* @__PURE__ */ f("th", {
							scope: "col",
							className: ["planning-grid__column-header", e.current ? "planning-grid__column-header--current" : ""].filter(Boolean).join(" "),
							children: [e.label ?? e.name, e.sublabel ? /* @__PURE__ */ d("span", {
								className: "planning-grid__column-sub",
								children: e.sublabel
							}) : null]
						}, e.key)),
						h ? /* @__PURE__ */ d("th", {
							className: "planning-grid__column-header",
							scope: "col",
							children: A("rowTotal")
						}) : null
					] }) }),
					/* @__PURE__ */ d("tbody", { children: i.map((e) => /* @__PURE__ */ f("tr", { children: [
						/* @__PURE__ */ d("th", {
							className: "planning-grid__row-header",
							scope: "row",
							children: e.label ?? e.name
						}),
						a.map((t) => {
							let n = N.get(m(e.id, t.key)), i = u || e.readOnly || t.readOnly || n?.readOnly || !B, a = n?.value ?? null;
							return /* @__PURE__ */ f("td", {
								className: [
									"planning-grid__cell",
									i ? "planning-grid__cell--readonly" : "",
									n?.pending ? "planning-grid__cell--pending" : ""
								].filter(Boolean).join(" "),
								children: [i ? a ? F(a) : null : /* @__PURE__ */ d(g, {
									value: a,
									max: b,
									size: C,
									locale: x,
									error: n?.error,
									label: V(e.name, t.name),
									onCommit: (n) => l?.(e.id, t.key, n)
								}, `${e.id}-${t.key}-${a ?? ""}`), n?.pending ? /* @__PURE__ */ d(r, {
									size: "sm",
									label: M(),
									className: "planning-grid__saving"
								}) : null]
							}, t.key);
						}),
						h ? /* @__PURE__ */ d("td", {
							className: "planning-grid__footer-cell",
							children: F(L(e.id))
						}) : null
					] }, e.id)) }),
					_ || (y || v) && z ? /* @__PURE__ */ f("tfoot", { children: [
						_ ? /* @__PURE__ */ f("tr", { children: [
							/* @__PURE__ */ d("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: A("columnTotal")
							}),
							a.map((e) => /* @__PURE__ */ d("td", {
								className: "planning-grid__footer-cell",
								children: F(R(e.key))
							}, e.key)),
							h ? /* @__PURE__ */ d("td", {
								className: "planning-grid__footer-cell",
								children: F(i.reduce((e, t) => e + L(t.id), 0))
							}) : null
						] }) : null,
						v && z ? /* @__PURE__ */ f("tr", { children: [
							/* @__PURE__ */ d("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: A("capacity")
							}),
							a.map((e) => /* @__PURE__ */ d("td", {
								className: "planning-grid__footer-cell",
								children: e.capacity === void 0 ? null : F(e.capacity)
							}, e.key)),
							h ? /* @__PURE__ */ d("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null,
						y && z ? /* @__PURE__ */ f("tr", { children: [
							/* @__PURE__ */ d("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: A("remaining")
							}),
							a.map((e) => {
								if (e.capacity === void 0) return /* @__PURE__ */ d("td", { className: "planning-grid__footer-cell" }, e.key);
								let t = e.capacity - R(e.key), r = t < 0;
								return /* @__PURE__ */ f("td", {
									className: ["planning-grid__footer-cell", r ? "planning-grid__footer-cell--over" : ""].filter(Boolean).join(" "),
									children: [F(t), r ? /* @__PURE__ */ d(n, { children: ` (${A("over")})` }) : null]
								}, e.key);
							}),
							h ? /* @__PURE__ */ d("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null
					] }) : null
				]
			})
		})
	});
});
function g({ value: e, max: t, size: r, locale: a, error: o, label: c, onCommit: m }) {
	let h = e === null ? "" : new Intl.NumberFormat(a, { maximumFractionDigits: 2 }).format(e), [g, _] = l(h), v = s(), y = () => {
		let n = p(g);
		if (n === null) {
			_(h);
			return;
		}
		let r = Math.min(t, n);
		r !== (e ?? 0) && m(r);
	};
	return /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(i, {
		className: "planning-grid__input",
		size: r,
		inputMode: "decimal",
		"aria-label": c,
		"aria-describedby": o ? v : void 0,
		error: !!o,
		value: g,
		onChange: (e) => _(e.target.value),
		onBlur: y,
		onKeyDown: (e) => {
			e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur());
		}
	}), o ? /* @__PURE__ */ d(n, {
		id: v,
		role: "alert",
		children: o
	}) : null] });
}
//#endregion
export { h as PlanningGrid };
