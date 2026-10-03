import './stack.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Stack/Stack.tsx
function t({ gap: t = "md", align: n = "start", mobileOrder: r = "normal", fill: i = !1, children: a, className: o, ...s }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"stack",
			t === "md" ? "" : `stack--gap-${t}`,
			n === "stretch" ? "stack--align-stretch" : "",
			r === "reverse" ? "stack--mobile-reverse" : "",
			i ? "stack--fill" : "",
			o
		].filter(Boolean).join(" "),
		...s,
		children: a
	});
}
//#endregion
export { t as Stack };
