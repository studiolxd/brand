import { t as e } from "./useRenderElement.js";
import * as t from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/separator/Separator.js
var n = /* @__PURE__ */ t.forwardRef(function(n, r) {
	let { className: i, render: a, orientation: o = "horizontal", ...s } = n;
	return e("div", n, {
		state: t.useMemo(() => ({ orientation: o }), [o]),
		ref: r,
		props: [{
			role: "separator",
			"aria-orientation": o
		}, s]
	});
});
process.env.NODE_ENV !== "production" && (n.displayName = "Separator");
//#endregion
export { n as t };
