import { N as e, T as t } from "./popupStateMapping.js";
import { N as n, d as r, f as i, l as a, x as o } from "./floating-ui.utils.dom.js";
import { l as s, u as c } from "./event.js";
import { A as l, C as u, E as d, S as f, j as p, w as m } from "./owner.js";
import * as h from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFocus.js
var g = s && c;
function _(s, c = {}) {
	let _ = "rootStore" in s ? s.rootStore : s, { events: v, dataRef: y } = _.context, { enabled: b = !0, visibleOnly: x = !0 } = c, S = h.useRef(!1), C = e(), w = h.useRef(!0);
	h.useEffect(() => {
		let e = _.select("domReferenceElement");
		if (!b) return;
		let t = a(e);
		function n() {
			!_.select("open") && i(e) && e === f(m(e)) && (S.current = !0);
		}
		function r() {
			w.current = !0;
		}
		function o() {
			w.current = !1;
		}
		return t.addEventListener("blur", n), g && (t.addEventListener("keydown", r, !0), t.addEventListener("pointerdown", o, !0)), () => {
			t.removeEventListener("blur", n), g && (t.removeEventListener("keydown", r, !0), t.removeEventListener("pointerdown", o, !0));
		};
	}, [_, b]), h.useEffect(() => {
		if (!b) return;
		function e(e) {
			(e.reason === "trigger-press" || e.reason === "escape-key") && (S.current = !0);
		}
		return v.on("openchange", e), () => {
			v.off("openchange", e);
		};
	}, [v, b]);
	let T = h.useMemo(() => ({
		onMouseLeave() {
			S.current = !1;
		},
		onFocus(e) {
			if (S.current) return;
			let t = d(e.nativeEvent);
			if (x && r(t)) {
				if (g && !e.relatedTarget) {
					if (!w.current && !l(t)) return;
				} else if (!p(t)) return;
			}
			_.setOpen(!0, o(n, e.nativeEvent, e.currentTarget));
		},
		onBlur(e) {
			S.current = !1;
			let i = e.relatedTarget, a = e.nativeEvent, s = r(i) && i.hasAttribute(t("focus-guard")) && i.getAttribute("data-type") === "outside";
			C.start(0, () => {
				let t = _.select("domReferenceElement"), r = f(t ? t.ownerDocument : document);
				!i && r === t || u(y.current.floatingContext?.refs.floating.current, r) || u(t, r) || s || _.context.triggerElements.hasElement(e.relatedTarget) || _.setOpen(!1, o(n, a));
			});
		}
	}), [
		y,
		_,
		x,
		C
	]);
	return h.useMemo(() => b ? {
		reference: T,
		trigger: T
	} : {}, [b, T]);
}
//#endregion
export { _ as t };
