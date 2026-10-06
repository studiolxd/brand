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
var u = i(function({ options: i, value: u, defaultValue: d = [], placeholder: f, disabled: p, readOnly: m, size: h = "md", onValueChange: g, id: _, name: v, error: y = !1, onBlur: b, className: x, "aria-label": S, "aria-labelledby": C, "aria-describedby": w, removeLabel: T, container: E }, D) {
	let O = e("multiSelect"), k = n(E), [A, j] = o(!1), [M, N] = o(d), P = a(null), F = a(null), I = a(null), L = u === void 0 ? M : u;
	function R(e) {
		u === void 0 && N(e), g?.(e);
	}
	function z(e) {
		R(L.filter((t) => t !== e));
	}
	function B(e) {
		p || m || e.target instanceof Element && (e.target.closest(".multi-select__pill-remove") || F.current?.contains(e.target) || (e.preventDefault(), F.current?.focus(), j(!A)));
	}
	function V(e) {
		return e instanceof Node && (!!F.current?.contains(e) || !!I.current?.contains(e));
	}
	function H(e) {
		V(e.relatedTarget) || b?.(e);
	}
	let U = [
		"multi-select",
		h === "md" ? "" : `multi-select--${h}`,
		p ? "multi-select--disabled" : "",
		y ? "multi-select--error" : "",
		x ?? ""
	].filter(Boolean).join(" "), W = ["multi-select__content", h === "md" ? "" : `multi-select__content--${h}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		multiple: !0,
		value: L,
		onValueChange: R,
		open: A,
		onOpenChange: j,
		name: v,
		disabled: p,
		readOnly: m,
		modal: !1,
		children: [/* @__PURE__ */ c("div", {
			ref: P,
			className: U,
			"data-popup-open": A || void 0,
			onPointerDown: B,
			children: [/* @__PURE__ */ c("div", {
				className: "multi-select__values",
				children: [L.map((e) => {
					let n = i.find((t) => t.value === e);
					return n ? /* @__PURE__ */ c("span", {
						className: "multi-select__pill",
						children: [/* @__PURE__ */ s("span", {
							className: "multi-select__pill-label",
							children: n.label
						}), !p && !m && /* @__PURE__ */ s("button", {
							type: "button",
							className: "multi-select__pill-remove",
							"aria-label": O("remove", T)(n.label),
							tabIndex: -1,
							onClick: (t) => {
								t.stopPropagation(), z(e), F.current?.focus();
							},
							children: /* @__PURE__ */ s(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e) : null;
				}), /* @__PURE__ */ s(l.Trigger, {
					ref: (e) => {
						F.current = e, r(D, e);
					},
					render: /* @__PURE__ */ s("div", {}),
					nativeButton: !1,
					className: "multi-select__combobox",
					id: _,
					"aria-label": C ? void 0 : S ?? O("placeholder", f),
					"aria-labelledby": C,
					"aria-describedby": w,
					"aria-invalid": y || void 0,
					"aria-readonly": m || void 0,
					onBlur: H,
					children: L.length === 0 && /* @__PURE__ */ s("span", {
						className: "multi-select__placeholder",
						children: O("placeholder", f)
					})
				})]
			}), /* @__PURE__ */ s(t, {
				name: "chevron",
				className: "multi-select__icon"
			})]
		}), /* @__PURE__ */ s(l.Portal, {
			container: k,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "multi-select__positioner",
				anchor: P,
				align: "start",
				sideOffset: -1,
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ s(l.Popup, {
					ref: I,
					className: W,
					"aria-label": S ?? f,
					onBlur: H,
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
