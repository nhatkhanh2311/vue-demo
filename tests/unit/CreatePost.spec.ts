import { expect } from "chai";
import { mount } from "@vue/test-utils";
import axios from "axios";
import sinon from "sinon";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import CreatePost from "@/pages/CreatePost.vue";

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

    // Stub the post method of axios
    axiosPostStub.resolves({ data });

    const wrapper = mount(CreatePost, {
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

    expect(axiosPostStub.calledOnce).to.be.true;
    expect(
      axiosPostStub.calledWith(
        "https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts",
        data
      )
    ).to.be.true;
  });

  it("renders form inputs correctly", () => {
    const data = {
      title: "Post 1",
      date: "2022-01-01",
      number: 1,
      description: "Description 1",
    };

    const wrapper = mount(CreatePost, {
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
