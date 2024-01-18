import { StoryObj } from '@storybook/vue3';

import FormInputTextArea from '../components/FormInputTextArea.vue';

const meta = {
	title: 'Components/FormInputTextArea',
	component: FormInputTextArea,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		label: 'Input',
		name: 'input',
		rows: '5',
	},
};
