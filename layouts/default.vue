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

        <v-list-item to="/logger" router exact>
          <v-list-item-action>
            <v-icon>mdi-timer</v-icon>
          </v-list-item-action>
          <v-list-item-title>Log your time</v-list-item-title>
        </v-list-item>

        <v-list-item to="/projects" router exact>
          <v-list-item-action>
            <v-icon>mdi-collage</v-icon>
          </v-list-item-action>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item>
        <v-list-item to="/calendar" router exact>
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>
        <v-list-item to="/users/1" router exact>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click="drawerOpened = !drawerOpened" />
      <v-toolbar-title>AZOOM PROJECT TRACKER</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup="ts">
import { ref } from "vue";
const drawerOpened = ref(false);
</script>
