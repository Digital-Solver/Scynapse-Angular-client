import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardFavoriteComponent } from './movie-card-favorite.component';

describe('MovieCardFavoriteComponent', () => {
  let component: MovieCardFavoriteComponent;
  let fixture: ComponentFixture<MovieCardFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
