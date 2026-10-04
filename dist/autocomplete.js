'use client';
import './autocomplete.css';
import { Spinner as e } from "./spinner.js";
import { n as t } from "./_shared/portal-container.js";
import { forwardRef as n, useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Popover as u } from "@base-ui/react/popover";
//#region src/stories/atoms/Autocomplete/Autocomplete.tsx
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function d(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
var f = n(function({ value: n, defaultValue: f = "", onValueChange: p, onSelect: m, options: h, onSearch: g, debounceMs: _ = 200, minChars: v = 1, placeholder: y, disabled: b, readOnly: x, size: S = "md", id: C, name: w, error: T = !1, required: E, maxLength: D, onBlur: O, className: k, "aria-label": A, "aria-describedby": j, container: M }, N) {
	let te = t(M), [ne, re] = s(f), [ie, P] = s(!1), [ae, F] = s(!1), [I, L] = s([]), [R, z] = s(-1), B = o(null), V = o(0), H = o(null), U = o(null), W = a(), G = a(), K = n === void 0 ? ne : n, q = ie && I.length > 0, J = (e) => `${G}-opt-${e}`, Y = r((e) => {
		let t = ++V.current;
		if (g) {
			F(!0), Promise.resolve().then(() => g(e)).then((e) => e, () => []).then((e) => {
				t === V.current && (L(e), z(-1), F(!1));
			});
			return;
		}
		let n = d(e);
		L((h ?? []).filter((e) => d(e.label).includes(n))), z(-1);
	}, [g, h]);
	i(() => () => {
		V.current += 1, B.current && clearTimeout(B.current);
	}, []);
	function X(e) {
		B.current && clearTimeout(B.current), g && _ > 0 ? B.current = setTimeout(() => Y(e), _) : Y(e);
	}
	function Z() {
		B.current && clearTimeout(B.current), V.current += 1, F(!1), P(!1), z(-1);
	}
	function Q(e) {
		n === void 0 && re(e), p?.(e);
	}
	function oe(e) {
		let t = e.target.value;
		if (Q(t), t.length < v) {
			Z();
			return;
		}
		P(!0), X(t);
	}
	function $(e) {
		Q(e.label), m?.(e), Z(), L([]);
	}
	function se(e) {
		b || x || (e.key === "ArrowDown" ? (e.preventDefault(), q ? z((e) => Math.min(e + 1, I.length - 1)) : (P(!0), X(K))) : e.key === "ArrowUp" ? (e.preventDefault(), q && z((e) => Math.max(e - 1, -1))) : e.key === "Enter" ? q && R >= 0 && I[R] ? (e.preventDefault(), $(I[R])) : q && Z() : e.key === "Escape" ? q && (e.preventDefault(), e.stopPropagation(), Z()) : e.key === "Tab" && Z());
	}
	function ce(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && U.current?.contains(e)) return;
			}
			Z();
		}
	}
	let le = [
		"autocomplete",
		S === "md" ? "" : `autocomplete--${S}`,
		b ? "autocomplete--disabled" : "",
		T ? "autocomplete--error" : "",
		k ?? ""
	].filter(Boolean).join(" "), ue = ["autocomplete__content", S === "md" ? "" : `autocomplete__content--${S}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		open: q,
		onOpenChange: ce,
		children: [/* @__PURE__ */ l("div", {
			ref: U,
			className: le,
			"data-popup-open": q || void 0,
			children: [/* @__PURE__ */ c("input", {
				ref: (e) => {
					H.current = e, ee(N, e);
				},
				id: C,
				name: w,
				type: "text",
				className: "autocomplete__input",
				value: K,
				onChange: oe,
				onKeyDown: se,
				placeholder: y,
				disabled: b,
				readOnly: x,
				required: E,
				maxLength: D,
				"aria-label": A,
				"aria-describedby": j,
				"aria-invalid": T || void 0,
				"aria-expanded": q,
				"aria-haspopup": "listbox",
				"aria-controls": q ? W : void 0,
				"aria-activedescendant": q && R >= 0 ? J(R) : void 0,
				autoComplete: "off",
				role: "combobox",
				"aria-autocomplete": "list",
				onBlur: O
			}), ae && /* @__PURE__ */ c(e, {
				size: "sm",
				"aria-hidden": !0
			})]
		}), /* @__PURE__ */ c(u.Portal, {
			container: te,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "autocomplete__positioner",
				anchor: U,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ c(u.Popup, {
					className: ue,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ c("div", {
						role: "listbox",
						"aria-label": A ?? y,
						id: W,
						children: I.map((e, t) => {
							let n = e.label === K, r = R === t;
							return /* @__PURE__ */ c("div", {
								id: J(t),
								role: "option",
								"aria-selected": r,
								className: [
									"autocomplete__item",
									n ? "autocomplete__item--selected" : "",
									r ? "autocomplete__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => e.preventDefault(),
								onClick: () => $(e),
								children: e.label
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { f as Autocomplete };
