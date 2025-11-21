<template>
  <div class="lay">
    <s-table
      ref="tableRef"
      :columns="mergedColumns"
      :data-source="dataSource"
      :pagination="false"
      :scroll="{ y: 400 }"
      :row-height="54"
      :row-selection="rowSelection"
      :range-selection="true"
      ignore-cell-key
      @resizeColumn="handleResize"
    >
      <template #footer>
        <div class="table-footer">
          This table data is not real data, it is only used for table demonstration;
          <br />
          More features click Doc on the top right to view documentation!!!
        </div>
      </template>
      <template #expandedRowRender="{ record }">
        <p style="margin: 0">
          {{ record.description }}
        </p>
      </template>
      <template #bodyCell="{ column, record, recordIndexs }">
        <template v-if="column.dataIndex === 'health'">
          <a-rate
            :value="record.health"
            disabled
            :style="record.health < 3 ? `color: #f81d22` : ''"
          />
        </template>
        <template v-else-if="column.dataIndex === 'info'">
          <div>
            <a-input
              v-if="record.info"
              v-model:value="dataSource[recordIndexs[0]].info"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ record.info }}
            </template>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="visible = true">Detail</a>
            <a-divider type="vertical" />
            <a @click="handleDelete(recordIndexs[0])">Delete</a>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'id'">
          <span class="custom-cell-id">
            {{ record.id }}
            <copy-outlined @click="copyValue(record.id)" />
          </span>
        </template>
      </template>
      <template
        #cellEditor="{ column, modelValue, save, closeEditor, editorRef, getPopupContainer }"
      >
        <template v-if="column.dataIndex === 'gender'">
          <a-select
            :ref="editorRef"
            :bordered="false"
            :value="modelValue.value"
            style="width: 120px"
            :get-popup-container="getPopupContainer"
            :options="[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
              {
                value: 'Other',
                label: 'Other',
              },
            ]"
            open
            @update:value="
              v => {
                modelValue.value = v;
                save();
              }
            "
            @blur="closeEditor"
            @keydown.esc="closeEditor"
            @click.stop="closeEditor"
          ></a-select>
        </template>
      </template>
      <template
        #menuPopup="{ column, filter: { setSelectedKeys, selectedKeysRef, confirm, clearFilters } }"
      >
        <div>
          <a-tabs>
            <a-tab-pane key="1">
              <template #tab>
                <span style="padding: 0 16px">
                  <filter-outlined />
                  Filter
                </span>
              </template>
              <template v-if="column.dataIndex === 'gender'">
                <ul class="popup" style="width: 100%">
                  <li class="popup-item">
                    <a-checkbox
                      :checked="male"
                      style="width: 100%"
                      @update:checked="handleGenderFilter(setSelectedKeys, confirm, 'male', $event)"
                    >
                      Male
                    </a-checkbox>
                  </li>
                  <li class="popup-item">
                    <a-checkbox
                      :checked="female"
                      style="width: 100%"
                      @update:checked="
                        handleGenderFilter(setSelectedKeys, confirm, 'female', $event)
                      "
                    >
                      Female
                    </a-checkbox>
                  </li>
                </ul>
              </template>
              <template v-else>
                <div style="padding: 0 8px 16px">
                  <a-input
                    ref="searchInput"
                    :value="selectedKeysRef.value[0]"
                    :placeholder="`Search ${column.dataIndex}`"
                    style="width: 188px; margin-bottom: 8px; display: block"
                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="handleSearch(selectedKeysRef.value, confirm, column.dataIndex)"
                  />
                  <a-button
                    type="primary"
                    size="small"
                    style="width: 90px; margin-right: 8px"
                    @click="handleSearch(selectedKeysRef.value, confirm, column.dataIndex)"
                  >
                    <template #icon><search-outlined /></template>
                    Search
                  </a-button>
                  <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                    Reset
                  </a-button>
                </div>
              </template>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span style="padding: 0 16px">
                  <bars-outlined />
                  Columns
                </span>
              </template>
              <div class="menu-popup-container">
                <ul class="menu-popup" style="width: 100%">
                  <li class="menu-popup-item" style="border-bottom: 1px solid #f0f0f0">
                    <a-checkbox v-model:checked="checkedAll" :indeterminate="indeterminate">
                      Select All / Deselect All
                    </a-checkbox>
                  </li>
                  <template v-for="c in columns" :key="c.dataIndex ?? c.key">
                    <li class="menu-popup-item" style="width: 100%">
                      <a-checkbox
                        :checked="configColumns[c.dataIndex ?? c.key as any] !== false"
                        @update:checked="handleHideColumns(c.dataIndex ?? c.key, $event)"
                      >
                        {{ c.title }}
                      </a-checkbox>
                    </li>
                  </template>
                </ul>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
      <template #menuIcon="{ filtered }">
        <menu-outlined :class="filtered && 'filter-active'" />
      </template>
      <template #contextmenuPopup="args">
        <ul class="popup">
          <li
            class="popup-item"
            :class="!args.column.dataIndex && 'disabled'"
            @click="copyClick(args, 'cell')"
          >
            <copy-outlined />
            Copy &nbsp;
            <span class="opacity-70 text-12px">Ctrl+C</span>
          </li>
          <li class="popup-item" @click="copyClick(args, 'record')">
            <copy-outlined />
            Copy Row
          </li>
          <li
            class="popup-item"
            :class="!args.column.dataIndex && 'disabled'"
            @click="copyClick(args, 'column')"
          >
            <copy-outlined />
            Copy Column
          </li>
        </ul>
      </template>
    </s-table>
    <a-modal v-model:open="visible" title="You can show more details" @ok="visible = false">
      <p>The popup seems a bit small</p>
      <p>But it doesn't matter,</p>
      <p>You can customize it to any size you want</p>
      <p>Or automatically adjust based on content</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, nextTick } from 'vue';
import {
  CopyOutlined,
  FilterOutlined,
  BarsOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue';
import { random } from 'lodash-es';
import { message } from 'ant-design-vue';
import { useInjectGlobalConfig } from '../../context';
import type { ContextmenuPopupArg } from '@surely-vue/table';
import { computed } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    SearchOutlined,
    MenuOutlined,
    CopyOutlined,
    FilterOutlined,
    BarsOutlined,
  },
  setup() {
    const { isMobile } = useInjectGlobalConfig();
    const visible = ref(false);
    const tableRef = ref<any>();
    const autoRowHeight = ref(false);
    const virtual = ref(true);
    const loading = ref(false);
    const bordered = ref(true);
    const selectedRowKeys = ref([]);
    const expandedRowKeys = ref([]);
    const inputRef = ref();
    const editableState = reactive<Record<string, boolean>>({});
    const state = reactive({
      searchText: '',
      searchedColumn: '',
    });
    const searchInput = ref();
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters();
      state.searchText = '';
    };
    const male = ref(true);
    const female = ref(true);
    const handleGenderFilter = (setSelectedKeys, confirm, gender, checked) => {
      const keys = [];
      if (gender === 'male') {
        male.value = checked;
      } else {
        female.value = checked;
      }
      if (male.value) {
        keys.push('Male');
      }
      if (female.value) {
        keys.push('Female');
      }
      setSelectedKeys(keys);
      confirm();
    };

    const configColumns = reactive({});
    const columns = [
      {
        title: 'Name',
        width: 150,
        minWidth: 80,
        dataIndex: 'name',
        key: 'name',
        fixed: !isMobile.value,
        resizable: true,
        ellipsis: true,
        rowDrag: true,
        editable: true,
        showMenu: true,
      },
      {
        title: 'Age',
        width: 120,
        dataIndex: 'age',
        key: 'age',
        resizable: true,
        align: 'center',
        sorter: (a: any, b: any) => a.age - b.age,
        editable: true,
        showMenu: 'hover',
      },
      {
        title: 'ID Card',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 210,
        editable: true,
        showMenu: 'hover',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        align: 'center',
        width: 100,
        editable: 'cellEditorSlot',
        showMenu: 'hover',
        filterMultiple: true,
        onFilter: (value, record) => {
          return value === record.gender;
        },
      },
      {
        title: 'Job',
        dataIndex: 'job',
        width: 150,
        editable: true,
        showMenu: 'hover',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        width: 100,
        editable: true,
        showMenu: 'hover',
      },
      {
        title: 'School',
        dataIndex: 'school',
        width: 150,
        editable: true,
        showMenu: 'hover',
      },
      { title: 'Phone', dataIndex: 'phone', width: 150, editable: true, showMenu: 'hover' },
      { title: 'Mobile', dataIndex: 'telephone', width: 150, editable: true, showMenu: 'hover' },
      { title: 'Email', dataIndex: 'qq', width: 200, editable: true, showMenu: 'hover' },
      { title: 'Facebook', dataIndex: 'wechat', width: 150, editable: true, showMenu: 'hover' },
      { title: 'Twitter', dataIndex: 'dingTalk', width: 150, editable: true, showMenu: 'hover' },
      { title: 'Country', dataIndex: 'country', width: 150, editable: true, showMenu: 'hover' },
      {
        title: 'Ethnicity',
        dataIndex: 'nationality',
        width: 150,
        editable: true,
        showMenu: 'hover',
      },
      { title: 'Marital', dataIndex: 'marital', width: 150, editable: true, showMenu: 'hover' },
      { title: 'Address', dataIndex: 'address', width: 300, editable: true, showMenu: 'hover' },
      {
        title: 'Income',
        dataIndex: 'income',
        align: 'left',
        width: 120,
        editable: true,
        showMenu: 'hover',
      },
      {
        title: 'Action',
        key: 'action',
        width: 150,
        fixed: !isMobile.value ? 'right' : false,
      },
    ].map(item => {
      return {
        onFilter: (value, record) =>
          record[item.dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        ...item,
      };
    });
    const checkedAll = computed({
      get() {
        return columns.every(item => configColumns[item.dataIndex ?? item.key] !== false);
      },
      set(val) {
        columns.forEach(item => {
          configColumns[item.dataIndex ?? item.key] = val;
        });
      },
    });
    const indeterminate = computed(() => {
      return !checkedAll.value && columns.some(item => configColumns[item.dataIndex] === true);
    });
    const mergedColumns = computed({
      get() {
        return columns.filter(item => configColumns[item.dataIndex ?? item.key] !== false);
      },
      set(val) {},
    });

    interface DataItem {
      key: number;
      name: string;
      age: number;
      address: string;
      [key: string]: any;
    }

    const data: DataItem[] = [];
    const nationality = ['Caucasian', 'African American', 'Asian', 'Hispanic'];
    const marital = ['Married', 'Unmarried', 'Unknown'];
    const job1 = ['Frontend', 'Java'];
    const job2 = ['Uber Driver', 'Doordash Driver', ''];
    const gender = ['Male', 'Female'];
    const income1 = [12000, 8900, 18000, 13000, 6800];
    const income2 = [32000, 38900, 28000, 43000, 60800];
    const firstNames = [
      'James',
      'Robert',
      'John',
      'Michael',
      'David',
      'William',
      'Richard',
      'Joseph',
      'Thomas',
      'Charles',
    ];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
    ];
    const addresses = [
      '1600 Pennsylvania Avenue NW, Washington, DC',
      '350 Fifth Avenue, New York, NY',
      '4059 Mt Lee Dr, Hollywood, CA',
      'Golden Gate Bridge, San Francisco, CA',
      '221B Baker Street, London (UK)',
      '10 Downing Street, London (UK)',
      'Eiffel Tower, Champ de Mars, Paris (France)',
      'Sydney Opera House, Sydney (Australia)',
    ];
    const universities = [
      'Harvard University',
      'Stanford University',
      'MIT',
      'University of California, Berkeley',
      'University of Oxford',
      'University of Cambridge',
      'Columbia University',
      'Princeton University',
    ];

    for (let i = 0; i < 1000; i++) {
      const age = random(18, 40);
      const item = {
        key: i,
        id: '12345678909876xxxx',
        name: `${firstNames[random(0, 9)]} ${lastNames[random(0, 9)]}`,
        age,
        address: addresses[random(0, 7)],
        gender: gender[random(0, 1)],
        job: age > 35 ? job2[random(1)] : job1[random(1)],
        company: 'Big Tech',
        school: universities[random(0, 7)],
        phone: '+1 555-0100',
        telephone: `+1 555-01${random(10, 99)}`,
        qq: 'example@email.com',
        wechat: 'facebook_id',
        dingTalk: `@twitter_handle`,
        country: 'USA',
        nationality: nationality[random(0, 3)],
        marital: marital[random(0, 2)],
        health: age > 30 ? random(1, 3) : random(4, 5),
        info: 'Edit it yourself, generating data is hard',
        jobImg: '',
        description: 'You can show more data, even sub-tables are no problem',
        income: age > 35 ? income2[random(0, 4)] : income1[random(0, 4)],
      };
      switch (item.job) {
        case 'Frontend':
          item.jobImg =
            'https://next-antdv.oss-cn-beijing.aliyuncs.com/fe.png?x-oss-process=image/resize,m_fixed,h_15,w_15';
          break;
        case 'Java':
          item.jobImg =
            'https://next-antdv.oss-cn-beijing.aliyuncs.com/java.png?x-oss-process=image/resize,m_fixed,h_15,w_15';
          break;
        case 'Uber Driver':
          item.jobImg =
            'https://next-antdv.oss-cn-beijing.aliyuncs.com/ele.png?x-oss-process=image/resize,m_fixed,h_15,w_15';
          break;
        case 'Doordash Driver':
          item.jobImg =
            'https://next-antdv.oss-cn-beijing.aliyuncs.com/meituan.png?x-oss-process=image/resize,m_fixed,h_15,w_15';
          break;
        default:
          break;
      }
      if (age > 35) {
        new Array(12).fill(1).forEach((_, index) => {
          item[`income_${index + 1}`] = income1[random(0, 4)];
        });
      } else {
        new Array(12).fill(1).forEach((_, index) => {
          item[`income_${index + 1}`] = income2[random(0, 4)];
        });
      }
      data.push(item);
    }
    const rowSelection = reactive({
      type: 'checkbox',
      columnWidth: 50,
    });
    watch(rowSelection, () => {
      console.log(rowSelection);
    });
    const rowHeight = ref((data, baseHeight) => (autoRowHeight.value ? undefined : baseHeight));
    const pagination = ref({
      current: 1,
      pageSize: data.length,
      showSizeChanger: true,
    });
    const changeAutoHeight = () => {
      autoRowHeight.value = !autoRowHeight.value;
    };
    const changeVirtual = () => {
      virtual.value = !virtual.value;
    };
    const changeLoading = () => {
      loading.value = !loading.value;
    };
    const changeBordered = () => {
      bordered.value = !bordered.value;
    };
    const goToPage = (num: number) => {
      pagination.value.current = num;
    };
    const handleEditable = (rowIndex: number, dataIndex: string, status: boolean) => {
      editableState[`${rowIndex}-${dataIndex}`] = status;
      if (status) {
        nextTick(() => {
          inputRef.value.focus();
        });
      }
    };
    const getRowProps = ({ rowIndex }: any) => {
      return rowIndex < 2
        ? {
            class: 'editable-row',
          }
        : {};
    };
    const changeRowSelectionType = () => {
      rowSelection.type = rowSelection.type === 'checkbox' ? 'radio' : 'checkbox';
    };
    const handleChange = (e, record: any) => {
      const index = dataSource.value.findIndex(d => d.key == record.key);
      dataSource.value[index].info = e.target.value;
    };
    const dataSource = ref(data);
    const handleDelete = index => {
      dataSource.value.splice(index, 1);
      dataSource.value = [].concat(dataSource.value);
    };
    const cols = ref(columns);
    const handleResize = (w, col) => {
      col.width = w;
    };

    const copyValue = val => {
      console.log('copyValue', val);
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', val);
      document.body.appendChild(input);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        message.info('Copied successfully');
      }
      document.body.removeChild(input);
    };
    const copyClick = (args: ContextmenuPopupArg<any, any>, type: 'cell' | 'column' | 'record') => {
      if (type === 'cell') {
        tableRef.value.copySelectedRange();
      } else if (type === 'column') {
        if (args.column.key === 'operation') return;
        const { dataIndex } = args.column;
        copyValue(data.map(d => d[dataIndex]).join('\r\n'));
      } else {
        const record = args.record;
        copyValue(
          columns
            .map((c: any) => (c.dataIndex ? record[c.dataIndex] : ''))
            .filter(c => !!c)
            .join(' '),
        );
      }
      args.hidePopup();
    };
    return {
      handleResize,
      visible,
      tableRef,
      dataSource,
      columns: cols,
      size: ref('default'),
      rowHeight,
      autoRowHeight,
      changeAutoHeight,
      resizeRowsHeight: () => tableRef.value.resizeRowsHeight(),
      changeVirtual,
      changeLoading,
      virtual,
      loading,
      pagination,
      goToPage,
      bordered,
      changeBordered,
      selectedRowKeys,
      expandedRowKeys,
      rowSelection,
      changeRowSelectionType,
      getRowProps,
      editableState,
      handleEditable,
      inputRef,
      handleChange,
      handleDelete,
      copyValue,
      copyClick,
      handleSearch,
      handleReset,
      searchInput,
      state,
      male,
      female,
      configColumns,
      handleGenderFilter,
      handleHideColumns: (key: any, checked) => {
        configColumns[key] = checked;
      },
      checkedAll,
      indeterminate,
      mergedColumns,
    };
  },
});
</script>
<style lang="less">
.filter-active {
  color: var(--surely-table-primary-color) !important;
  opacity: 1 !important;
}
.editable-cell {
  position: relative;
}

.editable-cell-value-wrap {
  padding: 1px 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.super-table-row-hover.editable-row .editable-cell-value-wrap {
  padding: 0px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.custom-row-class .surely-table-cell {
  background-color: #fef3ee !important;
}
.custom-cell-id {
  .anticon {
    color: #1677ff;
  }
}
.popup {
  width: 120px;
  .popup-item {
    cursor: pointer;
    padding: 8px;
    &:hover {
      background-color: var(--surely-table-row-hover-bg);
    }
    &.disabled {
      color: var(--surely-table-disabled-color);
      cursor: not-allowed;
    }
  }
}
.filter-active {
  color: var(--surely-table-primary-color) !important;
  opacity: 1 !important;
}
.menu-popup-container {
  max-height: 200px;
  overflow-y: auto;
  padding: 4px 0;
}
.menu-popup {
  width: 100%;
  .menu-popup-item {
    width: 100%;
    padding: 4px 8px;
    &:hover {
      background-color: var(--surely-table-row-hover-bg);
    }
    &.disabled {
      color: var(--surely-table-disabled-color);
      cursor: not-allowed;
    }
  }
}
</style>
