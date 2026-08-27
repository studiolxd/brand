'use client';
import './multi-select.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { Popover as c } from "@base-ui-components/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
var l = r(function({ options: r, value: l, defaultValue: u = [], placeholder: d = "Seleccionar…", disabled: f, readOnly: p, size: m = "md", onValueChange: h, id: g, name: _, error: v = !1, onBlur: y, className: b, "aria-label": x, "aria-labelledby": S, "aria-describedby": C, removeLabel: w = (e) => `Quitar ${e}`, container: T }, E) {
	let [D, O] = s(!1), [k, A] = s(u), [j, M] = s(0), N = o(null), P = a(), F = l === void 0 ? k : l;
	function I(e) {
		let t = F.includes(e) ? F.filter((t) => t !== e) : [...F, e];
		l === void 0 && A(t), h?.(t);
	}
	function L(e) {
		f || p || (O(e), e && M(0));
	}
	i(() => {
		!D || !N.current || N.current.querySelectorAll("[role=\"option\"]")[j]?.focus();
	}, [j, D]);
	function R(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), M((e) => Math.min(e + 1, r.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), M((e) => Math.max(e - 1, 0))) : (e.key === " " || e.key === "Enter") && (e.preventDefault(), j >= 0 && j < r.length && I(r[j].value));
	}
	let z = [
		"multi-select",
		m === "md" ? "" : `multi-select--${m}`,
		f ? "multi-select--disabled" : "",
		v ? "multi-select--error" : "",
		b ?? ""
	].filter(Boolean).join(" "), B = ["multi-select__content", m === "md" ? "" : `multi-select__content--${m}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(c.Root, {
		open: D,
		onOpenChange: L,
		children: [/* @__PURE__ */ t(c.Trigger, {
			nativeButton: !1,
			render: /* @__PURE__ */ n("div", {
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
					/* @__PURE__ */ t("div", {
						className: "multi-select__values",
						children: F.length === 0 ? /* @__PURE__ */ t("span", {
							className: "multi-select__placeholder",
							children: d
						}) : F.map((i) => {
							let a = r.find((e) => e.value === i);
							return a ? /* @__PURE__ */ n("span", {
								className: "multi-select__pill",
								children: [/* @__PURE__ */ t("span", {
									className: "multi-select__pill-label",
									children: a.label
								}), !f && !p && /* @__PURE__ */ t("button", {
									type: "button",
									className: "multi-select__pill-remove",
									"aria-label": w(a.label),
									tabIndex: -1,
									onClick: (e) => {
										e.stopPropagation(), I(i);
									},
									children: /* @__PURE__ */ t(e, {
										name: "close",
										size: "xs"
									})
								})]
							}, i) : null;
						})
					}),
					/* @__PURE__ */ t(e, {
						name: "chevron",
						className: "multi-select__icon",
						size: m === "sm" ? "xs" : m === "lg" ? "md" : "sm"
					}),
					_ && F.map((e) => /* @__PURE__ */ t("input", {
						type: "hidden",
						name: _,
						value: e
					}, e))
				]
			})
		}), /* @__PURE__ */ t(c.Portal, {
			container: T,
			children: /* @__PURE__ */ t(c.Positioner, {
				className: "multi-select__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ t(c.Popup, {
					className: B,
					initialFocus: !1,
					children: /* @__PURE__ */ t("div", {
						ref: N,
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": x ?? d,
						id: P,
						onKeyDown: R,
						children: r.map((e, r) => {
							let i = F.includes(e.value);
							return /* @__PURE__ */ n("button", {
								type: "button",
								role: "option",
								"aria-selected": i,
								"aria-label": e["aria-label"] ?? e.label,
								className: ["multi-select__item", i ? "multi-select__item--selected" : ""].filter(Boolean).join(" "),
								tabIndex: r === j ? 0 : -1,
								onClick: () => I(e.value),
								onFocus: () => M(r),
								children: [/* @__PURE__ */ t("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ t("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ t("span", { children: e.label })]
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
