import { observable, action } from 'mobx';

export default class PostsStore {
  @observable posts = [];
  @observable filters = { status: '', search: '' };

  constructor(postsService) {
    this.postsService = postsService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchPosts();
  }

  @action
  resetPosts() {
    this.posts = [];
  }

  @action
  async fetchPosts() {
    const result = await this.postsService.fetchPosts(this.filters);

    if (result) {
      this.posts = result.data;
    }
  }

  @action
  async createPost(title, description) {
    const result = await this.postsService.createPost(
      title,
      description
    );

    if (result) {
      this.posts.push(result.data);
    }
  }

  @action
  async deletePost(id) {
    const idx = this.posts.findIndex((post) => post.id === id);
    await this.postsService.deletePost(id);
    this.posts.splice(idx, 1);
  }

  @action
  async updatePostStatus(id, status) {
    const post = this.posts.find((post) => post.id === id);
    await this.postsService.updatePostStatus(id, status);
    post.status = status;
  }
}
