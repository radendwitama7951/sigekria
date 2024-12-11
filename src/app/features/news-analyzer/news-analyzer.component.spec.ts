import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAnalyzerComponent } from './news-analyzer.component';

describe('NewsAnalyzerComponent', () => {
  let component: NewsAnalyzerComponent;
  let fixture: ComponentFixture<NewsAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsAnalyzerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
