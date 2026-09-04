'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n, useCallback as r, useRef as i, useState as a } from "react";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var o = n(function({ length: n, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, "aria-describedby": h, "aria-label": g, "aria-labelledby": _, groupLabel: v = "Código de verificación", id: y, name: b, onBlur: x, className: S, digitLabel: C = (e, t) => `Dígito ${e} de ${t}` }, w) {
	let T = o !== void 0, [E, D] = a(() => {
		let e = s ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), O = i(null), k = T ? Array.from({ length: n }, (e, t) => o[t] ?? "") : E, A = r((e) => {
		let t = O.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), j = r((e) => {
		T || D(e);
		let t = e.join("");
		c?.(t), e.length === n && e.every((e) => e !== "") && l?.(t);
	}, [
		T,
		n,
		c,
		l
	]), M = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...k];
		i[e] = r, j(i), e < n - 1 && A(e + 1);
	}, [
		k,
		n,
		A,
		j
	]), N = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...k];
			n[e] === "" ? e > 0 && (n[e - 1] = "", j(n), A(e - 1)) : (n[e] = "", j(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && A(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && A(e + 1));
	}, [
		k,
		n,
		A,
		j
	]), P = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...k], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		j(i), A(Math.min(a + 1, n - 1));
	}, [
		k,
		n,
		A,
		j
	]);
	return /* @__PURE__ */ t("div", {
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
		children: Array.from({ length: n }, (r, i) => /* @__PURE__ */ t(e, {
			className: "otp-input__cell",
			ref: i === 0 ? w : void 0,
			id: y ? `${y}-${i}` : void 0,
			name: b ? `${b}-${i}` : void 0,
			type: "text",
			size: p,
			error: f,
			disabled: u,
			readOnly: d,
			"aria-describedby": i === 0 ? m ?? h : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: i === 0 ? "one-time-code" : "off",
			"aria-label": C(i + 1, n),
			value: k[i],
			onChange: M(i),
			onKeyDown: N(i),
			onPaste: P(i),
			onBlur: x
		}, i))
	});
});
//#endregion
export { o as OtpInput };
