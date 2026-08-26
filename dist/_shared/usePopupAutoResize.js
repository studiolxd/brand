import { c as e } from "./useRenderElement.js";
import { L as t, R as n, f as r, t as i } from "./floating-ui.utils.dom.js";
import { l as a, o } from "./useOpenChangeComplete.js";
import { b as s } from "./owner.js";
import * as c from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/getCssDimensions.js
function l(e) {
	let t = i(e), n = parseFloat(t.width) || 0, a = parseFloat(t.height) || 0, o = r(e), c = o ? e.offsetWidth : n, l = o ? e.offsetHeight : a;
	return (s(n) !== c || s(a) !== l) && (n = c, a = l), {
		width: n,
		height: a
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/usePopupAutoResize.js
var u = typeof ResizeObserver < "u", d = () => !0;
function f(r) {
	let { popupElement: i, positionerElement: s, content: f, mounted: m, enabled: h = d, onMeasureLayout: g, onMeasureLayoutComplete: _, side: v, direction: y } = r, b = c.useRef(!0), x = o(i, !0, !1), S = a(), C = c.useRef(null), w = n(g), T = n(_), E = c.useMemo(() => {
		let t = v === "top", n = v === "left";
		return y === "rtl" ? (t ||= v === "inline-end", n ||= v === "inline-end") : (t ||= v === "inline-start", n ||= v === "inline-start"), t ? {
			position: "absolute",
			[v === "top" ? "bottom" : "top"]: "0",
			[n ? "right" : "left"]: "0"
		} : e;
	}, [v, y]);
	t(() => {
		if (!m || !h() || !u) {
			b.current = !0, C.current = null;
			return;
		}
		if (!i || !s) return;
		Object.entries(E).forEach(([e, t]) => {
			i.style.setProperty(e, t);
		});
		let e = new ResizeObserver((e) => {
			let t = e[0];
			t && (C.current === null ? C.current = {
				width: Math.ceil(t.borderBoxSize[0].inlineSize),
				height: Math.ceil(t.borderBoxSize[0].blockSize)
			} : (C.current.width = Math.ceil(t.borderBoxSize[0].inlineSize), C.current.height = Math.ceil(t.borderBoxSize[0].blockSize)));
		});
		e.observe(i), i.style.setProperty("--popup-width", "auto"), i.style.setProperty("--popup-height", "auto");
		let t = p(i, "position", "static"), n = p(i, "transform", "none"), r = p(i, "scale", "1"), a = p(s, "--available-width", "max-content"), o = p(s, "--available-height", "max-content");
		if (w?.(), b.current || C.current === null) {
			s.style.setProperty("--positioner-width", "max-content"), s.style.setProperty("--positioner-height", "max-content");
			let c = l(i);
			return s.style.setProperty("--positioner-width", `${c.width}px`), s.style.setProperty("--positioner-height", `${c.height}px`), t(), n(), r(), a(), o(), T?.(null, c), b.current = !1, () => {
				e.disconnect();
			};
		}
		i.style.setProperty("--popup-width", "auto"), i.style.setProperty("--popup-height", "auto"), s.style.setProperty("--positioner-width", "max-content"), s.style.setProperty("--positioner-height", "max-content");
		let c = l(i);
		i.style.setProperty("--popup-width", `${C.current.width}px`), i.style.setProperty("--popup-height", `${C.current.height}px`), t(), n(), a(), o(), T?.(C.current, c), s.style.setProperty("--positioner-width", `${c.width}px`), s.style.setProperty("--positioner-height", `${c.height}px`);
		let d = new AbortController();
		return S.request(() => {
			i.style.setProperty("--popup-width", `${c.width}px`), i.style.setProperty("--popup-height", `${c.height}px`), x(() => {
				i.style.setProperty("--popup-width", "auto"), i.style.setProperty("--popup-height", "auto");
			}, d.signal);
		}), () => {
			e.disconnect(), d.abort(), S.cancel();
		};
	}, [
		f,
		i,
		s,
		x,
		S,
		h,
		m,
		w,
		T,
		E
	]);
}
function p(e, t, n) {
	let r = e.style.getPropertyValue(t);
	return e.style.setProperty(t, n), () => {
		e.style.setProperty(t, r);
	};
}
//#endregion
export { f as t };
