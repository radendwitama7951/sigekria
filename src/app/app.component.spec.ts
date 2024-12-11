import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthComponent } from './features/auth/auth.component';
import { MockAuthComponent } from './shared/utils/test/components/mock-auth.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterLink],
      providers: [
        provideRouter([{ path: 'auth', component: MockAuthComponent }]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    app = fixture.componentInstance;
    harness = await RouterTestingHarness.create();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'web' title`, () => {
    // expect(app.title()).toEqual('web');
  });

  it('should render title ', () => {
    // fixture.detectChanges();
    // const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('h1')?.textContent).toContain('Hello, web');
  });

  it('should detect changes on title', fakeAsync(() => {
    // const oldTitle = app.title();
    // const newTitle = 'Test New Title';
    // const h1Title = (fixture.nativeElement as HTMLElement).querySelector('h1');
    // const appH1Element = fixture.debugElement.query(By.css(`h1`)).nativeElement;
    // app.title.set(newTitle);
    // expect(h1Title?.textContent).toContain(oldTitle);
    // tick();
    // expect(appH1Element.textContent).toContain(newTitle);
  }));

  it('should be able to route to /auth', async () => {
    // const authComp = await harness.navigateByUrl('/auth', AuthComponent);
    // tick();
  });

  // it('should do anything', fakeAsync(() => {
  // const appDe = fixture.debugElement;
  // const appEl: HTMLElement = appDe.nativeElement;
  //
  // const appTitle: HTMLElement = appDe.query(By.css('h1')).nativeElement;

  // console.debug(`[appcomp] some text: ${appTitle.textContent}\n`);
  // console.debug(
  //   `[appcomp] some color: ${getComputedStyle(appTitle).color}\n`,
  // );
  //
  // expect(true).withContext('just for some testing').toBeTrue();
  // }));
});
