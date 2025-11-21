<template>
  <template v-if="isZhCN">
    <changelog-zh-c-n />
  </template>
  <template v-else>
    <changelog-en-u-s />
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import changelogZhCN from '../../CHANGELOG.zh-CN.md';
import changelogEnUS from '../../CHANGELOG.en-US.md';
import { useInjectGlobalConfig } from '../context';

export default defineComponent({
  name: '',
  components: {
    changelogZhCN,
    changelogEnUS,
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
