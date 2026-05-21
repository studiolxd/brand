'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { jsx as t } from "react/jsx-runtime";
import { useCallback as n, useRef as r, useState as i } from "react";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
function a({ length: a, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, id: h, name: g }) {
	let _ = o !== void 0, [v, y] = i(() => {
		let e = s ?? "";
		return Array.from({ length: a }, (t, n) => e[n] ?? "");
	}), b = r(null), x = _ ? Array.from({ length: a }, (e, t) => o[t] ?? "") : v, S = n((e) => {
		let t = b.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), C = n((e) => {
		_ || y(e);
		let t = e.join("");
		c?.(t), e.length === a && e.every((e) => e !== "") && l?.(t);
	}, [
		_,
		a,
		c,
		l
	]), w = n((e) => (t) => {
		let n = t.target.value.replace(/\D/g, "").slice(-1);
		if (!n) return;
		let r = [...x];
		r[e] = n, C(r), e < a - 1 && S(e + 1);
	}, [
		x,
		a,
		S,
		C
	]), T = n((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...x];
			n[e] === "" ? e > 0 && (n[e - 1] = "", C(n), S(e - 1)) : (n[e] = "", C(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && S(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < a - 1 && S(e + 1));
	}, [
		x,
		a,
		S,
		C
	]), E = n((e) => (t) => {
		t.preventDefault();
		let n = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!n) return;
		let r = [...x], i = e;
		for (let t = 0; t < n.length && e + t < a; t++) r[e + t] = n[t], i = e + t;
		C(r), S(Math.min(i + 1, a - 1));
	}, [
		x,
		a,
		S,
		C
	]);
	return /* @__PURE__ */ t("div", {
		ref: b,
		role: "group",
		"aria-describedby": m,
		"data-otp-input": "",
		"data-size": p,
		"data-error": String(f),
		"data-disabled": String(!!u),
		children: Array.from({ length: a }, (n, r) => /* @__PURE__ */ t(e, {
			id: h ? `${h}-${r}` : void 0,
			name: g ? `${g}-${r}` : void 0,
			type: "text",
			size: p,
			error: f,
			disabled: u,
			readOnly: d,
			describedBy: r === 0 ? m : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			ariaLabel: `Dígito ${r + 1} de ${a}`,
			value: x[r],
			onChange: w(r),
			onKeyDown: T(r),
			onPaste: E(r)
		}, r))
	});
}
//#endregion
export { a as OtpInput };
