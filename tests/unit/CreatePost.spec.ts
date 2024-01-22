import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import CreatePost from "@/pages/CreatePost.vue";

const expect = chai.expect;
chai.use(sinonChai);

describe("CreatePost", () => {
  let sandbox: sinon.SinonSandbox;
  let axiosPostStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    axiosPostStub = sandbox.stub(axios, "post");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("creates post on submit", async () => {
    const data = {
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
    };

    axiosPostStub.resolves(true);

    const wrapper = mount(CreatePost, {
      global: {
        plugins: [PrimeVue, ToastService],
      },
    });

    await flushPromises();
    await wrapper.find('input[name="title"]').setValue(data.title);
    await wrapper.find('span[name="number"] > input').setValue(data.number);
    await wrapper
      .find('textarea[name="description"]')
      .setValue(data.description);
    await wrapper.find("form").trigger("submit.prevent");

    expect(axiosPostStub.calledOnce).to.be.true;
    expect(
      axiosPostStub.calledWith(
        "https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts"
      )
    ).to.be.true;
  }).timeout(20000);

  it("validates fail", async () => {
    axiosPostStub.resolves(true);

    const wrapper = mount(CreatePost, {
      global: {
        plugins: [PrimeVue, ToastService],
      },
    });

    await flushPromises();
    await wrapper.find("form").trigger("submit.prevent");

    expect(axiosPostStub.calledOnce).to.be.false;
    expect(wrapper.find('span[name="error"]').text()).to.have.string(
      "Title is required"
    );
  }).timeout(20000);
});
