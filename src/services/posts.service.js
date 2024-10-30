import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class PostsService extends BaseHttpService {
  fetchPosts({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('posts' + (queryStr ? `?${queryStr}` : ''));
  }

  async deletePost(id) {
    await this.delete(`posts/${id}`);
  }

  updatePostStatus(id, status) {
    return this.patch(`posts/${id}/status`, { status });
  }

  createPost(title, description) {
    return this.post(`posts`, { title, description });
  }
}
