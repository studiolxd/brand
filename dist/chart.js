'use client';
import './chart.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Inline as t } from "./inline.js";
import { Tag as n } from "./tag.js";
import { t as r } from "./_shared/css-properties.js";
import { forwardRef as i, useEffect as a, useId as o, useMemo as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/organisms/Chart/Chart.tsx
var p = {
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
}, m = p.labelFontSize * .6, h = 640, g = 8;
function _(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function v(e, t) {
	let n = e[t];
	return typeof n == "number" ? n : String(n ?? "");
}
function y(e, t, n) {
	if (!(t ?? n?.[e])) return e < g ? String(e + 1) : "muted";
}
function b(e, t, n) {
	return t ?? n?.[e];
}
function ee(e, t, n) {
	if (!(t || n?.[e])) return e < g ? String(e + 1) : "muted";
}
function x({ className: e, index: t, color: n, palette: r, muted: i }) {
	return /* @__PURE__ */ d("svg", {
		className: e,
		"aria-hidden": "true",
		"data-slot": y(t, n, r),
		children: /* @__PURE__ */ d("rect", {
			width: "100%",
			height: "100%",
			fill: i ? void 0 : b(t, n, r)
		})
	});
}
function te(e, t, n, r, i) {
	return `M ${e - r / 2} ${t} L ${e + r / 2} ${t} L ${e + i / 2} ${t + n} L ${e - i / 2} ${t + n} Z`;
}
function ne(e, t, n, r, i) {
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
function re(e, t, n) {
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
function ie(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.max(0, Math.min(p.barRadius, i === "top" || i === "bottom" ? r : n, (i === "top" || i === "bottom" ? n : r) / 2));
	switch (i) {
		case "top": return `M ${e} ${t + r} L ${e} ${t + a} Q ${e} ${t} ${e + a} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r} Z`;
		case "bottom": return `M ${e} ${t} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n - a} ${t + r} Q ${e + n} ${t + r} ${e + n} ${t + r - a} L ${e + n} ${t} Z`;
		case "right": return `M ${e} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r - a} Q ${e + n} ${t + r} ${e + n - a} ${t + r} L ${e} ${t + r} Z`;
		default: return `M ${e + n} ${t} L ${e + a} ${t} Q ${e} ${t} ${e} ${t + a} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n} ${t + r} Z`;
	}
}
function ae(e, t, n, r, i, a) {
	let o = a - i > Math.PI ? 1 : 0, s = (n, r) => `${e + n * Math.cos(r)} ${t + n * Math.sin(r)}`;
	return r <= 0 ? `M ${e} ${t} L ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} Z` : `M ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} L ${s(r, a)} A ${r} ${r} 0 ${o} 0 ${s(r, i)} Z`;
}
function oe(e) {
	let t = c(null), [n, r] = l(e);
	return a(() => {
		let e = t.current;
		if (!e || typeof ResizeObserver > "u") return;
		let n = new ResizeObserver((e) => {
			let t = e[0]?.contentRect.width;
			t && t > 0 && r(Math.round(t));
		});
		return n.observe(e), () => n.disconnect();
	}, []), [t, n];
}
var S = i(function({ type: i = "line", data: a, series: c, xKey: g, colors: S, orientation: se = "vertical", stacked: C = !1, emphasis: ce, height: le = 256, ariaLabel: ue, title: de, caption: fe, formatValue: pe, formatX: me, yTicks: he = 5, legend: ge, grid: _e = !0, tooltip: w = !0, valueLabels: ve, locale: ye = "es-ES", tableCaption: be = "Datos del gráfico", tableHint: xe = "Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.", categoryLabel: Se = "Categoría", valueLabel: Ce = "Valor", shareLabel: we = "Porcentaje", emptyMessage: Te = "Sin datos que mostrar", className: Ee, ...De }, Oe) {
	let [ke, Ae] = oe(h), [T, E] = l(null), [je, Me] = l(!1), Ne = o(), Pe = s(() => new Intl.NumberFormat(ye), [ye]), Fe = s(() => new Intl.NumberFormat(ye, {
		style: "percent",
		maximumFractionDigits: 1
	}), [ye]), D = (e, t) => pe ? pe(e, t) : Pe.format(e), O = (e) => me ? me(e) : String(e), Ie = i === "pie" || i === "donut", k = Ie || i === "funnel" || i === "treemap" || i === "radial-bar", A = i === "scatter", Le = i === "radar", j = k || Le, Re = ge ?? (k ? a.length > 1 : c.length > 1), ze = ve ?? (i === "line" || i === "area" ? "last" : "none"), M = a, N = M.length === 0 || c.length === 0, Be = [
		"chart",
		`chart--${i}`,
		i === "bar" ? `chart--${se}` : "",
		C ? "chart--stacked" : "",
		Ee
	].filter(Boolean).join(" "), Ve = M.map((e) => c.map((t) => _(e[t.key]))), He = Ve.map((e) => e.reduce((e, t) => e + t, 0)), Ue = Ve.flat(), P = re(Ue.length ? Math.min(0, ...Ue) : 0, C ? Math.max(0, ...He) : Ue.length ? Math.max(0, ...Ue) : 1, he), We = P[0] ?? 0, F = P[P.length - 1] ?? 1, Ge = F - We || 1, Ke = P.map((e) => D(e)), qe = M.map((e) => typeof e[g] == "number" ? e[g] : 0), I = A ? re(Math.min(...qe, 0), Math.max(...qe, 1), he) : [], Je = I[0] ?? 0, Ye = (I[I.length - 1] ?? 1) - Je || 1, Xe = A ? I.map((e) => D(e)) : M.map((e) => O(v(e, g))), L = i === "bar" && se === "horizontal", Ze = L ? Xe : Ke, Qe = j ? p.padding : p.padding + Math.max(...Ze.map((e) => e.length), 1) * m + p.axisGap, $e = j ? 0 : Math.round(p.labelFontSize * 1.4) + p.axisGap, R = Qe, et = Math.max(R + 1, Ae - p.padding), z = p.padding, B = Math.max(z + 1, le - p.padding), V = et - R, H = B - z, tt = le + $e, U = (e) => B - (e - We) / Ge * H, W = (e) => R + (e - We) / Ge * V, nt = U(0), rt = W(0), it = M.length ? (L ? H : V) / M.length : 0, at = (e) => M.length > 1 ? R + e * V / (M.length - 1) : R + V / 2, ot = (e) => (L ? z : R) + it * (e + .5), G = (e) => R + (e - Je) / Ye * V, st = c[0]?.key ?? "", K = M.map((e) => _(e[st])), q = K.reduce((e, t) => e + t, 0), J = Math.max(1, Math.min(V, H) / 2 - p.labelFontSize * 2), Y = R + V / 2, X = z + H / 2, ct = K.map((e, t) => {
		let n = K.slice(0, t).reduce((e, t) => e + t, 0), r = -Math.PI / 2 + (q > 0 ? n / q * Math.PI * 2 : 0);
		return {
			from: r,
			to: r + (q > 0 ? e / q * Math.PI * 2 : 0),
			share: q > 0 ? e / q : 0
		};
	}), lt = M.map((e, t) => -Math.PI / 2 + (M.length ? t * Math.PI * 2 / M.length : 0)), ut = (e, t) => {
		let n = J * Math.max(0, Math.min(1, F > 0 ? e / F : 0)), r = lt[t] ?? 0;
		return {
			x: Y + n * Math.cos(r),
			y: X + n * Math.sin(r)
		};
	}, Z = (e) => !!ce && ce !== e, dt = (e) => {
		if (j || M.length === 0) return null;
		let t = e.currentTarget.getBoundingClientRect();
		if (i === "line" || i === "area") {
			let n = e.clientX - t.left, r = M.length > 1 ? V / (M.length - 1) : V;
			return Math.max(0, Math.min(M.length - 1, Math.round(n / r)));
		}
		if (A) {
			let n = e.clientX - t.left + R, r = 0, i = Infinity;
			return qe.forEach((e, t) => {
				let a = Math.abs(G(e) - n);
				a < i && (i = a, r = t);
			}), r;
		}
		let n = L ? e.clientY - t.top : e.clientX - t.left;
		return Math.max(0, Math.min(M.length - 1, Math.floor(n / (it || 1))));
	}, ft = (e) => {
		E((t) => {
			let n = (t ?? 0) + e;
			return Math.max(0, Math.min(M.length - 1, n));
		});
	}, pt = (e) => {
		Me(!0), e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), ft(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), ft(-1)) : e.key === "Home" ? (e.preventDefault(), E(0)) : e.key === "End" ? (e.preventDefault(), E(M.length - 1)) : e.key === "Escape" && E(null);
	}, Q = [];
	if (!N && (i === "line" || i === "area")) {
		let e = M.map(() => 0), t = null, n = [];
		c.forEach((r, a) => {
			let o = M.map((t, n) => {
				let i = _(t[r.key]), a = i;
				return C && (e[n] = (e[n] ?? 0) + i, a = e[n]), {
					x: at(n),
					y: U(a),
					value: i
				};
			}), s = o.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), c = Z(r.key), l = y(a, r.color, S), u = c ? void 0 : b(a, r.color, S), f = o[0], m = o[o.length - 1];
			if (i === "area" && f && m) {
				let e = C && t ? [...t].reverse().map((e) => `L ${e.x} ${e.y}`).join(" ") : `L ${m.x} ${nt} L ${f.x} ${nt}`;
				Q.push(/* @__PURE__ */ d("path", {
					className: `chart__area${c ? " chart__area--muted" : ""}`,
					"data-slot": l,
					fill: u,
					d: `${s} ${e} Z`
				}, `area-${r.key}`));
			}
			Q.push(/* @__PURE__ */ d("path", {
				className: `chart__line${c ? " chart__line--muted" : ""}`,
				"data-slot": l,
				stroke: u,
				d: s
			}, `line-${r.key}`)), o.forEach((e, t) => {
				let n = t === o.length - 1, i = T === t;
				!n && !i || Q.push(/* @__PURE__ */ d("circle", {
					className: `chart__marker${c ? " chart__marker--muted" : ""}`,
					"data-slot": l,
					fill: u,
					cx: e.x,
					cy: e.y,
					r: p.markerSize / 2,
					"data-active": i || void 0
				}, `dot-${r.key}-${t}`));
			}), (ze === "all" ? o : ze === "last" && m ? [m] : ze === "extremes" ? [f, m].filter(Boolean) : []).forEach((e, t) => {
				e && n.push({
					key: `label-${r.key}-${t}`,
					x: e.x,
					y: e.y - p.axisGap,
					text: D(e.value, r)
				});
			}), t = o.map((e) => ({
				x: e.x,
				y: e.y
			}));
		});
		let r = [];
		n.forEach((e) => {
			r.some((t) => Math.abs(t.x - e.x) < m * e.text.length && Math.abs(t.y - e.y) < p.labelFontSize * 1.2) || (r.push({
				x: e.x,
				y: e.y
			}), Q.push(/* @__PURE__ */ d("text", {
				className: "chart__value-label",
				x: e.x,
				y: e.y,
				textAnchor: e.x > et - p.barMaxThickness * 2 ? "end" : "middle",
				children: e.text
			}, e.key)));
		});
	}
	if (!N && i === "bar") {
		let e = Math.min(p.barMaxThickness * c.length + p.markGap * (c.length - 1), it * .72), t = C ? Math.min(p.barMaxThickness, it * .72) : Math.max(1, (e - p.markGap * (c.length - 1)) / c.length);
		M.forEach((e, n) => {
			let r = ot(n), i = 0, a = 0;
			c.forEach((o, s) => {
				let l = _(e[o.key]), u = Z(o.key), f = y(s, o.color, S), m = u ? void 0 : b(s, o.color, S), h = r + (C ? 0 : (s - (c.length - 1) / 2) * (t + p.markGap)) - t / 2, g = C ? l >= 0 ? i : a : 0, v = g + l;
				C && (l >= 0 ? i = v : a = v);
				let ee = C && g !== 0 ? p.markGap : 0, x = "";
				if (L) {
					let e = W(g) + (l >= 0 ? ee : 0), n = W(v);
					x = ie(Math.min(e, n), h, Math.abs(n - e), t, l >= 0 ? "right" : "left");
				} else {
					let e = U(g) - (l >= 0 ? ee : 0), n = U(v);
					x = ie(h, Math.min(e, n), t, Math.abs(n - e), l >= 0 ? "top" : "bottom");
				}
				if (x && (Q.push(/* @__PURE__ */ d("path", {
					className: `chart__bar${u ? " chart__bar--muted" : ""}`,
					"data-slot": f,
					fill: m,
					d: x,
					"data-active": T === n || void 0
				}, `bar-${n}-${o.key}`)), ze === "all" && !C)) {
					let e = L ? W(v) : U(v);
					Q.push(/* @__PURE__ */ d("text", {
						className: "chart__value-label",
						x: L ? e + p.axisGap : h + t / 2,
						y: L ? h + t / 2 : e - p.axisGap,
						textAnchor: L ? "start" : "middle",
						dominantBaseline: L ? "middle" : "auto",
						children: D(l, o)
					}, `bar-label-${n}-${o.key}`));
				}
			});
		});
	}
	if (!N && Ie) {
		let e = i === "donut" ? J * (1 - p.donutThickness) : 0;
		ct.forEach((t, n) => {
			if (t.to - t.from <= 0) return;
			let r = String(v(M[n], g));
			if (Q.push(/* @__PURE__ */ d("path", {
				className: `chart__slice${Z(r) ? " chart__slice--muted" : ""}`,
				"data-slot": y(n, void 0, S),
				fill: Z(r) ? void 0 : b(n, void 0, S),
				d: ae(Y, X, J, e, t.from, t.to),
				"data-active": T === n || void 0
			}, `slice-${n}`)), t.share >= .05) {
				let e = (t.from + t.to) / 2, r = Y + (J + p.axisGap) * Math.cos(e), i = X + (J + p.axisGap) * Math.sin(e);
				Q.push(/* @__PURE__ */ d("text", {
					className: "chart__value-label",
					x: r,
					y: i,
					textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
					dominantBaseline: "middle",
					children: Fe.format(t.share)
				}, `slice-label-${n}`));
			}
		});
	}
	if (!N && i === "funnel") {
		let e = Math.max(...K, 1), t = H / Math.max(1, M.length), n = (t) => Math.max(0, t) / e * V;
		K.forEach((e, r) => {
			let i = z + t * r, a = Math.max(0, t - p.funnelGap), o = K[r + 1], s = String(v(M[r], g));
			Q.push(/* @__PURE__ */ d("path", {
				className: `chart__funnel-step${Z(s) ? " chart__funnel-step--muted" : ""}`,
				"data-slot": y(r, void 0, S),
				fill: Z(s) ? void 0 : b(r, void 0, S),
				"data-active": T === r || void 0,
				d: te(Y, i, a, n(e), n(o ?? e))
			}, `funnel-${r}`)), Q.push(/* @__PURE__ */ d("text", {
				className: "chart__value-label",
				x: Y,
				y: i + a / 2,
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: `${O(v(M[r], g))} · ${D(e)}`
			}, `funnel-label-${r}`));
		});
	}
	if (!N && i === "treemap" && ne(K.map((e, t) => ({
		value: Math.max(0, e),
		index: t
	})).filter((e) => e.value > 0), R, z, V, H).forEach((e) => {
		let t = String(v(M[e.index], g)), n = Math.max(0, e.w - p.treemapGap), r = Math.max(0, e.h - p.treemapGap);
		Q.push(/* @__PURE__ */ d("rect", {
			className: `chart__tile${Z(t) ? " chart__tile--muted" : ""}`,
			"data-slot": y(e.index, void 0, S),
			fill: Z(t) ? void 0 : b(e.index, void 0, S),
			"data-active": T === e.index || void 0,
			x: e.x,
			y: e.y,
			width: n,
			height: r
		}, `tile-${e.index}`)), n > m * 4 && r > p.labelFontSize * 2 && Q.push(/* @__PURE__ */ d("text", {
			className: "chart__tile-label",
			"data-slot": ee(e.index, void 0, S),
			x: e.x + p.axisGap,
			y: e.y + p.axisGap + p.labelFontSize,
			children: O(v(M[e.index], g))
		}, `tile-label-${e.index}`));
	}), !N && i === "radial-bar") {
		let e = Math.max(...K, 1), t = J / Math.max(1, M.length), n = Math.max(1, t - p.radialBarGap);
		K.forEach((r, i) => {
			let a = J - t * i, o = a - n, s = String(v(M[i], g)), c = Math.max(0, r) / e * Math.PI * 1.999;
			Q.push(/* @__PURE__ */ d("path", {
				className: "chart__radial-track",
				d: ae(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.999)
			}, `radial-track-${i}`)), !(c <= 0) && Q.push(/* @__PURE__ */ d("path", {
				className: `chart__radial-bar${Z(s) ? " chart__radial-bar--muted" : ""}`,
				"data-slot": y(i, void 0, S),
				fill: Z(s) ? void 0 : b(i, void 0, S),
				"data-active": T === i || void 0,
				d: ae(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + c)
			}, `radial-bar-${i}`));
		});
	}
	!N && A && c.forEach((e, t) => {
		let n = Z(e.key), r = y(t, e.color, S), i = n ? void 0 : b(t, e.color, S);
		M.forEach((t, a) => {
			let o = t[e.key];
			typeof o != "number" || !Number.isFinite(o) || Q.push(/* @__PURE__ */ d("circle", {
				className: `chart__point${n ? " chart__point--muted" : ""}`,
				"data-slot": r,
				fill: i,
				cx: G(qe[a] ?? 0),
				cy: U(o),
				r: p.dotSize / 2,
				"data-active": T === a || void 0
			}, `point-${e.key}-${a}`));
		});
	}), !N && Le && c.forEach((e, t) => {
		let n = Z(e.key), r = y(t, e.color, S), i = n ? void 0 : b(t, e.color, S), a = M.map((t, n) => ut(_(t[e.key]), n));
		if (a.length === 0) return;
		let o = `${a.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" ")} Z`;
		Q.push(/* @__PURE__ */ d("path", {
			className: `chart__radar-shape${n ? " chart__radar-shape--muted" : ""}`,
			"data-slot": r,
			fill: i,
			stroke: i,
			d: o
		}, `radar-${e.key}`)), a.forEach((t, a) => {
			Q.push(/* @__PURE__ */ d("circle", {
				className: `chart__marker${n ? " chart__marker--muted" : ""}`,
				"data-slot": r,
				fill: i,
				cx: t.x,
				cy: t.y,
				r: p.markerSize / 2,
				"data-active": T === a || void 0
			}, `radar-dot-${e.key}-${a}`));
		});
	});
	let $ = T === null ? void 0 : M[T], mt = $ ? k ? [{
		key: st,
		label: String(v($, g)),
		value: D(_($[st])),
		index: T ?? 0
	}] : c.map((e, t) => ({
		key: e.key,
		label: e.label,
		value: D(_($[e.key]), e),
		index: t
	})) : [], ht = T === null ? 0 : j ? Y : A ? G(qe[T] ?? 0) : i === "bar" && L ? W(F) : i === "bar" ? ot(T) : at(T), gt = T === null ? 0 : j ? X - J : i === "bar" && L ? ot(T) : z, _t = je && $ ? [k ? D(q) : O(v($, g)), ...mt.map((e) => `${e.label}: ${e.value}`)].join(" · ") : "", vt = r({
		"inset-inline-start": `${R}px`,
		"inset-block-start": `${z}px`,
		width: `${V}px`,
		height: `${H}px`
	}), yt = r({
		left: `${ht}px`,
		top: `${gt}px`
	});
	return /* @__PURE__ */ f("figure", {
		ref: Oe,
		className: Be,
		...De,
		children: [
			de ? /* @__PURE__ */ d("figcaption", {
				className: "chart__title",
				children: de
			}) : null,
			N ? /* @__PURE__ */ d("p", {
				className: "chart__empty",
				children: Te
			}) : /* @__PURE__ */ f("div", {
				className: "chart__plot",
				ref: ke,
				children: [
					/* @__PURE__ */ f("svg", {
						className: "chart__canvas",
						viewBox: `0 0 ${Ae} ${tt}`,
						width: Ae,
						height: tt,
						"aria-hidden": "true",
						children: [
							_e && !j ? /* @__PURE__ */ d("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: P.map((e) => L ? /* @__PURE__ */ d("line", {
									className: "chart__grid-line",
									x1: W(e),
									y1: z,
									x2: W(e),
									y2: B
								}, e) : /* @__PURE__ */ d("line", {
									className: "chart__grid-line",
									x1: R,
									y1: U(e),
									x2: et,
									y2: U(e)
								}, e))
							}) : null,
							j ? null : /* @__PURE__ */ f("g", {
								className: "chart__axes",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ d("line", {
										className: "chart__axis",
										x1: L ? rt : R,
										y1: L ? z : nt,
										x2: L ? rt : et,
										y2: L ? B : nt
									}),
									L ? Xe.map((e, t) => /* @__PURE__ */ d("text", {
										className: "chart__axis-label",
										x: R - p.axisGap,
										y: ot(t),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: e
									}, `cat-${t}`)) : P.map((e, t) => /* @__PURE__ */ d("text", {
										className: "chart__axis-label",
										x: R - p.axisGap,
										y: U(e),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: Ke[t]
									}, `tick-${e}`)),
									L ? P.map((e, t) => /* @__PURE__ */ d("text", {
										className: "chart__axis-label",
										x: W(e),
										y: B + p.axisGap + p.labelFontSize,
										textAnchor: "middle",
										children: Ke[t]
									}, `vtick-${e}`)) : Xe.map((e, t) => /* @__PURE__ */ d("text", {
										className: "chart__axis-label",
										x: A ? G(I[t] ?? 0) : i === "bar" ? ot(t) : at(t),
										y: B + p.axisGap + p.labelFontSize,
										textAnchor: A ? "middle" : t === 0 && i !== "bar" ? "start" : t === M.length - 1 && i !== "bar" ? "end" : "middle",
										children: e
									}, `cat-${t}`))
								]
							}),
							_e && A ? /* @__PURE__ */ d("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: I.map((e) => /* @__PURE__ */ d("line", {
									className: "chart__grid-line",
									x1: G(e),
									y1: z,
									x2: G(e),
									y2: B
								}, `xgrid-${e}`))
							}) : null,
							Le && M.length > 0 ? /* @__PURE__ */ f("g", {
								className: "chart__radar-grid",
								"aria-hidden": "true",
								children: [
									P.filter((e) => e > 0).map((e) => /* @__PURE__ */ d("path", {
										className: "chart__grid-line",
										d: `${lt.map((t, n) => {
											let r = J * (F > 0 ? e / F : 0);
											return `${n === 0 ? "M" : "L"} ${Y + r * Math.cos(t)} ${X + r * Math.sin(t)}`;
										}).join(" ")} Z`
									}, `web-${e}`)),
									lt.map((e, t) => /* @__PURE__ */ d("line", {
										className: "chart__grid-line",
										x1: Y,
										y1: X,
										x2: Y + J * Math.cos(e),
										y2: X + J * Math.sin(e)
									}, `spoke-${t}`)),
									lt.map((e, t) => /* @__PURE__ */ d("text", {
										className: "chart__axis-label",
										x: Y + (J + p.axisGap) * Math.cos(e),
										y: X + (J + p.axisGap) * Math.sin(e),
										textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
										dominantBaseline: "middle",
										children: Xe[t]
									}, `radar-cat-${t}`))
								]
							}) : null,
							T !== null && w && (i === "line" || i === "area") ? /* @__PURE__ */ d("line", {
								className: "chart__crosshair",
								"aria-hidden": "true",
								x1: at(T),
								y1: z,
								x2: at(T),
								y2: B
							}) : null,
							/* @__PURE__ */ d("g", {
								className: "chart__marks",
								children: Q
							}),
							i === "donut" ? /* @__PURE__ */ d("text", {
								className: "chart__center-value",
								x: Y,
								y: X,
								textAnchor: "middle",
								dominantBaseline: "middle",
								children: D(q)
							}) : null
						]
					}),
					/* @__PURE__ */ d("div", {
						ref: vt,
						className: "chart__hit-layer",
						role: "img",
						"aria-label": ue,
						"aria-describedby": Ne,
						tabIndex: w ? 0 : void 0,
						onPointerMove: w ? (e) => {
							Me(!1), E(dt(e));
						} : void 0,
						onPointerLeave: w ? () => E(null) : void 0,
						onKeyDown: w ? pt : void 0,
						onBlur: w ? () => {
							Me(!1), E(null);
						} : void 0
					}),
					w && T !== null && $ ? /* @__PURE__ */ f("div", {
						ref: yt,
						className: "chart__tooltip",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ d("p", {
							className: "chart__tooltip-header",
							children: k ? D(q) : O(v($, g))
						}), /* @__PURE__ */ d("ul", {
							className: "chart__tooltip-list",
							children: mt.map((e) => /* @__PURE__ */ f("li", {
								className: "chart__tooltip-row",
								children: [
									/* @__PURE__ */ d(x, {
										className: "chart__tooltip-key",
										index: e.index,
										color: k ? void 0 : c[e.index]?.color,
										palette: S
									}),
									/* @__PURE__ */ d("span", {
										className: "chart__tooltip-value",
										children: e.value
									}),
									/* @__PURE__ */ d("span", {
										className: "chart__tooltip-label",
										children: e.label
									})
								]
							}, e.key + e.label))
						})]
					}) : null
				]
			}),
			Re && !N ? /* @__PURE__ */ d("div", {
				className: "chart__legend",
				children: /* @__PURE__ */ d(t, {
					gap: "sm",
					children: (k ? M.map((e, t) => ({
						key: String(v(e, g)),
						label: O(v(e, g)),
						index: t,
						color: void 0
					})) : c.map((e, t) => ({
						key: e.key,
						label: e.label,
						index: t,
						color: e.color
					}))).map((e) => /* @__PURE__ */ f(n, {
						variant: "neutral",
						className: `chart__legend-item${Z(e.key) ? " chart__legend-item--muted" : ""}`,
						children: [/* @__PURE__ */ d(x, {
							className: `chart__legend-swatch${i === "line" ? " chart__legend-swatch--line" : ""}`,
							index: e.index,
							color: e.color,
							palette: S,
							muted: Z(e.key)
						}), e.label]
					}, e.key))
				})
			}) : null,
			fe ? /* @__PURE__ */ d("p", {
				className: "chart__caption",
				children: fe
			}) : null,
			/* @__PURE__ */ d(e, {
				role: "status",
				children: _t
			}),
			/* @__PURE__ */ d(e, {
				id: Ne,
				children: xe
			}),
			/* @__PURE__ */ d(e, {
				as: "div",
				children: /* @__PURE__ */ f("table", {
					className: "chart__table",
					children: [
						/* @__PURE__ */ d("caption", { children: be }),
						/* @__PURE__ */ d("thead", { children: /* @__PURE__ */ f("tr", { children: [/* @__PURE__ */ d("th", {
							scope: "col",
							children: Se
						}), k ? /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("th", {
							scope: "col",
							children: Ce
						}), /* @__PURE__ */ d("th", {
							scope: "col",
							children: we
						})] }) : c.map((e) => /* @__PURE__ */ d("th", {
							scope: "col",
							children: e.label
						}, e.key))] }) }),
						/* @__PURE__ */ d("tbody", { children: M.map((e, t) => /* @__PURE__ */ f("tr", { children: [/* @__PURE__ */ d("th", {
							scope: "row",
							children: O(v(e, g))
						}), k ? /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("td", { children: D(_(e[st])) }), /* @__PURE__ */ d("td", { children: Fe.format(ct[t]?.share ?? 0) })] }) : c.map((t) => /* @__PURE__ */ d("td", { children: D(_(e[t.key]), t) }, t.key))] }, `row-${t}`)) })
					]
				})
			})
		]
	});
});
//#endregion
export { S as Chart };
