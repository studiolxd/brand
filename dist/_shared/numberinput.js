import '../numberinput.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { Icon as n } from "../icon.js";
import { forwardRef as r, useCallback as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/numberInput.ts
var c = {
	decrement: "Decrementar",
	increment: "Incrementar"
}, l = r(function({ value: r, defaultValue: l = 0, min: u, max: d, step: f = 1, decimal: p = !1, disabled: m = !1, readOnly: h = !1, size: g = "md", compact: _ = !1, commitMode: v = "change", error: y = !1, id: b, name: x, describedBy: S, ariaLabel: C, decrementLabel: w, incrementLabel: T, className: E, onChange: D, onEmpty: O, onBlur: k, onFocus: A, onKeyDown: j, ...M }, N) {
	C !== void 0 && e("NumberInput", "ariaLabel", "`aria-label`");
	let P = t("numberInput", c), F = r !== void 0, [I, L] = a(l), [R, z] = a(!1), [B, V] = a(null), H = F ? r : I, U = B === null ? H === null ? "" : String(H) : B, W = H ?? 0, G = i((e) => {
		let t = e;
		return u !== void 0 && (t = Math.max(u, t)), d !== void 0 && (t = Math.min(d, t)), t;
	}, [u, d]), K = i((e) => {
		let t = G(e);
		F || L(t), D?.(t);
	}, [
		G,
		F,
		D
	]), q = () => {
		m || h || (V(null), K(W - f));
	}, J = () => {
		m || h || (V(null), K(W + f));
	}, Y = (e) => {
		let t = p ? e.replace(",", ".") : e, n = parseFloat(t);
		if (!isNaN(n)) {
			if (v === "blur" && G(n) === H) return;
			K(n);
		} else if (O && e.trim() === "") {
			if (v === "blur" && H === null) return;
			F || L(null), O();
		}
	}, X = (e) => {
		let t = e.target.value;
		V(t), v === "change" && Y(t);
	}, Z = (e) => {
		j?.(e), !(e.defaultPrevented || v !== "blur" || B === null) && (e.key === "Enter" ? (Y(B), V(null)) : e.key === "Escape" && (e.preventDefault(), V(null)));
	}, Q = (e) => {
		z(!0), A?.(e);
	}, $ = (e) => {
		z(!1), v === "blur" && B !== null && Y(B), V(null), k?.(e);
	}, ee = [
		"number-input",
		_ ? "number-input--compact" : g === "md" ? "" : `number-input--${g}`,
		y ? "number-input--error" : "",
		m ? "number-input--disabled" : "",
		R ? "number-input--focused" : "",
		E ?? ""
	].filter(Boolean).join(" "), te = m || h || H !== null && u !== void 0 && H <= u, ne = m || h || H !== null && d !== void 0 && H >= d;
	return /* @__PURE__ */ s("div", {
		className: ee,
		children: [
			/* @__PURE__ */ o("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: q,
				disabled: te,
				"aria-label": P("decrement", w),
				tabIndex: -1,
				children: /* @__PURE__ */ o(n, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ o("input", {
				ref: N,
				className: "number-input__field",
				type: "text",
				inputMode: p ? "decimal" : "numeric",
				pattern: p ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": y || void 0,
				"aria-describedby": S,
				"aria-label": C,
				...M,
				id: b,
				name: x,
				value: U,
				disabled: m,
				readOnly: h,
				onChange: X,
				onKeyDown: Z,
				onFocus: Q,
				onBlur: $
			}),
			/* @__PURE__ */ o("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: J,
				disabled: ne,
				"aria-label": P("increment", T),
				tabIndex: -1,
				children: /* @__PURE__ */ o(n, {
					name: "plus",
					size: "sm"
				})
			})
		]
	});
});
//#endregion
export { l as t };
