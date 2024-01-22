import { StoryObj } from "@storybook/vue3";

import FormInputNumber from "../components/FormInputNumber.vue";

const meta = {
  title: "Components/FormInputNumber",
  component: FormInputNumber,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Input",
    name: "input",
  },
};
