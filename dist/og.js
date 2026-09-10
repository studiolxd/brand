import { n as e, t } from "./_shared/tokens.js";
import { a as n, t as r } from "./_shared/logomarkAssets.js";
import { createElement as i } from "react";
//#region src/stories/og/ogTypeface.ts
var a = t("--font-family-sans").split(",")[0].trim().replace(/^["']|["']$/g, ""), o = {
	width: 1200,
	height: 630
}, s = "image/png", c = t("--color-text-on-dark"), l = t("--color-text-muted-on-dark"), u = t("--color-background-dark"), d = t("--color-accent-2"), f = e("--spacing-8"), p = Number.parseFloat(e("--logomark-size-xl")), m = Number(t("--font-weight-default")), h = Number(t("--font-weight-emphasis"));
function g({ title: s, subtitle: g, eyebrow: _, appName: v }) {
	let y = i("div", {
		key: "cabecera",
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between"
		}
	}, i("div", {
		key: "marca",
		style: {
			display: "flex",
			alignItems: "center",
			gap: e("--spacing-4")
		}
	}, i("svg", {
		key: "isotipo",
		width: p,
		height: p,
		viewBox: n,
		fill: c
	}, r.map((e, t) => i("path", {
		key: t,
		d: e
	}))), i("div", {
		key: "nombre",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-5"),
			fontWeight: h,
			color: c
		}
	}, v)), _ ? i("div", {
		key: "eyebrow",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-5"),
			fontWeight: m,
			color: l
		}
	}, _) : null), b = i("div", {
		key: "cuerpo",
		style: {
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			justifyContent: "center",
			gap: e("--spacing-5")
		}
	}, i("div", {
		key: "titulo",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-9"),
			fontWeight: h,
			lineHeight: Number(t("--line-height-tight")),
			color: c
		}
	}, s), g ? i("div", {
		key: "subtitulo",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-6"),
			fontWeight: m,
			lineHeight: Number(t("--line-height-snug")),
			color: l
		}
	}, g) : null), x = i("div", {
		key: "franja",
		style: {
			display: "flex",
			height: e("--spacing-3"),
			backgroundColor: d
		}
	}), S = i("div", {
		key: "contenido",
		style: {
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			paddingTop: f,
			paddingBottom: f,
			paddingLeft: f,
			paddingRight: f
		}
	}, y, b);
	return i("div", { style: {
		display: "flex",
		flexDirection: "column",
		width: o.width,
		height: o.height,
		backgroundColor: u,
		color: c,
		fontFamily: a
	} }, S, x);
}
//#endregion
//#region src/stories/og/ogFonts.ts
var _ = [{
	weight: Number(t("--font-weight-default")),
	file: "google-sans-flex-normal-300.ttf"
}, {
	weight: Number(t("--font-weight-emphasis")),
	file: "google-sans-flex-normal-500.ttf"
}], v = ["./assets/fonts/google-sans-flex/", "../../assets/fonts/google-sans-flex/"];
function y(e) {
	return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
}
async function b() {
	let { readFile: e } = await import("node:fs/promises");
	return Promise.all(_.map(async ({ weight: t, file: n }) => {
		let r;
		for (let i of v) try {
			return {
				name: a,
				data: y(await e(new URL(i + n, import.meta.url))),
				weight: t,
				style: "normal"
			};
		} catch (e) {
			r = e;
		}
		throw Error(`No se encontró la fuente ${n} junto al módulo`, { cause: r });
	}));
}
//#endregion
export { s as OG_CONTENT_TYPE, a as OG_FONT_FAMILY, o as OG_SIZE, g as ogCard, b as ogFonts };
