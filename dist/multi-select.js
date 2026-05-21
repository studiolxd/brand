'use client';
import './multi-select.css';
"use client";
import { Chevron as e } from "./chevron.js";
import { Close as t } from "./close.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useEffect as i, useId as a, useRef as o, useState as s } from "react";
import * as c from "@radix-ui/react-popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function l({ options: l, value: u, defaultValue: d = [], placeholder: f = "Seleccionar…", disabled: p, readOnly: m, dark: h, size: g = "md", onValueChange: _, id: v, "aria-label": y }) {
	let [b, x] = s(!1), [S, C] = s(d), [w, T] = s(0), E = o(null), D = a(), O = u === void 0 ? S : u;
	function k(e) {
		let t = O.includes(e) ? O.filter((t) => t !== e) : [...O, e];
		u === void 0 && C(t), _?.(t);
	}
	function A(e) {
		p || m || (x(e), e && T(0));
	}
	i(() => {
		!b || !E.current || E.current.querySelectorAll("[role=\"option\"]")[w]?.focus();
	}, [w, b]);
	function j(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), T((e) => Math.min(e + 1, l.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), T((e) => Math.max(e - 1, 0))) : (e.key === " " || e.key === "Enter") && (e.preventDefault(), w >= 0 && w < l.length && k(l[w].value));
	}
	let M = [
		"multi-select",
		g === "md" ? "" : `multi-select--${g}`,
		p ? "multi-select--disabled" : ""
	].filter(Boolean).join(" "), N = [
		"multi-select__content",
		g === "md" ? "" : `multi-select__content--${g}`,
		h ? "multi-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(c.Root, {
		open: b,
		onOpenChange: A,
		children: [/* @__PURE__ */ n(c.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ r("div", {
				className: M,
				tabIndex: p ? -1 : 0,
				role: "combobox",
				"aria-expanded": b,
				"aria-haspopup": "listbox",
				"aria-controls": D,
				"aria-label": y ?? f,
				"aria-disabled": p || void 0,
				"aria-readonly": m || void 0,
				id: v,
				"data-state": b ? "open" : "closed",
				onKeyDown: (e) => {
					(e.key === " " || e.key === "Enter") && (e.preventDefault(), A(!b));
				},
				children: [/* @__PURE__ */ n("div", {
					className: "multi-select__values",
					children: O.length === 0 ? /* @__PURE__ */ n("span", {
						className: "multi-select__placeholder",
						children: f
					}) : O.map((e) => {
						let i = l.find((t) => t.value === e);
						return i ? /* @__PURE__ */ r("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ n("span", {
								className: "multi-select__pill-label",
								children: i.label
							}), !p && !m && /* @__PURE__ */ n("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": `Quitar ${i.label}`,
								tabIndex: -1,
								onClick: (t) => {
									t.stopPropagation(), k(e);
								},
								children: /* @__PURE__ */ n(t, { size: "xs" })
							})]
						}, e) : null;
					})
				}), /* @__PURE__ */ n(e, {
					className: "multi-select__icon",
					size: g === "sm" ? "xs" : g === "lg" ? "md" : "sm"
				})]
			})
		}), /* @__PURE__ */ n(c.Portal, { children: /* @__PURE__ */ n(c.Content, {
			className: N,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			children: /* @__PURE__ */ n("div", {
				ref: E,
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": y ?? f,
				id: D,
				onKeyDown: j,
				children: l.map((e, t) => {
					let i = O.includes(e.value);
					return /* @__PURE__ */ r("button", {
						type: "button",
						role: "option",
						"aria-selected": i,
						"aria-label": e["aria-label"] ?? e.label,
						className: ["multi-select__item", i ? "multi-select__item--selected" : ""].filter(Boolean).join(" "),
						tabIndex: t === w ? 0 : -1,
						onClick: () => k(e.value),
						onFocus: () => T(t),
						children: [/* @__PURE__ */ n("span", {
							className: "multi-select__item-check",
							"aria-hidden": "true",
							children: /* @__PURE__ */ n("span", { className: "multi-select__item-check-mark" })
						}), /* @__PURE__ */ n("span", { children: e.label })]
					}, e.value);
				})
			})
		}) })]
	});
}
//#endregion
export { l as MultiSelect };
