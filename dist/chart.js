'use client';
import './chart.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Inline as t } from "./inline.js";
import { Tag as n } from "./tag.js";
import { forwardRef as r, useEffect as i, useId as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/organisms/Chart/Chart.tsx
var f = {
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
}, p = f.labelFontSize * .6, m = 640, h = 8;
function g(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function _(e, t) {
	let n = e[t];
	return typeof n == "number" ? n : String(n ?? "");
}
function v(e, t, n) {
	let r = t ?? n?.[e] ?? (e < h ? `var(--chart-series-${e + 1})` : "var(--chart-muted-color)");
	return { "--chart-mark-color": r };
}
function ee(e, t, n, r, i) {
	return `M ${e - r / 2} ${t} L ${e + r / 2} ${t} L ${e + i / 2} ${t + n} L ${e - i / 2} ${t + n} Z`;
}
function y(e, t, n, r, i) {
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
function te(e, t, n) {
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
function ne(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.max(0, Math.min(f.barRadius, i === "top" || i === "bottom" ? r : n, (i === "top" || i === "bottom" ? n : r) / 2));
	switch (i) {
		case "top": return `M ${e} ${t + r} L ${e} ${t + a} Q ${e} ${t} ${e + a} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r} Z`;
		case "bottom": return `M ${e} ${t} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n - a} ${t + r} Q ${e + n} ${t + r} ${e + n} ${t + r - a} L ${e + n} ${t} Z`;
		case "right": return `M ${e} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r - a} Q ${e + n} ${t + r} ${e + n - a} ${t + r} L ${e} ${t + r} Z`;
		default: return `M ${e + n} ${t} L ${e + a} ${t} Q ${e} ${t} ${e} ${t + a} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n} ${t + r} Z`;
	}
}
function re(e, t, n, r, i, a) {
	let o = a - i > Math.PI ? 1 : 0, s = (n, r) => `${e + n * Math.cos(r)} ${t + n * Math.sin(r)}`;
	return r <= 0 ? `M ${e} ${t} L ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} Z` : `M ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} L ${s(r, a)} A ${r} ${r} 0 ${o} 0 ${s(r, i)} Z`;
}
function ie(e) {
	let t = s(null), [n, r] = c(e);
	return i(() => {
		let e = t.current;
		if (!e || typeof ResizeObserver > "u") return;
		let n = new ResizeObserver((e) => {
			let t = e[0]?.contentRect.width;
			t && t > 0 && r(Math.round(t));
		});
		return n.observe(e), () => n.disconnect();
	}, []), [t, n];
}
var b = r(function({ type: r = "line", data: i, series: s, xKey: h, colors: b, orientation: ae = "vertical", stacked: x = !1, emphasis: oe, height: se = 256, ariaLabel: ce, title: le, caption: ue, formatValue: de, formatX: fe, yTicks: pe = 5, legend: me, grid: he = !0, tooltip: S = !0, valueLabels: ge, locale: _e = "es-ES", tableCaption: ve = "Datos del gráfico", tableHint: ye = "Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.", categoryLabel: be = "Categoría", valueLabel: xe = "Valor", shareLabel: Se = "Porcentaje", emptyMessage: Ce = "Sin datos que mostrar", className: we, ...Te }, Ee) {
	let [De, Oe] = ie(m), [C, w] = c(null), ke = a(), Ae = o(() => new Intl.NumberFormat(_e), [_e]), je = o(() => new Intl.NumberFormat(_e, {
		style: "percent",
		maximumFractionDigits: 1
	}), [_e]), T = (e, t) => de ? de(e, t) : Ae.format(e), E = (e) => fe ? fe(e) : String(e), Me = r === "pie" || r === "donut", D = Me || r === "funnel" || r === "treemap" || r === "radial-bar", O = r === "scatter", Ne = r === "radar", k = D || Ne, Pe = me ?? (D ? i.length > 1 : s.length > 1), Fe = ge ?? (r === "line" || r === "area" ? "last" : "none"), A = i, j = A.length === 0 || s.length === 0, Ie = [
		"chart",
		`chart--${r}`,
		r === "bar" ? `chart--${ae}` : "",
		x ? "chart--stacked" : "",
		we
	].filter(Boolean).join(" "), Le = A.map((e) => s.map((t) => g(e[t.key]))), Re = Le.map((e) => e.reduce((e, t) => e + t, 0)), ze = Le.flat(), M = te(ze.length ? Math.min(0, ...ze) : 0, x ? Math.max(0, ...Re) : ze.length ? Math.max(0, ...ze) : 1, pe), Be = M[0] ?? 0, N = M[M.length - 1] ?? 1, Ve = N - Be || 1, He = M.map((e) => T(e)), P = A.map((e) => typeof e[h] == "number" ? e[h] : 0), F = O ? te(Math.min(...P, 0), Math.max(...P, 1), pe) : [], Ue = F[0] ?? 0, We = (F[F.length - 1] ?? 1) - Ue || 1, Ge = O ? F.map((e) => T(e)) : A.map((e) => E(_(e, h))), I = r === "bar" && ae === "horizontal", Ke = I ? Ge : He, qe = k ? f.padding : f.padding + Math.max(...Ke.map((e) => e.length), 1) * p + f.axisGap, Je = k ? 0 : Math.round(f.labelFontSize * 1.4) + f.axisGap, L = qe, Ye = Math.max(L + 1, Oe - f.padding), R = f.padding, z = Math.max(R + 1, se - f.padding), B = Ye - L, V = z - R, Xe = se + Je, H = (e) => z - (e - Be) / Ve * V, U = (e) => L + (e - Be) / Ve * B, Ze = H(0), Qe = U(0), $e = A.length ? (I ? V : B) / A.length : 0, W = (e) => A.length > 1 ? L + e * B / (A.length - 1) : L + B / 2, et = (e) => (I ? R : L) + $e * (e + .5), G = (e) => L + (e - Ue) / We * B, tt = s[0]?.key ?? "", K = A.map((e) => g(e[tt])), q = K.reduce((e, t) => e + t, 0), J = Math.max(1, Math.min(B, V) / 2 - f.labelFontSize * 2), Y = L + B / 2, X = R + V / 2, nt = K.map((e, t) => {
		let n = K.slice(0, t).reduce((e, t) => e + t, 0), r = -Math.PI / 2 + (q > 0 ? n / q * Math.PI * 2 : 0);
		return {
			from: r,
			to: r + (q > 0 ? e / q * Math.PI * 2 : 0),
			share: q > 0 ? e / q : 0
		};
	}), rt = A.map((e, t) => -Math.PI / 2 + (A.length ? t * Math.PI * 2 / A.length : 0)), it = (e, t) => {
		let n = J * Math.max(0, Math.min(1, N > 0 ? e / N : 0)), r = rt[t] ?? 0;
		return {
			x: Y + n * Math.cos(r),
			y: X + n * Math.sin(r)
		};
	}, Z = (e) => !!oe && oe !== e, at = (e) => {
		if (k || A.length === 0) return null;
		let t = e.currentTarget.getBoundingClientRect();
		if (r === "line" || r === "area") {
			let n = e.clientX - t.left, r = A.length > 1 ? B / (A.length - 1) : B;
			return Math.max(0, Math.min(A.length - 1, Math.round(n / r)));
		}
		if (O) {
			let n = e.clientX - t.left + L, r = 0, i = Infinity;
			return P.forEach((e, t) => {
				let a = Math.abs(G(e) - n);
				a < i && (i = a, r = t);
			}), r;
		}
		let n = I ? e.clientY - t.top : e.clientX - t.left;
		return Math.max(0, Math.min(A.length - 1, Math.floor(n / ($e || 1))));
	}, ot = (e) => {
		w((t) => {
			let n = (t ?? 0) + e;
			return Math.max(0, Math.min(A.length - 1, n));
		});
	}, st = (e) => {
		e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), ot(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), ot(-1)) : e.key === "Home" ? (e.preventDefault(), w(0)) : e.key === "End" ? (e.preventDefault(), w(A.length - 1)) : e.key === "Escape" && w(null);
	}, Q = [];
	if (!j && (r === "line" || r === "area")) {
		let e = A.map(() => 0), t = null, n = [];
		s.forEach((i, a) => {
			let o = A.map((t, n) => {
				let r = g(t[i.key]), a = r;
				return x && (e[n] = (e[n] ?? 0) + r, a = e[n]), {
					x: W(n),
					y: H(a),
					value: r
				};
			}), s = o.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), c = Z(i.key), l = v(a, i.color, b), d = o[0], p = o[o.length - 1];
			if (r === "area" && d && p) {
				let e = x && t ? [...t].reverse().map((e) => `L ${e.x} ${e.y}`).join(" ") : `L ${p.x} ${Ze} L ${d.x} ${Ze}`;
				Q.push(/* @__PURE__ */ u("path", {
					className: `chart__area${c ? " chart__area--muted" : ""}`,
					style: l,
					d: `${s} ${e} Z`
				}, `area-${i.key}`));
			}
			Q.push(/* @__PURE__ */ u("path", {
				className: `chart__line${c ? " chart__line--muted" : ""}`,
				style: l,
				d: s
			}, `line-${i.key}`)), o.forEach((e, t) => {
				let n = t === o.length - 1, r = C === t;
				!n && !r || Q.push(/* @__PURE__ */ u("circle", {
					className: `chart__marker${c ? " chart__marker--muted" : ""}`,
					style: l,
					cx: e.x,
					cy: e.y,
					r: f.markerSize / 2,
					"data-active": r || void 0
				}, `dot-${i.key}-${t}`));
			}), (Fe === "all" ? o : Fe === "last" && p ? [p] : Fe === "extremes" ? [d, p].filter(Boolean) : []).forEach((e, t) => {
				e && n.push({
					key: `label-${i.key}-${t}`,
					x: e.x,
					y: e.y - f.axisGap,
					text: T(e.value, i)
				});
			}), t = o.map((e) => ({
				x: e.x,
				y: e.y
			}));
		});
		let i = [];
		n.forEach((e) => {
			i.some((t) => Math.abs(t.x - e.x) < p * e.text.length && Math.abs(t.y - e.y) < f.labelFontSize * 1.2) || (i.push({
				x: e.x,
				y: e.y
			}), Q.push(/* @__PURE__ */ u("text", {
				className: "chart__value-label",
				x: e.x,
				y: e.y,
				textAnchor: e.x > Ye - f.barMaxThickness * 2 ? "end" : "middle",
				children: e.text
			}, e.key)));
		});
	}
	if (!j && r === "bar") {
		let e = Math.min(f.barMaxThickness * s.length + f.markGap * (s.length - 1), $e * .72), t = x ? Math.min(f.barMaxThickness, $e * .72) : Math.max(1, (e - f.markGap * (s.length - 1)) / s.length);
		A.forEach((e, n) => {
			let r = et(n), i = 0, a = 0;
			s.forEach((o, c) => {
				let l = g(e[o.key]), d = Z(o.key), p = v(c, o.color, b), m = r + (x ? 0 : (c - (s.length - 1) / 2) * (t + f.markGap)) - t / 2, h = x ? l >= 0 ? i : a : 0, _ = h + l;
				x && (l >= 0 ? i = _ : a = _);
				let ee = x && h !== 0 ? f.markGap : 0, y = "";
				if (I) {
					let e = U(h) + (l >= 0 ? ee : 0), n = U(_);
					y = ne(Math.min(e, n), m, Math.abs(n - e), t, l >= 0 ? "right" : "left");
				} else {
					let e = H(h) - (l >= 0 ? ee : 0), n = H(_);
					y = ne(m, Math.min(e, n), t, Math.abs(n - e), l >= 0 ? "top" : "bottom");
				}
				if (y && (Q.push(/* @__PURE__ */ u("path", {
					className: `chart__bar${d ? " chart__bar--muted" : ""}`,
					style: p,
					d: y,
					"data-active": C === n || void 0
				}, `bar-${n}-${o.key}`)), Fe === "all" && !x)) {
					let e = I ? U(_) : H(_);
					Q.push(/* @__PURE__ */ u("text", {
						className: "chart__value-label",
						x: I ? e + f.axisGap : m + t / 2,
						y: I ? m + t / 2 : e - f.axisGap,
						textAnchor: I ? "start" : "middle",
						dominantBaseline: I ? "middle" : "auto",
						children: T(l, o)
					}, `bar-label-${n}-${o.key}`));
				}
			});
		});
	}
	if (!j && Me) {
		let e = r === "donut" ? J * (1 - f.donutThickness) : 0;
		nt.forEach((t, n) => {
			if (t.to - t.from <= 0) return;
			let r = String(_(A[n], h));
			if (Q.push(/* @__PURE__ */ u("path", {
				className: `chart__slice${Z(r) ? " chart__slice--muted" : ""}`,
				style: v(n, void 0, b),
				d: re(Y, X, J, e, t.from, t.to),
				"data-active": C === n || void 0
			}, `slice-${n}`)), t.share >= .05) {
				let e = (t.from + t.to) / 2, r = Y + (J + f.axisGap) * Math.cos(e), i = X + (J + f.axisGap) * Math.sin(e);
				Q.push(/* @__PURE__ */ u("text", {
					className: "chart__value-label",
					x: r,
					y: i,
					textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
					dominantBaseline: "middle",
					children: je.format(t.share)
				}, `slice-label-${n}`));
			}
		});
	}
	if (!j && r === "funnel") {
		let e = Math.max(...K, 1), t = V / Math.max(1, A.length), n = (t) => Math.max(0, t) / e * B;
		K.forEach((e, r) => {
			let i = R + t * r, a = Math.max(0, t - f.funnelGap), o = K[r + 1], s = String(_(A[r], h));
			Q.push(/* @__PURE__ */ u("path", {
				className: `chart__funnel-step${Z(s) ? " chart__funnel-step--muted" : ""}`,
				style: v(r, void 0, b),
				"data-active": C === r || void 0,
				d: ee(Y, i, a, n(e), n(o ?? e))
			}, `funnel-${r}`)), Q.push(/* @__PURE__ */ u("text", {
				className: "chart__value-label",
				x: Y,
				y: i + a / 2,
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: `${E(_(A[r], h))} · ${T(e)}`
			}, `funnel-label-${r}`));
		});
	}
	if (!j && r === "treemap" && y(K.map((e, t) => ({
		value: Math.max(0, e),
		index: t
	})).filter((e) => e.value > 0), L, R, B, V).forEach((e) => {
		let t = String(_(A[e.index], h)), n = Math.max(0, e.w - f.treemapGap), r = Math.max(0, e.h - f.treemapGap);
		Q.push(/* @__PURE__ */ u("rect", {
			className: `chart__tile${Z(t) ? " chart__tile--muted" : ""}`,
			style: v(e.index, void 0, b),
			"data-active": C === e.index || void 0,
			x: e.x,
			y: e.y,
			width: n,
			height: r
		}, `tile-${e.index}`)), n > p * 4 && r > f.labelFontSize * 2 && Q.push(/* @__PURE__ */ u("text", {
			className: "chart__tile-label",
			x: e.x + f.axisGap,
			y: e.y + f.axisGap + f.labelFontSize,
			children: E(_(A[e.index], h))
		}, `tile-label-${e.index}`));
	}), !j && r === "radial-bar") {
		let e = Math.max(...K, 1), t = J / Math.max(1, A.length), n = Math.max(1, t - f.radialBarGap);
		K.forEach((r, i) => {
			let a = J - t * i, o = a - n, s = String(_(A[i], h)), c = Math.max(0, r) / e * Math.PI * 1.999;
			Q.push(/* @__PURE__ */ u("path", {
				className: "chart__radial-track",
				d: re(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + Math.PI * 1.999)
			}, `radial-track-${i}`)), !(c <= 0) && Q.push(/* @__PURE__ */ u("path", {
				className: `chart__radial-bar${Z(s) ? " chart__radial-bar--muted" : ""}`,
				style: v(i, void 0, b),
				"data-active": C === i || void 0,
				d: re(Y, X, a, o, -Math.PI / 2, -Math.PI / 2 + c)
			}, `radial-bar-${i}`));
		});
	}
	!j && O && s.forEach((e, t) => {
		let n = Z(e.key), r = v(t, e.color, b);
		A.forEach((t, i) => {
			let a = t[e.key];
			typeof a != "number" || !Number.isFinite(a) || Q.push(/* @__PURE__ */ u("circle", {
				className: `chart__point${n ? " chart__point--muted" : ""}`,
				style: r,
				cx: G(P[i] ?? 0),
				cy: H(a),
				r: f.dotSize / 2,
				"data-active": C === i || void 0
			}, `point-${e.key}-${i}`));
		});
	}), !j && Ne && s.forEach((e, t) => {
		let n = Z(e.key), r = v(t, e.color, b), i = A.map((t, n) => it(g(t[e.key]), n));
		if (i.length === 0) return;
		let a = `${i.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" ")} Z`;
		Q.push(/* @__PURE__ */ u("path", {
			className: `chart__radar-shape${n ? " chart__radar-shape--muted" : ""}`,
			style: r,
			d: a
		}, `radar-${e.key}`)), i.forEach((t, i) => {
			Q.push(/* @__PURE__ */ u("circle", {
				className: `chart__marker${n ? " chart__marker--muted" : ""}`,
				style: r,
				cx: t.x,
				cy: t.y,
				r: f.markerSize / 2,
				"data-active": C === i || void 0
			}, `radar-dot-${e.key}-${i}`));
		});
	});
	let $ = C === null ? void 0 : A[C], ct = $ ? D ? [{
		key: tt,
		label: String(_($, h)),
		value: T(g($[tt])),
		index: C ?? 0
	}] : s.map((e, t) => ({
		key: e.key,
		label: e.label,
		value: T(g($[e.key]), e),
		index: t
	})) : [], lt = C === null ? 0 : k ? Y : O ? G(P[C] ?? 0) : r === "bar" && I ? U(N) : r === "bar" ? et(C) : W(C), ut = C === null ? 0 : k ? X - J : r === "bar" && I ? et(C) : R;
	return /* @__PURE__ */ d("figure", {
		ref: Ee,
		className: Ie,
		...Te,
		children: [
			le ? /* @__PURE__ */ u("figcaption", {
				className: "chart__title",
				children: le
			}) : null,
			j ? /* @__PURE__ */ u("p", {
				className: "chart__empty",
				children: Ce
			}) : /* @__PURE__ */ d("div", {
				className: "chart__plot",
				ref: De,
				children: [
					/* @__PURE__ */ d("svg", {
						className: "chart__canvas",
						viewBox: `0 0 ${Oe} ${Xe}`,
						width: Oe,
						height: Xe,
						"aria-hidden": "true",
						children: [
							he && !k ? /* @__PURE__ */ u("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: M.map((e) => I ? /* @__PURE__ */ u("line", {
									className: "chart__grid-line",
									x1: U(e),
									y1: R,
									x2: U(e),
									y2: z
								}, e) : /* @__PURE__ */ u("line", {
									className: "chart__grid-line",
									x1: L,
									y1: H(e),
									x2: Ye,
									y2: H(e)
								}, e))
							}) : null,
							k ? null : /* @__PURE__ */ d("g", {
								className: "chart__axes",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ u("line", {
										className: "chart__axis",
										x1: I ? Qe : L,
										y1: I ? R : Ze,
										x2: I ? Qe : Ye,
										y2: I ? z : Ze
									}),
									I ? Ge.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: L - f.axisGap,
										y: et(t),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: e
									}, `cat-${t}`)) : M.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: L - f.axisGap,
										y: H(e),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: He[t]
									}, `tick-${e}`)),
									I ? M.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: U(e),
										y: z + f.axisGap + f.labelFontSize,
										textAnchor: "middle",
										children: He[t]
									}, `vtick-${e}`)) : Ge.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: O ? G(F[t] ?? 0) : r === "bar" ? et(t) : W(t),
										y: z + f.axisGap + f.labelFontSize,
										textAnchor: O ? "middle" : t === 0 && r !== "bar" ? "start" : t === A.length - 1 && r !== "bar" ? "end" : "middle",
										children: e
									}, `cat-${t}`))
								]
							}),
							he && O ? /* @__PURE__ */ u("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: F.map((e) => /* @__PURE__ */ u("line", {
									className: "chart__grid-line",
									x1: G(e),
									y1: R,
									x2: G(e),
									y2: z
								}, `xgrid-${e}`))
							}) : null,
							Ne && A.length > 0 ? /* @__PURE__ */ d("g", {
								className: "chart__radar-grid",
								"aria-hidden": "true",
								children: [
									M.filter((e) => e > 0).map((e) => /* @__PURE__ */ u("path", {
										className: "chart__grid-line",
										d: `${rt.map((t, n) => {
											let r = J * (N > 0 ? e / N : 0);
											return `${n === 0 ? "M" : "L"} ${Y + r * Math.cos(t)} ${X + r * Math.sin(t)}`;
										}).join(" ")} Z`
									}, `web-${e}`)),
									rt.map((e, t) => /* @__PURE__ */ u("line", {
										className: "chart__grid-line",
										x1: Y,
										y1: X,
										x2: Y + J * Math.cos(e),
										y2: X + J * Math.sin(e)
									}, `spoke-${t}`)),
									rt.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: Y + (J + f.axisGap) * Math.cos(e),
										y: X + (J + f.axisGap) * Math.sin(e),
										textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
										dominantBaseline: "middle",
										children: Ge[t]
									}, `radar-cat-${t}`))
								]
							}) : null,
							C !== null && S && (r === "line" || r === "area") ? /* @__PURE__ */ u("line", {
								className: "chart__crosshair",
								"aria-hidden": "true",
								x1: W(C),
								y1: R,
								x2: W(C),
								y2: z
							}) : null,
							/* @__PURE__ */ u("g", {
								className: "chart__marks",
								children: Q
							}),
							r === "donut" ? /* @__PURE__ */ u("text", {
								className: "chart__center-value",
								x: Y,
								y: X,
								textAnchor: "middle",
								dominantBaseline: "middle",
								children: T(q)
							}) : null
						]
					}),
					/* @__PURE__ */ u("div", {
						className: "chart__hit-layer",
						role: "img",
						"aria-label": ce,
						"aria-describedby": ke,
						tabIndex: S ? 0 : void 0,
						style: {
							insetInlineStart: `${L}px`,
							insetBlockStart: `${R}px`,
							width: `${B}px`,
							height: `${V}px`
						},
						onPointerMove: S ? (e) => w(at(e)) : void 0,
						onPointerLeave: S ? () => w(null) : void 0,
						onKeyDown: S ? st : void 0,
						onBlur: S ? () => w(null) : void 0
					}),
					S && C !== null && $ ? /* @__PURE__ */ d("div", {
						className: "chart__tooltip",
						"aria-hidden": "true",
						style: {
							left: `${lt}px`,
							top: `${ut}px`
						},
						children: [/* @__PURE__ */ u("p", {
							className: "chart__tooltip-header",
							children: D ? T(q) : E(_($, h))
						}), /* @__PURE__ */ u("ul", {
							className: "chart__tooltip-list",
							children: ct.map((e) => /* @__PURE__ */ d("li", {
								className: "chart__tooltip-row",
								children: [
									/* @__PURE__ */ u("span", {
										className: "chart__tooltip-key",
										style: v(e.index, D ? void 0 : s[e.index]?.color, b),
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ u("span", {
										className: "chart__tooltip-value",
										children: e.value
									}),
									/* @__PURE__ */ u("span", {
										className: "chart__tooltip-label",
										children: e.label
									})
								]
							}, e.key + e.label))
						})]
					}) : null
				]
			}),
			Pe && !j ? /* @__PURE__ */ u("div", {
				className: "chart__legend",
				children: /* @__PURE__ */ u(t, {
					gap: "sm",
					children: (D ? A.map((e, t) => ({
						key: String(_(e, h)),
						label: E(_(e, h)),
						index: t,
						color: void 0
					})) : s.map((e, t) => ({
						key: e.key,
						label: e.label,
						index: t,
						color: e.color
					}))).map((e) => /* @__PURE__ */ d(n, {
						variant: "neutral",
						className: `chart__legend-item${Z(e.key) ? " chart__legend-item--muted" : ""}`,
						children: [/* @__PURE__ */ u("span", {
							className: `chart__legend-swatch${r === "line" ? " chart__legend-swatch--line" : ""}`,
							style: v(e.index, e.color, b),
							"aria-hidden": "true"
						}), e.label]
					}, e.key))
				})
			}) : null,
			ue ? /* @__PURE__ */ u("p", {
				className: "chart__caption",
				children: ue
			}) : null,
			/* @__PURE__ */ u(e, {
				id: ke,
				children: ye
			}),
			/* @__PURE__ */ u(e, {
				as: "div",
				children: /* @__PURE__ */ d("table", {
					className: "chart__table",
					children: [
						/* @__PURE__ */ u("caption", { children: ve }),
						/* @__PURE__ */ u("thead", { children: /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
							scope: "col",
							children: be
						}), D ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("th", {
							scope: "col",
							children: xe
						}), /* @__PURE__ */ u("th", {
							scope: "col",
							children: Se
						})] }) : s.map((e) => /* @__PURE__ */ u("th", {
							scope: "col",
							children: e.label
						}, e.key))] }) }),
						/* @__PURE__ */ u("tbody", { children: A.map((e, t) => /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
							scope: "row",
							children: E(_(e, h))
						}), D ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("td", { children: T(g(e[tt])) }), /* @__PURE__ */ u("td", { children: je.format(nt[t]?.share ?? 0) })] }) : s.map((t) => /* @__PURE__ */ u("td", { children: T(g(e[t.key]), t) }, t.key))] }, `row-${t}`)) })
					]
				})
			})
		]
	});
});
//#endregion
export { b as Chart };
