'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n, useCallback as r, useRef as i, useState as a } from "react";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var o = n(function({ length: n, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, "aria-describedby": h, "aria-label": g, "aria-labelledby": _, id: v, name: y, onBlur: b, className: x, digitLabel: S = (e, t) => `Dígito ${e} de ${t}` }, C) {
	let w = o !== void 0, [T, E] = a(() => {
		let e = s ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), D = i(null), O = w ? Array.from({ length: n }, (e, t) => o[t] ?? "") : T, k = r((e) => {
		let t = D.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), A = r((e) => {
		w || E(e);
		let t = e.join("");
		c?.(t), e.length === n && e.every((e) => e !== "") && l?.(t);
	}, [
		w,
		n,
		c,
		l
	]), j = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...O];
		i[e] = r, A(i), e < n - 1 && k(e + 1);
	}, [
		O,
		n,
		k,
		A
	]), M = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...O];
			n[e] === "" ? e > 0 && (n[e - 1] = "", A(n), k(e - 1)) : (n[e] = "", A(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && k(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && k(e + 1));
	}, [
		O,
		n,
		k,
		A
	]), N = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...O], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		A(i), k(Math.min(a + 1, n - 1));
	}, [
		O,
		n,
		k,
		A
	]);
	return /* @__PURE__ */ t("div", {
		ref: D,
		role: "group",
		"aria-label": _ ? void 0 : g,
		"aria-labelledby": _,
		"aria-describedby": m ?? h,
		"aria-invalid": f || void 0,
		className: x,
		"data-otp-input": "",
		"data-size": p,
		"data-error": String(f),
		"data-disabled": String(!!u),
		children: Array.from({ length: n }, (r, i) => /* @__PURE__ */ t(e, {
			ref: i === 0 ? C : void 0,
			id: v ? `${v}-${i}` : void 0,
			name: y ? `${y}-${i}` : void 0,
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
			"aria-label": S(i + 1, n),
			value: O[i],
			onChange: j(i),
			onKeyDown: M(i),
			onPaste: N(i),
			onBlur: b
		}, i))
	});
});
//#endregion
export { o as OtpInput };
