import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import sinon from 'sinon';

import PostList from '../src/pages/PostList.vue';

describe('PostList', () => {
	let sandbox: sinon.SinonSandbox;
	let axiosGetStub: sinon.SinonStub;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		axiosGetStub = sandbox.stub(axios, 'get');
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('fetches posts on mount', async () => {
		const data = [
			{ id: 1, title: 'Post 1', description: 'Description 1', image: 'image1.jpg' },
			{ id: 2, title: 'Post 2', description: 'Description 2', image: 'image2.jpg' },
		];

		// Stub the get method of axios
		axiosGetStub.resolves({ data });

		const wrapper = mount(PostList);

		// Wait for promises to resolve
		await wrapper.vm.$nextTick()

		expect(axiosGetStub.calledOnce).to.be.true;
		expect(axiosGetStub.calledWith('https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts')).to.be.true;
		expect(wrapper.vm.posts).to.deep.equal(data);
	});

	it('renders posts correctly', async () => {
		const data = [
			{ id: 1, title: 'Post 1', description: 'Description 1', image: 'image1.jpg' },
			{ id: 2, title: 'Post 2', description: 'Description 2', image: 'image2.jpg' },
		];

		axiosGetStub.resolves({ data });

		const wrapper = mount(PostList);

		await wrapper.vm.$nextTick();

		const cards = wrapper.findAll('.col-6');
		expect(cards.length).to.equal(data.length);

		data.forEach((post, index) => {
			const card = cards[index];
			expect(card.find('img').attributes('src')).to.equal(post.image);
			expect(card.text()).to.include(post.title);
			expect(card.text()).to.include(post.description);
		});
	});
});
