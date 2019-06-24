import Vue from 'vue';
export const pubsub = new Vue();

export enum PubSubMessage {
  TEST_MESSAGE   = 'TEST_MESSAGE',
  RPC_JOB_FAILED = 'RPC_JOB_FAILED'
}