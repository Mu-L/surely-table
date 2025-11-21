## Quick Start

### Installation

You need to install the corresponding package in your project:

```bash
npm i @surely-vue/table --save
```

Or

```bash
yarn add @surely-vue/table
```

### Usage in Project

#### Import Styles:

```css
import '@surely-vue/table/dist/index.less';
```

#### Version 4.0 and above

The underlying layer of this version of the component depends on the Ant Design Vue 4.x version component library by default (of course, this does not affect your use of other component libraries). If you need to use the Ant Design Vue 3.x version component library, you need to import additional dependency styles:

```css
import '@surely-vue/table/src/style/antdv.less';
```

#### Version below 4.0

The underlying layer of this version of the component depends on the Ant Design Vue (3.x) component library (of course, this does not affect your use of other component libraries). The css file is the product after construction. In order to avoid various strange problems caused by inconsistent reference versions, we recommend using less to import the original file, so as to avoid inconsistent versions of style and logic dependencies.

> If you use less files, you need to install less-loader and enable `javascriptEnabled`. You can check the configuration of the template library below.

#### Register Component:

Currently, the underlying layer of this component partially depends on the Ant Design Vue component library (of course, this does not affect your use of other component libraries). The css file is the product after construction. In order to avoid various strange problems caused by inconsistent reference versions, we recommend using less to import the original file, so as to avoid inconsistent versions of style and logic dependencies.

We recommend importing and registering globally at the entry point. The component will automatically register sub-components internally (`STableColumn`, `STableColumnGroup`, `STableSummary`, `STableSummaryRow`, `STableSummaryCell`):

```js
import { createApp } from 'vue';
import STable from '@surely-vue/table';
// eslint-disable-next-line import/no-unresolved
import App from './App.vue';

const app = createApp(App);
app.use(STable);
```

The corresponding component name used in the template is underscore, such as: `STable` corresponds to `s-table`, etc.:

```html
<s-table :columns="columns" :data-source="dataSource"></s-table>
```

### TS Type Hint

If you use global registration components, you can add the following type declaration in `shims-vue.d.ts`:

```ts
declare module 'vue' {
  export interface GlobalComponents {
    STable: typeof import('@surely-vue/table')['STable'];
    STableColumn: typeof import('@surely-vue/table')['STableColumn'];
    STableColumnGroup: typeof import('@surely-vue/table')['STableColumnGroup'];
    STableSummary: typeof import('@surely-vue/table')['STableSummary'];
    STableSummaryRow: typeof import('@surely-vue/table')['STableSummaryRow'];
    STableSummaryCell: typeof import('@surely-vue/table')['STableSummaryCell'];
  }
}
export {};
```

### Remove Watermark

After purchase, you will get a license key. You only need to set the correct license key before using the component:

```js
import { setLicenseKey } from '@surely-vue/table';
setLicenseKey('fdafefdaffklfjajuiefhrdbfdnsafjkasyegwfpqfldfd45f48ew468fr5ds');
```

### Template Repository

We have created a template repository for reference, or you can use this template directly for business development:

Based on Vue Cli: https://github.com/surely-vue/surely-vue-starter

Based on Vite: https://github.com/surely-vue/surely-vue-vite-starter

### CDN Import

```html
//css
<link href="https://unpkg.com/@surely-vue/table/dist/index.min.css" rel="stylesheet" />

// js
<script src="https://unpkg.com/@surely-vue/table"></script>
```

For production environments, we recommend linking to a specific version number and build file to avoid unexpected breakage caused by new versions.

### Dark Mode

#### 4.0.0+

```js
import { setConfig } from '@surely-vue/table';
setConfig({
  theme: 'dark',
});
```

> Note: The dark mode of the Ant Design Vue component that SurelyTable depends on is controlled by Ant Design Vue.

#### 2.5.0+

We provide a built-in dark mode less file. In the future, we will fully upgrade to the css variable scheme.

```css
import '@surely-vue/table/dist/dark.less';
```

You can also use the [`@umijs/ssr-darkreader`](https://github.com/chenshuai2144/darkreader) plugin to apply the dark theme globally.
