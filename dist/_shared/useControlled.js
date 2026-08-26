import * as e from "react";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useControlled.js
function t({ controlled: t, default: n, name: r, state: i = "value" }) {
	let { current: a } = e.useRef(t !== void 0), [o, s] = e.useState(n), c = a ? t : o;
	if (process.env.NODE_ENV !== "production") {
		e.useEffect(() => {
			a !== (t !== void 0) && console.error([
				`Base UI: A component is changing the ${a ? "" : "un"}controlled ${i} state of ${r} to be ${a ? "un" : ""}controlled.`,
				"Elements should not switch from uncontrolled to controlled (or vice versa).",
				`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,
				"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
				"More info: https://fb.me/react-controlled-components"
			].join("\n"));
		}, [
			i,
			r,
			t
		]);
		let { current: o } = e.useRef(n);
		e.useEffect(() => {
			!a && JSON.stringify(o) !== JSON.stringify(n) && console.error([`Base UI: A component is changing the default ${i} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join("\n"));
		}, [JSON.stringify(n)]);
	}
	return [c, e.useCallback((e) => {
		a || s(e);
	}, [])];
}
//#endregion
export { t };
