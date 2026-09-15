'use client';
import './chart.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Inline as n } from "./inline.js";
import { Tag as r } from "./tag.js";
import { t as i } from "./_shared/css-properties.js";
import { forwardRef as a, useEffect as o, useId as s, useMemo as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/organisms/Chart/Chart.tsx
var m = {
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
}, h = m.labelFontSize * .6, g = 640, _ = 8;
function v(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function y(e, t) {
	let n = e[t];
	return typeof n == "number" ? n : String(n ?? "");
}
function b(e, t, n) {
	if (!(t ?? n?.[e])) return e < _ ? String(e + 1) : "muted";
}
function x(e, t, n) {
	return t ?? n?.[e];
}
function ee(e, t, n) {
	if (!(t || n?.[e])) return e < _ ? String(e + 1) : "muted";
}
function te({ className: e, index: t, color: n, palette: r, muted: i }) {
	return /* @__PURE__ */ f("svg", {
		className: e,
		"aria-hidden": "true",
		"data-slot": b(t, n, r),
		children: /* @__PURE__ */ f("rect", {
			width: "100%",
			height: "100%",
			fill: i ? void 0 : x(t, n, r)
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
	let a = Math.max(0, Math.min(m.barRadius, i === "top" || i === "bottom" ? r : n, (i === "top" || i === "bottom" ? n : r) / 2));
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
var S = a(function({ type: a = "line", data: o, series: l, xKey: _, colors: S, orientation: ce = "vertical", stacked: C = !1, emphasis: le, height: ue = 256, ariaLabel: de, title: fe, caption: pe, formatValue: me, formatX: he, yTicks: ge = 5, legend: _e, grid: ve = !0, tooltip: w = !0, valueLabels: ye, locale: be = "es-ES", tableCaption: xe, tableHint: Se, categoryLabel: Ce, valueLabel: we, shareLabel: Te, emptyMessage: Ee, className: De, ...Oe }, ke) {
	let [Ae, je] = se(g), [T, E] = u(null), [Me, Ne] = u(!1), Pe = s(), Fe = c(() => new Intl.NumberFormat(be), [be]), D = e("chart"), Ie = c(() => new Intl.NumberFormat(be, {
		style: "percent",
		maximumFractionDigits: 1
	}), [be]), O = (e, t) => me ? me(e, t) : Fe.format(e), k = (e) => he ? he(e) : String(e), Le = a === "pie" || a === "donut", A = Le || a === "funnel" || a === "treemap" || a === "radial-bar", j = a === "scatter", Re = a === "radar", M = A || Re, ze = _e ?? (A ? o.length > 1 : l.length > 1), Be = ye ?? (a === "line" || a === "area" ? "last" : "none"), N = o, P = N.length === 0 || l.length === 0, Ve = [
		"chart",
		`chart--${a}`,
		a === "bar" ? `chart--${ce}` : "",
		C ? "chart--stacked" : "",
		De
	].filter(Boolean).join(" "), He = N.map((e) => l.map((t) => v(e[t.key]))), Ue = He.map((e) => e.reduce((e, t) => e + t, 0)), We = He.flat(), F = ie(We.length ? Math.min(0, ...We) : 0, C ? Math.max(0, ...Ue) : We.length ? Math.max(0, ...We) : 1, ge), Ge = F[0] ?? 0, Ke = F[F.length - 1] ?? 1, qe = Ke - Ge || 1, Je = F.map((e) => O(e)), Ye = N.map((e) => typeof e[_] == "number" ? e[_] : 0), I = j ? ie(Math.min(...Ye, 0), Math.max(...Ye, 1), ge) : [], Xe = I[0] ?? 0, Ze = (I[I.length - 1] ?? 1) - Xe || 1, Qe = j ? I.map((e) => O(e)) : N.map((e) => k(y(e, _))), L = a === "bar" && ce === "horizontal", $e = L ? Qe : Je, et = M ? m.padding : m.padding + Math.max(...$e.map((e) => e.length), 1) * h + m.axisGap, tt = M ? 0 : Math.round(m.labelFontSize * 1.4) + m.axisGap, R = et, nt = Math.max(R + 1, je - m.padding), z = m.padding, B = Math.max(z + 1, ue - m.padding), V = nt - R, H = B - z, rt = ue + tt, U = (e) => B - (e - Ge) / qe * H, W = (e) => R + (e - Ge) / qe * V, it = U(0), at = W(0), ot = N.length ? (L ? H : V) / N.length : 0, st = (e) => N.length > 1 ? R + e * V / (N.length - 1) : R + V / 2, ct = (e) => (L ? z : R) + ot * (e + .5), G = (e) => R + (e - Xe) / Ze * V, lt = l[0]?.key ?? "", K = N.map((e) => v(e[lt])), q = K.reduce((e, t) => e + t, 0), J = Math.max(1, Math.min(V, H) / 2 - m.labelFontSize * 2), Y = R + V / 2, X = z + H / 2, ut = K.map((e, t) => {
		let n = K.slice(0, t).reduce((e, t) => e + t, 0), r = -Math.PI / 2 + (q > 0 ? n / q * Math.PI * 2 : 0);
		return {
			from: r,
			to: r + (q > 0 ? e / q * Math.PI * 2 : 0),
			share: q > 0 ? e / q : 0
		};
	}), dt = N.map((e, t) => -Math.PI / 2 + (N.length ? t * Math.PI * 2 / N.length : 0)), ft = (e, t) => {
		let n = J * Math.max(0, Math.min(1, Ke > 0 ? e / Ke : 0)), r = dt[t] ?? 0;
		return {
			x: Y + n * Math.cos(r),
			y: X + n * Math.sin(r)
		};
	}, Z = (e) => !!le && le !== e, pt = (e) => {
		if (M || N.length === 0) return null;
		let t = e.currentTarget.getBoundingClientRect();
		if (a === "line" || a === "area") {
			let n = e.clientX - t.left, r = N.length > 1 ? V / (N.length - 1) : V;
			return Math.max(0, Math.min(N.length - 1, Math.round(n / r)));
		}
		if (j) {
			let n = e.clientX - t.left + R, r = 0, i = Infinity;
			return Ye.forEach((e, t) => {
				let a = Math.abs(G(e) - n);
				a < i && (i = a, r = t);
			}), r;
		}
		let n = L ? e.clientY - t.top : e.clientX - t.left;
		return Math.max(0, Math.min(N.length - 1, Math.floor(n / (ot || 1))));
	}, mt = (e) => {
		E((t) => {
			let n = (t ?? 0) + e;
			return Math.max(0, Math.min(N.length - 1, n));
		});
	}, ht = (e) => {
		Ne(!0), e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), mt(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), mt(-1)) : e.key === "Home" ? (e.preventDefault(), E(0)) : e.key === "End" ? (e.preventDefault(), E(N.length - 1)) : e.key === "Escape" && E(null);
	}, Q = [];
	if (!P && (a === "line" || a === "area")) {
		let e = N.map(() => 0), t = null, n = [];
		l.forEach((r, i) => {
			let o = N.map((t, n) => {
				let i = v(t[r.key]), a = i;
				return C && (e[n] = (e[n] ?? 0) + i, a = e[n]), {
					x: st(n),
					y: U(a),
					value: i
				};
			}), s = o.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), c = Z(r.key), l = b(i, r.color, S), u = c ? void 0 : x(i, r.color, S), d = o[0], p = o[o.length - 1];
			if (a === "area" && d && p) {
				let e = C && t ? [...t].reverse().map((e) => `L ${e.x} ${e.y}`).join(" ") : `L ${p.x} ${it} L ${d.x} ${it}`;
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
				let n = t === o.length - 1, i = T === t;
				!n && !i || Q.push(/* @__PURE__ */ f("circle", {
					className: `chart__marker${c ? " chart__marker--muted" : ""}`,
					"data-slot": l,
					fill: u,
					cx: e.x,
					cy: e.y,
					r: m.markerSize / 2,
					"data-active": i || void 0
				}, `dot-${r.key}-${t}`));
			}), (Be === "all" ? o : Be === "last" && p ? [p] : Be === "extremes" ? [d, p].filter(Boolean) : []).forEach((e, t) => {
				e && n.push({
					key: `label-${r.key}-${t}`,
					x: e.x,
					y: e.y - m.axisGap,
					text: O(e.value, r)
				});
			}), t = o.map((e) => ({
				x: e.x,
				y: e.y
			}));
		});
		let r = [];
		n.forEach((e) => {
			r.some((t) => Math.abs(t.x - e.x) < h * e.text.length && Math.abs(t.y - e.y) < m.labelFontSize * 1.2) || (r.push({
				x: e.x,
				y: e.y
			}), Q.push(/* @__PURE__ */ f("text", {
				className: "chart__value-label",
				x: e.x,
				y: e.y,
				textAnchor: e.x > nt - m.barMaxThickness * 2 ? "end" : "middle",
				children: e.text
			}, e.key)));
		});
	}
	if (!P && a === "bar") {
		let e = Math.min(m.barMaxThickness * l.length + m.markGap * (l.length - 1), ot * .72), t = C ? Math.min(m.barMaxThickness, ot * .72) : Math.max(1, (e - m.markGap * (l.length - 1)) / l.length);
		N.forEach((e, n) => {
			let r = ct(n), i = 0, a = 0;
			l.forEach((o, s) => {
				let c = v(e[o.key]), u = Z(o.key), d = b(s, o.color, S), p = u ? void 0 : x(s, o.color, S), h = r + (C ? 0 : (s - (l.length - 1) / 2) * (t + m.markGap)) - t / 2, g = C ? c >= 0 ? i : a : 0, _ = g + c;
				C && (c >= 0 ? i = _ : a = _);
				let y = C && g !== 0 ? m.markGap : 0, ee = "";
				if (L) {
					let e = W(g) + (c >= 0 ? y : 0), n = W(_);
					ee = ae(Math.min(e, n), h, Math.abs(n - e), t, c >= 0 ? "right" : "left");
				} else {
					let e = U(g) - (c >= 0 ? y : 0), n = U(_);
					ee = ae(h, Math.min(e, n), t, Math.abs(n - e), c >= 0 ? "top" : "bottom");
				}
				if (ee && (Q.push(/* @__PURE__ */ f("path", {
					className: `chart__bar${u ? " chart__bar--muted" : ""}`,
					"data-slot": d,
					fill: p,
					d: ee,
					"data-active": T === n || void 0
				}, `bar-${n}-${o.key}`)), Be === "all" && !C)) {
					let e = L ? W(_) : U(_);
					Q.push(/* @__PURE__ */ f("text", {
						className: "chart__value-label",
						x: L ? e + m.axisGap : h + t / 2,
						y: L ? h + t / 2 : e - m.axisGap,
						textAnchor: L ? "start" : "middle",
						dominantBaseline: L ? "middle" : "auto",
						children: O(c, o)
					}, `bar-label-${n}-${o.key}`));
				}
			});
		});
	}
	if (!P && Le) {
		let e = a === "donut" ? J * (1 - m.donutThickness) : 0;
		ut.forEach((t, n) => {
			if (t.to - t.from <= 0) return;
			let r = String(y(N[n], _));
			if (Q.push(/* @__PURE__ */ f("path", {
				className: `chart__slice${Z(r) ? " chart__slice--muted" : ""}`,
				"data-slot": b(n, void 0, S),
				fill: Z(r) ? void 0 : x(n, void 0, S),
				d: oe(Y, X, J, e, t.from, t.to),
				"data-active": T === n || void 0
			}, `slice-${n}`)), t.share >= .05) {
				let e = (t.from + t.to) / 2, r = Y + (J + m.axisGap) * Math.cos(e), i = X + (J + m.axisGap) * Math.sin(e);
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
	if (!P && a === "funnel") {
		let e = Math.max(...K, 1), t = H / Math.max(1, N.length), n = (t) => Math.max(0, t) / e * V;
		K.forEach((e, r) => {
			let i = z + t * r, a = Math.max(0, t - m.funnelGap), o = K[r + 1], s = String(y(N[r], _));
			Q.push(/* @__PURE__ */ f("path", {
				className: `chart__funnel-step${Z(s) ? " chart__funnel-step--muted" : ""}`,
				"data-slot": b(r, void 0, S),
				fill: Z(s) ? void 0 : x(r, void 0, S),
				"data-active": T === r || void 0,
				d: ne(Y, i, a, n(e), n(o ?? e))
			}, `funnel-${r}`)), Q.push(/* @__PURE__ */ f("text", {
				className: "chart__value-label",
				x: Y,
				y: i + a / 2,
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: `${k(y(N[r], _))} · ${O(e)}`
			}, `funnel-label-${r}`));
		});
	}
	if (!P && a === "treemap" && re(K.map((e, t) => ({
		value: Math.max(0, e),
		index: t
	})).filter((e) => e.value > 0), R, z, V, H).forEach((e) => {
		let t = String(y(N[e.index], _)), n = Math.max(0, e.w - m.treemapGap), r = Math.max(0, e.h - m.treemapGap);
		Q.push(/* @__PURE__ */ f("rect", {
			className: `chart__tile${Z(t) ? " chart__tile--muted" : ""}`,
			"data-slot": b(e.index, void 0, S),
			fill: Z(t) ? void 0 : x(e.index, void 0, S),
			"data-active": T === e.index || void 0,
			x: e.x,
			y: e.y,
			width: n,
			height: r
		}, `tile-${e.index}`)), n > h * 4 && r > m.labelFontSize * 2 && Q.push(/* @__PURE__ */ f("text", {
			className: "chart__tile-label",
			"data-slot": ee(e.index, void 0, S),
			x: e.x + m.axisGap,
			y: e.y + m.axisGap + m.labelFontSize,
			children: k(y(N[e.index], _))
		}, `tile-label-${e.index}`));
	}), !P && a === "radial-bar") {
		let e = Math.max(...K, 1), t = J / Math.max(1, N.length), n = Math.max(1, t - m.radialBarGap);
		K.forEach((r, i) => {
			let a = J - t * i, o = a - n, s = String(y(N[i], _)), c = Math.max(0, r) / e * Math.PI * 1.999;
			Q.push(/* @__PURE__ */ f("path", {
				className: "chart__radial-track",
				d: oe(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.999)
			}, `radial-track-${i}`)), !(c <= 0) && Q.push(/* @__PURE__ */ f("path", {
				className: `chart__radial-bar${Z(s) ? " chart__radial-bar--muted" : ""}`,
				"data-slot": b(i, void 0, S),
				fill: Z(s) ? void 0 : x(i, void 0, S),
				"data-active": T === i || void 0,
				d: oe(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + c)
			}, `radial-bar-${i}`));
		});
	}
	!P && j && l.forEach((e, t) => {
		let n = Z(e.key), r = b(t, e.color, S), i = n ? void 0 : x(t, e.color, S);
		N.forEach((t, a) => {
			let o = t[e.key];
			typeof o != "number" || !Number.isFinite(o) || Q.push(/* @__PURE__ */ f("circle", {
				className: `chart__point${n ? " chart__point--muted" : ""}`,
				"data-slot": r,
				fill: i,
				cx: G(Ye[a] ?? 0),
				cy: U(o),
				r: m.dotSize / 2,
				"data-active": T === a || void 0
			}, `point-${e.key}-${a}`));
		});
	}), !P && Re && l.forEach((e, t) => {
		let n = Z(e.key), r = b(t, e.color, S), i = n ? void 0 : x(t, e.color, S), a = N.map((t, n) => ft(v(t[e.key]), n));
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
				r: m.markerSize / 2,
				"data-active": T === a || void 0
			}, `radar-dot-${e.key}-${a}`));
		});
	});
	let $ = T === null ? void 0 : N[T], gt = $ ? A ? [{
		key: lt,
		label: String(y($, _)),
		value: O(v($[lt])),
		index: T ?? 0
	}] : l.map((e, t) => ({
		key: e.key,
		label: e.label,
		value: O(v($[e.key]), e),
		index: t
	})) : [], _t = T === null ? 0 : M ? Y : j ? G(Ye[T] ?? 0) : a === "bar" && L ? W(Ke) : a === "bar" ? ct(T) : st(T), vt = T === null ? 0 : M ? X - J : a === "bar" && L ? ct(T) : z, yt = Me && $ ? [A ? O(q) : k(y($, _)), ...gt.map((e) => `${e.label}: ${e.value}`)].join(" · ") : "", bt = i({
		"inset-inline-start": `${R}px`,
		"inset-block-start": `${z}px`,
		width: `${V}px`,
		height: `${H}px`
	}), xt = i({
		left: `${_t}px`,
		top: `${vt}px`
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
			P ? /* @__PURE__ */ f("p", {
				className: "chart__empty",
				children: D("empty", Ee)
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
							ve && !M ? /* @__PURE__ */ f("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: F.map((e) => L ? /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: W(e),
									y1: z,
									x2: W(e),
									y2: B
								}, e) : /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: R,
									y1: U(e),
									x2: nt,
									y2: U(e)
								}, e))
							}) : null,
							M ? null : /* @__PURE__ */ p("g", {
								className: "chart__axes",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ f("line", {
										className: "chart__axis",
										x1: L ? at : R,
										y1: L ? z : it,
										x2: L ? at : nt,
										y2: L ? B : it
									}),
									L ? Qe.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: R - m.axisGap,
										y: ct(t),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: e
									}, `cat-${t}`)) : F.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: R - m.axisGap,
										y: U(e),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: Je[t]
									}, `tick-${e}`)),
									L ? F.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: W(e),
										y: B + m.axisGap + m.labelFontSize,
										textAnchor: "middle",
										children: Je[t]
									}, `vtick-${e}`)) : Qe.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: j ? G(I[t] ?? 0) : a === "bar" ? ct(t) : st(t),
										y: B + m.axisGap + m.labelFontSize,
										textAnchor: j ? "middle" : t === 0 && a !== "bar" ? "start" : t === N.length - 1 && a !== "bar" ? "end" : "middle",
										children: e
									}, `cat-${t}`))
								]
							}),
							ve && j ? /* @__PURE__ */ f("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: I.map((e) => /* @__PURE__ */ f("line", {
									className: "chart__grid-line",
									x1: G(e),
									y1: z,
									x2: G(e),
									y2: B
								}, `xgrid-${e}`))
							}) : null,
							Re && N.length > 0 ? /* @__PURE__ */ p("g", {
								className: "chart__radar-grid",
								"aria-hidden": "true",
								children: [
									F.filter((e) => e > 0).map((e) => /* @__PURE__ */ f("path", {
										className: "chart__grid-line",
										d: `${dt.map((t, n) => {
											let r = J * (Ke > 0 ? e / Ke : 0);
											return `${n === 0 ? "M" : "L"} ${Y + r * Math.cos(t)} ${X + r * Math.sin(t)}`;
										}).join(" ")} Z`
									}, `web-${e}`)),
									dt.map((e, t) => /* @__PURE__ */ f("line", {
										className: "chart__grid-line",
										x1: Y,
										y1: X,
										x2: Y + J * Math.cos(e),
										y2: X + J * Math.sin(e)
									}, `spoke-${t}`)),
									dt.map((e, t) => /* @__PURE__ */ f("text", {
										className: "chart__axis-label",
										x: Y + (J + m.axisGap) * Math.cos(e),
										y: X + (J + m.axisGap) * Math.sin(e),
										textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
										dominantBaseline: "middle",
										children: Qe[t]
									}, `radar-cat-${t}`))
								]
							}) : null,
							T !== null && w && (a === "line" || a === "area") ? /* @__PURE__ */ f("line", {
								className: "chart__crosshair",
								"aria-hidden": "true",
								x1: st(T),
								y1: z,
								x2: st(T),
								y2: B
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
								children: O(q)
							}) : null
						]
					}),
					/* @__PURE__ */ f("div", {
						ref: bt,
						className: "chart__hit-layer",
						role: "img",
						"aria-label": de,
						"aria-describedby": Pe,
						tabIndex: w ? 0 : void 0,
						onPointerMove: w ? (e) => {
							Ne(!1), E(pt(e));
						} : void 0,
						onPointerLeave: w ? () => E(null) : void 0,
						onKeyDown: w ? ht : void 0,
						onBlur: w ? () => {
							Ne(!1), E(null);
						} : void 0
					}),
					w && T !== null && $ ? /* @__PURE__ */ p("div", {
						ref: xt,
						className: "chart__tooltip",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ f("p", {
							className: "chart__tooltip-header",
							children: A ? O(q) : k(y($, _))
						}), /* @__PURE__ */ f("ul", {
							className: "chart__tooltip-list",
							children: gt.map((e) => /* @__PURE__ */ p("li", {
								className: "chart__tooltip-row",
								children: [
									/* @__PURE__ */ f(te, {
										className: "chart__tooltip-key",
										index: e.index,
										color: A ? void 0 : l[e.index]?.color,
										palette: S
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
			ze && !P ? /* @__PURE__ */ f("div", {
				className: "chart__legend",
				children: /* @__PURE__ */ f(n, {
					gap: "sm",
					children: (A ? N.map((e, t) => ({
						key: String(y(e, _)),
						label: k(y(e, _)),
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
							palette: S,
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
				children: yt
			}),
			/* @__PURE__ */ f(t, {
				id: Pe,
				children: D("tableHint", Se)
			}),
			/* @__PURE__ */ f(t, {
				as: "div",
				children: /* @__PURE__ */ p("table", {
					className: "chart__table",
					children: [
						/* @__PURE__ */ f("caption", { children: D("tableCaption", xe) }),
						/* @__PURE__ */ f("thead", { children: /* @__PURE__ */ p("tr", { children: [/* @__PURE__ */ f("th", {
							scope: "col",
							children: D("category", Ce)
						}), A ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("th", {
							scope: "col",
							children: D("value", we)
						}), /* @__PURE__ */ f("th", {
							scope: "col",
							children: D("share", Te)
						})] }) : l.map((e) => /* @__PURE__ */ f("th", {
							scope: "col",
							children: e.label
						}, e.key))] }) }),
						/* @__PURE__ */ f("tbody", { children: N.map((e, t) => /* @__PURE__ */ p("tr", { children: [/* @__PURE__ */ f("th", {
							scope: "row",
							children: k(y(e, _))
						}), A ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("td", { children: O(v(e[lt])) }), /* @__PURE__ */ f("td", { children: Ie.format(ut[t]?.share ?? 0) })] }) : l.map((t) => /* @__PURE__ */ f("td", { children: O(v(e[t.key]), t) }, t.key))] }, `row-${t}`)) })
					]
				})
			})
		]
	});
});
//#endregion
export { S as Chart };
