'use client';
import './planning-grid.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Input as n } from "./input.js";
import { forwardRef as r, useId as i, useMemo as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/organisms/PlanningGrid/planningHours.ts
function u(e) {
	let t = e.trim().replace(",", ".");
	if (t === "") return 0;
	if (!/^\d*\.?\d*$/.test(t)) return null;
	let n = Number(t);
	return Number.isFinite(n) && n >= 0 ? n : null;
}
//#endregion
//#region src/stories/organisms/PlanningGrid/PlanningGrid.tsx
var d = (e, t) => `${e}\u0000${t}`, f = r(function({ rows: n, columns: r, cells: i, onCellChange: o, readOnly: s = !1, rowHeader: u, showRowTotals: f = !0, showColumnTotals: m = !0, showCapacity: h = !1, showRemaining: g = !0, max: _ = 999, locale: v = "es-ES", formatHours: y, size: b = "sm", label: x, cellLabel: S, className: C, ...w }, T) {
	let E = e("planningGrid"), D = a(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of i) e.set(d(t.rowId, t.columnKey), t);
		return e;
	}, [i]), O = a(() => new Intl.NumberFormat(v, { maximumFractionDigits: 2 }), [v]), k = y ?? ((e) => `${O.format(e)} h`), A = (e, t) => D.get(d(e, t))?.value ?? 0, j = (e) => r.reduce((t, n) => t + A(e, n.key), 0), M = (e) => n.reduce((t, n) => t + A(n.id, e), 0), N = r.some((e) => e.capacity !== void 0), P = !s && o !== void 0, F = S ?? E("cellLabel");
	return /* @__PURE__ */ c("div", {
		ref: T,
		className: ["planning-grid", C].filter(Boolean).join(" "),
		...w,
		children: /* @__PURE__ */ c("div", {
			className: "planning-grid__wrap",
			children: /* @__PURE__ */ l("table", {
				className: "planning-grid__table",
				children: [
					/* @__PURE__ */ c("caption", {
						className: "visually-hidden",
						children: E("label", x)
					}),
					/* @__PURE__ */ c("thead", { children: /* @__PURE__ */ l("tr", { children: [
						/* @__PURE__ */ c("th", {
							className: "planning-grid__corner",
							scope: "col",
							children: u
						}),
						r.map((e) => /* @__PURE__ */ l("th", {
							scope: "col",
							className: ["planning-grid__column-header", e.current ? "planning-grid__column-header--current" : ""].filter(Boolean).join(" "),
							children: [e.label ?? e.name, e.sublabel ? /* @__PURE__ */ c("span", {
								className: "planning-grid__column-sub",
								children: e.sublabel
							}) : null]
						}, e.key)),
						f ? /* @__PURE__ */ c("th", {
							className: "planning-grid__column-header",
							scope: "col",
							children: E("rowTotal")
						}) : null
					] }) }),
					/* @__PURE__ */ c("tbody", { children: n.map((e) => /* @__PURE__ */ l("tr", { children: [
						/* @__PURE__ */ c("th", {
							className: "planning-grid__row-header",
							scope: "row",
							children: e.label ?? e.name
						}),
						r.map((t) => {
							let n = D.get(d(e.id, t.key)), r = s || e.readOnly || t.readOnly || n?.readOnly || !P, i = n?.value ?? null;
							return /* @__PURE__ */ c("td", {
								className: [
									"planning-grid__cell",
									r ? "planning-grid__cell--readonly" : "",
									n?.pending ? "planning-grid__cell--pending" : ""
								].filter(Boolean).join(" "),
								children: r ? i ? k(i) : null : /* @__PURE__ */ c(p, {
									value: i,
									max: _,
									size: b,
									locale: v,
									error: n?.error,
									label: F(e.name, t.name),
									onCommit: (n) => o?.(e.id, t.key, n)
								}, `${e.id}-${t.key}-${i ?? ""}`)
							}, t.key);
						}),
						f ? /* @__PURE__ */ c("td", {
							className: "planning-grid__footer-cell",
							children: k(j(e.id))
						}) : null
					] }, e.id)) }),
					m || (g || h) && N ? /* @__PURE__ */ l("tfoot", { children: [
						m ? /* @__PURE__ */ l("tr", { children: [
							/* @__PURE__ */ c("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: E("columnTotal")
							}),
							r.map((e) => /* @__PURE__ */ c("td", {
								className: "planning-grid__footer-cell",
								children: k(M(e.key))
							}, e.key)),
							f ? /* @__PURE__ */ c("td", {
								className: "planning-grid__footer-cell",
								children: k(n.reduce((e, t) => e + j(t.id), 0))
							}) : null
						] }) : null,
						h && N ? /* @__PURE__ */ l("tr", { children: [
							/* @__PURE__ */ c("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: E("capacity")
							}),
							r.map((e) => /* @__PURE__ */ c("td", {
								className: "planning-grid__footer-cell",
								children: e.capacity === void 0 ? null : k(e.capacity)
							}, e.key)),
							f ? /* @__PURE__ */ c("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null,
						g && N ? /* @__PURE__ */ l("tr", { children: [
							/* @__PURE__ */ c("th", {
								className: "planning-grid__footer-header",
								scope: "row",
								children: E("remaining")
							}),
							r.map((e) => {
								if (e.capacity === void 0) return /* @__PURE__ */ c("td", { className: "planning-grid__footer-cell" }, e.key);
								let n = e.capacity - M(e.key), r = n < 0;
								return /* @__PURE__ */ l("td", {
									className: ["planning-grid__footer-cell", r ? "planning-grid__footer-cell--over" : ""].filter(Boolean).join(" "),
									children: [k(n), r ? /* @__PURE__ */ c(t, { children: ` (${E("over")})` }) : null]
								}, e.key);
							}),
							f ? /* @__PURE__ */ c("td", { className: "planning-grid__footer-cell" }) : null
						] }) : null
					] }) : null
				]
			})
		})
	});
});
function p({ value: e, max: r, size: a, locale: d, error: f, label: p, onCommit: m }) {
	let h = e === null ? "" : new Intl.NumberFormat(d, { maximumFractionDigits: 2 }).format(e), [g, _] = o(h), v = i(), y = () => {
		let t = u(g);
		if (t === null) {
			_(h);
			return;
		}
		let n = Math.min(r, t);
		n !== (e ?? 0) && m(n);
	};
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(n, {
		className: "planning-grid__input",
		size: a,
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
	}), f ? /* @__PURE__ */ c(t, {
		id: v,
		role: "alert",
		children: f
	}) : null] });
}
//#endregion
export { f as PlanningGrid };
