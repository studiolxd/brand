'use client';
import './chart.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Inline as n } from "./inline.js";
import { Tag as r } from "./tag.js";
import { t as i } from "./_shared/css-properties.js";
import { forwardRef as a, useEffect as o, useId as s, useMemo as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/messages/es/chart.ts
var m = {
	tableCaption: "Datos del gráfico",
	tableHint: "Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.",
	category: "Categoría",
	value: "Valor",
	share: "Porcentaje",
	empty: "Sin datos que mostrar"
}, h = {
	barRadius: 4,
	barMaxThickness: 24,
	markGap: 2,
	markerSize: 8,
	labelFontSize: 14,
	padding: 8,
	axisGap: 8,
	donutThickness: .55,
	funnelGap: 4,
	treemapGap: 2,
	radialBarGap: 4,
	dotSize: 10
}, g = h.labelFontSize * .6, _ = 640, v = 8;
function y(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function b(e, t) {
	let n = e[t];
	return typeof n == "number" ? n : String(n ?? "");
}
function x(e, t, n) {
	if (!(t ?? n?.[e])) return e < v ? String(e + 1) : "muted";
}
function S(e, t, n) {
	return t ?? n?.[e];
}
function ee(e, t, n) {
	if (!(t || n?.[e])) return e < v ? String(e + 1) : "muted";
}
function te({ className: e, index: t, color: n, palette: r, muted: i }) {
	return /* @__PURE__ */ f("svg", {
		className: e,
		"aria-hidden": "true",
		"data-slot": x(t, n, r),
		children: /* @__PURE__ */ f("rect", {
			width: "100%",
			height: "100%",
			fill: i ? void 0 : S(t, n, r)
		})
	});
}
function ne(e, t, n, r, i) {
	return `M ${e - r / 2} ${t} L ${e + r / 2} ${t} L ${e + i / 2} ${t + n} L ${e - i / 2} ${t + n} Z`;
}
function re(e, t, n, r, i) {
	let a = e.reduce((e, t) => e + t.value, 0);
	if (a <= 0 || r <= 0 || i <= 0) return [];
	let o = r * i, s = e.map((e) => ({
		...e,
		area: e.value / a * o
	})), c = [], l = t, u = n, d = r, f = i, p = [], m = [...s], h = (e, t) => {
		let n = e.reduce((e, t) => e + t.area, 0);
		if (n <= 0) return Infinity;
		let r = Math.max(...e.map((e) => e.area)), i = Math.min(...e.map((e) => e.area));
		return Math.max(t * t * r / (n * n), n * n / (t * t * i));
	}, g = () => {
		let e = p.reduce((e, t) => e + t.area, 0), t = d >= f, n = t ? e / f : e / d, r = 0;
		p.forEach((i) => {
			let a = (t ? f : d) * (i.area / e);
			c.push(t ? {
				x: l,
				y: u + r,
				w: n,
				h: a,
				index: i.index
			} : {
				x: l + r,
				y: u,
				w: a,
				h: n,
				index: i.index
			}), r += a;
		}), t ? (l += n, d -= n) : (u += n, f -= n), p = [];
	};
	for (; m.length > 0;) {
		let e = Math.min(d, f), t = m[0];
		if (!t) break;
		p.length === 0 || h([...p, t], e) <= h(p, e) ? (p.push(t), m = m.slice(1)) : g();
	}
	return p.length > 0 && g(), c;
}
function ie(e, t, n) {
	let r = Math.min(0, e), i = Math.max(0, t);
	if (i === r) return [0, 1];
	let a = (i - r) / Math.max(1, n), o = 10 ** Math.floor(Math.log10(a)), s = [
		1,
		2,
		2.5,
		5,
		10
	].map((e) => e * o).find((e) => e >= a) ?? o * 10, c = Math.floor(r / s) * s, l = Math.ceil(i / s) * s, u = [];
	for (let e = c; e <= l + s / 2; e += s) u.push(Math.round(e / s) * s);
	return u;
}
function ae(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.max(0, Math.min(h.barRadius, i === "top" || i === "bottom" ? r : n, (i === "top" || i === "bottom" ? n : r) / 2));
	switch (i) {
		case "top": return `M ${e} ${t + r} L ${e} ${t + a} Q ${e} ${t} ${e + a} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r} Z`;
		case "bottom": return `M ${e} ${t} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n - a} ${t + r} Q ${e + n} ${t + r} ${e + n} ${t + r - a} L ${e + n} ${t} Z`;
		case "right": return `M ${e} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r - a} Q ${e + n} ${t + r} ${e + n - a} ${t + r} L ${e} ${t + r} Z`;
		default: return `M ${e + n} ${t} L ${e + a} ${t} Q ${e} ${t} ${e} ${t + a} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n} ${t + r} Z`;
	}
}
function oe(e, t, n, r, i, a) {
	let o = a - i > Math.PI ? 1 : 0, s = (n, r) => `${e + n * Math.cos(r)} ${t + n * Math.sin(r)}`;
	return r <= 0 ? `M ${e} ${t} L ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} Z` : `M ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} L ${s(r, a)} A ${r} ${r} 0 ${o} 0 ${s(r, i)} Z`;
}
function se(e) {
	let t = l(null), [n, r] = u(e);
	return o(() => {
		let e = t.current;
		if (!e || typeof ResizeObserver > "u") return;
		let n = new ResizeObserver((e) => {
			let t = e[0]?.contentRect.width;
			t && t > 0 && r(Math.round(t));
		});
		return n.observe(e), () => n.disconnect();
	}, []), [t, n];
}
var C = a(function({ type: a = "line", data: o, series: l, xKey: v, colors: C, orientation: ce = "vertical", stacked: w = !1, emphasis: le, height: ue = 256, ariaLabel: de, title: fe, caption: pe, formatValue: me, formatX: he, yTicks: ge = 5, legend: _e, grid: ve = !0, tooltip: T = !0, valueLabels: ye, locale: be = "es-ES", tableCaption: xe, tableHint: Se, categoryLabel: Ce, valueLabel: we, shareLabel: Te, emptyMessage: Ee, className: De, ...Oe }, ke) {
	let [Ae, je] = se(_), [E, D] = u(null), [Me, Ne] = u(!1), Pe = s(), Fe = c(() => new Intl.NumberFormat(be), [be]), O = e("chart", m), Ie = c(() => new Intl.NumberFormat(be, {
		style: "percent",
		maximumFractionDigits: 1
	}), [be]), k = (e, t) => me ? me(e, t) : Fe.format(e), A = (e) => he ? he(e) : String(e), Le = a === "pie" || a === "donut", j = Le || a === "funnel" || a === "treemap" || a === "radial-bar", M = a === "scatter", Re = a === "radar", N = j || Re, ze = _e ?? (j ? o.length > 1 : l.length > 1), Be = ye ?? (a === "line" || a === "area" ? "last" : "none"), P = o, F = P.length === 0 || l.length === 0, Ve = [
		"chart",
		`chart--${a}`,
		a === "bar" ? `chart--${ce}` : "",
		w ? "chart--stacked" : "",
		De
	].filter(Boolean).join(" "), He = P.map((e) => l.map((t) => y(e[t.key]))), Ue = He.map((e) => e.reduce((e, t) => e + t, 0)), We = He.flat(), I = ie(We.length ? Math.min(0, ...We) : 0, w ? Math.max(0, ...Ue) : We.length ? Math.max(0, ...We) : 1, ge), Ge = I[0] ?? 0, L = I[I.length - 1] ?? 1, Ke = L - Ge || 1, qe = I.map((e) => k(e)), Je = P.map((e) => typeof e[v] == "number" ? e[v] : 0), Ye = M ? ie(Math.min(...Je, 0), Math.max(...Je, 1), ge) : [], Xe = Ye[0] ?? 0, Ze = (Ye[Ye.length - 1] ?? 1) - Xe || 1, Qe = M ? Ye.map((e) => k(e)) : P.map((e) => A(b(e, v))), R = a === "bar" && ce === "horizontal", $e = R ? Qe : qe, et = N ? h.padding : h.padding + Math.max(...$e.map((e) => e.length), 1) * g + h.axisGap, tt = N ? 0 : Math.round(h.labelFontSize * 1.4) + h.axisGap, z = et, nt = Math.max(z + 1, je - h.padding), B = h.padding, V = Math.max(B + 1, ue - h.padding), H = nt - z, U = V - B, rt = ue + tt, W = (e) => V - (e - Ge) / Ke * U, G = (e) => z + (e - Ge) / Ke * H, it = W(0), at = G(0), ot = P.length ? (R ? U : H) / P.length : 0, st = (e) => P.length > 1 ? z + e * H / (P.length - 1) : z + H / 2, ct = (e) => (R ? B : z) + ot * (e + .5), lt = (e) => z + (e - Xe) / Ze * H, ut = l[0]?.key ?? "", K = P.map((e) => y(e[ut])), q = K.reduce((e, t) => e + t, 0), J = Math.max(1, Math.min(H, U) / 2 - h.labelFontSize * 2), Y = z + H / 2, X = B + U / 2, dt = K.map((e, t) => {
		let n = K.slice(0, t).reduce((e, t) => e + t, 0), r = -Math.PI / 2 + (q > 0 ? n / q * Math.PI * 2 : 0);
		return {
			from: r,
			to: r + (q > 0 ? e / q * Math.PI * 2 : 0),
			share: q > 0 ? e / q : 0
		};
	}), ft = P.map((e, t) => -Math.PI / 2 + (P.length ? t * Math.PI * 2 / P.length : 0)), pt = (e, t) => {
		let n = J * Math.max(0, Math.min(1, L > 0 ? e / L : 0)), r = ft[t] ?? 0;
		return {
			x: Y + n * Math.cos(r),
			y: X + n * Math.sin(r)
		};
	}, Z = (e) => !!le && le !== e, mt = (e) => {
		if (N || P.length === 0) return null;
		let t = e.currentTarget.getBoundingClientRect();
		if (a === "line" || a === "area") {
			let n = e.clientX - t.left, r = P.length > 1 ? H / (P.length - 1) : H;
			return Math.max(0, Math.min(P.length - 1, Math.round(n / r)));
		}
		if (M) {
			let n = e.clientX - t.left + z, r = 0, i = Infinity;
			return Je.forEach((e, t) => {
				let a = Math.abs(lt(e) - n);
				a < i && (i = a, r = t);
			}), r;
		}
		let n = R ? e.clientY - t.top : e.clientX - t.left;
		return Math.max(0, Math.min(P.length - 1, Math.floor(n / (ot || 1))));
	}, ht = (e) => {
		D((t) => {
			let n = (t ?? 0) + e;
			return Math.max(0, Math.min(P.length - 1, n));
		});
	}, gt = (e) => {
		Ne(!0), e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), ht(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), ht(-1)) : e.key === "Home" ? (e.preventDefault(), D(0)) : e.key === "End" ? (e.preventDefault(), D(P.length - 1)) : e.key === "Escape" && D(null);
	}, Q = [];
	if (!F && (a === "line" || a === "area")) {
		let e = P.map(() => 0), t = null, n = [];
		l.forEach((r, i) => {
			let o = P.map((t, n) => {
				let i = y(t[r.key]), a = i;
				return w && (e[n] = (e[n] ?? 0) + i, a = e[n]), {
					x: st(n),
					y: W(a),
					value: i
				};
			}), s = o.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), c = Z(r.key), l = x(i, r.color, C), u = c ? void 0 : S(i, r.color, C), d = o[0], p = o[o.length - 1];
			if (a === "area" && d && p) {
				let e = w && t ? [...t].reverse().map((e) => `L ${e.x} ${e.y}`).join(" ") : `L ${p.x} ${it} L ${d.x} ${it}`;
				Q.push(/* @__PURE__ */ f("path", {
					className: `chart__area${c ? " chart__area--muted" : ""}`,
					"data-slot": l,
					fill: u,
					d: `${s} ${e} Z`
				}, `area-${r.key}`));
			}
			Q.push(/* @__PURE__ */ f("path", {
				className: `chart__line${c ? " chart__line--muted" : ""}`,
				"data-slot": l,
				stroke: u,
				d: s
			}, `line-${r.key}`)), o.forEach((e, t) => {
				let n = t === o.length - 1, i = E === t;
				!n && !i || Q.push(/* @__PURE__ */ f("circle", {
					className: `chart__marker${c ? " chart__marker--muted" : ""}`,
					"data-slot": l,
					fill: u,
					cx: e.x,
					cy: e.y,
					r: h.markerSize / 2,
					"data-active": i || void 0
				}, `dot-${r.key}-${t}`));
			}), (Be === "all" ? o : Be === "last" && p ? [p] : Be === "extremes" ? [d, p].filter(Boolean) : []).forEach((e, t) => {
				e && n.push({
					key: `label-${r.key}-${t}`,
					x: e.x,
					y: e.y - h.axisGap,
					text: k(e.value, r)
				});
			}), t = o.map((e) => ({
				x: e.x,
				y: e.y
			}));
		});
		let r = [];
		n.forEach((e) => {
			r.some((t) => Math.abs(t.x - e.x) < g * e.text.length && Math.abs(t.y - e.y) < h.labelFontSize * 1.2) || (r.push({
				x: e.x,
				y: e.y
			}), Q.push(/* @__PURE__ */ f("text", {
				className: "chart__value-label",
				x: e.x,
				y: e.y,
				textAnchor: e.x > nt - h.barMaxThickness * 2 ? "end" : "middle",
				children: e.text
			}, e.key)));
		});
	}
	if (!F && a === "bar") {
		let e = Math.min(h.barMaxThickness * l.length + h.markGap * (l.length - 1), ot * .72), t = w ? Math.min(h.barMaxThickness, ot * .72) : Math.max(1, (e - h.markGap * (l.length - 1)) / l.length);
		P.forEach((e, n) => {
			let r = ct(n), i = 0, a = 0;
			l.forEach((o, s) => {
				let c = y(e[o.key]), u = Z(o.key), d = x(s, o.color, C), p = u ? void 0 : S(s, o.color, C), m = r + (w ? 0 : (s - (l.length - 1) / 2) * (t + h.markGap)) - t / 2, g = w ? c >= 0 ? i : a : 0, _ = g + c;
				w && (c >= 0 ? i = _ : a = _);
				let v = w && g !== 0 ? h.markGap : 0, b = "";
				if (R) {
					let e = G(g) + (c >= 0 ? v : 0), n = G(_);
					b = ae(Math.min(e, n), m, Math.abs(n - e), t, c >= 0 ? "right" : "left");
				} else {
					let e = W(g) - (c >= 0 ? v : 0), n = W(_);
					b = ae(m, Math.min(e, n), t, Math.abs(n - e), c >= 0 ? "top" : "bottom");
				}
				if (b && (Q.push(/* @__PURE__ */ f("path", {
					className: `chart__bar${u ? " chart__bar--muted" : ""}`,
					"data-slot": d,
					fill: p,
					d: b,
					"data-active": E === n || void 0
				}, `bar-${n}-${o.key}`)), Be === "all" && !w)) {
					let e = R ? G(_) : W(_);
					Q.push(/* @__PURE__ */ f("text", {
						className: "chart__value-label",
						x: R ? e + h.axisGap : m + t / 2,
						y: R ? m + t / 2 : e - h.axisGap,
						textAnchor: R ? "start" : "middle",
						dominantBaseline: R ? "middle" : "auto",
						children: k(c, o)
					}, `bar-label-${n}-${o.key}`));
				}
			});
		});
	}
	if (!F && Le) {
		let e = a === "donut" ? J * (1 - h.donutThickness) : 0;
		dt.forEach((t, n) => {
			if (t.to - t.from <= 0) return;
			let r = String(b(P[n], v));
			if (Q.push(/* @__PURE__ */ f("path", {
				className: `chart__slice${Z(r) ? " chart__slice--muted" : ""}`,
				"data-slot": x(n, void 0, C),
				fill: Z(r) ? void 0 : S(n, void 0, C),
				d: oe(Y, X, J, e, t.from, t.to),
				"data-active": E === n || void 0
			}, `slice-${n}`)), t.share >= .05) {
				let e = (t.from + t.to) / 2, r = Y + (J + h.axisGap) * Math.cos(e), i = X + (J + h.axisGap) * Math.sin(e);
				Q.push(/* @__PURE__ */ f("text", {
					className: "chart__value-label",
					x: r,
					y: i,
					textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
					dominantBaseline: "middle",
					children: Ie.format(t.share)
				}, `slice-label-${n}`));
			}
		});
	}
	if (!F && a === "funnel") {
		let e = Math.max(...K, 1), t = U / Math.max(1, P.length), n = (t) => Math.max(0, t) / e * H;
		K.forEach((e, r) => {
			let i = B + t * r, a = Math.max(0, t - h.funnelGap), o = K[r + 1], s = String(b(P[r], v));
			Q.push(/* @__PURE__ */ f("path", {
				className: `chart__funnel-step${Z(s) ? " chart__funnel-step--muted" : ""}`,
				"data-slot": x(r, void 0, C),
				fill: Z(s) ? void 0 : S(r, void 0, C),
				"data-active": E === r || void 0,
				d: ne(Y, i, a, n(e), n(o ?? e))
			}, `funnel-${r}`)), Q.push(/* @__PURE__ */ f("text", {
				className: "chart__value-label",
				x: Y,
				y: i + a / 2,
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: `${A(b(P[r], v))} · ${k(e)}`
			}, `funnel-label-${r}`));
		});
	}
	if (!F && a === "treemap" && re(K.map((e, t) => ({
		value: Math.max(0, e),
		index: t
	})).filter((e) => e.value > 0), z, B, H, U).forEach((e) => {
		let t = String(b(P[e.index], v)), n = Math.max(0, e.w - h.treemapGap), r = Math.max(0, e.h - h.treemapGap);
		Q.push(/* @__PURE__ */ f("rect", {
			className: `chart__tile${Z(t) ? " chart__tile--muted" : ""}`,
			"data-slot": x(e.index, void 0, C),
			fill: Z(t) ? void 0 : S(e.index, void 0, C),
			"data-active": E === e.index || void 0,
			x: e.x,
			y: e.y,
			width: n,
			height: r
		}, `tile-${e.index}`)), n > g * 4 && r > h.labelFontSize * 2 && Q.push(/* @__PURE__ */ f("text", {
			className: "chart__tile-label",
			"data-slot": ee(e.index, void 0, C),
			x: e.x + h.axisGap,
			y: e.y + h.axisGap + h.labelFontSize,
			children: A(b(P[e.index], v))
		}, `tile-label-${e.index}`));
	}), !F && a === "radial-bar") {
		let e = Math.max(...K, 1), t = J / Math.max(1, P.length), n = Math.max(1, t - h.radialBarGap);
		K.forEach((r, i) => {
			let a = J - t * i, o = a - n, s = String(b(P[i], v)), c = Math.max(0, r) / e * Math.PI * 1.999;
			Q.push(/* @__PURE__ */ f("path", {
				className: "chart__radial-track",
				d: oe(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.999)
			}, `radial-track-${i}`)), !(c <= 0) && Q.push(/* @__PURE__ */ f("path", {
				className: `chart__radial-bar${Z(s) ? " chart__radial-bar--muted" : ""}`,
				"data-slot": x(i, void 0, C),
				fill: Z(s) ? void 0 : S(i, void 0, C),
				"data-active": E === i || void 0,
				d: oe(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + c)
			}, `radial-bar-${i}`));
		});
	}
	!F && M && l.forEach((e, t) => {
		let n = Z(e.key), r = x(t, e.color, C), i = n ? void 0 : S(t, e.color, C);
		P.forEach((t, a) => {
			let o = t[e.key];
			typeof o != "number" || !Number.isFinite(o) || Q.push(/* @__PURE__ */ f("circle", {
				className: `chart__point${n ? " chart__point--muted" : ""}`,
				"data-slot": r,
				fill: i,
				cx: lt(Je[a] ?? 0),
				cy: W(o),
				r: h.dotSize / 2,
				"data-active": E === a || void 0
			}, `point-${e.key}-${a}`));
		});
	}), !F && Re && l.forEach((e, t) => {
		let n = Z(e.key), r = x(t, e.color, C), i = n ? void 0 : S(t, e.color, C), a = P.map((t, n) => pt(y(t[e.key]), n));
		if (a.length === 0) return;
		let o = `${a.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" ")} Z`;
		Q.push(/* @__PURE__ */ f("path", {
			className: `chart__radar-shape${n ? " chart__radar-shape--muted" : ""}`,
			"data-slot": r,
			fill: i,
			stroke: i,
			d: o
		}, `radar-${e.key}`)), a.forEach((t, a) => {
			Q.push(/* @__PURE__ */ f("circle", {
				className: `chart__marker${n ? " chart__marker--muted" : ""}`,
				"data-slot": r,
				fill: i,
				cx: t.x,
				cy: t.y,
				r: h.markerSize / 2,
				"data-active": E === a || void 0
			}, `radar-dot-${e.key}-${a}`));
		});
	});
	let $ = E === null ? void 0 : P[E], _t = $ ? j ? [{
		key: ut,
		label: String(b($, v)),
		value: k(y($[ut])),
		index: E ?? 0
	}] : l.map((e, t) => ({
		key: e.key,
		label: e.label,
		value: k(y($[e.key]), e),
		index: t
	})) : [], vt = E === null ? 0 : N ? Y : M ? lt(Je[E] ?? 0) : a === "bar" && R ? G(L) : a === "bar" ? ct(E) : st(E), yt = E === null ? 0 : N ? X - J : a === "bar" && R ? ct(E) : B, bt = Me && $ ? [j ? k(q) : A(b($, v)), ..._t.map((e) => `${e.label}: ${e.value}`)].join(" · ") : "", xt = i({
		"inset-inline-start": `${z}px`,
		"inset-block-start": `${B}px`,
		width: `${H}px`,
		height: `${U}px`
	}), St = i({
		left: `${vt}px`,
		top: `${yt}px`
	});
	return /* @__PURE__ */ p("figure", {
		ref: ke,
		className: Ve,
		...Oe,
		children: [
			fe ? /* @__PURE__ */ f("figcaption", {
				className: "chart__title",
				children: fe
			}) : null,
			F ? /* @__PURE__ */ f("p", {
				className: "chart__empty",
				children: O("empty", Ee)
			}) : /* @__PURE__ */ p("div", {
				className: "chart__plot",
				ref: Ae,
				children: [
					/* @__PURE__ */ p("svg", {
						className: "chart__canvas",
						viewBox: `0 0 ${je} ${rt}`,
						width: je,
						height: rt,
						"aria-hidden": "true",
						children: [
							ve && !N ? /* @__PURE__ */ f("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: I.map((e) => R ? /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: G(e),
									y1: B,
									x2: G(e),
									y2: V
								}, e) : /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: z,
									y1: W(e),
									x2: nt,
									y2: W(e)
								}, e))
							}) : null,
							N ? null : /* @__PURE__ */ p("g", {
								className: "chart__axes",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ f("line", {
										className: "chart__axis",
										x1: R ? at : z,
										y1: R ? B : it,
										x2: R ? at : nt,
										y2: R ? V : it
									}),
									R ? Qe.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: z - h.axisGap,
										y: ct(t),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: e
									}, `cat-${t}`)) : I.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: z - h.axisGap,
										y: W(e),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: qe[t]
									}, `tick-${e}`)),
									R ? I.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: G(e),
										y: V + h.axisGap + h.labelFontSize,
										textAnchor: "middle",
										children: qe[t]
									}, `vtick-${e}`)) : Qe.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: M ? lt(Ye[t] ?? 0) : a === "bar" ? ct(t) : st(t),
										y: V + h.axisGap + h.labelFontSize,
										textAnchor: M ? "middle" : t === 0 && a !== "bar" ? "start" : t === P.length - 1 && a !== "bar" ? "end" : "middle",
										children: e
									}, `cat-${t}`))
								]
							}),
							ve && M ? /* @__PURE__ */ f("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: Ye.map((e) => /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: lt(e),
									y1: B,
									x2: lt(e),
									y2: V
								}, `xgrid-${e}`))
							}) : null,
							Re && P.length > 0 ? /* @__PURE__ */ p("g", {
								className: "chart__radar-grid",
								"aria-hidden": "true",
								children: [
									I.filter((e) => e > 0).map((e) => /* @__PURE__ */ f("path", {
										className: "chart__grid-line",
										d: `${ft.map((t, n) => {
											let r = J * (L > 0 ? e / L : 0);
											return `${n === 0 ? "M" : "L"} ${Y + r * Math.cos(t)} ${X + r * Math.sin(t)}`;
										}).join(" ")} Z`
									}, `web-${e}`)),
									ft.map((e, t) => /* @__PURE__ */ f("line", {
										className: "chart__grid-line",
										x1: Y,
										y1: X,
										x2: Y + J * Math.cos(e),
										y2: X + J * Math.sin(e)
									}, `spoke-${t}`)),
									ft.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: Y + (J + h.axisGap) * Math.cos(e),
										y: X + (J + h.axisGap) * Math.sin(e),
										textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
										dominantBaseline: "middle",
										children: Qe[t]
									}, `radar-cat-${t}`))
								]
							}) : null,
							E !== null && T && (a === "line" || a === "area") ? /* @__PURE__ */ f("line", {
								className: "chart__crosshair",
								"aria-hidden": "true",
								x1: st(E),
								y1: B,
								x2: st(E),
								y2: V
							}) : null,
							/* @__PURE__ */ f("g", {
								className: "chart__marks",
								children: Q
							}),
							a === "donut" ? /* @__PURE__ */ f("text", {
								className: "chart__center-value",
								x: Y,
								y: X,
								textAnchor: "middle",
								dominantBaseline: "middle",
								children: k(q)
							}) : null
						]
					}),
					/* @__PURE__ */ f("div", {
						ref: xt,
						className: "chart__hit-layer",
						role: "img",
						"aria-label": de,
						"aria-describedby": Pe,
						tabIndex: T ? 0 : void 0,
						onPointerMove: T ? (e) => {
							Ne(!1), D(mt(e));
						} : void 0,
						onPointerLeave: T ? () => D(null) : void 0,
						onKeyDown: T ? gt : void 0,
						onBlur: T ? () => {
							Ne(!1), D(null);
						} : void 0
					}),
					T && E !== null && $ ? /* @__PURE__ */ p("div", {
						ref: St,
						className: "chart__tooltip",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ f("p", {
							className: "chart__tooltip-header",
							children: j ? k(q) : A(b($, v))
						}), /* @__PURE__ */ f("ul", {
							className: "chart__tooltip-list",
							children: _t.map((e) => /* @__PURE__ */ p("li", {
								className: "chart__tooltip-row",
								children: [
									/* @__PURE__ */ f(te, {
										className: "chart__tooltip-key",
										index: e.index,
										color: j ? void 0 : l[e.index]?.color,
										palette: C
									}),
									/* @__PURE__ */ f("span", {
										className: "chart__tooltip-value",
										children: e.value
									}),
									/* @__PURE__ */ f("span", {
										className: "chart__tooltip-label",
										children: e.label
									})
								]
							}, e.key + e.label))
						})]
					}) : null
				]
			}),
			ze && !F ? /* @__PURE__ */ f("div", {
				className: "chart__legend",
				children: /* @__PURE__ */ f(n, {
					gap: "sm",
					children: (j ? P.map((e, t) => ({
						key: String(b(e, v)),
						label: A(b(e, v)),
						index: t,
						color: void 0
					})) : l.map((e, t) => ({
						key: e.key,
						label: e.label,
						index: t,
						color: e.color
					}))).map((e) => /* @__PURE__ */ p(r, {
						variant: "neutral",
						className: `chart__legend-item${Z(e.key) ? " chart__legend-item--muted" : ""}`,
						children: [/* @__PURE__ */ f(te, {
							className: `chart__legend-swatch${a === "line" ? " chart__legend-swatch--line" : ""}`,
							index: e.index,
							color: e.color,
							palette: C,
							muted: Z(e.key)
						}), e.label]
					}, e.key))
				})
			}) : null,
			pe ? /* @__PURE__ */ f("p", {
				className: "chart__caption",
				children: pe
			}) : null,
			/* @__PURE__ */ f(t, {
				role: "status",
				children: bt
			}),
			/* @__PURE__ */ f(t, {
				id: Pe,
				children: O("tableHint", Se)
			}),
			/* @__PURE__ */ f(t, {
				as: "div",
				children: /* @__PURE__ */ p("table", {
					className: "chart__table",
					children: [
						/* @__PURE__ */ f("caption", { children: O("tableCaption", xe) }),
						/* @__PURE__ */ f("thead", { children: /* @__PURE__ */ p("tr", { children: [/* @__PURE__ */ f("th", {
							scope: "col",
							children: O("category", Ce)
						}), j ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("th", {
							scope: "col",
							children: O("value", we)
						}), /* @__PURE__ */ f("th", {
							scope: "col",
							children: O("share", Te)
						})] }) : l.map((e) => /* @__PURE__ */ f("th", {
							scope: "col",
							children: e.label
						}, e.key))] }) }),
						/* @__PURE__ */ f("tbody", { children: P.map((e, t) => /* @__PURE__ */ p("tr", { children: [/* @__PURE__ */ f("th", {
							scope: "row",
							children: A(b(e, v))
						}), j ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("td", { children: k(y(e[ut])) }), /* @__PURE__ */ f("td", { children: Ie.format(dt[t]?.share ?? 0) })] }) : l.map((t) => /* @__PURE__ */ f("td", { children: k(y(e[t.key]), t) }, t.key))] }, `row-${t}`)) })
					]
				})
			})
		]
	});
});
//#endregion
export { C as Chart };
