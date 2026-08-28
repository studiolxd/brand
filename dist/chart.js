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
	donutThickness: .55
}, p = f.labelFontSize * .6, m = 640, h = 8;
function g(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function _(e, t) {
	let n = e[t];
	return typeof n == "number" ? n : String(n ?? "");
}
function v(e, t) {
	let n = t ?? (e < h ? `var(--chart-series-${e + 1})` : "var(--chart-muted-color)");
	return { "--chart-mark-color": n };
}
function ee(e, t, n) {
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
function te(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.max(0, Math.min(f.barRadius, i === "top" || i === "bottom" ? r : n, (i === "top" || i === "bottom" ? n : r) / 2));
	switch (i) {
		case "top": return `M ${e} ${t + r} L ${e} ${t + a} Q ${e} ${t} ${e + a} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r} Z`;
		case "bottom": return `M ${e} ${t} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n - a} ${t + r} Q ${e + n} ${t + r} ${e + n} ${t + r - a} L ${e + n} ${t} Z`;
		case "right": return `M ${e} ${t} L ${e + n - a} ${t} Q ${e + n} ${t} ${e + n} ${t + a} L ${e + n} ${t + r - a} Q ${e + n} ${t + r} ${e + n - a} ${t + r} L ${e} ${t + r} Z`;
		default: return `M ${e + n} ${t} L ${e + a} ${t} Q ${e} ${t} ${e} ${t + a} L ${e} ${t + r - a} Q ${e} ${t + r} ${e + a} ${t + r} L ${e + n} ${t + r} Z`;
	}
}
function y(e, t, n, r, i, a) {
	let o = a - i > Math.PI ? 1 : 0, s = (n, r) => `${e + n * Math.cos(r)} ${t + n * Math.sin(r)}`;
	return r <= 0 ? `M ${e} ${t} L ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} Z` : `M ${s(n, i)} A ${n} ${n} 0 ${o} 1 ${s(n, a)} L ${s(r, a)} A ${r} ${r} 0 ${o} 0 ${s(r, i)} Z`;
}
function ne(e) {
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
var re = r(function({ type: r = "line", data: i, series: s, xKey: h, orientation: re = "vertical", stacked: b = !1, emphasis: ie, height: ae = 256, ariaLabel: oe, title: se, caption: ce, formatValue: le, formatX: ue, yTicks: de = 5, legend: fe, grid: pe = !0, tooltip: x = !0, valueLabels: me, locale: S = "es-ES", tableCaption: he = "Datos del gráfico", tableHint: ge = "Los datos completos están en la tabla que sigue; flechas para recorrer el gráfico.", categoryLabel: _e = "Categoría", valueLabel: ve = "Valor", shareLabel: ye = "Porcentaje", emptyMessage: be = "Sin datos que mostrar", className: xe, ...Se }, Ce) {
	let [we, Te] = ne(m), [C, w] = c(null), Ee = a(), De = o(() => new Intl.NumberFormat(S), [S]), Oe = o(() => new Intl.NumberFormat(S, {
		style: "percent",
		maximumFractionDigits: 1
	}), [S]), T = (e, t) => le ? le(e, t) : De.format(e), E = (e) => ue ? ue(e) : String(e), D = r === "pie" || r === "donut", ke = fe ?? (D ? i.length > 1 : s.length > 1), O = me ?? (r === "line" || r === "area" ? "last" : "none"), k = i, A = k.length === 0 || s.length === 0, Ae = [
		"chart",
		`chart--${r}`,
		r === "bar" ? `chart--${re}` : "",
		b ? "chart--stacked" : "",
		xe
	].filter(Boolean).join(" "), je = k.map((e) => s.map((t) => g(e[t.key]))), Me = je.map((e) => e.reduce((e, t) => e + t, 0)), j = je.flat(), M = ee(j.length ? Math.min(0, ...j) : 0, b ? Math.max(0, ...Me) : j.length ? Math.max(0, ...j) : 1, de), Ne = M[0] ?? 0, Pe = M[M.length - 1] ?? 1, Fe = Pe - Ne || 1, Ie = M.map((e) => T(e)), Le = k.map((e) => E(_(e, h))), N = r === "bar" && re === "horizontal", Re = N ? Le : Ie, ze = D ? f.padding : f.padding + Math.max(...Re.map((e) => e.length), 1) * p + f.axisGap, Be = D ? 0 : Math.round(f.labelFontSize * 1.4) + f.axisGap, P = ze, F = Math.max(P + 1, Te - f.padding), I = f.padding, L = Math.max(I + 1, ae - f.padding), R = F - P, z = L - I, Ve = ae + Be, B = (e) => L - (e - Ne) / Fe * z, V = (e) => P + (e - Ne) / Fe * R, H = B(0), He = V(0), U = k.length ? (N ? z : R) / k.length : 0, W = (e) => k.length > 1 ? P + e * R / (k.length - 1) : P + R / 2, G = (e) => (N ? I : P) + U * (e + .5), K = s[0]?.key ?? "", Ue = k.map((e) => g(e[K])), q = Ue.reduce((e, t) => e + t, 0), J = Math.max(1, Math.min(R, z) / 2 - f.labelFontSize * 2), Y = P + R / 2, X = I + z / 2, We = Ue.map((e, t) => {
		let n = Ue.slice(0, t).reduce((e, t) => e + t, 0), r = -Math.PI / 2 + (q > 0 ? n / q * Math.PI * 2 : 0);
		return {
			from: r,
			to: r + (q > 0 ? e / q * Math.PI * 2 : 0),
			share: q > 0 ? e / q : 0
		};
	}), Z = (e) => !!ie && ie !== e, Ge = (e) => {
		if (D || k.length === 0) return null;
		let t = e.currentTarget.getBoundingClientRect();
		if (r === "line" || r === "area") {
			let n = e.clientX - t.left, r = k.length > 1 ? R / (k.length - 1) : R;
			return Math.max(0, Math.min(k.length - 1, Math.round(n / r)));
		}
		let n = N ? e.clientY - t.top : e.clientX - t.left;
		return Math.max(0, Math.min(k.length - 1, Math.floor(n / (U || 1))));
	}, Ke = (e) => {
		w((t) => {
			let n = (t ?? 0) + e;
			return Math.max(0, Math.min(k.length - 1, n));
		});
	}, qe = (e) => {
		e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), Ke(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), Ke(-1)) : e.key === "Home" ? (e.preventDefault(), w(0)) : e.key === "End" ? (e.preventDefault(), w(k.length - 1)) : e.key === "Escape" && w(null);
	}, Q = [];
	if (!A && (r === "line" || r === "area")) {
		let e = k.map(() => 0), t = null, n = [];
		s.forEach((i, a) => {
			let o = k.map((t, n) => {
				let r = g(t[i.key]), a = r;
				return b && (e[n] = (e[n] ?? 0) + r, a = e[n]), {
					x: W(n),
					y: B(a),
					value: r
				};
			}), s = o.map((e, t) => `${t === 0 ? "M" : "L"} ${e.x} ${e.y}`).join(" "), c = Z(i.key), l = v(a, i.color), d = o[0], p = o[o.length - 1];
			if (r === "area" && d && p) {
				let e = b && t ? [...t].reverse().map((e) => `L ${e.x} ${e.y}`).join(" ") : `L ${p.x} ${H} L ${d.x} ${H}`;
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
			}), (O === "all" ? o : O === "last" && p ? [p] : O === "extremes" ? [d, p].filter(Boolean) : []).forEach((e, t) => {
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
				textAnchor: e.x > F - f.barMaxThickness * 2 ? "end" : "middle",
				children: e.text
			}, e.key)));
		});
	}
	if (!A && r === "bar") {
		let e = Math.min(f.barMaxThickness * s.length + f.markGap * (s.length - 1), U * .72), t = b ? Math.min(f.barMaxThickness, U * .72) : Math.max(1, (e - f.markGap * (s.length - 1)) / s.length);
		k.forEach((e, n) => {
			let r = G(n), i = 0, a = 0;
			s.forEach((o, c) => {
				let l = g(e[o.key]), d = Z(o.key), p = v(c, o.color), m = r + (b ? 0 : (c - (s.length - 1) / 2) * (t + f.markGap)) - t / 2, h = b ? l >= 0 ? i : a : 0, _ = h + l;
				b && (l >= 0 ? i = _ : a = _);
				let ee = b && h !== 0 ? f.markGap : 0, y = "";
				if (N) {
					let e = V(h) + (l >= 0 ? ee : 0), n = V(_);
					y = te(Math.min(e, n), m, Math.abs(n - e), t, l >= 0 ? "right" : "left");
				} else {
					let e = B(h) - (l >= 0 ? ee : 0), n = B(_);
					y = te(m, Math.min(e, n), t, Math.abs(n - e), l >= 0 ? "top" : "bottom");
				}
				if (y && (Q.push(/* @__PURE__ */ u("path", {
					className: `chart__bar${d ? " chart__bar--muted" : ""}`,
					style: p,
					d: y,
					"data-active": C === n || void 0
				}, `bar-${n}-${o.key}`)), O === "all" && !b)) {
					let e = N ? V(_) : B(_);
					Q.push(/* @__PURE__ */ u("text", {
						className: "chart__value-label",
						x: N ? e + f.axisGap : m + t / 2,
						y: N ? m + t / 2 : e - f.axisGap,
						textAnchor: N ? "start" : "middle",
						dominantBaseline: N ? "middle" : "auto",
						children: T(l, o)
					}, `bar-label-${n}-${o.key}`));
				}
			});
		});
	}
	if (!A && D) {
		let e = r === "donut" ? J * (1 - f.donutThickness) : 0;
		We.forEach((t, n) => {
			if (t.to - t.from <= 0) return;
			let r = String(_(k[n], h));
			if (Q.push(/* @__PURE__ */ u("path", {
				className: `chart__slice${Z(r) ? " chart__slice--muted" : ""}`,
				style: v(n),
				d: y(Y, X, J, e, t.from, t.to),
				"data-active": C === n || void 0
			}, `slice-${n}`)), t.share >= .05) {
				let e = (t.from + t.to) / 2, r = Y + (J + f.axisGap) * Math.cos(e), i = X + (J + f.axisGap) * Math.sin(e);
				Q.push(/* @__PURE__ */ u("text", {
					className: "chart__value-label",
					x: r,
					y: i,
					textAnchor: Math.cos(e) < -.1 ? "end" : Math.cos(e) > .1 ? "start" : "middle",
					dominantBaseline: "middle",
					children: Oe.format(t.share)
				}, `slice-label-${n}`));
			}
		});
	}
	let $ = C === null ? void 0 : k[C], Je = $ ? D ? [{
		key: K,
		label: String(_($, h)),
		value: T(g($[K])),
		index: C ?? 0
	}] : s.map((e, t) => ({
		key: e.key,
		label: e.label,
		value: T(g($[e.key]), e),
		index: t
	})) : [], Ye = C === null ? 0 : D ? Y : r === "bar" && N ? V(Pe) : r === "bar" ? G(C) : W(C), Xe = C === null ? 0 : D ? X - J : r === "bar" && N ? G(C) : I;
	return /* @__PURE__ */ d("figure", {
		ref: Ce,
		className: Ae,
		...Se,
		children: [
			se ? /* @__PURE__ */ u("figcaption", {
				className: "chart__title",
				children: se
			}) : null,
			A ? /* @__PURE__ */ u("p", {
				className: "chart__empty",
				children: be
			}) : /* @__PURE__ */ d("div", {
				className: "chart__plot",
				ref: we,
				children: [
					/* @__PURE__ */ d("svg", {
						className: "chart__canvas",
						viewBox: `0 0 ${Te} ${Ve}`,
						width: Te,
						height: Ve,
						"aria-hidden": "true",
						children: [
							pe && !D ? /* @__PURE__ */ u("g", {
								className: "chart__grid",
								"aria-hidden": "true",
								children: M.map((e) => N ? /* @__PURE__ */ u("line", {
									className: "chart__grid-line",
									x1: V(e),
									y1: I,
									x2: V(e),
									y2: L
								}, e) : /* @__PURE__ */ u("line", {
									className: "chart__grid-line",
									x1: P,
									y1: B(e),
									x2: F,
									y2: B(e)
								}, e))
							}) : null,
							D ? null : /* @__PURE__ */ d("g", {
								className: "chart__axes",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ u("line", {
										className: "chart__axis",
										x1: N ? He : P,
										y1: N ? I : H,
										x2: N ? He : F,
										y2: N ? L : H
									}),
									N ? Le.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: P - f.axisGap,
										y: G(t),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: e
									}, `cat-${t}`)) : M.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: P - f.axisGap,
										y: B(e),
										textAnchor: "end",
										dominantBaseline: "middle",
										children: Ie[t]
									}, `tick-${e}`)),
									N ? M.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: V(e),
										y: L + f.axisGap + f.labelFontSize,
										textAnchor: "middle",
										children: Ie[t]
									}, `vtick-${e}`)) : Le.map((e, t) => /* @__PURE__ */ u("text", {
										className: "chart__axis-label",
										x: r === "bar" ? G(t) : W(t),
										y: L + f.axisGap + f.labelFontSize,
										textAnchor: t === 0 && r !== "bar" ? "start" : t === k.length - 1 && r !== "bar" ? "end" : "middle",
										children: e
									}, `cat-${t}`))
								]
							}),
							C !== null && x && (r === "line" || r === "area") ? /* @__PURE__ */ u("line", {
								className: "chart__crosshair",
								"aria-hidden": "true",
								x1: W(C),
								y1: I,
								x2: W(C),
								y2: L
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
						"aria-label": oe,
						"aria-describedby": Ee,
						tabIndex: x ? 0 : void 0,
						style: {
							insetInlineStart: `${P}px`,
							insetBlockStart: `${I}px`,
							width: `${R}px`,
							height: `${z}px`
						},
						onPointerMove: x ? (e) => w(Ge(e)) : void 0,
						onPointerLeave: x ? () => w(null) : void 0,
						onKeyDown: x ? qe : void 0,
						onBlur: x ? () => w(null) : void 0
					}),
					x && C !== null && $ ? /* @__PURE__ */ d("div", {
						className: "chart__tooltip",
						"aria-hidden": "true",
						style: {
							left: `${Ye}px`,
							top: `${Xe}px`
						},
						children: [/* @__PURE__ */ u("p", {
							className: "chart__tooltip-header",
							children: D ? T(q) : E(_($, h))
						}), /* @__PURE__ */ u("ul", {
							className: "chart__tooltip-list",
							children: Je.map((e) => /* @__PURE__ */ d("li", {
								className: "chart__tooltip-row",
								children: [
									/* @__PURE__ */ u("span", {
										className: "chart__tooltip-key",
										style: v(e.index, s[e.index]?.color),
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
			ke && !A ? /* @__PURE__ */ u("div", {
				className: "chart__legend",
				children: /* @__PURE__ */ u(t, {
					gap: "sm",
					children: (D ? k.map((e, t) => ({
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
							style: v(e.index, e.color),
							"aria-hidden": "true"
						}), e.label]
					}, e.key))
				})
			}) : null,
			ce ? /* @__PURE__ */ u("p", {
				className: "chart__caption",
				children: ce
			}) : null,
			/* @__PURE__ */ u(e, {
				id: Ee,
				children: ge
			}),
			/* @__PURE__ */ u(e, {
				as: "div",
				children: /* @__PURE__ */ d("table", {
					className: "chart__table",
					children: [
						/* @__PURE__ */ u("caption", { children: he }),
						/* @__PURE__ */ u("thead", { children: /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
							scope: "col",
							children: _e
						}), D ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("th", {
							scope: "col",
							children: ve
						}), /* @__PURE__ */ u("th", {
							scope: "col",
							children: ye
						})] }) : s.map((e) => /* @__PURE__ */ u("th", {
							scope: "col",
							children: e.label
						}, e.key))] }) }),
						/* @__PURE__ */ u("tbody", { children: k.map((e, t) => /* @__PURE__ */ d("tr", { children: [/* @__PURE__ */ u("th", {
							scope: "row",
							children: E(_(e, h))
						}), D ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("td", { children: T(g(e[K])) }), /* @__PURE__ */ u("td", { children: Oe.format(We[t]?.share ?? 0) })] }) : s.map((t) => /* @__PURE__ */ u("td", { children: T(g(e[t.key]), t) }, t.key))] }, `row-${t}`)) })
					]
				})
			})
		]
	});
});
//#endregion
export { re as Chart };
