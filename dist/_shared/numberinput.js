import '../numberinput.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/numberInput.ts
var s = {
	decrement: "Decrementar",
	increment: "Incrementar"
}, c = n(function({ value: n, defaultValue: c = 0, min: l, max: u, step: d = 1, decimal: f = !1, disabled: p = !1, readOnly: m = !1, size: h = "md", compact: g = !1, commitMode: _ = "change", error: v = !1, id: y, name: b, describedBy: x, ariaLabel: S, decrementLabel: C, incrementLabel: w, className: T, onChange: E, onEmpty: D, onBlur: O, onFocus: k, onKeyDown: A, ...j }, M) {
	let N = e("numberInput", s), P = n !== void 0, [F, I] = i(c), [L, R] = i(!1), [z, B] = i(null), V = P ? n : F, H = z === null ? V === null ? "" : String(V) : z, U = V ?? 0, W = r((e) => {
		let t = e;
		return l !== void 0 && (t = Math.max(l, t)), u !== void 0 && (t = Math.min(u, t)), t;
	}, [l, u]), G = r((e) => {
		let t = W(e);
		P || I(t), E?.(t);
	}, [
		W,
		P,
		E
	]), K = () => {
		p || m || (B(null), G(U - d));
	}, q = () => {
		p || m || (B(null), G(U + d));
	}, J = (e) => {
		let t = f ? e.replace(",", ".") : e, n = parseFloat(t);
		if (!isNaN(n)) {
			if (_ === "blur" && W(n) === V) return;
			G(n);
		} else if (D && e.trim() === "") {
			if (_ === "blur" && V === null) return;
			P || I(null), D();
		}
	}, Y = (e) => {
		let t = e.target.value;
		B(t), _ === "change" && J(t);
	}, X = (e) => {
		A?.(e), !(e.defaultPrevented || _ !== "blur" || z === null) && (e.key === "Enter" ? (J(z), B(null)) : e.key === "Escape" && (e.preventDefault(), B(null)));
	}, Z = (e) => {
		R(!0), k?.(e);
	}, Q = (e) => {
		R(!1), _ === "blur" && z !== null && J(z), B(null), O?.(e);
	}, $ = [
		"number-input",
		g ? "number-input--compact" : h === "md" ? "" : `number-input--${h}`,
		v ? "number-input--error" : "",
		p ? "number-input--disabled" : "",
		L ? "number-input--focused" : "",
		T ?? ""
	].filter(Boolean).join(" "), ee = p || m || V !== null && l !== void 0 && V <= l, te = p || m || V !== null && u !== void 0 && V >= u;
	return /* @__PURE__ */ o("div", {
		className: $,
		children: [
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: K,
				disabled: ee,
				"aria-label": N("decrement", C),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ a("input", {
				ref: M,
				className: "number-input__field",
				type: "text",
				inputMode: f ? "decimal" : "numeric",
				pattern: f ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": v || void 0,
				"aria-describedby": x,
				"aria-label": S,
				...j,
				id: y,
				name: b,
				value: H,
				disabled: p,
				readOnly: m,
				onChange: Y,
				onKeyDown: X,
				onFocus: Z,
				onBlur: Q
			}),
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: q,
				disabled: te,
				"aria-label": N("increment", w),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "plus",
					size: "sm"
				})
			})
		]
	});
});
//#endregion
export { c as t };
