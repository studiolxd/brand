import '../asyncselect.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { Spinner as r } from "../spinner.js";
import { t as i } from "./useasyncoptions.js";
import { n as a } from "./portal-container.js";
import { forwardRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Combobox as u } from "@base-ui/react/combobox";
//#region src/stories/messages/es/asyncSelect.ts
var d = {
	placeholder: "Buscar…",
	empty: "Sin resultados",
	loading: "Buscando…",
	clear: "Limpiar selección"
}, f = [], p = (e, t) => e.value === t.value, m = o(function({ onSearch: o, value: m, onValueChange: h, selectedOption: g, placeholder: _, disabled: v, readOnly: y, size: b = "md", debounceMs: x = 300, id: S, name: C, error: w = !1, required: T, onBlur: E, className: ee, "aria-label": D, "aria-describedby": O, emptyMessage: k, loadingLabel: A, clearLabel: j, container: M }, N) {
	let P = e("asyncSelect", d), F = a(M), { results: I, loading: L, hasSearched: R, search: z, schedule: B, clear: V } = i(o, x), [H, U] = s(!1), [W, G] = s(""), [K, q] = s(null), [J, Y] = s(null), X = m === void 0 ? K : m, Z = (g === void 0 ? J : g)?.label ?? "", Q = X ? {
		value: X,
		label: Z
	} : null;
	function $(e) {
		m === void 0 && (q(e?.value ?? null), Y(e)), h?.(e?.value ?? null, e);
	}
	function te() {
		$(null), G(""), V();
	}
	function ne(e, t) {
		e !== H && (U(e), !(e && t.reason === "input-change") && (G(""), e && z("")));
	}
	function re(e) {
		v || y || (e.key === "Escape" && !H ? e.preventBaseUIHandler?.() : (e.key === "Backspace" || e.key === "Delete") && W === "" && X ? (e.preventDefault(), e.preventBaseUIHandler?.(), te()) : !H && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), e.preventBaseUIHandler?.(), U(!0), G(e.key), V(), B(e.key)));
	}
	let ie = [
		"async-select",
		b === "md" ? "" : `async-select--${b}`,
		v ? "async-select--disabled" : "",
		w ? "async-select--error" : "",
		ee ?? ""
	].filter(Boolean).join(" "), ae = ["async-select__content", b === "md" ? "" : `async-select__content--${b}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		items: L ? f : I,
		filter: null,
		value: Q,
		onValueChange: (e) => {
			$(e), G("");
		},
		isItemEqualToValue: p,
		inputValue: H ? W : Z,
		onInputValueChange: (e, t) => {
			t.reason === "input-change" && (G(e), B(e));
		},
		open: H,
		onOpenChange: ne,
		name: C,
		disabled: v,
		readOnly: y,
		children: [/* @__PURE__ */ l(u.InputGroup, {
			className: ie,
			children: [
				/* @__PURE__ */ c(u.Input, {
					ref: N,
					id: S,
					className: "async-select__input",
					onKeyDown: re,
					placeholder: P("placeholder", _),
					"aria-label": D,
					"aria-describedby": O,
					"aria-invalid": w || void 0,
					"aria-required": T || void 0,
					onBlur: E
				}),
				L && /* @__PURE__ */ c(r, {
					size: "sm",
					"aria-hidden": !0
				}),
				!L && !v && !y && /* @__PURE__ */ c(u.Clear, {
					className: "async-select__clear",
					"aria-label": P("clear", j),
					children: /* @__PURE__ */ c(t, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ c(u.Portal, {
			container: F,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "async-select__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ l(u.Popup, {
					className: ae,
					"aria-busy": L || void 0,
					children: [
						/* @__PURE__ */ c(u.Status, { children: L && /* @__PURE__ */ l("div", {
							className: "async-select__loading",
							children: [/* @__PURE__ */ c(r, {
								size: "sm",
								"aria-hidden": !0
							}), /* @__PURE__ */ c(n, { children: P("loading", A) })]
						}) }),
						/* @__PURE__ */ c(u.Empty, { children: !L && R && /* @__PURE__ */ c("div", {
							className: "async-select__empty",
							children: P("empty", k)
						}) }),
						/* @__PURE__ */ c(u.List, {
							"aria-label": D ?? P("placeholder", _),
							children: (e) => /* @__PURE__ */ c(u.Item, {
								value: e,
								className: "async-select__item",
								children: e.label
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
