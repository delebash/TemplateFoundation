import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      {route: ['', 'welcome'], name: 'welcome',      moduleId: 'views/welcome',      nav: true, title: 'welcome' },
      {route: 'test', name: 'test',      moduleId: 'views/test',      nav: true, title: 'test' }

    ]);

    this.router = router;
  }
}
