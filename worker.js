/* BrightChild — static site worker: serve uploaded assets. */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
