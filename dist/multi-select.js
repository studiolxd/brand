'use client';
import './multi-select.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Popover as c } from "@base-ui/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function l(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var u = 500, d = t(function({ options: t, value: d, defaultValue: f = [], placeholder: p = "Seleccionar…", disabled: m, readOnly: h, size: g = "md", onValueChange: _, id: v, name: y, error: b = !1, onBlur: x, className: S, "aria-label": C, "aria-labelledby": w, "aria-describedby": T, removeLabel: E = (e) => `Quitar ${e}`, container: D }, O) {
	let [k, A] = a(!1), [j, M] = a(f), [N, P] = a(-1), F = i(null), I = i(null), L = r(), R = r(), z = i(""), B = i(0), V = d === void 0 ? j : d, H = (e) => `${R}-opt-${e}`;
	function U(e) {
		let t = V.includes(e) ? V.filter((t) => t !== e) : [...V, e];
		d === void 0 && M(t), _?.(t);
	}
	function W(e) {
		m || h || (A(!0), P(t.length === 0 ? -1 : e));
	}
	function G() {
		A(!1), P(-1), z.current = "";
	}
	function K(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && F.current?.contains(e)) return;
			}
			G();
		}
	}
	function q(e) {
		if (t.length === 0) return;
		let n = Date.now(), r = n - B.current > u ? e : z.current + e;
		z.current = r, B.current = n;
		let i = r.length === 1 ? N + 1 : Math.max(N, 0), a = r.toLowerCase();
		for (let e = 0; e < t.length; e++) {
			let n = (i + e) % t.length;
			if (t[n].label.toLowerCase().startsWith(a)) {
				P(n), k || A(!0);
				return;
			}
		}
	}
	function J(e) {
		if (m || h) return;
		let n = t.length - 1;
		if (e.key === "ArrowDown") e.preventDefault(), k ? P((e) => Math.min(e + 1, n)) : W(0);
		else if (e.key === "ArrowUp") e.preventDefault(), k ? P((e) => Math.max(e - 1, 0)) : W(n);
		else if (e.key === "Home") e.preventDefault(), k ? P(t.length === 0 ? -1 : 0) : W(0);
		else if (e.key === "End") e.preventDefault(), k ? P(n) : W(n);
		else if (e.key === "Enter" || e.key === " ") e.preventDefault(), k ? N >= 0 && N < t.length && U(t[N].value) : W(0);
		else if (e.key === "Escape") {
			if (!k) return;
			e.preventDefault(), G();
		} else e.key === "Tab" ? k && G() : e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), q(e.key));
	}
	function Y(e) {
		m || h || e.target instanceof Element && e.target.closest(".multi-select__pill-remove") || (e.preventDefault(), I.current?.focus(), k ? G() : W(0));
	}
	n(() => {
		!k || N < 0 || document.getElementById(H(N))?.scrollIntoView({ block: "nearest" });
	}, [
		k,
		N,
		R
	]);
	let X = [
		"multi-select",
		g === "md" ? "" : `multi-select--${g}`,
		m ? "multi-select--disabled" : "",
		b ? "multi-select--error" : "",
		S ?? ""
	].filter(Boolean).join(" "), Z = ["multi-select__content", g === "md" ? "" : `multi-select__content--${g}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(c.Root, {
		open: k,
		onOpenChange: K,
		children: [/* @__PURE__ */ s("div", {
			ref: F,
			className: X,
			"data-popup-open": k || void 0,
			onPointerDown: Y,
			children: [
				/* @__PURE__ */ s("div", {
					className: "multi-select__values",
					children: [V.map((n) => {
						let r = t.find((e) => e.value === n);
						return r ? /* @__PURE__ */ s("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ o("span", {
								className: "multi-select__pill-label",
								children: r.label
							}), !m && !h && /* @__PURE__ */ o("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": E(r.label),
								tabIndex: -1,
								onClick: (e) => {
									e.stopPropagation(), U(n), I.current?.focus();
								},
								children: /* @__PURE__ */ o(e, {
									name: "close",
									size: "xs"
								})
							})]
						}, n) : null;
					}), /* @__PURE__ */ o("div", {
						ref: (e) => {
							I.current = e, l(O, e);
						},
						className: "multi-select__combobox",
						tabIndex: m ? -1 : 0,
						role: "combobox",
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? L : void 0,
						"aria-activedescendant": k && N >= 0 ? H(N) : void 0,
						"aria-label": w ? void 0 : C ?? p,
						"aria-labelledby": w,
						"aria-describedby": T,
						"aria-invalid": b || void 0,
						"aria-disabled": m || void 0,
						"aria-readonly": h || void 0,
						id: v,
						onKeyDown: J,
						onBlur: x,
						children: V.length === 0 && /* @__PURE__ */ o("span", {
							className: "multi-select__placeholder",
							children: p
						})
					})]
				}),
				/* @__PURE__ */ o(e, {
					name: "chevron",
					className: "multi-select__icon",
					size: g === "sm" ? "xs" : g === "lg" ? "md" : "sm"
				}),
				y && V.map((e) => /* @__PURE__ */ o("input", {
					type: "hidden",
					name: y,
					value: e
				}, e))
			]
		}), /* @__PURE__ */ o(c.Portal, {
			container: D,
			children: /* @__PURE__ */ o(c.Positioner, {
				className: "multi-select__positioner",
				anchor: F,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ o(c.Popup, {
					className: Z,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ o("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": C ?? p,
						id: L,
						children: t.map((e, t) => {
							let n = V.includes(e.value), r = N === t;
							return /* @__PURE__ */ s("div", {
								id: H(t),
								role: "option",
								"aria-selected": n,
								"aria-label": e["aria-label"] ?? e.label,
								className: [
									"multi-select__item",
									n ? "multi-select__item--selected" : "",
									r ? "multi-select__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => {
									e.preventDefault(), e.stopPropagation();
								},
								onClick: () => {
									U(e.value), P(t), I.current?.focus();
								},
								children: [/* @__PURE__ */ o("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ o("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ o("span", { children: e.label })]
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { d as MultiSelect };
