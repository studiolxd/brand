'use client';
import './multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { t as r } from "./_shared/assign-ref.js";
import { forwardRef as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Select as l } from "@base-ui/react/select";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
var u = i(function({ options: i, value: u, defaultValue: d = [], placeholder: f, disabled: p, readOnly: m, required: h, size: g = "md", onValueChange: _, id: v, name: y, error: b = !1, onBlur: x, className: S, "aria-label": C, "aria-labelledby": w, "aria-describedby": T, removeLabel: E, container: D }, O) {
	let k = e("multiSelect"), A = n(D), [j, M] = o(!1), [N, P] = o(d), F = a(null), I = a(null), L = a(null), R = u === void 0 ? N : u;
	function z(e) {
		u === void 0 && P(e), _?.(e);
	}
	function B(e) {
		z(R.filter((t) => t !== e));
	}
	function V(e) {
		p || m || e.target instanceof Element && (e.target.closest(".multi-select__pill-remove") || I.current?.contains(e.target) || (e.preventDefault(), I.current?.focus(), M(!j)));
	}
	function H(e) {
		return e instanceof Node && (!!I.current?.contains(e) || !!L.current?.contains(e));
	}
	function U(e) {
		H(e.relatedTarget) || x?.(e);
	}
	let W = [
		"multi-select",
		g === "md" ? "" : `multi-select--${g}`,
		p ? "multi-select--disabled" : "",
		b ? "multi-select--error" : "",
		S ?? ""
	].filter(Boolean).join(" "), G = ["multi-select__content", g === "md" ? "" : `multi-select__content--${g}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		multiple: !0,
		value: R,
		onValueChange: z,
		open: j,
		onOpenChange: M,
		name: y,
		disabled: p,
		readOnly: m,
		required: h,
		modal: !1,
		children: [/* @__PURE__ */ c("div", {
			ref: F,
			className: W,
			"data-popup-open": j || void 0,
			onPointerDown: V,
			children: [/* @__PURE__ */ c("div", {
				className: "multi-select__values",
				children: [R.map((e) => {
					let n = i.find((t) => t.value === e);
					return n ? /* @__PURE__ */ c("span", {
						className: "multi-select__pill",
						children: [/* @__PURE__ */ s("span", {
							className: "multi-select__pill-label",
							children: n.label
						}), !p && !m && /* @__PURE__ */ s("button", {
							type: "button",
							className: "multi-select__pill-remove",
							"aria-label": k("remove", E)(n.label),
							tabIndex: -1,
							onClick: (t) => {
								t.stopPropagation(), B(e), I.current?.focus();
							},
							children: /* @__PURE__ */ s(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e) : null;
				}), /* @__PURE__ */ s(l.Trigger, {
					ref: (e) => {
						I.current = e, r(O, e);
					},
					render: /* @__PURE__ */ s("div", {}),
					nativeButton: !1,
					className: "multi-select__combobox",
					id: v,
					"aria-label": w ? void 0 : C ?? k("placeholder", f),
					"aria-labelledby": w,
					"aria-describedby": T,
					"aria-invalid": b || void 0,
					"aria-readonly": m || void 0,
					onBlur: U,
					children: R.length === 0 && /* @__PURE__ */ s("span", {
						className: "multi-select__placeholder",
						children: k("placeholder", f)
					})
				})]
			}), /* @__PURE__ */ s(t, {
				name: "chevron",
				className: "multi-select__icon"
			})]
		}), /* @__PURE__ */ s(l.Portal, {
			container: A,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "multi-select__positioner",
				anchor: F,
				align: "start",
				sideOffset: -1,
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ s(l.Popup, {
					ref: L,
					className: G,
					"aria-label": C ?? f,
					onBlur: U,
					children: i.map((e) => /* @__PURE__ */ c(l.Item, {
						value: e.value,
						"aria-label": e["aria-label"] ?? e.label,
						className: "multi-select__item",
						children: [/* @__PURE__ */ s("span", {
							className: "multi-select__item-check",
							"aria-hidden": "true",
							children: /* @__PURE__ */ s("span", { className: "multi-select__item-check-mark" })
						}), /* @__PURE__ */ s(l.ItemText, { children: e.label })]
					}, e.value))
				})
			})
		})]
	});
});
//#endregion
export { u as MultiSelect };
