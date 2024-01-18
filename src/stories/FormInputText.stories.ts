import { StoryObj } from '@storybook/vue3';

import FormInputText from '../components/FormInputText.vue';

const meta = {
  title: 'Components/FormInputText',
  component: FormInputText,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: 'Input',
    name: 'input',
  },
};
