import { expect } from "chai";
import { mount } from "@vue/test-utils";
import axios from "axios";
import sinon from "sinon";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import PostDetail from "@/pages/PostDetail.vue";

describe("PostDetail", () => {
  let sandbox: sinon.SinonSandbox;
  let axiosPutStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    axiosPutStub = sandbox.stub(axios, "put");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("updates post on submit", async () => {
    const data = {
      id: 1,
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
      image: "image1.jpg",
    };

    // Stub the put method of axios
    axiosPutStub.resolves({ data });

    const wrapper = mount(PostDetail, {
      data() {
        return {
          post: { ...data },
        };
      },
      global: {
        plugins: [PrimeVue, ToastService],
      },
    });

    // Trigger form submit
    await wrapper.find("form").trigger("submit.prevent");

    expect(axiosPutStub.calledOnce).to.be.true;
    expect(
      axiosPutStub.calledWith(
        `https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${data.id}`,
        data
      )
    ).to.be.true;
  });

  it("renders post details correctly", () => {
    const data = {
      id: 1,
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
      image: "image1.jpg",
    };

    const wrapper = mount(PostDetail, {
      data() {
        return {
          post: { ...data },
        };
      },
      global: {
        plugins: [PrimeVue, ToastService],
      },
    });

    expect(wrapper.find("form").exists()).to.be.true;
    expect(wrapper.find('input[name="title"]').html()).to.have.string(
      data.title
    );
    expect(wrapper.find('input[name="date"]').html()).to.have.string(data.date);
    expect(wrapper.find('input[name="number"]').html()).to.have.string(
      String(data.number)
    );
    expect(wrapper.find('textarea[name="description"]').html()).to.have.string(
      data.description
    );
  });
});
