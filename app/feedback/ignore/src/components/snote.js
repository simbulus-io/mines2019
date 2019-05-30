import * as tslib_1 from "tslib";
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';
let Snote = class Snote extends Vue {
    get note() {
        return this.$store.state.feedback.snotes[this.note_idx];
    }
    get get_date() {
        const d = new Date(this.note.timestamp);
        return d.toLocaleString();
    }
    get snote_class() {
        return !this.note.selected ? "snote-active" : "snote-inactive";
    }
    // public set delete_note( del: boolean ) {
    //   this.note.deleted = del;
    // }
    delete_snote(e) {
        log.info('Calling delete_snote from Snote component');
        this.$store.dispatch('feedback/delete_snote', this.note.idx);
        //return this.$store.state.feedback.delete_snote; //idx
    }
};
tslib_1.__decorate([
    Prop()
], Snote.prototype, "note_idx", void 0);
Snote = tslib_1.__decorate([
    Component
], Snote);
export default Snote;
//# sourceMappingURL=snote.js.map