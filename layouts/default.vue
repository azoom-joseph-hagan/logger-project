<template>
  <v-app>
    <v-navigation-drawer v-model="drawerOpened" app fixed>
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item to="/projects" router exact>
          <v-list-item-action>
            <v-icon>mdi-collage</v-icon>
          </v-list-item-action>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item>
        <v-list-item to="/users/1" router exact>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar density="compact" elevation="1" fixed app>
      <v-app-bar-nav-icon
        class="ma-0 pa-0"
        @click="drawerOpened = !drawerOpened"
      />
      <v-toolbar-title>PROJECT TRACKER</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup="ts">
import { ref } from "vue";
const drawerOpened = ref(false);
</script>
