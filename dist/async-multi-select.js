'use client';
import './async-multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Spinner as r } from "./spinner.js";
import { t as i } from "./_shared/useasyncoptions.js";
import { n as a } from "./_shared/portal-container.js";
import { forwardRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Combobox as u } from "@base-ui/react/combobox";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
var d = [], f = (e, t) => e.value === t.value, p = o(function({ onSearch: o, value: p, defaultValue: m = [], onValueChange: h, selectedOptions: g, placeholder: _, disabled: v, readOnly: y, size: b = "md", debounceMs: x = 300, id: S, name: C, error: w = !1, required: T, onBlur: E, className: D, "aria-label": O, "aria-describedby": k, removeLabel: A, emptyMessage: j, loadingLabel: M, container: N }, P) {
	let F = e("asyncMultiSelect"), I = a(N), { results: L, loading: R, hasSearched: ee, search: z, schedule: B } = i(o, x), [V, H] = s(!1), [U, W] = s(""), [G, K] = s(m), [q, J] = s([]), Y = p === void 0 ? G : p, X = Y.map((e) => g?.find((t) => t.value === e) ?? q.find((t) => t.value === e) ?? {
		value: e,
		label: e
	});
	function Z(e) {
		J((t) => {
			let n = e.filter((e) => !t.some((t) => t.value === e.value));
			return n.length ? [...t, ...n] : t;
		});
		let t = e.map((e) => e.value);
		p === void 0 && K(t), h?.(t);
	}
	function Q(e, t) {
		e !== V && (H(e), !(e && t.reason === "input-change") && (W(""), e && z("")));
	}
	function $(e) {
		e.key === "Escape" && !V && e.preventBaseUIHandler?.();
	}
	let te = [
		"async-multi-select",
		b === "md" ? "" : `async-multi-select--${b}`,
		v ? "async-multi-select--disabled" : "",
		V ? "async-multi-select--open" : "",
		w ? "async-multi-select--error" : "",
		D ?? ""
	].filter(Boolean).join(" "), ne = ["async-multi-select__content", b === "md" ? "" : `async-multi-select__content--${b}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		multiple: !0,
		items: R ? d : L,
		filter: null,
		value: X,
		onValueChange: Z,
		isItemEqualToValue: f,
		inputValue: U,
		onInputValueChange: (e, t) => {
			t.reason === "input-change" && (W(e), B(e));
		},
		open: V,
		onOpenChange: Q,
		name: C,
		disabled: v,
		readOnly: y,
		children: [/* @__PURE__ */ l(u.InputGroup, {
			className: te,
			children: [/* @__PURE__ */ l(u.Chips, {
				className: "async-multi-select__input-area",
				children: [X.map((e) => /* @__PURE__ */ l(u.Chip, {
					className: "async-multi-select__pill",
					children: [/* @__PURE__ */ c("span", {
						className: "async-multi-select__pill-label",
						children: e.label
					}), !v && !y && /* @__PURE__ */ c(u.ChipRemove, {
						className: "async-multi-select__pill-remove",
						"aria-label": F("remove", A)(e.label),
						children: /* @__PURE__ */ c(t, {
							name: "close",
							size: "xs"
						})
					})]
				}, e.value)), /* @__PURE__ */ c(u.Input, {
					ref: P,
					id: S,
					className: "async-multi-select__input",
					onKeyDown: $,
					placeholder: Y.length === 0 ? F("placeholder", _) : void 0,
					"aria-label": O,
					"aria-describedby": k,
					"aria-invalid": w || void 0,
					"aria-required": T || void 0,
					onBlur: E
				})]
			}), R && /* @__PURE__ */ c(r, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ c(u.Portal, {
			container: I,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "async-multi-select__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ l(u.Popup, {
					className: ne,
					"aria-busy": R || void 0,
					children: [
						/* @__PURE__ */ c(u.Status, { children: R && /* @__PURE__ */ l("div", {
							className: "async-multi-select__loading",
							children: [/* @__PURE__ */ c(r, {
								size: "sm",
								"aria-hidden": !0
							}), /* @__PURE__ */ c(n, { children: F("loading", M) })]
						}) }),
						/* @__PURE__ */ c(u.Empty, { children: !R && ee && /* @__PURE__ */ c("div", {
							className: "async-multi-select__empty",
							children: F("empty", j)
						}) }),
						/* @__PURE__ */ c(u.List, {
							"aria-label": O ?? F("placeholder", _),
							children: (e) => /* @__PURE__ */ l(u.Item, {
								value: e,
								className: "async-multi-select__item",
								children: [/* @__PURE__ */ c("span", {
									className: "async-multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ c("span", { className: "async-multi-select__item-check-mark" })
								}), /* @__PURE__ */ c("span", { children: e.label })]
							}, e.value)
						})
					]
				})
			})
		})]
	});
});
//#endregion
export { p as AsyncMultiSelect };
