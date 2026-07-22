'use client';
import './multi-select.css';
"use client";
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useEffect as r, useId as i, useRef as a, useState as o } from "react";
import * as s from "@radix-ui/react-popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function c({ options: c, value: l, defaultValue: u = [], placeholder: d = "Seleccionar…", disabled: f, readOnly: p, size: m = "md", onValueChange: h, id: g, "aria-label": _, container: v }) {
	let [y, b] = o(!1), [x, S] = o(u), [C, w] = o(0), T = a(null), E = i(), D = l === void 0 ? x : l;
	function O(e) {
		let t = D.includes(e) ? D.filter((t) => t !== e) : [...D, e];
		l === void 0 && S(t), h?.(t);
	}
	function k(e) {
		f || p || (b(e), e && w(0));
	}
	r(() => {
		!y || !T.current || T.current.querySelectorAll("[role=\"option\"]")[C]?.focus();
	}, [C, y]);
	function A(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, c.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : (e.key === " " || e.key === "Enter") && (e.preventDefault(), C >= 0 && C < c.length && O(c[C].value));
	}
	let j = [
		"multi-select",
		m === "md" ? "" : `multi-select--${m}`,
		f ? "multi-select--disabled" : ""
	].filter(Boolean).join(" "), M = ["multi-select__content", m === "md" ? "" : `multi-select__content--${m}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(s.Root, {
		open: y,
		onOpenChange: k,
		children: [/* @__PURE__ */ t(s.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ n("div", {
				className: j,
				tabIndex: f ? -1 : 0,
				role: "combobox",
				"aria-expanded": y,
				"aria-haspopup": "listbox",
				"aria-controls": E,
				"aria-label": _ ?? d,
				"aria-disabled": f || void 0,
				"aria-readonly": p || void 0,
				id: g,
				"data-state": y ? "open" : "closed",
				onKeyDown: (e) => {
					(e.key === " " || e.key === "Enter") && (e.preventDefault(), k(!y));
				},
				children: [/* @__PURE__ */ t("div", {
					className: "multi-select__values",
					children: D.length === 0 ? /* @__PURE__ */ t("span", {
						className: "multi-select__placeholder",
						children: d
					}) : D.map((r) => {
						let i = c.find((e) => e.value === r);
						return i ? /* @__PURE__ */ n("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ t("span", {
								className: "multi-select__pill-label",
								children: i.label
							}), !f && !p && /* @__PURE__ */ t("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": `Quitar ${i.label}`,
								tabIndex: -1,
								onClick: (e) => {
									e.stopPropagation(), O(r);
								},
								children: /* @__PURE__ */ t(e, {
									name: "close",
									size: "xs"
								})
							})]
						}, r) : null;
					})
				}), /* @__PURE__ */ t(e, {
					name: "chevron",
					className: "multi-select__icon",
					size: m === "sm" ? "xs" : m === "lg" ? "md" : "sm"
				})]
			})
		}), /* @__PURE__ */ t(s.Portal, {
			container: v,
			children: /* @__PURE__ */ t(s.Content, {
				className: M,
				align: "start",
				sideOffset: -1,
				onOpenAutoFocus: (e) => e.preventDefault(),
				children: /* @__PURE__ */ t("div", {
					ref: T,
					role: "listbox",
					"aria-multiselectable": "true",
					"aria-label": _ ?? d,
					id: E,
					onKeyDown: A,
					children: c.map((e, r) => {
						let i = D.includes(e.value);
						return /* @__PURE__ */ n("button", {
							type: "button",
							role: "option",
							"aria-selected": i,
							"aria-label": e["aria-label"] ?? e.label,
							className: ["multi-select__item", i ? "multi-select__item--selected" : ""].filter(Boolean).join(" "),
							tabIndex: r === C ? 0 : -1,
							onClick: () => O(e.value),
							onFocus: () => w(r),
							children: [/* @__PURE__ */ t("span", {
								className: "multi-select__item-check",
								"aria-hidden": "true",
								children: /* @__PURE__ */ t("span", { className: "multi-select__item-check-mark" })
							}), /* @__PURE__ */ t("span", { children: e.label })]
						}, e.value);
					})
				})
			})
		})]
	});
}
//#endregion
export { c as MultiSelect };
