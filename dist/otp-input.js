'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n, useCallback as r, useRef as i, useState as a } from "react";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var o = n(function({ length: n, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, "aria-describedby": h, "aria-label": g, id: _, name: v, onBlur: y, className: b, digitLabel: x = (e, t) => `Dígito ${e} de ${t}` }, S) {
	let C = o !== void 0, [w, T] = a(() => {
		let e = s ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), E = i(null), D = C ? Array.from({ length: n }, (e, t) => o[t] ?? "") : w, O = r((e) => {
		let t = E.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), k = r((e) => {
		C || T(e);
		let t = e.join("");
		c?.(t), e.length === n && e.every((e) => e !== "") && l?.(t);
	}, [
		C,
		n,
		c,
		l
	]), A = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...D];
		i[e] = r, k(i), e < n - 1 && O(e + 1);
	}, [
		D,
		n,
		O,
		k
	]), j = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...D];
			n[e] === "" ? e > 0 && (n[e - 1] = "", k(n), O(e - 1)) : (n[e] = "", k(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && O(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && O(e + 1));
	}, [
		D,
		n,
		O,
		k
	]), M = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...D], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		k(i), O(Math.min(a + 1, n - 1));
	}, [
		D,
		n,
		O,
		k
	]);
	return /* @__PURE__ */ t("div", {
		ref: E,
		role: "group",
		"aria-label": g,
		"aria-describedby": m ?? h,
		"aria-invalid": f || void 0,
		className: b,
		"data-otp-input": "",
		"data-size": p,
		"data-error": String(f),
		"data-disabled": String(!!u),
		children: Array.from({ length: n }, (r, i) => /* @__PURE__ */ t(e, {
			ref: i === 0 ? S : void 0,
			id: _ ? `${_}-${i}` : void 0,
			name: v ? `${v}-${i}` : void 0,
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
			"aria-label": x(i + 1, n),
			value: D[i],
			onChange: A(i),
			onKeyDown: j(i),
			onPaste: M(i),
			onBlur: y
		}, i))
	});
});
//#endregion
export { o as OtpInput };
