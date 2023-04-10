import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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
      '/': 'Lista de Conj. de Exercícios',
      '/new': 'Novo conj. de exercícios',
      default: 'Detalhes do conj. de exercícios',
    },
    '/': 'Home',
  };

  showSideBar = false;
  headerTitle = 'Meu aplicativo';
  atualRoute = '/';

  constructor(private router: Router) {
    this.monitoreRouteChanges();
  }

  monitoreRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log('Rota alterada', val.url);
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
