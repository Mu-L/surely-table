<template>
  <div class="lay flex" style="padding: 50px">
    <div class="flex-1 rounded-md p-8">
      <div class="title">
        <span class="icon"></span>
        <span class="highlight">F</span>
        <span>aster</span>
        {{ t('app.home.features.virtual-scroll') }}
      </div>
      <div class="info">
        {{ t('app.home.features.virtual-scroll.desc') }}
      </div>
    </div>
    <div class="flex-1 rounded-md p-8">
      <div class="title">
        <span class="icon"></span>
        <span class="highlight">S</span>
        <span>tronger</span>
        {{ t('app.home.features.drag-drop') }}
      </div>
      <div class="info">
        {{ t('app.home.features.drag-drop.desc') }}
      </div>
    </div>
    <div class="flex-1 rounded-md p-8">
      <div class="title">
        <span class="icon"></span>
        <span class="highlight">E</span>
        <span>asier</span>
        {{ t('app.home.features.theme') }}
      </div>
      <div class="info">
        {{ t('app.home.features.theme.desc') }}
      </div>
    </div>
  </div>
  <div class="rec">
    <div class="rec-inner lay flex">
      <div class="left">
        <div class="rec-word mt-5">{{ t('app.home.recommend') }}</div>
        <div>
          <br />
          <a-button
            v-clipboard:copy="'npm i --save @surely-vue/table'"
            v-clipboard:success="handleCopy"
            class="copy mt-5"
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
          <br />
          <br />
          <router-link to="/doc/guide">
            <a-button type="primary" class="btn mt-5" size="large">
              <span class="btn-icon"></span>
              {{ t('app.home.start') }}
            </a-button>
          </router-link>
        </div>
      </div>
      <div class="right">
        <a-carousel arrows :dots="!isMobile" :style="carouselStyle">
          <template #prevArrow>
            <div class="custom-slick-arrow" :style="`left: ${isMobile ? 5 : -50}px; z-index: 1`">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" :style="`right: ${isMobile ? 5 : -50}px`">
              <right-circle-outlined />
            </div>
          </template>
          <div class="card">
            <a-card :bordered="false" class="!shadow-none">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.humiao.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.humiao.title')"
                :description="t('app.home.testimonials.humiao.description')"
              >
                <template #avatar>
                  <a-avatar :src="humiao" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
          <div class="card">
            <a-card :bordered="false">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.zhangchi.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.zhangchi.title')"
                :description="t('app.home.testimonials.zhangchi.description')"
              >
                <template #avatar>
                  <a-avatar :src="zhangchi" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
          <div class="card">
            <a-card :bordered="false">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.scott.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.scott.title')"
                :description="t('app.home.testimonials.scott.description')"
              >
                <template #avatar>
                  <a-avatar :src="scott" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
          <div class="card">
            <a-card :bordered="false">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.dasheng.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.dasheng.title')"
                :description="t('app.home.testimonials.dasheng.description')"
              >
                <template #avatar>
                  <a-avatar :src="dasheng" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
          <div class="card">
            <a-card :bordered="false">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.liangxiao.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.liangxiao.title')"
                :description="t('app.home.testimonials.liangxiao.description')"
              >
                <template #avatar>
                  <a-avatar :src="liangxiao" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
          <div class="card">
            <a-card :bordered="false">
              <template #cover>
                <div class="desc" v-html="t('app.home.testimonials.guomeiqing.desc')"></div>
              </template>
              <a-card-meta
                :title="t('app.home.testimonials.guomeiqing.title')"
                :description="t('app.home.testimonials.guomeiqing.description')"
              >
                <template #avatar>
                  <a-avatar :src="guomeiqing" />
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckOutlined,
  SnippetsOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import scott from '../../assets/scott.jpeg';
import liangxiao from '../../assets/liangxiao.jpeg';
import dasheng from '../../assets/dasheng.png';
import humiao from '../../assets/humiao.png';
import guomeiqing from '../../assets/guomeiqing.png';
import zhangchi from '../../assets/zhangchi.jpeg';
import { useInjectGlobalConfig } from '../../context';

export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
    CheckOutlined,
    SnippetsOutlined,
  },
  setup() {
    const copied = ref(false);
    const { isMobile, t } = useInjectGlobalConfig();
    const carouselStyle = computed(() => {
      return isMobile.value ? { width: '100vw' } : { width: '560px' };
    });
    return {
      t,
      scott,
      liangxiao,
      dasheng,
      copied,
      humiao,
      guomeiqing,
      zhangchi,
      isMobile,
      carouselStyle,
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
.flex {
  justify-content: space-around;
}
.title {
  font-size: 30px;
  padding: 0 0 10px;
  color: var(--surely-table-text-color);
  text-align: center;
}
.highlight {
  color: #1677ff;
}
.info {
  font-size: 16px;
  color: var(--surely-table-text-color-secondary);
  line-height: 26px;
  text-align: center;
}
.rec {
  background: var(--surely-table-primary-color-1);
  .rec-inner {
    padding: 100px;
  }
  .rec-word {
    font-size: 24px;
    color: #1677ff;
  }
}
.card {
  text-align: left;
  padding: 30px;
  height: 260px;
  color: rgba(0, 0, 0, 0.85);
}
.desc {
  line-height: 26px;
}
.tag {
  color: #ccc;
}
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
@media only screen and (max-width: 767.99px) {
  .rec {
    .rec-inner {
      padding: 20px;
    }
    .right {
      margin-top: 30px;
    }
  }
  .card {
    height: 300px;
  }
}
</style>
<style lang="less">
.ant-carousel {
  box-shadow: var(--surely-table-box-shadow-base);
}
.ant-carousel .slick-slide {
  text-align: center;
  background: var(--surely-table-bg);
  overflow: hidden;
}

.ant-carousel .slick-arrow.custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #ccc;
  z-index: 1;
}
.ant-carousel .custom-slick-arrow:before {
  display: none;
}
.ant-carousel .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}

.ant-carousel .slick-dots-bottom {
  bottom: -15px;
  left: 10px;
}
.ant-carousel .slick-dots li button {
  background: #ccc;
  opacity: 0.8;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
.ant-carousel .slick-dots {
  text-align: left;
}
.ant-carousel .slick-dots li.slick-active button {
  background: #ccc;
  opacity: 1;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
.card .ant-card-body {
  padding: 24px 0 0;
}
.card .ant-card {
  box-shadow: none;
}
</style>
