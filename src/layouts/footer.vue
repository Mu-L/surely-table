<template>
  <a-layout-footer class="footer" style="text-align: center">
    <div v-if="isZhCN" style="padding: 10px 0">
      {{ t('app.footer.beian') }}
      <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备19034671号-2</a>
    </div>
  </a-layout-footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectGlobalConfig } from '../context';

export default defineComponent({
  name: '',
  setup() {
    const globalConfig = useInjectGlobalConfig();
    return {
      t: globalConfig.t,
      isZhCN: globalConfig.isZhCN,
    };
  },
});
</script>
<style lang="less" scoped>
.footer {
  background-color: #000 !important;
  position: relative;
  z-index: 100;
  color: #fff;
  padding: 20px;
  a {
    color: #ffffffa6;
  }
}
</style>
