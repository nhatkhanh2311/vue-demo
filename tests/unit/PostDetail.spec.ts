import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import PostDetail from "@/pages/PostDetail.vue";
import router from "@/router";

const expect = chai.expect;
chai.use(sinonChai);

describe("PostDetail", () => {
  let sandbox: sinon.SinonSandbox;
  let axiosGetStub: sinon.SinonStub;
  let axiosPutStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    axiosGetStub = sandbox.stub(axios, "get");
    axiosPutStub = sandbox.stub(axios, "put");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("updates post on submit", async () => {
    await router.push("posts/1");
    await router.isReady();

    const data = {
      id: 1,
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
      image: "image1.jpg",
    };

    axiosGetStub.resolves({ data });
    axiosPutStub.resolves(true);

    const wrapper = mount(PostDetail, {
      global: {
        plugins: [PrimeVue, ToastService, router],
      },
    });

    await flushPromises();
    await wrapper.find("form").trigger("submit.prevent");

    expect(axiosPutStub.calledOnce).to.be.true;
    expect(
      axiosPutStub.calledWith(
        `https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${data.id}`
      )
    ).to.be.true;
  }).timeout(20000);

  it("validates fail", async () => {
    await router.push("posts/1");
    await router.isReady();

    const data = {
      id: 1,
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
      image: "image1.jpg",
    };

    axiosGetStub.resolves({ data });
    axiosPutStub.resolves(true);

    const wrapper = mount(PostDetail, {
      global: {
        plugins: [PrimeVue, ToastService, router],
      },
    });

    await flushPromises();
    await wrapper.find('input[name="title"]').setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(axiosPutStub.calledOnce).to.be.false;
    expect(wrapper.find('span[name="error"]').text()).to.have.string(
      "Title is required"
    );
  }).timeout(20000);

  it("renders post details correctly", async () => {
    await router.push("posts/1");
    await router.isReady();

    const data = {
      id: 1,
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
      image: "image1.jpg",
    };

    axiosGetStub.resolves({ data });
    axiosPutStub.resolves(true);

    const wrapper = mount(PostDetail, {
      global: {
        plugins: [PrimeVue, ToastService, router],
      },
    });

    await flushPromises();

    expect(wrapper.find("form").exists()).to.be.true;
    expect(
      (wrapper.find('input[name="title"]').element as HTMLInputElement).value
    ).to.have.string(data.title);
    expect(
      (wrapper.find('span[name="number"] > input').element as HTMLInputElement)
        .value
    ).to.have.string(String(data.number));
    expect(
      (wrapper.find('textarea[name="description"]').element as HTMLInputElement)
        .value
    ).to.have.string(data.description);
  }).timeout(20000);
});
