require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "esri/layers/FeatureLayer",
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home, FeatureLayer) {

  var scene = new WebScene({
    portalItem: {
      id: "bc84adba06e3484d981767ebf2d6c8d5"
    },
    basemap: "topo",
    ground: "world-elevation"
  });

  var camera = new Camera({
    position: [-96.78, 46.8772, 50000],
    tilt: -55,
    heading: 0
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    viewingMode: "global",
    camera: camera,
    environment: {
      lighting: {
        date: new Date(),
        directShadowsEnabled: true,
        cameraTrackingEnabled: false
      }
    }
  });

  var homeBtn = new Home({
    view: view
  });

  var stl = document.getElementById('stl');
  stl.style.display = 'flex';
  view.ui.add(stl, 'top-right');

  stl.addEventListener('click', function() {
    view.goTo({
      target: camera
    });
  });

  var featureLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Map_buffer/FeatureServer/0",
    outFields: ["*"]
  });

  scene.add(featureLayer);

  view.ui.add(homeBtn, "top-left");

});
