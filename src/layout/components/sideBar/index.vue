<template>
  <div class="sideBar" id="domSideBar">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#3a3f51"
        text-color="#b5b6bd"
        active-text-color="rgb(79, 148, 212)"
        mode="vertical"
        :collapse-transition="false"
        :collapse="opened"
      >
        <template v-for="item in routes">
          <sidebar-item
            :key="item.path"
            v-if="
              item.meta.satisfy && item.meta.satisfy.indexOf(permission) != -1
            "
            :item="item"
            :basePath="item.path"
          ></sidebar-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SideBarItem";
import { mapGetters } from "vuex";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["routes", "opened"]),
    // booleanOpen() {
    //   return this.opened === 'true' ? true : false
    // },
    activeMenu() {
      return this.$route.path;
    },
  },
  data() {
    return {
      permission: null,
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      this.permission = JSON.parse(localStorage.getItem("userInfo")).permission;
    }
  },
};
</script>
