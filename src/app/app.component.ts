import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routesWithSideBar = [
    '/',
    '/home',
    '/master-details',
    '/exercises',
    '/workouts',
    '/methods',
    '/exercise-set',
  ];
  pageTitles: { [id: string]: string | { [id: string]: string } } = {
    '/home': 'Home',
    '/master-details': {
      '/': 'Lista de itens',
      '/new': 'Novo item',
      default: 'Detalhes do item',
    },
    '/exercises': {
      '/': 'Lista de Exercícios',
      '/new': 'Novo exercício',
      default: 'Detalhes do exercício',
    },
    '/workouts': {
      '/': 'Lista de Treinos',
      '/new': 'Novo treino',
      default: 'Detalhes do treino',
    },
    '/methods': {
      '/': 'Lista de Métodos',
      '/new': 'Novo método',
      default: 'Detalhes do método',
    },
    '/exercise-set': {
      '/': 'Lista de Treinos',
      '/new': 'Novo Treinos',
      default: 'Detalhes do Treinos',
    },
    '/': 'Home',
  };

  showSideBar = false;
  headerTitle = 'Meu aplicativo';
  atualRoute = '/';

  version = '1.0.1';
  constructor(private router: Router, private loadingService: LoadingService) {
    this.monitoreRouteChanges();
    console.log('Init app =>', this.version);
  }

  monitoreRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadingService.deactiveLoading();

        this.atualRoute = val.url;

        this.showSideBar =
          this.routesWithSideBar
            .filter((e) => e !== '/')
            .filter((e) => val.url.includes(e)).length > 0 ||
          this.routesWithSideBar.includes(val.url);

        this.headerTitle = this.getHeaderTitle(val.url);
      }
    });
  }

  private getHeaderTitle(url: string) {
    const titlePageSearched = Object.entries(this.pageTitles).find((e) =>
      url.includes(e[0])
    );
    if (!titlePageSearched) {
      return 'Meu App';
    }
    const [baseUrl, titles] = titlePageSearched;

    if (titlePageSearched && typeof titles === 'string') {
      return titles;
    } else if (titlePageSearched && typeof titles === 'object') {
      const atualUrlSplited = url.split(baseUrl);
      const [_, id] = atualUrlSplited;

      if (id === '') {
        return titles['/'];
      } else if (titles[id]) {
        return titles[id];
      } else {
        return titles['default'];
      }
    } else {
      return 'Meu App';
    }
  }

  goToProfile() {
    console.log('Ir para o perfil');
  }

  logout() {
    console.log('Fazer logout');
  }
}
