
 <template>
  <transition name="modal">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="bkgd"></div>
      <div class="modal-container" @click.stop>
        <slot ></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
@Component({
  components: {
  },
  props: {
    show: Boolean
  },
})
export default class Modal extends Vue {

  @Prop(Boolean) readonly show!: Boolean;
  private visible = this.show;

  public mounted() {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  }

  public close() {
    log.debug('Modal.vue got a close');
    this.$emit('close');
  }
}

</script>
<style scoped lang="scss">

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;

    .bkgd {
      position: absolute;
      width: calc(100% - 200px);
      height: calc(100% - 40px);
      background-color: #fff;
      top: 40px;
      left: 200px;
      z-index: -4;
    }
}

.modal-container {
    width: calc(100% - 280px);
    min-width: 800px;
    margin: 140px 40px 0 240px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    box-sizing: border-box;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
