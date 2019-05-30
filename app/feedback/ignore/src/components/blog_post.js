import * as tslib_1 from "tslib";
import { Component, Prop, Vue } from 'vue-property-decorator';
let BlogPost = class BlogPost extends Vue {
    get date() {
        return `${this.post.datePosted.getDate()}/${this.post.datePosted.getMonth()}/${this.post.datePosted.getFullYear()}`;
    }
};
tslib_1.__decorate([
    Prop()
], BlogPost.prototype, "post", void 0);
BlogPost = tslib_1.__decorate([
    Component
], BlogPost);
export default BlogPost;
//# sourceMappingURL=blog_post.js.map