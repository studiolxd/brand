'use client';
import './multi-select.css';
import { Icon as e } from "./icon.js";
import { i as t, n, r, t as i } from "./_shared/PopoverPopup.js";
import { t as a } from "./_shared/PopoverTrigger.js";
import { useEffect as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function f({ options: f, value: p, defaultValue: m = [], placeholder: h = "Seleccionar…", disabled: g, readOnly: _, size: v = "md", onValueChange: y, id: b, "aria-label": x, container: S }) {
	let [C, w] = l(!1), [T, E] = l(m), [D, O] = l(0), k = c(null), A = s(), j = p === void 0 ? T : p;
	function M(e) {
		let t = j.includes(e) ? j.filter((t) => t !== e) : [...j, e];
		p === void 0 && E(t), y?.(t);
	}
	function N(e) {
		g || _ || (w(e), e && O(0));
	}
	o(() => {
		!C || !k.current || k.current.querySelectorAll("[role=\"option\"]")[D]?.focus();
	}, [D, C]);
	function P(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), O((e) => Math.min(e + 1, f.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), O((e) => Math.max(e - 1, 0))) : (e.key === " " || e.key === "Enter") && (e.preventDefault(), D >= 0 && D < f.length && M(f[D].value));
	}
	let F = [
		"multi-select",
		v === "md" ? "" : `multi-select--${v}`,
		g ? "multi-select--disabled" : ""
	].filter(Boolean).join(" "), I = ["multi-select__content", v === "md" ? "" : `multi-select__content--${v}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(t, {
		open: C,
		onOpenChange: N,
		children: [/* @__PURE__ */ u(a, {
			nativeButton: !1,
			render: /* @__PURE__ */ d("div", {
				className: F,
				tabIndex: g ? -1 : 0,
				role: "combobox",
				"aria-expanded": C,
				"aria-haspopup": "listbox",
				"aria-controls": A,
				"aria-label": x ?? h,
				"aria-disabled": g || void 0,
				"aria-readonly": _ || void 0,
				id: b,
				children: [/* @__PURE__ */ u("div", {
					className: "multi-select__values",
					children: j.length === 0 ? /* @__PURE__ */ u("span", {
						className: "multi-select__placeholder",
						children: h
					}) : j.map((t) => {
						let n = f.find((e) => e.value === t);
						return n ? /* @__PURE__ */ d("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ u("span", {
								className: "multi-select__pill-label",
								children: n.label
							}), !g && !_ && /* @__PURE__ */ u("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": `Quitar ${n.label}`,
								tabIndex: -1,
								onClick: (e) => {
									e.stopPropagation(), M(t);
								},
								children: /* @__PURE__ */ u(e, {
									name: "close",
									size: "xs"
								})
							})]
						}, t) : null;
					})
				}), /* @__PURE__ */ u(e, {
					name: "chevron",
					className: "multi-select__icon",
					size: v === "sm" ? "xs" : v === "lg" ? "md" : "sm"
				})]
			})
		}), /* @__PURE__ */ u(r, {
			container: S,
			children: /* @__PURE__ */ u(n, {
				className: "multi-select__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ u(i, {
					className: I,
					initialFocus: !1,
					children: /* @__PURE__ */ u("div", {
						ref: k,
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": x ?? h,
						id: A,
						onKeyDown: P,
						children: f.map((e, t) => {
							let n = j.includes(e.value);
							return /* @__PURE__ */ d("button", {
								type: "button",
								role: "option",
								"aria-selected": n,
								"aria-label": e["aria-label"] ?? e.label,
								className: ["multi-select__item", n ? "multi-select__item--selected" : ""].filter(Boolean).join(" "),
								tabIndex: t === D ? 0 : -1,
								onClick: () => M(e.value),
								onFocus: () => O(t),
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
}
//#endregion
export { f as MultiSelect };
