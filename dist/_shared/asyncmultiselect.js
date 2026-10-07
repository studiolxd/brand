import '../asyncmultiselect.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { Spinner as r } from "../spinner.js";
import { t as i } from "./useasyncoptions.js";
import { n as a } from "./portal-container.js";
import { forwardRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Combobox as u } from "@base-ui/react/combobox";
//#region src/stories/messages/es/asyncMultiSelect.ts
var d = {
	placeholder: "Buscar…",
	empty: "Sin resultados",
	loading: "Buscando…",
	remove: (e) => `Quitar ${e}`
}, f = [], p = (e, t) => e.value === t.value, m = o(function({ onSearch: o, value: m, defaultValue: h = [], onValueChange: g, selectedOptions: ee, placeholder: _, disabled: v, readOnly: y, size: b = "md", debounceMs: x = 300, id: S, name: C, error: w = !1, required: T, onBlur: E, className: D, "aria-label": O, "aria-describedby": k, removeLabel: A, emptyMessage: j, loadingLabel: M, container: N }, P) {
	let F = e("asyncMultiSelect", d), I = a(N), { results: L, loading: R, hasSearched: z, search: B, schedule: V } = i(o, x), [H, U] = s(!1), [W, G] = s(""), [K, q] = s(h), [J, Y] = s([]), X = m === void 0 ? K : m, Z = X.map((e) => ee?.find((t) => t.value === e) ?? J.find((t) => t.value === e) ?? {
		value: e,
		label: e
	});
	function Q(e) {
		Y((t) => {
			let n = e.filter((e) => !t.some((t) => t.value === e.value));
			return n.length ? [...t, ...n] : t;
		});
		let t = e.map((e) => e.value);
		m === void 0 && q(t), g?.(t);
	}
	function $(e, t) {
		e !== H && (U(e), !(e && t.reason === "input-change") && (G(""), e && B("")));
	}
	function te(e) {
		e.key === "Escape" && !H && e.preventBaseUIHandler?.();
	}
	let ne = [
		"async-multi-select",
		b === "md" ? "" : `async-multi-select--${b}`,
		v ? "async-multi-select--disabled" : "",
		H ? "async-multi-select--open" : "",
		w ? "async-multi-select--error" : "",
		D ?? ""
	].filter(Boolean).join(" "), re = ["async-multi-select__content", b === "md" ? "" : `async-multi-select__content--${b}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		multiple: !0,
		items: R ? f : L,
		filter: null,
		value: Z,
		onValueChange: Q,
		isItemEqualToValue: p,
		inputValue: W,
		onInputValueChange: (e, t) => {
			t.reason === "input-change" && (G(e), V(e));
		},
		open: H,
		onOpenChange: $,
		name: C,
		disabled: v,
		readOnly: y,
		children: [/* @__PURE__ */ l(u.InputGroup, {
			className: ne,
			children: [/* @__PURE__ */ l(u.Chips, {
				className: "async-multi-select__input-area",
				children: [Z.map((e) => /* @__PURE__ */ l(u.Chip, {
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
					onKeyDown: te,
					placeholder: X.length === 0 ? F("placeholder", _) : void 0,
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
					className: re,
					"aria-busy": R || void 0,
					children: [
						/* @__PURE__ */ c(u.Status, { children: R && /* @__PURE__ */ l("div", {
							className: "async-multi-select__loading",
							children: [/* @__PURE__ */ c(r, {
								size: "sm",
								"aria-hidden": !0
							}), /* @__PURE__ */ c(n, { children: F("loading", M) })]
						}) }),
						/* @__PURE__ */ c(u.Empty, { children: !R && z && /* @__PURE__ */ c("div", {
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
export { m as t };
