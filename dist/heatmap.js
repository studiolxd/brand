'use client';
import './heatmap.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { forwardRef as n, useMemo as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
function o(e, t) {
	if (e == null || !Number.isFinite(e)) return null;
	let n = Math.max(2, Math.min(6, Math.round(t.steps)));
	if (t.max <= t.min) return n;
	let r = (Math.max(t.min, Math.min(t.max, e)) - t.min) / (t.max - t.min);
	return Math.min(n, Math.floor(r * n) + 1);
}
function s(e, t) {
	let n = Math.max(2, Math.min(6, Math.round(t)));
	return Math.round((Math.max(1, Math.min(n, Math.round(e))) - 1) * 5 / (n - 1)) + 1;
}
//#endregion
//#region src/stories/molecules/Heatmap/Heatmap.tsx
var c = (e, t) => `${e}\u0000${t}`, l = n(function({ rows: n, columns: l, cells: u, min: d = 0, max: f, steps: p = 5, rowHeader: m, showValues: h = !0, formatValue: g, locale: _ = "es-ES", showLegend: v = !0, minLabel: y, maxLabel: b, label: x, emptyLabel: S, scaleLabel: C, className: w, ...T }, E) {
	let D = e("heatmap"), O = r(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of u) e.set(c(t.rowId, t.columnKey), t.value);
		return e;
	}, [u]), k = r(() => {
		if (f !== void 0) return f;
		let e = u.map((e) => e.value).filter((e) => e !== null && Number.isFinite(e));
		return e.length > 0 ? Math.max(...e) : d + 1;
	}, [
		u,
		f,
		d
	]), A = Math.max(2, Math.min(6, Math.round(p))), j = {
		min: d,
		max: k,
		steps: A
	}, M = r(() => new Intl.NumberFormat(_, { maximumFractionDigits: 1 }), [_]), N = g ?? ((e) => M.format(e)), P = r(() => {
		let e = [];
		for (let t of l) {
			let n = e[e.length - 1];
			n && n.group === t.group ? n.span += 1 : e.push({
				group: t.group,
				span: 1
			});
		}
		return e;
	}, [l]), F = l.some((e) => e.group !== void 0);
	return /* @__PURE__ */ a("div", {
		ref: E,
		className: ["heatmap", w].filter(Boolean).join(" "),
		...T,
		children: [/* @__PURE__ */ i("div", {
			className: "heatmap__wrap",
			children: /* @__PURE__ */ a("table", {
				className: "heatmap__table",
				children: [
					/* @__PURE__ */ i("caption", {
						className: "visually-hidden",
						children: D("label", x)
					}),
					/* @__PURE__ */ a("thead", { children: [F ? /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("td", { className: "heatmap__corner" }), P.map((e, t) => /* @__PURE__ */ i("th", {
						className: "heatmap__group",
						scope: "colgroup",
						colSpan: e.span,
						children: e.group
					}, `${e.group ?? ""}-${t}`))] }) : null, /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__corner",
						scope: "col",
						children: m
					}), l.map((e) => /* @__PURE__ */ i("th", {
						className: "heatmap__column-header",
						scope: "col",
						children: e.label
					}, e.key))] })] }),
					/* @__PURE__ */ i("tbody", { children: n.map((e) => /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__row-header",
						scope: "row",
						children: e.label
					}), l.map((n) => {
						let r = O.get(c(e.id, n.key)) ?? null, a = o(r, j), l = ["heatmap__cell", a === null ? "heatmap__cell--empty" : `heatmap__cell--step-${s(a, A)}`].join(" "), u = r === null ? D("empty", S) : N(r);
						return /* @__PURE__ */ i("td", {
							className: l,
							children: h && r !== null ? u : /* @__PURE__ */ i(t, { children: u })
						}, n.key);
					})] }, e.id)) })
				]
			})
		}), v ? /* @__PURE__ */ a("p", {
			className: "heatmap__legend",
			children: [
				/* @__PURE__ */ i("span", { children: y ?? N(d) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__ramp",
					role: "img",
					"aria-label": D("scale", C),
					children: Array.from({ length: A }, (e, t) => /* @__PURE__ */ i("span", { className: `heatmap__swatch heatmap__swatch--step-${s(t + 1, A)}` }, t))
				}),
				/* @__PURE__ */ i("span", { children: b ?? N(k) })
			]
		}) : null]
	});
});
//#endregion
export { l as Heatmap };
