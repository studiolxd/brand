'use client';
import './message-composer.css';
import { Button as e } from "./button.js";
import { Textarea as t } from "./textarea.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/molecules/MessageComposer/MessageComposer.tsx
function a({ onSend: a, placeholder: o = "Escribe un mensaje…", disabled: s }) {
	let [c, l] = i("");
	function u() {
		let e = c.trim();
		e && (a(e), l(""));
	}
	function d(e) {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), u());
	}
	return /* @__PURE__ */ r("div", {
		className: "message-composer",
		children: [/* @__PURE__ */ n(t, {
			placeholder: o,
			value: c,
			disabled: s,
			rows: 2,
			onChange: (e) => l(e.target.value),
			onKeyDown: d
		}), /* @__PURE__ */ n(e, {
			variant: "primary",
			size: "md",
			disabled: s || !c.trim(),
			onClick: u,
			"aria-label": "Enviar mensaje",
			children: "Enviar"
		})]
	});
}
//#endregion
export { a as MessageComposer };
