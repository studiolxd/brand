import './logomark.css';
import { a as e, i as t, n, r, t as i } from "./_shared/logomarkassets.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/Logomark/Logomark.tsx
function s({ size: t = "md", title: n, className: r }) {
	return /* @__PURE__ */ o("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: e,
		className: [
			"logomark",
			`logomark--${t}`,
			r
		].filter(Boolean).join(" "),
		role: n ? "img" : void 0,
		"aria-hidden": n ? void 0 : !0,
		children: [n ? /* @__PURE__ */ a("title", { children: n }) : null, i.map((e) => /* @__PURE__ */ a("path", { d: e }, e))]
	});
}
//#endregion
export { s as Logomark, i as logomarkPaths, n as logomarkSafeSvg, r as logomarkSafeViewBox, t as logomarkSvg, e as logomarkViewBox };
