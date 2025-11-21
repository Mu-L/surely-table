<template>
  <div
    class="lay"
    :style="{
      padding: '10px 50px',
    }"
  >
    <template v-if="true">
      <h2 class="text-2xl mt-5">{{ t('app.pricing.title') }}</h2>
      <div class="leading-loose py-5">
        <p class="pt-5">
          {{ t('app.pricing.description.intro') }}
        </p>

        <p class="pt-5">
          {{ t('app.pricing.description.free') }}
        </p>

        <p class="pt-5">
          {{ t('app.pricing.description.questions') }}
          <a href="mailto:antdv@foxmail.com">antdv@foxmail.com</a>
        </p>
      </div>
      <div class="text-center flex card-out">
        <div
          class="mt-10 m-2 p-5 flex flex-1 flex-col border border-gray-300 border-style-solid rounded bg"
        >
          <span class="p-2 text-2xl">
            {{ t('app.pricing.basic.title') }}
            <a-tooltip>
              <template #title>
                {{ t('app.pricing.basic.tooltip') }}
              </template>
              <question-circle-two-tone class="text-base" />
            </a-tooltip>
          </span>
          <span class="p-2 text-xl">
            <i class="not-italic px-2 text-2xl">{{ t('app.pricing.basic.price') }}</i>
            <i class="text-sm not-italic">{{ t('app.pricing.currency') }}</i>
          </span>
          <!-- <span class="primary-color">早鸟折扣价（5折）</span> -->
          <span class="p-2 text-gray-500">{{ t('app.pricing.basic.features') }}</span>
          <a-button class="mt-8px" @click="handleClick('basic')">
            {{ t('app.pricing.buy') }}
          </a-button>
        </div>
        <div
          class="mt-10 m-2 flex flex-1 flex-col border rounded border-yellow-500 bg border-style-solid"
        >
          <div class="flex flex-col p-5">
            <span class="p-2 text-2xl">
              {{ t('app.pricing.pro.title') }}
              <a-tooltip>
                <template #title>
                  {{ t('app.pricing.pro.tooltip') }}
                </template>
                <question-circle-two-tone class="text-base" />
              </a-tooltip>
            </span>
            <span class="p-2 text-xl">
              <i class="not-italic px-2 text-2xl">{{ t('app.pricing.pro.price') }}</i>
              <i class="text-sm not-italic">{{ t('app.pricing.currency') }}</i>
            </span>
            <span class="p-2 text-gray-500">{{ t('app.pricing.pro.features') }}</span>
            <a-button class="mt-8px" @click="handleClick('pro')">
              {{ t('app.pricing.buy') }}
            </a-button>
          </div>
        </div>
        <div
          class="mt-10 m-2 flex flex-1 flex-col border rounded border-green-500 bg border-style-solid"
        >
          <a-badge-ribbon :text="t('app.pricing.recommended')">
            <div class="flex flex-col p-5">
              <span class="p-2 text-2xl">
                {{ t('app.pricing.flag.title') }}
                <a-tooltip>
                  <template #title>{{ t('app.pricing.flag.tooltip') }}</template>
                  <question-circle-two-tone class="text-base" />
                </a-tooltip>
              </span>
              <span class="p-2 text-xl">
                <i class="not-italic px-2 text-2xl">{{ t('app.pricing.flag.price') }}</i>
                <i class="text-sm not-italic">{{ t('app.pricing.currency') }}</i>
              </span>
              <!-- <span class="primary-color">早鸟折扣价（5折）</span> -->
              <span class="p-2 text-gray-500">{{ t('app.pricing.flag.features') }}</span>
              <a-button class="mt-8px" type="primary" @click="handleClick('flag')">
                {{ t('app.pricing.buy') }}
              </a-button>
            </div>
          </a-badge-ribbon>
        </div>
        <div
          v-if="isZhCN"
          class="mt-10 m-2 p-5 flex flex-1 flex-col border rounded border-yellow-400 bg border-style-solid"
        >
          <span class="p-2 text-2xl">
            {{ t('app.pricing.flag_plus.title') }}
            <a-tooltip>
              <template #title>{{ t('app.pricing.flag_plus.tooltip') }}</template>
              <question-circle-two-tone class="text-base" />
            </a-tooltip>
          </span>
          <span class="p-2 text-xl">
            <i class="not-italic px-2 text-2xl">{{ t('app.pricing.flag_plus.price') }}</i>
          </span>
          <span class="p-2 text-gray-500">{{ t('app.pricing.flag_plus.features') }}</span>
          <a-popover :title="t('app.pricing.consult')">
            <template #content>
              <div style="width: 270px">
                <p>{{ t('app.pricing.consult.content') }}</p>
                <img width="270" height="271" :src="Wechat" />
              </div>
            </template>
            <span>
              {{ t('app.pricing.monthly') }}
              <a type="link">{{ t('app.pricing.online_consult') }}</a>
            </span>
          </a-popover>
        </div>
        <div
          v-else
          class="mt-10 m-2 p-5 flex flex-1 flex-col border rounded border-yellow-400 bg border-style-solid"
        >
          <span class="p-2 text-2xl">
            {{ t('app.pricing.flag_plus.title') }}
            <a-tooltip>
              <template #title>{{ t('app.pricing.flag_plus.tooltip') }}</template>
              <question-circle-two-tone class="text-base" />
            </a-tooltip>
          </span>
          <span class="p-2 text-xl">
            <i class="not-italic px-2 text-2xl">{{ t('app.pricing.flag_plus.price') }}</i>
            <i class="text-sm not-italic">{{ t('app.pricing.currency') }}</i>
          </span>
          <span class="p-2 text-gray-500">{{ t('app.pricing.flag_plus.features') }}</span>
          <a-button class="mt-8px" @click="handleClick('flag_plus')">
            {{ t('app.pricing.buy') }}
          </a-button>
        </div>
      </div>
      <p class="pt-5">
        {{ t('app.pricing.other_questions') }}
        <a href="mailto:antdv@foxmail.com">antdv@foxmail.com</a>
        <template v-if="isZhCN">
          {{ t('app.pricing.or') }}
          <a-popover :title="t('app.pricing.consult')">
            <template #content>
              <div style="width: 270px">
                <p>{{ t('app.pricing.consult.content') }}</p>
                <img width="270" height="271" :src="Wechat" />
              </div>
            </template>
            <a type="link">{{ t('app.pricing.online_consult') }}</a>
          </a-popover>
        </template>
      </p>
      <faq-zh-c-n v-if="isZhCN" />
      <faq-en-u-s v-else />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import faqZhCN from '../doc/faq.md';
import faqEnUS from '../doc/faq.en-US.md';
import { useInjectGlobalConfig } from '../context';
import { QuestionCircleTwoTone } from '@ant-design/icons-vue';
import Wechat from '../assets/wechat.png';
import { paymentConfig } from '../config';

export default defineComponent({
  name: '',
  components: {
    faqZhCN,
    faqEnUS,
    QuestionCircleTwoTone,
  },
  setup() {
    const globalConfig = useInjectGlobalConfig();
    const { t, locale } = useI18n();
    return {
      t,
      isZhCN: globalConfig.isZhCN,
      Wechat,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleClick: (type: string) => {
        const currentLocale = locale.value;
        const link = paymentConfig[currentLocale][type];
        if (link) {
          window.open(link);
        }
      },
    };
  },
});
</script>
<style lang="less" scoped>
.bg {
  background-color: #fdfdfd;
}

[data-doc-theme='dark'] {
  .bg {
    background-color: #141414;
  }
}

.card-out {
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    min-width: 300px;
    max-width: 25%;
  }
}
</style>
