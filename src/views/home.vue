<template>
  <div>
    <div class="flex lay">
      <img :src="logo" alt="" class="logo" />
      <div class="right">
        <div class="tagline">
          <span>{{ t('app.home.title') }}&nbsp;</span>
          <span>Surely Vue</span>
        </div>
        <div class="sub-title">{{ t('app.home.sub-title') }}</div>
        <div class="actions">
          <router-link to="/doc/guide">
            <a-button type="primary" class="btn" size="large">
              <span class="btn-icon"></span>
              {{ t('app.home.start') }}
            </a-button>
          </router-link>
          <a-button
            v-clipboard:copy="'npm i --save @surely-vue/table'"
            v-clipboard:success="handleCopy"
            class="copy"
            size="large"
          >
            <span class="tag">$ &nbsp;</span>
            <span>npm i --save @surely-vue/table</span>
            <component
              :is="copied ? 'CheckOutlined' : 'SnippetsOutlined'"
              :key="copied ? 'CheckOutlined' : 'SnippetsOutlined'"
              class="code-box-code-copy code-box-code-action"
            />
          </a-button>
        </div>
      </div>
    </div>
    <basic-demo-vue v-if="isZhCN" style="margin-top: 30px"></basic-demo-vue>
    <basic-demo-en-vue v-else style="margin-top: 30px"></basic-demo-en-vue>
    <div>
      <feature-vue />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useInjectGlobalConfig } from '../context';
import basicDemoVue from '../components/home/basic-demo.vue';
import basicDemoEnVue from '../components/home/basic-demo-en.vue';
import logo from '../assets/surely-vue-logo.svg';
import { CheckOutlined, SnippetsOutlined } from '@ant-design/icons-vue';
import featureVue from '../components/home/feature.vue';
import liveDemoVue from '../components/home/live-demo.vue';
export default defineComponent({
  components: {
    basicDemoVue,
    basicDemoEnVue,
    CheckOutlined,
    SnippetsOutlined,
    featureVue,
    liveDemoVue,
  },
  setup() {
    const copied = ref(false);
    const { t, isZhCN } = useInjectGlobalConfig();
    return {
      t,
      isZhCN,
      logo,
      copied,
      handleCopy: () => {
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 3000);
      },
    };
  },
});
</script>
<style scoped lang="less">
.logo {
  height: 200px;
}
.flex {
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  flex-wrap: wrap;
}
.right {
  padding-left: 50px;
}
.tagline {
  font-size: 40px;
  padding: 0;
  margin: 0;
  border-bottom: 0;
  font-weight: 400;
  color: var(--surely-table-text-color);
}
.sub-title {
  font-size: 20px;
  color: var(--surely-table-text-color-secondary);
}
.actions {
  display: flex;
  margin-top: 2.3rem;
  .btn-icon {
    position: relative;
    width: 14px;
    height: 12px;
    margin-right: 8px;
    &:before {
      position: absolute;
      content: '';
      width: 8px;
      height: 8px;
      border-top: 2px solid #fff;
      border-left: 2px solid #fff;
      box-sizing: border-box;
      transform: rotate(135deg);
      left: -2px;
      top: 50%;
      margin-top: -4px;
    }
    &:after {
      position: absolute;
      content: '';
      width: 6px;
      height: 2px;
      background-color: #fff;
      right: 0;
      bottom: 0;
    }
  }
  .copy {
    margin-left: 20px;
    .tag {
      color: #ccc;
    }
  }
}
@media only screen and (max-width: 767.99px) {
  .right {
    padding: 0 30px;
    text-align: center;
  }
  .actions {
    flex-wrap: wrap;
    justify-content: center;
    .copy {
      margin-top: 20px;
      margin-left: 0;
    }
  }
}
</style>
