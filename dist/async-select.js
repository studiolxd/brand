'use client';
import './async-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Spinner as r } from "./spinner.js";
import { t as i } from "./_shared/useasyncoptions.js";
import { n as a } from "./_shared/portal-container.js";
import { forwardRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Combobox as u } from "@base-ui/react/combobox";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
var d = [], f = (e, t) => e.value === t.value, p = o(function({ onSearch: o, value: p, onValueChange: m, selectedOption: h, placeholder: g, disabled: _, readOnly: v, size: y = "md", debounceMs: b = 300, id: x, name: S, error: C = !1, required: w, onBlur: T, className: E, "aria-label": D, "aria-describedby": O, emptyMessage: k, loadingLabel: A, clearLabel: j, container: M }, N) {
	let P = e("asyncSelect"), F = a(M), { results: I, loading: L, hasSearched: R, search: z, schedule: B, clear: V } = i(o, b), [H, U] = s(!1), [W, G] = s(""), [K, q] = s(null), [J, Y] = s(null), X = p === void 0 ? K : p, Z = (h === void 0 ? J : h)?.label ?? "", Q = X ? {
		value: X,
		label: Z
	} : null;
	function $(e) {
		p === void 0 && (q(e?.value ?? null), Y(e)), m?.(e?.value ?? null, e);
	}
	function ee() {
		$(null), G(""), V();
	}
	function te(e, t) {
		e !== H && (U(e), !(e && t.reason === "input-change") && (G(""), e && z("")));
	}
	function ne(e) {
		_ || v || (e.key === "Escape" && !H ? e.preventBaseUIHandler?.() : (e.key === "Backspace" || e.key === "Delete") && W === "" && X ? (e.preventDefault(), e.preventBaseUIHandler?.(), ee()) : !H && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), e.preventBaseUIHandler?.(), U(!0), G(e.key), V(), B(e.key)));
	}
	let re = [
		"async-select",
		y === "md" ? "" : `async-select--${y}`,
		_ ? "async-select--disabled" : "",
		C ? "async-select--error" : "",
		E ?? ""
	].filter(Boolean).join(" "), ie = ["async-select__content", y === "md" ? "" : `async-select__content--${y}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		items: L ? d : I,
		filter: null,
		value: Q,
		onValueChange: (e) => {
			$(e), G("");
		},
		isItemEqualToValue: f,
		inputValue: H ? W : Z,
		onInputValueChange: (e, t) => {
			t.reason === "input-change" && (G(e), B(e));
		},
		open: H,
		onOpenChange: te,
		name: S,
		disabled: _,
		readOnly: v,
		children: [/* @__PURE__ */ l(u.InputGroup, {
			className: re,
			children: [
				/* @__PURE__ */ c(u.Input, {
					ref: N,
					id: x,
					className: "async-select__input",
					onKeyDown: ne,
					placeholder: P("placeholder", g),
					"aria-label": D,
					"aria-describedby": O,
					"aria-invalid": C || void 0,
					"aria-required": w || void 0,
					onBlur: T
				}),
				L && /* @__PURE__ */ c(r, {
					size: "sm",
					"aria-hidden": !0
				}),
				!L && !_ && !v && /* @__PURE__ */ c(u.Clear, {
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
					className: ie,
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
							"aria-label": D ?? P("placeholder", g),
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
export { p as AsyncSelect };
