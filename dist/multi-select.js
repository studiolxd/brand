'use client';
import './multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n, useEffect as r, useId as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = 500, f = n(function({ options: n, value: f, defaultValue: p = [], placeholder: m, disabled: h, readOnly: g, size: _ = "md", onValueChange: v, id: y, name: b, error: x = !1, onBlur: S, className: C, "aria-label": w, "aria-labelledby": T, "aria-describedby": E, removeLabel: D, container: O }, k) {
	let A = e("multiSelect"), [j, M] = o(!1), [N, P] = o(p), [F, I] = o(-1), L = a(null), R = a(null), z = i(), B = i(), V = a(""), H = a(0), U = f === void 0 ? N : f, W = (e) => `${B}-opt-${e}`;
	function G(e) {
		let t = U.includes(e) ? U.filter((t) => t !== e) : [...U, e];
		f === void 0 && P(t), v?.(t);
	}
	function K(e) {
		h || g || (M(!0), I(n.length === 0 ? -1 : e));
	}
	function q() {
		M(!1), I(-1), V.current = "";
	}
	function J(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && L.current?.contains(e)) return;
			}
			q();
		}
	}
	function Y(e) {
		if (n.length === 0) return;
		let t = Date.now(), r = t - H.current > d ? e : V.current + e;
		V.current = r, H.current = t;
		let i = r.length === 1 ? F + 1 : Math.max(F, 0), a = r.toLowerCase();
		for (let e = 0; e < n.length; e++) {
			let t = (i + e) % n.length;
			if (n[t].label.toLowerCase().startsWith(a)) {
				I(t), j || M(!0);
				return;
			}
		}
	}
	function X(e) {
		if (h || g) return;
		let t = n.length - 1;
		if (e.key === "ArrowDown") e.preventDefault(), j ? I((e) => Math.min(e + 1, t)) : K(0);
		else if (e.key === "ArrowUp") e.preventDefault(), j ? I((e) => Math.max(e - 1, 0)) : K(t);
		else if (e.key === "Home") e.preventDefault(), j ? I(n.length === 0 ? -1 : 0) : K(0);
		else if (e.key === "End") e.preventDefault(), j ? I(t) : K(t);
		else if (e.key === "Enter" || e.key === " ") e.preventDefault(), j ? F >= 0 && F < n.length && G(n[F].value) : K(0);
		else if (e.key === "Escape") {
			if (!j) return;
			e.preventDefault(), q();
		} else e.key === "Tab" ? j && q() : e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), Y(e.key));
	}
	function Z(e) {
		h || g || e.target instanceof Element && e.target.closest(".multi-select__pill-remove") || (e.preventDefault(), R.current?.focus(), j ? q() : K(0));
	}
	r(() => {
		!j || F < 0 || document.getElementById(W(F))?.scrollIntoView({ block: "nearest" });
	}, [
		j,
		F,
		B
	]);
	let Q = [
		"multi-select",
		_ === "md" ? "" : `multi-select--${_}`,
		h ? "multi-select--disabled" : "",
		x ? "multi-select--error" : "",
		C ?? ""
	].filter(Boolean).join(" "), $ = ["multi-select__content", _ === "md" ? "" : `multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		open: j,
		onOpenChange: J,
		children: [/* @__PURE__ */ c("div", {
			ref: L,
			className: Q,
			"data-popup-open": j || void 0,
			onPointerDown: Z,
			children: [
				/* @__PURE__ */ c("div", {
					className: "multi-select__values",
					children: [U.map((e) => {
						let r = n.find((t) => t.value === e);
						return r ? /* @__PURE__ */ c("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ s("span", {
								className: "multi-select__pill-label",
								children: r.label
							}), !h && !g && /* @__PURE__ */ s("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": A("remove", D)(r.label),
								tabIndex: -1,
								onClick: (t) => {
									t.stopPropagation(), G(e), R.current?.focus();
								},
								children: /* @__PURE__ */ s(t, {
									name: "close",
									size: "xs"
								})
							})]
						}, e) : null;
					}), /* @__PURE__ */ s("div", {
						ref: (e) => {
							R.current = e, u(k, e);
						},
						className: "multi-select__combobox",
						tabIndex: h ? -1 : 0,
						role: "combobox",
						"aria-expanded": j,
						"aria-haspopup": "listbox",
						"aria-controls": j ? z : void 0,
						"aria-activedescendant": j && F >= 0 ? W(F) : void 0,
						"aria-label": T ? void 0 : w ?? A("placeholder", m),
						"aria-labelledby": T,
						"aria-describedby": E,
						"aria-invalid": x || void 0,
						"aria-disabled": h || void 0,
						"aria-readonly": g || void 0,
						id: y,
						onKeyDown: X,
						onBlur: S,
						children: U.length === 0 && /* @__PURE__ */ s("span", {
							className: "multi-select__placeholder",
							children: A("placeholder", m)
						})
					})]
				}),
				/* @__PURE__ */ s(t, {
					name: "chevron",
					className: "multi-select__icon"
				}),
				b && U.map((e) => /* @__PURE__ */ s("input", {
					type: "hidden",
					name: b,
					value: e
				}, e))
			]
		}), /* @__PURE__ */ s(l.Portal, {
			container: O,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "multi-select__positioner",
				anchor: L,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ s(l.Popup, {
					className: $,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ s("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": w ?? m,
						id: z,
						children: n.map((e, t) => {
							let n = U.includes(e.value), r = F === t;
							return /* @__PURE__ */ c("div", {
								id: W(t),
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
									G(e.value), I(t), R.current?.focus();
								},
								children: [/* @__PURE__ */ s("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ s("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ s("span", { children: e.label })]
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { f as MultiSelect };
