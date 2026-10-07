'use client';
import './heatmap.css';
import { r as e } from "./_shared/brandmessagescontext.js";
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
//#region src/stories/messages/es/heatmap.ts
var d = {
	label: "Matriz",
	empty: "sin dato",
	scale: "Escala de color",
	midpoint: (e) => `Centro: ${e}`
}, f = (e, t) => `${e}\u0000${t}`, p = n(function({ rows: n, columns: p, cells: m, scale: h = "sequential", min: g, max: _, steps: v = 5, midpoint: y = 0, divergingDirection: b = "warm-below", rowHeader: x, showValues: S = !0, formatValue: C, locale: w = "es-ES", showLegend: T = !0, minLabel: E, maxLabel: D, midpointLabel: O, label: k, emptyLabel: A, scaleLabel: j, className: M, ...N }, P) {
	let F = e("heatmap", d), I = h === "diverging", L = g ?? 0, R = r(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of m) e.set(f(t.rowId, t.columnKey), t.value);
		return e;
	}, [m]), z = r(() => {
		if (_ !== void 0) return _;
		let e = m.map((e) => e.value).filter((e) => e !== null && Number.isFinite(e));
		return e.length > 0 ? Math.max(...e) : L + 1;
	}, [
		m,
		_,
		L
	]), B = Math.max(2, Math.min(6, Math.round(v))), V = {
		min: L,
		max: z,
		steps: B
	}, H = r(() => u(y, m.map((e) => e.value), g, _), [
		m,
		y,
		g,
		_
	]), U = {
		midpoint: y,
		radius: H,
		direction: b
	}, W = (e) => {
		if (I) {
			let t = c(e, U);
			return t === null ? "heatmap__cell--empty" : `heatmap__cell--diverging-${t}`;
		}
		let t = o(e, V);
		return t === null ? "heatmap__cell--empty" : `heatmap__cell--step-${s(t, B)}`;
	}, G = r(() => new Intl.NumberFormat(w, { maximumFractionDigits: 1 }), [w]), K = C ?? ((e) => G.format(e)), q = r(() => {
		let e = [];
		for (let t of p) {
			let n = e[e.length - 1];
			n && n.group === t.group ? n.span += 1 : e.push({
				group: t.group,
				span: 1
			});
		}
		return e;
	}, [p]), J = p.some((e) => e.group !== void 0);
	return /* @__PURE__ */ a("div", {
		ref: P,
		className: ["heatmap", M].filter(Boolean).join(" "),
		...N,
		children: [/* @__PURE__ */ i("div", {
			className: "heatmap__wrap",
			children: /* @__PURE__ */ a("table", {
				className: "heatmap__table",
				children: [
					/* @__PURE__ */ i("caption", {
						className: "visually-hidden",
						children: F("label", k)
					}),
					/* @__PURE__ */ a("thead", { children: [J ? /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("td", { className: "heatmap__corner" }), q.map((e, t) => /* @__PURE__ */ i("th", {
						className: "heatmap__group",
						scope: "colgroup",
						colSpan: e.span,
						children: e.group
					}, `${e.group ?? ""}-${t}`))] }) : null, /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__corner",
						scope: "col",
						children: x
					}), p.map((e) => /* @__PURE__ */ i("th", {
						className: "heatmap__column-header",
						scope: "col",
						children: e.label
					}, e.key))] })] }),
					/* @__PURE__ */ i("tbody", { children: n.map((e) => /* @__PURE__ */ a("tr", { children: [/* @__PURE__ */ i("th", {
						className: "heatmap__row-header",
						scope: "row",
						children: e.label
					}), p.map((n) => {
						let r = R.get(f(e.id, n.key)) ?? null, a = `heatmap__cell ${W(r)}`, o = r === null ? F("empty", A) : K(r);
						return /* @__PURE__ */ i("td", {
							className: a,
							children: S && r !== null ? o : /* @__PURE__ */ i(t, { children: o })
						}, n.key);
					})] }, e.id)) })
				]
			})
		}), T && I ? /* @__PURE__ */ a("p", {
			className: "heatmap__legend",
			children: [
				/* @__PURE__ */ i("span", { children: E ?? K(y - H) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__ramp",
					role: "img",
					"aria-label": F("scale", j),
					children: l(b).map((e) => /* @__PURE__ */ i("span", { className: `heatmap__swatch heatmap__swatch--diverging-${e}` }, e))
				}),
				/* @__PURE__ */ i("span", { children: D ?? K(y + H) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__midpoint",
					children: O ?? F("midpoint")(K(y))
				})
			]
		}) : T ? /* @__PURE__ */ a("p", {
			className: "heatmap__legend",
			children: [
				/* @__PURE__ */ i("span", { children: E ?? K(L) }),
				/* @__PURE__ */ i("span", {
					className: "heatmap__ramp",
					role: "img",
					"aria-label": F("scale", j),
					children: Array.from({ length: B }, (e, t) => /* @__PURE__ */ i("span", { className: `heatmap__swatch heatmap__swatch--step-${s(t + 1, B)}` }, t))
				}),
				/* @__PURE__ */ i("span", { children: D ?? K(z) })
			]
		}) : null]
	});
});
//#endregion
export { p as Heatmap };
