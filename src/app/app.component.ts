import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  showPasswordScreen = false;
  passwordInput = '';
  passwordValidated = false;

  headerTitle = 'Meu aplicativo';
  atualRoute = '/';

  version = '3.0.0';
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.monitoreRouteChanges();
    console.log('Init app =>', this.version);

    console.log('Aplicativo iniciado');
  }

  monitoreRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadingService.deactiveLoading();

        this.atualRoute = val.url;
        this.showPasswordScreen = this.definePasswordScreen();
        this.checkValidatedPassword();
        console.log('Atual route => ', this.atualRoute);
        console.log('Show password screen => ', this.showPasswordScreen);

        this.showSideBar =
          this.routesWithSideBar
            .filter((e) => e !== '/')
            .filter((e) => val.url.includes(e)).length > 0 ||
          this.routesWithSideBar.includes(val.url);

        this.headerTitle = this.getHeaderTitle(val.url);
      }
    });
  }

  validatePassword() {
    let password: any = '123';
    const cleanRoute = this.atualRoute.split('?')[0];
    if (
      cleanRoute.includes('planner') &&
      cleanRoute.includes('87-desafio-empina-e-trinca-l18')
    ) {
      password = 'PERNOCAS';
    }
    if (
      cleanRoute.includes('planner') &&
      cleanRoute.includes('88-treino-2-l18')
    ) {
      password = 'TRINCADA';
    }
    if (
      cleanRoute.includes('planner') &&
      cleanRoute.includes('89-desafio-empina-e-trinca-l18-gluteo')
    ) {
      password = 'BUMBUM';
    }

    console.log('Password => ', password);
    this.passwordValidated = this.passwordInput === password;

    if (this.passwordValidated) {
      const objValidated = {
        passwordValidated: true,
        date: new Date().toISOString(),
        url: this.atualRoute,
      };
      localStorage.setItem(
        `passwordValidated_${this.atualRoute}`,
        JSON.stringify(objValidated)
      );
    }
  }

  private checkValidatedPassword() {
    const objValidated = JSON.parse(
      localStorage.getItem(`passwordValidated_${this.atualRoute}`)!
    );
    console.log('Obj validated => ', objValidated);
    if (objValidated && objValidated.passwordValidated) {
      this.passwordValidated = true;
    }
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

  private definePasswordScreen() {
    const qParamPassword = this.actRoute.snapshot.queryParamMap.get('password');
    if (qParamPassword === 'not') {
      return false;
    }
    const isPlanner = this.atualRoute.includes('planner');
    return isPlanner;
  }

  goToProfile() {
    console.log('Ir para o perfil');
  }

  logout() {
    console.log('Fazer logout');
  }
}
