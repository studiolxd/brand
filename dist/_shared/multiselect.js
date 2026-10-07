import '../multiselect.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./portal-container.js";
import { t as r } from "./assign-ref.js";
import { forwardRef as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Select as l } from "@base-ui/react/select";
//#region src/stories/messages/es/multiSelect.ts
var u = {
	placeholder: "Seleccionar…",
	remove: (e) => `Quitar ${e}`
}, d = i(function({ options: i, value: d, defaultValue: f = [], placeholder: p, disabled: m, readOnly: h, required: g, size: _ = "md", onValueChange: v, id: y, name: b, error: x = !1, onBlur: S, className: C, "aria-label": w, "aria-labelledby": T, "aria-describedby": E, removeLabel: D, container: O }, k) {
	let A = e("multiSelect", u), j = n(O), [M, N] = o(!1), [P, F] = o(f), I = a(null), L = a(null), R = a(null), z = d === void 0 ? P : d;
	function B(e) {
		d === void 0 && F(e), v?.(e);
	}
	function V(e) {
		B(z.filter((t) => t !== e));
	}
	function H(e) {
		m || h || e.target instanceof Element && (e.target.closest(".multi-select__pill-remove") || L.current?.contains(e.target) || (e.preventDefault(), L.current?.focus(), N(!M)));
	}
	function U(e) {
		return e instanceof Node && (!!L.current?.contains(e) || !!R.current?.contains(e));
	}
	function W(e) {
		U(e.relatedTarget) || S?.(e);
	}
	let G = [
		"multi-select",
		_ === "md" ? "" : `multi-select--${_}`,
		m ? "multi-select--disabled" : "",
		x ? "multi-select--error" : "",
		C ?? ""
	].filter(Boolean).join(" "), K = ["multi-select__content", _ === "md" ? "" : `multi-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Root, {
		multiple: !0,
		value: z,
		onValueChange: B,
		open: M,
		onOpenChange: N,
		name: b,
		disabled: m,
		readOnly: h,
		required: g,
		modal: !1,
		children: [/* @__PURE__ */ c("div", {
			ref: I,
			className: G,
			"data-popup-open": M || void 0,
			onPointerDown: H,
			children: [/* @__PURE__ */ c("div", {
				className: "multi-select__values",
				children: [z.map((e) => {
					let n = i.find((t) => t.value === e);
					return n ? /* @__PURE__ */ c("span", {
						className: "multi-select__pill",
						children: [/* @__PURE__ */ s("span", {
							className: "multi-select__pill-label",
							children: n.label
						}), !m && !h && /* @__PURE__ */ s("button", {
							type: "button",
							className: "multi-select__pill-remove",
							"aria-label": A("remove", D)(n.label),
							tabIndex: -1,
							onClick: (t) => {
								t.stopPropagation(), V(e), L.current?.focus();
							},
							children: /* @__PURE__ */ s(t, {
								name: "close",
								size: "xs"
							})
						})]
					}, e) : null;
				}), /* @__PURE__ */ s(l.Trigger, {
					ref: (e) => {
						L.current = e, r(k, e);
					},
					render: /* @__PURE__ */ s("div", {}),
					nativeButton: !1,
					className: "multi-select__combobox",
					id: y,
					"aria-label": T ? void 0 : w ?? A("placeholder", p),
					"aria-labelledby": T,
					"aria-describedby": E,
					"aria-invalid": x || void 0,
					"aria-readonly": h || void 0,
					onBlur: W,
					children: z.length === 0 && /* @__PURE__ */ s("span", {
						className: "multi-select__placeholder",
						children: A("placeholder", p)
					})
				})]
			}), /* @__PURE__ */ s(t, {
				name: "chevron",
				className: "multi-select__icon"
			})]
		}), /* @__PURE__ */ s(l.Portal, {
			container: j,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "multi-select__positioner",
				anchor: I,
				align: "start",
				sideOffset: -1,
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ s(l.Popup, {
					ref: R,
					className: K,
					"aria-label": w ?? p,
					onBlur: W,
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
export { d as t };
