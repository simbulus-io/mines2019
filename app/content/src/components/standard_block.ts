import { Component, Prop, Vue }         from 'vue-property-decorator';
import { log }                          from '@/logger';

@Component
export default class StandardBlock extends Vue {
  @Prop() public readonly text!: string;
}