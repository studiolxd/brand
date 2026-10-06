'use client';
import './multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { t as r } from "./_shared/assign-ref.js";
import { forwardRef as i, useCallback as a, useEffect as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { Popover as f } from "@base-ui/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
var p = 500, m = i(function({ options: i, value: m, defaultValue: h = [], placeholder: g, disabled: _, readOnly: v, size: y = "md", onValueChange: b, id: x, name: S, error: C = !1, onBlur: w, className: T, "aria-label": E, "aria-labelledby": D, "aria-describedby": O, removeLabel: k, container: A }, j) {
	let M = e("multiSelect"), N = n(A), [P, F] = l(!1), [I, L] = l(h), [R, z] = l(-1), B = c(null), V = c(null), H = s(), U = s(), W = c(""), G = c(0), K = m === void 0 ? I : m, q = a((e) => `${U}-opt-${e}`, [U]);
	function J(e) {
		let t = K.includes(e) ? K.filter((t) => t !== e) : [...K, e];
		m === void 0 && L(t), b?.(t);
	}
	function Y(e) {
		_ || v || (F(!0), z(i.length === 0 ? -1 : e));
	}
	function X() {
		F(!1), z(-1), W.current = "";
	}
	function Z(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && B.current?.contains(e)) return;
			}
			X();
		}
	}
	function Q(e) {
		if (i.length === 0) return;
		let t = Date.now(), n = t - G.current > p ? e : W.current + e;
		W.current = n, G.current = t;
		let r = n.length === 1 ? R + 1 : Math.max(R, 0), a = n.toLowerCase();
		for (let e = 0; e < i.length; e++) {
			let t = (r + e) % i.length;
			if (i[t].label.toLowerCase().startsWith(a)) {
				z(t), P || F(!0);
				return;
			}
		}
	}
	function $(e) {
		if (_ || v) return;
		let t = i.length - 1;
		if (e.key === "ArrowDown") e.preventDefault(), P ? z((e) => Math.min(e + 1, t)) : Y(0);
		else if (e.key === "ArrowUp") e.preventDefault(), P ? z((e) => Math.max(e - 1, 0)) : Y(t);
		else if (e.key === "Home") e.preventDefault(), P ? z(i.length === 0 ? -1 : 0) : Y(0);
		else if (e.key === "End") e.preventDefault(), P ? z(t) : Y(t);
		else if (e.key === "Enter" || e.key === " ") e.preventDefault(), P ? R >= 0 && R < i.length && J(i[R].value) : Y(0);
		else if (e.key === "Escape") {
			if (!P) return;
			e.preventDefault(), X();
		} else e.key === "Tab" ? P && X() : e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), Q(e.key));
	}
	function ee(e) {
		_ || v || e.target instanceof Element && e.target.closest(".multi-select__pill-remove") || (e.preventDefault(), V.current?.focus(), P ? X() : Y(0));
	}
	o(() => {
		!P || R < 0 || document.getElementById(q(R))?.scrollIntoView({ block: "nearest" });
	}, [
		P,
		R,
		q
	]);
	let te = [
		"multi-select",
		y === "md" ? "" : `multi-select--${y}`,
		_ ? "multi-select--disabled" : "",
		C ? "multi-select--error" : "",
		T ?? ""
	].filter(Boolean).join(" "), ne = ["multi-select__content", y === "md" ? "" : `multi-select__content--${y}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(f.Root, {
		open: P,
		onOpenChange: Z,
		children: [/* @__PURE__ */ d("div", {
			ref: B,
			className: te,
			"data-popup-open": P || void 0,
			onPointerDown: ee,
			children: [
				/* @__PURE__ */ d("div", {
					className: "multi-select__values",
					children: [K.map((e) => {
						let n = i.find((t) => t.value === e);
						return n ? /* @__PURE__ */ d("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ u("span", {
								className: "multi-select__pill-label",
								children: n.label
							}), !_ && !v && /* @__PURE__ */ u("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": M("remove", k)(n.label),
								tabIndex: -1,
								onClick: (t) => {
									t.stopPropagation(), J(e), V.current?.focus();
								},
								children: /* @__PURE__ */ u(t, {
									name: "close",
									size: "xs"
								})
							})]
						}, e) : null;
					}), /* @__PURE__ */ u("div", {
						ref: (e) => {
							V.current = e, r(j, e);
						},
						className: "multi-select__combobox",
						tabIndex: _ ? -1 : 0,
						role: "combobox",
						"aria-expanded": P,
						"aria-haspopup": "listbox",
						"aria-controls": P ? H : void 0,
						"aria-activedescendant": P && R >= 0 ? q(R) : void 0,
						"aria-label": D ? void 0 : E ?? M("placeholder", g),
						"aria-labelledby": D,
						"aria-describedby": O,
						"aria-invalid": C || void 0,
						"aria-disabled": _ || void 0,
						"aria-readonly": v || void 0,
						id: x,
						onKeyDown: $,
						onBlur: w,
						children: K.length === 0 && /* @__PURE__ */ u("span", {
							className: "multi-select__placeholder",
							children: M("placeholder", g)
						})
					})]
				}),
				/* @__PURE__ */ u(t, {
					name: "chevron",
					className: "multi-select__icon"
				}),
				S && K.map((e) => /* @__PURE__ */ u("input", {
					type: "hidden",
					name: S,
					value: e
				}, e))
			]
		}), /* @__PURE__ */ u(f.Portal, {
			container: N,
			children: /* @__PURE__ */ u(f.Positioner, {
				className: "multi-select__positioner",
				anchor: B,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ u(f.Popup, {
					className: ne,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ u("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": E ?? g,
						id: H,
						children: i.map((e, t) => {
							let n = K.includes(e.value), r = R === t;
							return /* @__PURE__ */ d("div", {
								id: q(t),
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
									J(e.value), z(t), V.current?.focus();
								},
								children: [/* @__PURE__ */ u("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ u("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ u("span", { children: e.label })]
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { m as MultiSelect };
