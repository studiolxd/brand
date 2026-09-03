import './stack.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Stack/Stack.tsx
function t({ gap: t = "md", align: n = "start", mobileOrder: r = "normal", children: i, className: a, ...o }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"stack",
			t === "md" ? "" : `stack--gap-${t}`,
			n === "stretch" ? "stack--align-stretch" : "",
			r === "reverse" ? "stack--mobile-reverse" : "",
			a
		].filter(Boolean).join(" "),
		...o,
		children: i
	});
}
//#endregion
export { t as Stack };
