//#region src/assets/brand-assets.ts
var e = "#BAABFF", t = "#111E30", n = [
	{
		path: "assets/logo.svg",
		type: "image/svg+xml",
		purpose: "source"
	},
	{
		path: "assets/logomark.svg",
		type: "image/svg+xml",
		purpose: "source"
	},
	{
		path: "assets/logomark-safe.svg",
		type: "image/svg+xml",
		purpose: "source"
	}
], r = [
	{
		path: "assets/icons/icon.svg",
		type: "image/svg+xml",
		purpose: "favicon"
	},
	{
		path: "assets/icons/favicon.ico",
		type: "image/vnd.microsoft.icon",
		purpose: "favicon"
	},
	{
		path: "assets/icons/icon-192.png",
		size: 192,
		type: "image/png",
		purpose: "pwa-icon"
	},
	{
		path: "assets/icons/icon-512.png",
		size: 512,
		type: "image/png",
		purpose: "pwa-icon"
	},
	{
		path: "assets/icons/icon-512-maskable.png",
		size: 512,
		type: "image/png",
		purpose: "pwa-icon-maskable"
	},
	{
		path: "assets/icons/apple-touch-icon.png",
		size: 180,
		type: "image/png",
		purpose: "apple-touch-icon"
	},
	{
		path: "assets/icons/manifest.webmanifest",
		type: "application/manifest+json",
		purpose: "manifest"
	}
], i = "logo-v1.png", a = "google-sans-flex-normal-latin-v1.woff2", o = [{
	path: `assets/email/${i}`,
	type: "image/png",
	purpose: "source"
}, {
	path: `assets/email/${a}`,
	type: "font/woff2",
	purpose: "source"
}];
//#endregion
export { o as BRAND_EMAIL_ASSETS, r as BRAND_ICON_ASSETS, e as BRAND_ICON_BG_COLOR, t as BRAND_ICON_INK_COLOR, n as BRAND_SOURCE_ASSETS, a as EMAIL_FONT_FILENAME, i as EMAIL_LOGO_FILENAME };
