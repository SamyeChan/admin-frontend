<template>
  <div>
    <h3 class="set-header">门店信息</h3>
    <h5 class="set-remark">
      此处门店信息，在【触店-首页-门店精彩】中的门店信息进行显示。如需更改，请联系系统管理员。
    </h5>
    <el-form ref="form" :model="form" label-width="100px" class="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="门店名称：" prop="name">
            <span>{{ form.name || '/' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="网点编码：" prop="networkCode">
            <span>{{ form.networkCode || '/' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="服务热线：" prop="phone">
            <span>{{ form.phone || '/' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="营业时间：" prop="businessHours">
            <span>{{ form.businessHours || '/' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="门店地址：" prop="fullAddress">
        <span>{{ form.fullAddress || '/' }}</span>
      </el-form-item>
      <el-form-item label="门店简介：" prop="description">
        <span>{{ form.description || '/' }}</span>
      </el-form-item>
      <el-form-item label="店面照片：" prop="frontImageList">
        <CImgUpload
          :aCheck="0"
          :limit="5"
          :data="form.frontImageList || []"
          :isEdit="false"
        />
      </el-form-item>
      <el-form-item label="店内照片：" prop="backImageList">
        <CImgUpload
          :aCheck="0"
          :limit="5"
          :data="form.backImageList || []"
          :isEdit="false"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CImgUpload from '@/components/content/imgUpload'
import { mapState } from 'vuex'
// import { getStoreBasicInfo } from '@/api/basic'

export default {
  name: 'StoreBasic', // 门店基础信息
  components: { CImgUpload },
  computed: {
    ...mapState({
      clubId: state => state.permission.orgActive.storeId
    })
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    // getStoreBasicInfo(this.clubId).then(res => {
    //   this.form = res.data.data
    // })
  }
}
</script>

<style lang="scss" scoped>
.set {
  &-header {
    padding-left: 10px;
  }
  &-remark {
    margin-top: 0;
    margin-left: 10px;
  }
  &-options {
    text-align: right;
    padding-right: 20px;
  }
}
.form {
  margin-top: 50px;
}
</style>
