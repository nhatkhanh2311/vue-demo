import type { Preview } from "@storybook/vue3";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeflex/primeflex.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
