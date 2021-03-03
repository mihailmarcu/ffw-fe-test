Architecture for a Sass Project
===================


One of the main benefits of using a CSS preprocessor is having the ability to split our code into several files without impacting performance. Thanks to Sass’s @import directive we can have as many files as we want in our development environment and this will compile to a single file in production.

----------

Here’s how we might organize our files

-------------

***styles**/*
| 
|– ***base/*** 
|&nbsp;&nbsp;&nbsp;|– *_reset.scss* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Reset/normalize* 
|&nbsp;&nbsp;&nbsp;|– *_typography.scss* &nbsp;*# Typography rules* 
|&nbsp;&nbsp;&nbsp;*...* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***components/*** 
|&nbsp;&nbsp;&nbsp;|– *_buttons.scss* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Buttons* 
|&nbsp;&nbsp;&nbsp;|– *_carousel.scss* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Carousel* 
|&nbsp;&nbsp;&nbsp;|– *_cover.scss* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Cover* 
|&nbsp;&nbsp;&nbsp;|– *_dropdown.scss* &nbsp;&nbsp;&nbsp;&nbsp;*# Dropdown* 
|&nbsp;&nbsp;&nbsp;|– *_navigation.scss* &nbsp;&nbsp;&nbsp;*# Navigation* 
|&nbsp;&nbsp;&nbsp;*...* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***helpers/*** 
|&nbsp;&nbsp;&nbsp;|– *_variables.scss* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Sass Variables* 
|&nbsp;&nbsp;&nbsp;|– *_functions.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Sass Functions* 
|&nbsp;&nbsp;&nbsp;|– *_mixins.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Sass Mixins* 
|&nbsp;&nbsp;&nbsp;|– *_helpers.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Class & placeholders helpers* 
|&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***layout/*** 
|&nbsp;&nbsp;&nbsp;|– *_grid.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Grid system* 
|&nbsp;&nbsp;&nbsp;|– *_header.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Header* 
|&nbsp;&nbsp;&nbsp;|– *_footer.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Footer* 
|&nbsp;&nbsp;&nbsp;|– *_sidebar.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Sidebar* 
|&nbsp;&nbsp;&nbsp;|– *_forms.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Forms* 
|&nbsp;&nbsp;&nbsp;*...*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***pages/*** 
|&nbsp;&nbsp;&nbsp;|– *_home.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Home specific styles* 
|&nbsp;&nbsp;&nbsp;|– *_contact.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Contact specific styles* 
|&nbsp;&nbsp;&nbsp;*...*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***themes/*** 
|&nbsp;&nbsp;&nbsp;|– *_theme.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Default theme* 
|&nbsp;&nbsp;&nbsp;|– *_admin.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Admin theme* 
|&nbsp;&nbsp;&nbsp;*...*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
|– ***vendors/*** 
|&nbsp;&nbsp;&nbsp;|– *_bootstrap.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Bootstrap* 
|&nbsp;&nbsp;&nbsp;|– *_jquery-ui.scss*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# jQuery UI* 
|&nbsp;&nbsp;&nbsp;*...*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*# Etc…* 
| 
| 
– main.scss             # primary Sass file

> **Note:**

> As you can see, there is only one Sass file at the root level: main.scss. All the other files are divided into appropriate folders and prefixed with an underscore (_) to tell Sass they are [partial .scss files](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials) that shouldn’t be compiled to .css files. Indeed, it is the base file’s role to import and merge all of those.

----------

Let’s now look at each of the folders in our architecture
-------------

#### <i class="icon-folder-open"></i> Base

The ***base/*** folder holds what we might call the boilerplate stuff for our project. In there, we might find the reset (or Normalize.css, or whatever), probably some stuff dealing with typography, and, depending on the project, maybe some other files.

- ***_reset.scss*** or ***_normalize.scss***
- ***_typography.scss***

#### <i class="icon-folder-open"></i> Components

For smaller components, there is the ***components/*** folder (frequently called ***modules/***). While ***layout/*** is kind of macro (defining the global wireframe), ***components/*** is more micro. It can contain all kinds of specific modules like a slider, a loader, a widget, or anything along those lines. There are usually a lot of files in ***components/*** since your site should be mostly composed of tiny modules.

- ***_media.scss***
- ***_carousel.scss***
- ***_thumbnails.scss***

#### <i class="icon-folder-open"></i> Helpers

The ***helpers/*** folder (sometimes called ***utils/***) gathers all Sass tools and helpers we’ll use across the project. Got a function? A mixin? Put it in there. This folder also contains a ***_variables.scss*** file (sometimes ***_config.scss***) which holds all global variables for the project (for typography, color schemes, and so on).

- ***_variables.scss***
- ***_mixins.scss***
- ***_functions.scss***
- ***_placeholders.scss*** (*frequently named* ***_helpers.scss***)

#### <i class="icon-folder-open"></i> Layout

The ***layout/*** directory (sometimes called ***partials/***) usually contains a number of files, each of them setting some styles for the main sections of the layout (header, footer, and so on). It also contains the ***_grid*** file which is the grid system used to build the layout.

 - ***_grid.scss***
 - ***_header.scss***
 - ***_navigation.scss***
 - ***_footer.scss***
 - ***_sidebar.scss***
 - ***_forms.scss***

#### <i class="icon-folder-open"></i> Pages

If we have page-specific styles, I think it’s cool to put them in a ***pages/*** folder and in a file named after the page. For example, it’s not uncommon to have very specific styles for the home page, so you’d have a ***_home.scss*** file in ***pages/*** dealing with this.

- ***_home.scss***
- ***_contact.scss***

#### <i class="icon-folder-open"></i> Themes

If we are working on a large site with multiple themes, having a ***themes/*** folder can make sense. We can stuff all our theme/design related styles in there. This is definitely project-specific so be sure to include it only if you feel the need.

- ***_theme.scss***
- ***_admin.scss***

#### <i class="icon-folder-open"></i> Vendors

And last but not least, we will probably have a ***vendors/*** folder containing all the CSS files from external libraries and frameworks – Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, and so on. Putting those aside in the same folder is a good way to tell “Hey, this is not from me, not my code, not my responsibility”.

- ***_bootstrap.scss***
- ***_jquery-ui.scss***
- ***_select2.scss***

----------

> *“With great power comes great responsibility.”*
— Aquaman