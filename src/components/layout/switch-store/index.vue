<template>
  <div class="switch-container">
    <el-link :underline="false" @click="dialogVisible = true">
      门店
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-link>
    <el-dialog
      class="dialog"
      title="选择门店"
      :width="'300px'"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-select
        style="width: 100%"
        size="small"
        v-model="active"
        filterable
        placeholder="请选择门店"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      storeActive: state => state.permission.orgActive
    })
  },
  watch: {
    storeActive(val) {
      !val ? (this.dialogVisible = true) : (this.active = this.storeActive)
    }
  },
  data() {
    return {
      dialogVisible: false,
      active: '',
      options: [
        {
          value: '1',
          label: 'ks'
        },
        {
          value: 'w',
          label: '999'
        }
      ]
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.switch-container {
  display: inline-block;
  margin-right: 20px;
  line-height: inherit;
}
.dialog {
  text-align: left;
}
</style>
