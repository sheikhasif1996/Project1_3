
    require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "esri/layers/FeatureLayer",
      "dojo/domReady!"
    ], function(WebScene, SceneView, Camera, Home, FeatureLayer) {

    
      /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
      var scene = new WebScene({
        portalItem:{
         id:"bc84adba06e3484d981767ebf2d6c8d5" 
        }
        ,
        basemap: "topo", // Change to the appropriate basemap
    ground: "world-elevation" // Uncomment if needed
      });
      
      var camera = new Camera({
        position: [
          -96.78, // lon
          46.8772, // lat
          50000// elevation in meters
        ],
        tilt:-55,
        heading: 0
      })
      
      var view = new SceneView({
        container: "viewDiv",
        map: scene,
        viewingMode:"global",
        camera: camera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
    
    var homeBtn = new Home({
        view: view
      });
// Create and add a feature layer
  var featureLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Map_buffer/FeatureServer/0", // Replace with your feature service URL
    outFields: ["*"] // Specify which fields to include in the layer
  });
  scene.add(featureLayer);}); // Add the feature layer to the scene
      // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
    
    [stl].forEach(function(button) {
      button.style.display = 'flex';
      view.ui.add(button, 'top-right');
    });
     
    stl.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera
      });
    });


    });
