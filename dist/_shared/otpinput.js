import '../otpinput.css';
import { n as e } from "./brandmessagescontext.js";
import { Input as t } from "../input.js";
import { forwardRef as n, useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/messages/es/otpInput.ts
var l = {
	group: "Código de verificación",
	digit: (e, t) => `Dígito ${e} de ${t}`
}, u = n(function({ length: n, value: u, defaultValue: d, onChange: f, onComplete: p, disabled: m, readOnly: h, required: g, error: _ = !1, size: v = "md", describedBy: y, "aria-describedby": b, "aria-label": x, "aria-labelledby": S, groupLabel: C, id: w, name: T, onBlur: E, className: D, digitLabel: O }, k) {
	let A = e("otpInput", l), j = u !== void 0, [M, N] = o(() => {
		let e = d ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), P = a(null), F = j ? Array.from({ length: n }, (e, t) => u[t] ?? "") : M;
	i(() => {
		if (j) return;
		let e = P.current?.closest("form");
		if (!e) return;
		let t = () => {
			let e = d ?? "";
			N(Array.from({ length: n }, (t, n) => e[n] ?? ""));
		};
		return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
	}, [
		j,
		d,
		n
	]);
	let I = r((e) => {
		let t = P.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), L = r((e) => {
		j || N(e);
		let t = e.join("");
		f?.(t), e.length === n && e.every((e) => e !== "") && p?.(t);
	}, [
		j,
		n,
		f,
		p
	]), R = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...F];
		i[e] = r, L(i), e < n - 1 && I(e + 1);
	}, [
		F,
		n,
		I,
		L
	]), z = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...F];
			n[e] === "" ? e > 0 && (n[e - 1] = "", L(n), I(e - 1)) : (n[e] = "", L(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && I(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && I(e + 1));
	}, [
		F,
		n,
		I,
		L
	]), B = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...F], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		L(i), I(Math.min(a + 1, n - 1));
	}, [
		F,
		n,
		I,
		L
	]);
	return /* @__PURE__ */ c("div", {
		ref: P,
		role: "group",
		"aria-label": S ? void 0 : x ?? A("group", C),
		"aria-labelledby": S,
		"aria-describedby": y ?? b,
		"aria-invalid": _ || void 0,
		className: [
			"otp-input",
			v === "md" ? "" : `otp-input--${v}`,
			_ ? "otp-input--error" : "",
			m ? "otp-input--disabled" : "",
			D ?? ""
		].filter(Boolean).join(" "),
		children: [Array.from({ length: n }, (e, r) => /* @__PURE__ */ s(t, {
			className: "otp-input__cell",
			ref: r === 0 ? k : void 0,
			id: w ? `${w}-${r}` : void 0,
			name: T ? `${T}-${r}` : void 0,
			type: "text",
			size: v,
			error: _,
			disabled: m,
			readOnly: h,
			required: g,
			"aria-describedby": r === 0 ? y ?? b : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": A("digit", O)(r + 1, n),
			value: F[r],
			onChange: R(r),
			onKeyDown: z(r),
			onPaste: B(r),
			onBlur: E
		}, r)), T && /* @__PURE__ */ s("input", {
			type: "hidden",
			name: T,
			value: F.join("")
		})]
	});
});
//#endregion
export { u as t };
