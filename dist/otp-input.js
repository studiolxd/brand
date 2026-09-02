'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { forwardRef as t, useCallback as n, useRef as r, useState as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var o = t(function({ length: t, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, "aria-describedby": h, "aria-label": g, "aria-labelledby": _, groupLabel: v = "Código de verificación", id: y, name: b, onBlur: x, className: S, digitLabel: C = (e, t) => `Dígito ${e} de ${t}` }, w) {
	let T = o !== void 0, [E, D] = i(() => {
		let e = s ?? "";
		return Array.from({ length: t }, (t, n) => e[n] ?? "");
	}), O = r(null), k = T ? Array.from({ length: t }, (e, t) => o[t] ?? "") : E, A = n((e) => {
		let t = O.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), j = n((e) => {
		T || D(e);
		let n = e.join("");
		c?.(n), e.length === t && e.every((e) => e !== "") && l?.(n);
	}, [
		T,
		t,
		c,
		l
	]), M = n((e) => (n) => {
		let r = n.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...k];
		i[e] = r, j(i), e < t - 1 && A(e + 1);
	}, [
		k,
		t,
		A,
		j
	]), N = n((e) => (n) => {
		if (n.key === "Backspace") {
			n.preventDefault();
			let t = [...k];
			t[e] === "" ? e > 0 && (t[e - 1] = "", j(t), A(e - 1)) : (t[e] = "", j(t));
		} else n.key === "ArrowLeft" ? (n.preventDefault(), e > 0 && A(e - 1)) : n.key === "ArrowRight" && (n.preventDefault(), e < t - 1 && A(e + 1));
	}, [
		k,
		t,
		A,
		j
	]), P = n((e) => (n) => {
		n.preventDefault();
		let r = n.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...k], a = e;
		for (let n = 0; n < r.length && e + n < t; n++) i[e + n] = r[n], a = e + n;
		j(i), A(Math.min(a + 1, t - 1));
	}, [
		k,
		t,
		A,
		j
	]);
	return /* @__PURE__ */ a("div", {
		ref: O,
		role: "group",
		"aria-label": _ ? void 0 : g ?? v,
		"aria-labelledby": _,
		"aria-describedby": m ?? h,
		"aria-invalid": f || void 0,
		className: [
			"otp-input",
			p === "md" ? "" : `otp-input--${p}`,
			f ? "otp-input--error" : "",
			u ? "otp-input--disabled" : "",
			S ?? ""
		].filter(Boolean).join(" "),
		children: Array.from({ length: t }, (n, r) => /* @__PURE__ */ a(e, {
			className: "otp-input__cell",
			ref: r === 0 ? w : void 0,
			id: y ? `${y}-${r}` : void 0,
			name: b ? `${b}-${r}` : void 0,
			type: "text",
			size: p,
			error: f,
			disabled: u,
			readOnly: d,
			"aria-describedby": r === 0 ? m ?? h : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": C(r + 1, t),
			value: k[r],
			onChange: M(r),
			onKeyDown: N(r),
			onPaste: P(r),
			onBlur: x
		}, r))
	});
});
//#endregion
export { o as OtpInput };
