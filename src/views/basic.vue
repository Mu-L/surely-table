<template>
  <template v-if="isZhCN">
    <introduction-zh-c-n />
    <quick-zh-c-n />
    <faq-zh-c-n />
  </template>
  <template v-else>
    <introduction-en-u-s />
    <quick-en-u-s />
    <faq-en-u-s />
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import introductionZhCN from '../doc/introduction.md';
import quickZhCN from '../doc/quick-start.md';
import faqZhCN from '../doc/faq.md';
import introductionEnUS from '../doc/introduction.en-US.md';
import quickEnUS from '../doc/quick-start.en-US.md';
import faqEnUS from '../doc/faq.en-US.md';
import { useInjectGlobalConfig } from '../context';

export default defineComponent({
  name: '',
  components: {
    introductionZhCN,
    quickZhCN,
    faqZhCN,
    introductionEnUS,
    quickEnUS,
    faqEnUS,
  },
  setup() {
    const globalConfig = useInjectGlobalConfig();
    return {
      isZhCN: globalConfig.isZhCN,
    };
  },
});
</script>
<style lang="less" scoped></style>
