import { StoryObj } from "@storybook/vue3";

import FormInputDate from "../components/FormInputDate.vue";

const meta = {
  title: "Components/FormInputDate",
  component: FormInputDate,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Input",
    name: "input",
  },
};
