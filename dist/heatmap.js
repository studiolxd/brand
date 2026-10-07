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
function c(e, t) {
	if (e == null || !Number.isFinite(e)) return null;
	let n = e - t.midpoint;
	if (n === 0) return "neutral";
	let r = t.radius > 0 ? Math.min(1, Math.abs(n) / t.radius) : 1, i = Math.min(3, Math.floor(r * 3.5 + .5));
	return i === 0 ? "neutral" : `${n < 0 == ((t.direction ?? "warm-below") === "warm-below") ? "warm" : "cool"}-${i}`;
}
function l(e = "warm-below") {
	let t = e === "warm-below" ? "warm" : "cool", n = e === "warm-below" ? "cool" : "warm";
	return [
		`${t}-3`,
		`${t}-2`,
		`${t}-1`,
		"neutral",
		`${n}-1`,
		`${n}-2`,
		`${n}-3`
	];
}
function u(e, t, n, r) {
	let i = [n, r].filter((e) => e !== void 0 && Number.isFinite(e));
	return (i.length > 0 ? i : t.filter((e) => e !== null && Number.isFinite(e))).reduce((t, n) => Math.max(t, Math.abs(n - e)), 0);
}
//#endregion
//#region src/stories/molecules/Heatmap/Heatmap.tsx
var d = (e, t) => `${e}\u0000${t}`, f = n(function({ rows: n, columns: f, cells: p, scale: m = "sequential", min: h, max: g, steps: _ = 5, midpoint: v = 0, divergingDirection: y = "warm-below", rowHeader: b, showValues: x = !0, formatValue: S, locale: C = "es-ES", showLegend: w = !0, minLabel: T, maxLabel: E, midpointLabel: D, label: O, emptyLabel: k, scaleLabel: A, className: j, ...M }, N) {
	let P = e("heatmap"), F = m === "diverging", I = h ?? 0, L = r(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of p) e.set(d(t.rowId, t.columnKey), t.value);
		return e;
	}, [p]), R = r(() => {
		if (g !== void 0) return g;
		let e = p.map((e) => e.value).filter((e) => e !== null && Number.isFinite(e));
		return e.length > 0 ? Math.max(...e) : I + 1;
	}, [
		p,
		g,
		I
	]), z = Math.max(2, Math.min(6, Math.round(_))), B = {
		min: I,
		max: R,
		steps: z
	}, V = r(() => u(v, p.map((e) => e.value), h, g), [
		p,
		v,
		h,
		g
	]), H = {
		midpoint: v,
		radius: V,
		direction: y
	}, U = (e) => {
		if (F) {
			let t = c(e, H);
			return t === null ? "heatmap__cell--empty" : `heatmap__cell--diverging-${t}`;
		}
		let t = o(e, B);
		return t === null ? "heatmap__cell--empty" : `heatmap__cell--step-${s(t, z)}`;
	}, W = r(() => new Intl.NumberFormat(C, { maximumFractionDigits: 1 }), [C]), G = S ?? ((e) => W.format(e)), K = r(() => {
		let e = [];
		for (let t of f) {
			let n = e[e.length - 1];
			n && n.group === t.group ? n.span += 1 : e.push({
				group: t.group,
				span: 1
			});
		}
		return e;
	}, [f]), q = f.some((e) => e.group !== void 0);
	return /* @__PURE__ */ a("div", {
		ref: N,
		className: ["heatmap", j].filter(Boolean).join(" "),
		...M,
		children: [/* @__PURE__ */ i("div", {
			className: "heatmap__wrap",
			children: /* @__PURE__ */ a("table", {
				className: "heatmap__table",
				children: [
					/* @__PURE__ */ i("caption", {
						className: "visually-hidden",
						children: P("label", O)
					}),
					/* @__PURE__ */ a("thead", { children: [q ? /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("td", { className: "heatmap__corner" }), K.map((e, t) => /* @__PURE__ */ i("th", {
						className: "heatmap__group",
						scope: "colgroup",
						colSpan: e.span,
						children: e.group
					}, `${e.group ?? ""}-${t}`))] }) : null, /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__corner",
						scope: "col",
						children: b
					}), f.map((e) => /* @__PURE__ */ i("th", {
						className: "heatmap__column-header",
						scope: "col",
						children: e.label
					}, e.key))] })] }),
					/* @__PURE__ */ i("tbody", { children: n.map((e) => /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__row-header",
						scope: "row",
						children: e.label
					}), f.map((n) => {
						let r = L.get(d(e.id, n.key)) ?? null, a = `heatmap__cell ${U(r)}`, o = r === null ? P("empty", k) : G(r);
						return /* @__PURE__ */ i("td", {
							className: a,
							children: x && r !== null ? o : /* @__PURE__ */ i(t, { children: o })
						}, n.key);
					})] }, e.id)) })
				]
			})
		}), w && F ? /* @__PURE__ */ a("p", {
			className: "heatmap__legend",
			children: [
				/* @__PURE__ */ i("span", { children: T ?? G(v - V) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__ramp",
					role: "img",
					"aria-label": P("scale", A),
					children: l(y).map((e) => /* @__PURE__ */ i("span", { className: `heatmap__swatch heatmap__swatch--diverging-${e}` }, e))
				}),
				/* @__PURE__ */ i("span", { children: E ?? G(v + V) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__midpoint",
					children: D ?? P("midpoint")(G(v))
				})
			]
		}) : w ? /* @__PURE__ */ a("p", {
			className: "heatmap__legend",
			children: [
				/* @__PURE__ */ i("span", { children: T ?? G(I) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__ramp",
					role: "img",
					"aria-label": P("scale", A),
					children: Array.from({ length: z }, (e, t) => /* @__PURE__ */ i("span", { className: `heatmap__swatch heatmap__swatch--step-${s(t + 1, z)}` }, t))
				}),
				/* @__PURE__ */ i("span", { children: E ?? G(R) })
			]
		}) : null]
	});
});
//#endregion
export { f as Heatmap };
