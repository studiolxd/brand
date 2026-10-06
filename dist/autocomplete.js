'use client';
import './autocomplete.css';
import { Spinner as e } from "./spinner.js";
import { t } from "./_shared/useasyncoptions.js";
import { n } from "./_shared/portal-container.js";
import { forwardRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Autocomplete as s } from "@base-ui/react/autocomplete";
//#region src/stories/atoms/Autocomplete/Autocomplete.tsx
function c(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
var l = () => [], u = r(function({ value: r, defaultValue: u = "", onValueChange: d, onSelect: f, options: p, onSearch: m, debounceMs: h = 200, minChars: g = 1, placeholder: _, disabled: v, readOnly: y, size: b = "md", id: x, name: S, error: C = !1, required: w, maxLength: T, onBlur: E, className: D, "aria-label": O, "aria-describedby": k, container: A }, j) {
	let M = n(A), N = t(m ?? l, h), [P, F] = i(u), [I, L] = i(!1), [R, z] = i(""), B = r === void 0 ? P : r, V = m ? N.results : (p ?? []).filter((e) => c(e.label).includes(c(R))), H = I && V.length > 0;
	function U(e) {
		L(!0), z(e), m && N.schedule(e);
	}
	function W() {
		N.cancel(), L(!1);
	}
	function G(e) {
		r === void 0 && F(e), d?.(e);
	}
	function K(e) {
		f?.(e), W(), N.clear();
	}
	function q(e, t) {
		if (t.reason === "item-press") {
			G(e);
			return;
		}
		t.reason === "input-change" && (G(e), e.length < g ? W() : U(e));
	}
	function J(e, t) {
		if (!e) {
			W();
			return;
		}
		t.reason !== "input-change" && U(B);
	}
	function Y(e) {
		e.key === "Escape" && !H && e.preventBaseUIHandler?.();
	}
	let X = [
		"autocomplete",
		b === "md" ? "" : `autocomplete--${b}`,
		v ? "autocomplete--disabled" : "",
		C ? "autocomplete--error" : "",
		D ?? ""
	].filter(Boolean).join(" "), Z = ["autocomplete__content", b === "md" ? "" : `autocomplete__content--${b}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ o(s.Root, {
		items: V,
		filter: null,
		value: B,
		onValueChange: q,
		open: H,
		onOpenChange: J,
		disabled: v,
		readOnly: y,
		children: [/* @__PURE__ */ o(s.InputGroup, {
			className: X,
			children: [/* @__PURE__ */ a(s.Input, {
				ref: j,
				id: x,
				name: S,
				className: "autocomplete__input",
				placeholder: _,
				required: w,
				maxLength: T,
				"aria-label": O,
				"aria-describedby": k,
				"aria-invalid": C || void 0,
				onKeyDown: Y,
				onBlur: E
			}), N.loading && /* @__PURE__ */ a(e, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ a(s.Portal, {
			container: M,
			children: /* @__PURE__ */ a(s.Positioner, {
				className: "autocomplete__positioner",
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ a(s.Popup, {
					className: Z,
					children: /* @__PURE__ */ a(s.List, {
						"aria-label": O ?? _,
						children: (e) => /* @__PURE__ */ a(s.Item, {
							value: e,
							className: ["autocomplete__item", e.label === B ? "autocomplete__item--selected" : ""].filter(Boolean).join(" "),
							onClick: () => K(e),
							render: (e, t) => /* @__PURE__ */ a("div", {
								...e,
								"aria-selected": t.highlighted
							}),
							children: e.label
						}, e.value)
					})
				})
			})
		})]
	});
});
//#endregion
export { u as Autocomplete };
