# adapt-contrib-aboutPage

Create a simple about page for your whole course. You can add a number of items that contain text, pictures and links.

You then need to add an About link to your theme/components and call the "aboutPage:showAboutPage" trigger.

You also need tutor enabled as this is where the about page will show.

## Authoring tool installation

Ddownload repository as a zip file and import the extension into the adapt authoring tool (v0.2.0+). In the authoring tool you can configure the extension from the configuration settings screen of a page on a course. 

## Command-line installation

Get the code directly from GitHub, either downloading the zip file or cloning the repository.

To play around with it, the easiest thing is to create a course:

```
 adapt create course myTestCourse
 cd myTestCourse
 grunt build
 cd src/extensions
 git clone https://github.com/theodi/adapt-contrib-aboutPage
```

The configuration shown in the example.json file is strait forward. Each skill requires three things to be defined.
