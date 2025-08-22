/**
 * Load shared components (navigation, header, footer)
 */

// Component configuration
var components = {
  navigation: {
    file: 'includes/navigation.html',
    container: 'navigation-container'
  },
  header: {
    file: 'includes/header.html',
    container: 'header-container'
  },
  footer: {
    file: 'includes/footer.html',
    container: 'footer-container'
  }
};

function loadComponent(componentName, config, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', config.file, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var container = document.getElementById(config.container);
      if (xhr.status === 200 && container) {
        var content = xhr.responseText;
        
        // Apply replacements if specified
        if (config.replacements) {
          for (var placeholder in config.replacements) {
            content = content.replace(new RegExp(placeholder, 'g'), config.replacements[placeholder]);
          }
        }
        
        container.innerHTML = content;
      }
      
      if (callback) {
        callback();
      }
    }
  };
  xhr.send();
}

function loadAllComponents() {
  document.body.style.visibility = 'hidden';
  
  var componentsLoaded = 0;
  var totalComponents = Object.keys(components).length;
  var isContentShown = false;
  
  function showContent() {
    if (!isContentShown) {
      isContentShown = true;
      document.body.style.visibility = 'visible';
    }
  }
  
  setTimeout(showContent, 2000);
  
  for (var componentName in components) {
    loadComponent(componentName, components[componentName], function() {
      componentsLoaded++;
      if (componentsLoaded === totalComponents) {
        // Show content once all components are loaded
        showContent();
      }
    });
  }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
  loadAllComponents();
}
