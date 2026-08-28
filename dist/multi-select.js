'use client';
import './multi-select.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Popover as c } from "@base-ui-components/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
var l = t(function({ options: t, value: l, defaultValue: u = [], placeholder: d = "Seleccionar…", disabled: f, readOnly: p, size: m = "md", onValueChange: h, id: g, name: _, error: v = !1, onBlur: y, className: b, "aria-label": x, "aria-labelledby": S, "aria-describedby": C, removeLabel: w = (e) => `Quitar ${e}`, container: T }, E) {
	let [D, O] = a(!1), [k, A] = a(u), [j, M] = a(0), N = i(null), P = r(), F = l === void 0 ? k : l;
	function I(e) {
		let t = F.includes(e) ? F.filter((t) => t !== e) : [...F, e];
		l === void 0 && A(t), h?.(t);
	}
	function L(e) {
		f || p || (O(e), e && M(0));
	}
	n(() => {
		!D || !N.current || N.current.querySelectorAll("[role=\"option\"]")[j]?.focus();
	}, [j, D]);
	function R(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), M((e) => Math.min(e + 1, t.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), M((e) => Math.max(e - 1, 0))) : (e.key === " " || e.key === "Enter") && (e.preventDefault(), j >= 0 && j < t.length && I(t[j].value));
	}
	let z = [
		"multi-select",
		m === "md" ? "" : `multi-select--${m}`,
		f ? "multi-select--disabled" : "",
		v ? "multi-select--error" : "",
		b ?? ""
	].filter(Boolean).join(" "), B = ["multi-select__content", m === "md" ? "" : `multi-select__content--${m}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(c.Root, {
		open: D,
		onOpenChange: L,
		children: [/* @__PURE__ */ o(c.Trigger, {
			nativeButton: !1,
			render: /* @__PURE__ */ s("div", {
				ref: E,
				className: z,
				tabIndex: f ? -1 : 0,
				role: "combobox",
				"aria-expanded": D,
				"aria-haspopup": "listbox",
				"aria-controls": P,
				"aria-label": S ? void 0 : x ?? d,
				"aria-labelledby": S,
				"aria-describedby": C,
				"aria-invalid": v || void 0,
				"aria-disabled": f || void 0,
				"aria-readonly": p || void 0,
				id: g,
				onBlur: y,
				children: [
					/* @__PURE__ */ o("div", {
						className: "multi-select__values",
						children: F.length === 0 ? /* @__PURE__ */ o("span", {
							className: "multi-select__placeholder",
							children: d
						}) : F.map((n) => {
							let r = t.find((e) => e.value === n);
							return r ? /* @__PURE__ */ s("span", {
								className: "multi-select__pill",
								children: [/* @__PURE__ */ o("span", {
									className: "multi-select__pill-label",
									children: r.label
								}), !f && !p && /* @__PURE__ */ o("button", {
									type: "button",
									className: "multi-select__pill-remove",
									"aria-label": w(r.label),
									tabIndex: -1,
									onClick: (e) => {
										e.stopPropagation(), I(n);
									},
									children: /* @__PURE__ */ o(e, {
										name: "close",
										size: "xs"
									})
								})]
							}, n) : null;
						})
					}),
					/* @__PURE__ */ o(e, {
						name: "chevron",
						className: "multi-select__icon",
						size: m === "sm" ? "xs" : m === "lg" ? "md" : "sm"
					}),
					_ && F.map((e) => /* @__PURE__ */ o("input", {
						type: "hidden",
						name: _,
						value: e
					}, e))
				]
			})
		}), /* @__PURE__ */ o(c.Portal, {
			container: T,
			children: /* @__PURE__ */ o(c.Positioner, {
				className: "multi-select__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ o(c.Popup, {
					className: B,
					initialFocus: !1,
					children: /* @__PURE__ */ o("div", {
						ref: N,
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": x ?? d,
						id: P,
						onKeyDown: R,
						children: t.map((e, t) => {
							let n = F.includes(e.value);
							return /* @__PURE__ */ s("button", {
								type: "button",
								role: "option",
								"aria-selected": n,
								"aria-label": e["aria-label"] ?? e.label,
								className: ["multi-select__item", n ? "multi-select__item--selected" : ""].filter(Boolean).join(" "),
								tabIndex: t === j ? 0 : -1,
								onClick: () => I(e.value),
								onFocus: () => M(t),
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
export { l as MultiSelect };
