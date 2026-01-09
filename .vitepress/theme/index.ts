// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import AnimationLayout from "../layout/AnimationLayout.vue";
import "./tailwind.css"; // Join Tailwind CSS
import ElementPlus from "element-plus";
import { ID_INJECTION_KEY } from "element-plus";
import "element-plus/dist/index.css"; // Join Element Plus Css
import "./style.css";
import "./icon/iconfont.css";
import FaqCard from "../components/FaqCard.vue";
import Card from "../components/Card.vue";
import DescCard from "../components/DescCard.vue";
import Popover from "../components/Popover.vue";

export default {
  extends: DefaultTheme,
  Layout: AnimationLayout, // customize layout
  enhanceApp({ app, router, siteData }) {
    app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0,
    });
    app.use(ElementPlus);
    // ...
    app.component("FaqCard", FaqCard); // FAQ Components
    app.component("Card", Card); // MD Card
    app.component("DescCard", DescCard);
    app.component("Popover", Popover);
  },
} satisfies Theme;
