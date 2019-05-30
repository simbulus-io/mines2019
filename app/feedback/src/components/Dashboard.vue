
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> Hello You </span>
      </div>
              <!-- displaying toolbar -->

      <!-- <v-toolbar
        id="core-toolbar"

        flat
        prominent
        style="background: #eee;"
      >
        <div class="v-toolbar-title">
          <v-toolbar-title
            class="tertiary--text font-weight-light"
          >
            <v-btn
              v-if="responsive"
              class="default v-btn--simple"
              dark
              icon
              @click.stop="onClickBtn"
            >
              <v-icon>mdi-view-list</v-icon>
            </v-btn>
            {{ title }}
          </v-toolbar-title>
        </div>

        <v-spacer />
        <v-toolbar-items>
          <v-flex
            align-center
            layout
            py-2
          >
            <v-text-field
              v-if="responsiveInput"
              class="mr-4 mt-2 purple-input"
              label="Search..."
              hide-details
              color="purple"
            />
            <router-link
              v-ripple
              class="toolbar-items"
              to="/"
            >
              <v-icon color="tertiary">mdi-view-dashboard</v-icon>
            </router-link>
            <v-menu
              bottom
              left
              content-class="dropdown-menu"
              offset-y
              transition="slide-y-transition">
              <router-link
                v-ripple
                slot="activator"
                class="toolbar-items"
                to="/notifications"
              >
                <v-badge
                  color="error"
                  overlap
                >
                  <template slot="badge">
                    {{ notifications.length }}
                  </template>
                  <v-icon color="tertiary">mdi-bell</v-icon>
                </v-badge>
              </router-link>
              <v-card>
                <v-list dense>
                  <v-list-tile
                    v-for="notification in notifications"
                    :key="notification"
                    @click="onClick"
                  >
                    <v-list-tile-title
                      v-text="notification"
                    />
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-menu>
            <router-link
              v-ripple
              class="toolbar-items"
              to="/user-profile"
            >
              <v-icon color="tertiary">mdi-account</v-icon>
            </router-link>
          </v-flex>
        </v-toolbar-items>
      </v-toolbar> -->

      <!-- displaying background image-->
      <div class = "background" v-bind:style="{ 'backgroundImage': 'url('+ bgimage +')' }">
       <div class = "toolbar">
        <button-toolbar key-nav aria-label="Toolbar with button groups" >
          <button @click= "OnClick" class="button">
            <button>Sticky Note</button>
            <button>Annotate</button>
            <button>Highlight</button>
            <button>equations</button>
          </button> 
        </button-toolbar>
      </div>
       </div>
      <div class = "other">
        <div v-for="curr_name in view_names" :key="curr_name.first_name">
          <p>
            {{curr_name.last_name}}, {{curr_name.first_name}}
            </p>
        </div>
      </div>
      <!-- <BlogPost v-for="blogPost in blogPosts" :post="blogPost" :key="blogPost.first_name" /> -->
    </template>
  </MainContent>
</template>

<script lang="ts" src="./dashboard.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.other {
  position: relative;
  $left_margin: 60px;
  margin: 0 auto;
  text-align: left;
  min-width: 900px;

  .banner {
    display: inline-block;
    margin: 50px 0 0 $left_margin;
    font-size: 30px;
    font-weight: 300;
    line-height: 36px;
    text-align: left;
    user-select: none;
    color: #555;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

}
.background {
  width: 1024px;
  height: 768px;
  background-size:contain; 
  background-repeat:no-repeat;
  position: relative;

  .toolbar {
  position: absolute;
  bottom: 0;
  left: 25%;
}
}


</style>
